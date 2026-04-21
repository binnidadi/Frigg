import type {
  AIChatResult,
  AIExecutionFailure,
  AIExecutionRecord,
  AIProvider,
  AIProviderHealthReport,
  AIUsageMetrics,
  AgreementExtractionResult,
  ConfidenceResult,
  KnowledgeAnswer,
  ProviderHealth
} from '@frigg/contracts'

import { buildConfidenceResult } from './confidence.js'

export interface ProviderOperationResult<TResult> {
  result: TResult
  usage?: Partial<AIUsageMetrics>
  warnings?: string[]
}

export interface ProviderAdapter {
  name: string
  model: string
  isConfigured(): boolean
  getHealth(): Promise<Omit<ProviderHealth, 'cooldownUntil'>>
  chat(message: string, context: string): Promise<ProviderOperationResult<Omit<AIChatResult, 'execution'>>>
  stream(message: string, context: string): AsyncGenerator<string, void, unknown>
  parseAgreementDocument(
    text: string
  ): Promise<ProviderOperationResult<Omit<AgreementExtractionResult, 'execution'>>>
  answerKnowledgeQuestion(
    message: string,
    context: string
  ): Promise<ProviderOperationResult<Omit<KnowledgeAnswer, 'execution'>>>
}

export interface FailoverProviderOptions {
  cooldownMs?: number
  now?: () => Date
}

function defaultUsageMetrics(usage?: Partial<AIUsageMetrics>): AIUsageMetrics {
  return {
    inputTokens: usage?.inputTokens ?? 0,
    outputTokens: usage?.outputTokens ?? 0,
    cachedTokens: usage?.cachedTokens ?? 0
  }
}

function getErrorCode(error: unknown): string | null {
  if (typeof error === 'object' && error !== null) {
    const candidate = error as Record<string, unknown>
    const status = candidate.status ?? candidate.statusCode ?? candidate.code
    return typeof status === 'string' || typeof status === 'number' ? String(status) : null
  }

  return null
}

function isRateLimitError(error: unknown): boolean {
  const code = getErrorCode(error)
  const message =
    typeof error === 'object' && error !== null ? String((error as Record<string, unknown>).message ?? '') : ''

  return code === '429' || /429|rate limit|too many requests|quota/i.test(message)
}

export class FailoverAIProvider implements AIProvider {
  private readonly cooldownMs: number
  private readonly cooldowns = new Map<string, number>()
  private readonly latestErrors = new Map<string, string | null>()

  constructor(
    private readonly providers: ProviderAdapter[],
    options: FailoverProviderOptions = {}
  ) {
    this.cooldownMs = options.cooldownMs ?? 5 * 60 * 1000
    this.now = options.now ?? (() => new Date())
  }

  private readonly now: () => Date

  getName(): string {
    return 'failover'
  }

  async getHealth(): Promise<AIProviderHealthReport> {
    const checkedAt = this.now().toISOString()
    const providers = await Promise.all(
      this.providers.map(async (provider) => {
        const cooldownUntil = this.getCooldownUntil(provider.name)
        let baseHealth: Omit<ProviderHealth, 'cooldownUntil'>

        if (!provider.isConfigured()) {
          baseHealth = {
            name: provider.name,
            status: 'missing_key',
            checkedAt,
            latencyMs: null,
            message: 'Vantar stillingar fyrir veitanda.',
            model: provider.model
          }
        } else {
          try {
            baseHealth = await provider.getHealth()
          } catch (error) {
            const message =
              typeof error === 'object' && error !== null
                ? String((error as Record<string, unknown>).message ?? 'Óþekkt health villa')
                : 'Óþekkt health villa'

            baseHealth = {
              name: provider.name,
              status: 'degraded',
              checkedAt,
              latencyMs: null,
              message,
              model: provider.model
            }
          }
        }

        return {
          ...baseHealth,
          checkedAt,
          message: this.latestErrors.get(provider.name) ?? baseHealth.message,
          status: cooldownUntil ? 'cooldown' : baseHealth.status,
          cooldownUntil
        }
      })
    )

    const liveCount = providers.filter((provider) => provider.status === 'healthy').length
    const overallStatus =
      liveCount === 0 ? 'red' : liveCount === providers.length ? 'green' : 'yellow'

    return {
      overallStatus,
      checkedAt,
      providers
    }
  }

