import type {
  AIChatResult,
  AgreementExtractionResult,
  ConfidenceFactor,
  ConfidenceResult,
  KnowledgeAnswer,
  ProviderHealth
} from '@frigg/contracts'

import { buildAgreementConfidence, buildConfidenceResult, buildKnowledgeConfidence } from './confidence.js'
import type { ProviderAdapter, ProviderOperationResult } from './failover-provider.js'

function getEnvValue(envKey: string): string | null {
  const value = process.env[envKey]
  return value && value.trim().length > 0 ? value.trim() : null
}

function baseConfidence(providerName: string, contribution: number, rationale: string): ConfidenceResult {
  const factors: ConfidenceFactor[] = [
    {
      code: 'provider_response',
      label: `Svar frá ${providerName}`,
      weight: 1,
      contribution,
      rationale
    }
  ]

  return buildConfidenceResult(factors)
}

function parseJsonObject(content: string): Record<string, unknown> {
  try {
    return JSON.parse(content) as Record<string, unknown>
  } catch (error) {
    throw new Error(
      `Veitandi skilaði ekki giltu JSON svari: ${
        typeof error === 'object' && error !== null
          ? String((error as Record<string, unknown>).message ?? 'óþekkt villa')
          : 'óþekkt villa'
      }`
    )
  }
}

async function readResponseJson(response: Response): Promise<Record<string, unknown>> {
  if (!response.ok) {
    const errorText = await response.text()
    const error = new Error(errorText || `HTTP ${response.status}`)
    ;(error as Error & { status?: number }).status = response.status
    throw error
  }

  return (await response.json()) as Record<string, unknown>
}

export interface OpenAICompatibleAdapterOptions {
  name: string
  model: string
  envKey: string
  baseUrl: string
}

export class OpenAICompatibleProviderAdapter implements ProviderAdapter {
  readonly name: string
  readonly model: string

  constructor(private readonly options: OpenAICompatibleAdapterOptions) {
    this.name = options.name
    this.model = options.model
  }

  isConfigured(): boolean {
    return getEnvValue(this.options.envKey) !== null
  }

  async getHealth(): Promise<Omit<ProviderHealth, 'cooldownUntil'>> {
    return {
      name: this.name,
      status: this.isConfigured() ? 'healthy' : 'missing_key',
      checkedAt: new Date().toISOString(),
      latencyMs: null,
      message: this.isConfigured() ? null : `Vantar ${this.options.envKey}.`,
      model: this.model
    }
  }

  async chat(message: string, context: string): Promise<ProviderOperationResult<Omit<AIChatResult, 'execution'>>> {
    const payload = await this.createChatCompletion({
      system: 'Þú ert AI aðstoðarlag Frigg. Svaraðu skýrt og á vandaðri íslensku.',
      messages: [
        {
          role: 'user',
          content: `${context}\n\nSpurning:\n${message}`.trim()
        }
      ]
    })

    const content = this.extractContent(payload)
    const confidence = baseConfidence(
      this.name,
      0.72,
      'Traust ræðst af því að svar kom frá virkum veitanda, en þarf enn review í payroll samhengi.'
    )

    return {
      result: {
        content,
        confidence,
        reviewRequired: confidence.reviewRequired
      },
      usage: this.extractUsage(payload)
    }
  }

  async *stream(message: string, context: string): AsyncGenerator<string, void, unknown> {
    const result = await this.chat(message, context)
    yield result.result.content
  }

  async parseAgreementDocument(
    text: string
  ): Promise<ProviderOperationResult<Omit<AgreementExtractionResult, 'execution'>>> {
    const payload = await this.createChatCompletion({
      system: [
        'Þú lest íslenska kjarasamninga fyrir Frigg.',
        'Skilaðu aðeins JSON hlut með lyklunum:',
        'summary, warnings, reviewRequired, extractedRules, sourceCoverage, schemaFit, extractionClarity, routingClarity'
      ].join(' '),
      messages: [
        {
          role: 'user',
          content: text
        }
      ],
      responseFormat: {
        type: 'json_object'
      }
    })

    const raw = parseJsonObject(this.extractContent(payload))
    const warnings = Array.isArray(raw.warnings)
      ? raw.warnings.map((warning) => String(warning))
      : ['Veitandi skilaði ekki formgerðum viðvörunum.']

    const confidence = buildAgreementConfidence({
      sourceCoverage: Number(raw.sourceCoverage ?? 0.4),
      schemaFit: Number(raw.schemaFit ?? 0.4),
      extractionClarity: Number(raw.extractionClarity ?? 0.4),
      routingClarity: Number(raw.routingClarity ?? 0.4),
      warnings
    })

    return {
      result: {
        agreementId: 'external-agreement-draft',
        agreementVersion: 'draft',
        detectedLanguage: 'is',
        summary: String(raw.summary ?? 'Drög að útdrætti úr kjarasamningi.'),
        extractedRules: [],
        referencedSources: [],
        warnings,
        reviewRequired: Boolean(raw.reviewRequired ?? true) || confidence.reviewRequired,
        confidence,
        parserStages: []
      },
      usage: this.extractUsage(payload),
      warnings
    }
  }

  async answerKnowledgeQuestion(
    message: string,
    context: string
  ): Promise<ProviderOperationResult<Omit<KnowledgeAnswer, 'execution'>>> {
    const payload = await this.createChatCompletion({
      system: 'Svaraðu spurningum um launa- og compliance gögn Frigg á vandaðri íslensku.',
      messages: [
        {
          role: 'user',
          content: `${context}\n\nSpurning:\n${message}`.trim()
        }
      ]
    })

    const answer = this.extractContent(payload)
    const confidence = buildKnowledgeConfidence({
      sourceCoverage: 0.5,
      sourceCount: 1,
      coverageStatus: 'partial'
    })

    return {
      result: {
        answer,
        sourceIds: [],
        coverageImplications: [],
        confidence,
        reviewRequired: confidence.reviewRequired
      },
      usage: this.extractUsage(payload)
    }
  }