  async chat(message: string, context: string): Promise<AIChatResult> {
    return this.runWithFailover('chat', async (provider) => provider.chat(message, context))
  }

  async *stream(message: string, context: string): AsyncGenerator<string, void, unknown> {
    const availableProviders = this.providers.filter(
      (provider) => provider.isConfigured() && !this.getCooldownUntil(provider.name)
    )

    for (const provider of availableProviders) {
      try {
        yield* provider.stream(message, context)
        return
      } catch (error) {
        this.registerError(provider.name, error)
      }
    }

    throw new Error('Öll AI kerfi eru niðri eða í cooldown.')
  }

  async parseAgreementDocument(text: string): Promise<AgreementExtractionResult> {
    return this.runWithFailover('agreement_parse', async (provider) =>
      provider.parseAgreementDocument(text)
    )
  }

  async answerKnowledgeQuestion(message: string, context: string): Promise<KnowledgeAnswer> {
    return this.runWithFailover('knowledge', async (provider) =>
      provider.answerKnowledgeQuestion(message, context)
    )
  }

  private async runWithFailover<TResult extends { execution?: AIExecutionRecord; confidence: ConfidenceResult }>(
    requestKind: AIExecutionRecord['requestKind'],
    operation: (provider: ProviderAdapter) => Promise<ProviderOperationResult<TResult>>
  ): Promise<TResult & { execution: AIExecutionRecord }> {
    const startedAt = this.now()
    const failures: AIExecutionFailure[] = []
    const activeProviders = this.providers.filter((provider) => provider.isConfigured())

    for (const [index, provider] of activeProviders.entries()) {
      const cooldownUntil = this.getCooldownUntil(provider.name)
      if (cooldownUntil) {
        failures.push({
          providerName: provider.name,
          providerModel: provider.model,
          message: 'Veitandi er tímabundið í cooldown.',
          code: 'cooldown',
          occurredAt: this.now().toISOString(),
          triggeredCooldown: false
        })
        continue
      }

      try {
        const providerResult = await operation(provider)
        this.latestErrors.set(provider.name, null)

        return {
          ...providerResult.result,
          execution: this.buildExecutionRecord({
            requestKind,
            providerName: provider.name,
            providerModel: provider.model,
            startedAt,
            completedAt: this.now(),
            fallbackDepth: index,
            failures,
            warnings: providerResult.warnings ?? [],
            usage: providerResult.usage
          })
        }
      } catch (error) {
        failures.push(this.registerError(provider.name, error, provider.model))
      }
    }

    const completedAt = this.now()
    throw new Error(
      `Öll AI kerfi brugðust fyrir ${requestKind}. Síðasta villa: ${
        failures.at(-1)?.message ?? 'óþekkt villa'
      }. Heildartími: ${completedAt.getTime() - startedAt.getTime()} ms.`
    )
  }

  private buildExecutionRecord(input: {
    requestKind: AIExecutionRecord['requestKind']
    providerName: string
    providerModel: string
    startedAt: Date
    completedAt: Date
    fallbackDepth: number
    failures: AIExecutionFailure[]
    warnings: string[]
    usage?: Partial<AIUsageMetrics>
  }): AIExecutionRecord {
    const latencyMs = input.completedAt.getTime() - input.startedAt.getTime()

    return {
      requestKind: input.requestKind,
      status: input.fallbackDepth > 0 ? 'fallback_completed' : 'completed',
      startedAt: input.startedAt.toISOString(),
      completedAt: input.completedAt.toISOString(),
      providerName: input.providerName,
      providerModel: input.providerModel,
      fallbackDepth: input.fallbackDepth,
      latencyMs,
      usage: defaultUsageMetrics(input.usage),
      warnings: input.warnings,
      failures: input.failures
    }
  }

  private registerError(
    providerName: string,
    error: unknown,
    providerModel: string | null = null
  ): AIExecutionFailure {
    const message =
      typeof error === 'object' && error !== null
        ? String((error as Record<string, unknown>).message ?? 'Óþekkt villa')
        : 'Óþekkt villa'

    const triggeredCooldown = isRateLimitError(error)

    if (triggeredCooldown) {
      this.cooldowns.set(providerName, this.now().getTime() + this.cooldownMs)
    }

    this.latestErrors.set(providerName, message)

    return {
      providerName,
      providerModel,
      message,
      code: getErrorCode(error),
      occurredAt: this.now().toISOString(),
      triggeredCooldown
    }
  }

  private getCooldownUntil(providerName: string): string | null {
    const until = this.cooldowns.get(providerName)
    if (!until) {
      return null
    }

    if (until <= this.now().getTime()) {
      this.cooldowns.delete(providerName)
      return null
    }

    return new Date(until).toISOString()
  }
}

export class StaticAIProvider implements AIProvider {
  constructor(
    private readonly name: string,
    private readonly model: string,
    private readonly chatResult: string
  ) {}

  getName(): string {
    return this.name
  }

  async getHealth(): Promise<AIProviderHealthReport> {
    return {
      overallStatus: 'green',
      checkedAt: new Date().toISOString(),
      providers: [
        {
          name: this.name,
          status: 'healthy',
          checkedAt: new Date().toISOString(),
          latencyMs: 0,
          message: null,
          model: this.model,
          cooldownUntil: null
        }
      ]
    }
  }

  async chat(_message: string, _context: string): Promise<AIChatResult> {
    const confidence = buildConfidenceResult([
      {
        code: 'static_provider',
        label: 'Staðvætt svar',
        weight: 1,
        contribution: 0.9,
        rationale: 'Svar kemur úr staðvættri prófunaruppsetningu.'
      }
    ])

    return {
      content: this.chatResult,
      confidence,
      reviewRequired: confidence.reviewRequired,
      execution: {
        requestKind: 'chat',
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        providerName: this.name,
        providerModel: this.model,
        fallbackDepth: 0,
        latencyMs: 0,
        usage: defaultUsageMetrics(),
        warnings: [],
        failures: []
      }
    }
  }

  async *stream(_message: string, _context: string): AsyncGenerator<string, void, unknown> {
    yield this.chatResult
  }

  async parseAgreementDocument(_text: string): Promise<AgreementExtractionResult> {
    const confidence = buildConfidenceResult([
      {
        code: 'static_provider',
        label: 'Staðvætt parse',
        weight: 1,
        contribution: 0.7,
        rationale: 'Dummy parse krefst yfirferðar áður en það telst traust.'
      }
    ])

    return {
      agreementId: 'static-agreement',
      agreementVersion: '0.0.0',
      detectedLanguage: 'is',
      summary: 'Staðvætt parse svar.',
      extractedRules: [],
      referencedSources: [],
      warnings: ['Þetta er aðeins staðvætt parse svar.'],
      reviewRequired: true,
      confidence,
      parserStages: [],
      execution: {
        requestKind: 'agreement_parse',
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        providerName: this.name,
        providerModel: this.model,
        fallbackDepth: 0,
        latencyMs: 0,
        usage: defaultUsageMetrics(),
        warnings: ['Þetta er aðeins staðvætt parse svar.'],
        failures: []
      }
    }
  }

  async answerKnowledgeQuestion(_message: string, _context: string): Promise<KnowledgeAnswer> {
    const confidence = buildConfidenceResult([
      {
        code: 'static_provider',
        label: 'Staðvætt þekkingarsvar',
        weight: 1,
        contribution: 0.65,
        rationale: 'Svar er aðeins hugsað til prófunar og þarf yfirferð.'
      }
    ])

    return {
      answer: this.chatResult,
      sourceIds: [],
      coverageImplications: [],
      confidence,
      reviewRequired: true,
      execution: {
        requestKind: 'knowledge',
        status: 'completed',
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        providerName: this.name,
        providerModel: this.model,
        fallbackDepth: 0,
        latencyMs: 0,
        usage: defaultUsageMetrics(),
        warnings: ['Þetta er aðeins staðvætt þekkingarsvar.'],
        failures: []
      }
    }
  }
}