  private async createChatCompletion(input: {
    system: string
    messages: Array<{ role: 'user' | 'assistant'; content: string }>
    responseFormat?: { type: 'json_object' }
  }): Promise<Record<string, unknown>> {
    const apiKey = getEnvValue(this.options.envKey)
    if (!apiKey) {
      throw new Error(`Vantar ${this.options.envKey}.`)
    }

    const response = await fetch(`${this.options.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: 'system', content: input.system }, ...input.messages],
        temperature: 0.1,
        response_format: input.responseFormat
      })
    })

    return readResponseJson(response)
  }

  private extractContent(payload: Record<string, unknown>): string {
    const choices = payload.choices
    if (!Array.isArray(choices) || choices.length === 0) {
      throw new Error('Veitandi skilaði tómu svari.')
    }

    const firstChoice = choices[0] as Record<string, unknown>
    const message = firstChoice.message as Record<string, unknown> | undefined
    const content = message?.content

    if (typeof content !== 'string') {
      throw new Error('Veitandi skilaði ekki textasvari.')
    }

    return content
  }

  private extractUsage(payload: Record<string, unknown>) {
    const usage = (payload.usage ?? {}) as Record<string, unknown>
    return {
      inputTokens: Number(usage.prompt_tokens ?? 0),
      outputTokens: Number(usage.completion_tokens ?? 0),
      cachedTokens: Number(usage.cached_tokens ?? 0)
    }
  }
}

export interface GeminiAdapterOptions {
  model: string
  envKey: string
}

export class GeminiProviderAdapter implements ProviderAdapter {
  readonly name = 'Gemini'
  readonly model: string

  constructor(private readonly options: GeminiAdapterOptions) {
    this.model = options.model
  }

  isConfigured(): boolean {
    return getEnvValue(this.options.envKey) !== null
  }

  async getHealth(): Promise<Omit<ProviderHealth, 'cooldownUntil'>> {
    return {
      name: this.name,
      status: this.isConfigured() ? 'healthy' : 'missing_key',
      checkedAt: new Date().toISOString(),
      latencyMs: null,
      message: this.isConfigured() ? null : `Vantar ${this.options.envKey}.`,
      model: this.model
    }
  }

  async chat(message: string, context: string): Promise<ProviderOperationResult<Omit<AIChatResult, 'execution'>>> {
    const payload = await this.generateContent(
      [
        'Þú ert AI aðstoðarlag Frigg.',
        'Svaraðu skýrt, stutt og á vandaðri íslensku.',
        context,
        `Spurning: ${message}`
      ].join('\n\n')
    )

    const content = this.extractText(payload)
    const confidence = baseConfidence(
      this.name,
      0.74,
      'Gemini svar krefst enn review vegna payroll og compliance áhættu.'
    )

    return {
      result: {
        content,
        confidence,
        reviewRequired: confidence.reviewRequired
      },
      usage: this.extractUsage(payload)
    }
  }

  async *stream(message: string, context: string): AsyncGenerator<string, void, unknown> {
    const result = await this.chat(message, context)
    yield result.result.content
  }

  async parseAgreementDocument(
    text: string
  ): Promise<ProviderOperationResult<Omit<AgreementExtractionResult, 'execution'>>> {
    const payload = await this.generateContent(
      [
        'Þú lest íslenskan kjarasamning fyrir Frigg.',
        'Skilaðu aðeins JSON með summary, warnings, reviewRequired, sourceCoverage, schemaFit, extractionClarity og routingClarity.',
        text
      ].join('\n\n')
    )

    const raw = parseJsonObject(this.extractText(payload))
    const warnings = Array.isArray(raw.warnings)
      ? raw.warnings.map((warning) => String(warning))
      : ['Gemini parse svar þarfnast yfirferðar.']

    const confidence = buildAgreementConfidence({
      sourceCoverage: Number(raw.sourceCoverage ?? 0.45),
      schemaFit: Number(raw.schemaFit ?? 0.45),
      extractionClarity: Number(raw.extractionClarity ?? 0.45),
      routingClarity: Number(raw.routingClarity ?? 0.45),
      warnings
    })

    return {
      result: {
        agreementId: 'external-agreement-draft',
        agreementVersion: 'draft',
        detectedLanguage: 'is',
        summary: String(raw.summary ?? 'Drög að Gemini útdrætti.'),
        extractedRules: [],
        referencedSources: [],
        warnings,
        reviewRequired: Boolean(raw.reviewRequired ?? true) || confidence.reviewRequired,
        confidence,
        parserStages: []
      },
      usage: this.extractUsage(payload),
      warnings
    }
  }

  async answerKnowledgeQuestion(
    message: string,
    context: string
  ): Promise<ProviderOperationResult<Omit<KnowledgeAnswer, 'execution'>>> {
    const payload = await this.generateContent(
      [
        'Svaraðu spurningu um launa- og compliance gögn Frigg á vandaðri íslensku.',
        context,
        `Spurning: ${message}`
      ].join('\n\n')
    )

    const answer = this.extractText(payload)
    const confidence = buildKnowledgeConfidence({
      sourceCoverage: 0.5,
      sourceCount: 1,
      coverageStatus: 'partial'
    })

    return {
      result: {
        answer,
        sourceIds: [],
        coverageImplications: [],
        confidence,
        reviewRequired: confidence.reviewRequired
      },
      usage: this.extractUsage(payload)
    }
  }

  private async generateContent(prompt: string): Promise<Record<string, unknown>> {
    const apiKey = getEnvValue(this.options.envKey)
    if (!apiKey) {
      throw new Error(`Vantar ${this.options.envKey}.`)
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${apiKey}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1
        }
      })
    })

    return readResponseJson(response)
  }

  private extractText(payload: Record<string, unknown>): string {
    const candidates = payload.candidates
    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error('Gemini skilaði engum candidates.')
    }

    const firstCandidate = candidates[0] as Record<string, unknown>
    const content = firstCandidate.content as Record<string, unknown> | undefined
    const parts = content?.parts

    if (!Array.isArray(parts) || parts.length === 0) {
      throw new Error('Gemini skilaði engum textapartum.')
    }

    const firstPart = parts[0] as Record<string, unknown>
    if (typeof firstPart.text !== 'string') {
      throw new Error('Gemini skilaði ekki texta.')
    }

    return firstPart.text
  }

  private extractUsage(payload: Record<string, unknown>) {
    const metadata = (payload.usageMetadata ?? {}) as Record<string, unknown>
    return {
      inputTokens: Number(metadata.promptTokenCount ?? 0),
      outputTokens: Number(metadata.candidatesTokenCount ?? 0),
      cachedTokens: Number(metadata.cachedContentTokenCount ?? 0)
    }
  }
}
