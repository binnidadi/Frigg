import type { CoverageMatrixEntry, KnowledgeSourceRecord } from './compliance.js'
import type { Identifier } from './domain.js'
import type { RuleDecisionTree } from './rules.js'

export type ProviderStatus = 'healthy' | 'degraded' | 'down' | 'missing_key' | 'cooldown'

export type AIRequestKind = 'chat' | 'knowledge' | 'agreement_parse'

export type AIExecutionStatus = 'completed' | 'fallback_completed' | 'failed'

export type ParserStageName = 'detect' | 'parse' | 'normalize' | 'preview' | 'warnings'

export type ParserStageStatus = 'completed' | 'warning' | 'failed'

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ProviderHealth {
  name: string
  status: ProviderStatus
  checkedAt: string
  latencyMs: number | null
  message: string | null
  model: string | null
  cooldownUntil: string | null
}

export interface AIProviderHealthReport {
  overallStatus: 'green' | 'yellow' | 'red'
  checkedAt: string
  providers: ProviderHealth[]
}

export interface AIUsageMetrics {
  inputTokens: number
  outputTokens: number
  cachedTokens: number
}

export interface AIExecutionFailure {
  providerName: string
  providerModel: string | null
  message: string
  code: string | null
  occurredAt: string
  triggeredCooldown: boolean
}

export interface AIExecutionRecord {
  requestKind: AIRequestKind
  status: AIExecutionStatus
  startedAt: string
  completedAt: string
  providerName: string
  providerModel: string
  fallbackDepth: number
  latencyMs: number
  usage: AIUsageMetrics
  warnings: string[]
  failures: AIExecutionFailure[]
}

export interface ConfidenceFactor {
  code: string
  label: string
  weight: number
  contribution: number
  rationale: string
}

export interface ConfidenceResult {
  score: number
  level: ConfidenceLevel
  reviewRequired: boolean
  badge: string
  factors: ConfidenceFactor[]
}

export interface ParserStageResult {
  stage: ParserStageName
  status: ParserStageStatus
  summary: string
  warnings: string[]
}

export interface AIChatResult {
  content: string
  confidence: ConfidenceResult
  reviewRequired: boolean
  execution: AIExecutionRecord
}

export interface AgreementExtractionResult {
  agreementId: Identifier
  agreementVersion: string
  detectedLanguage: 'is'
  summary: string
  extractedRules: RuleDecisionTree[]
  referencedSources: KnowledgeSourceRecord[]
  warnings: string[]
  reviewRequired: boolean
  confidence: ConfidenceResult
  parserStages: ParserStageResult[]
  execution: AIExecutionRecord
}

export interface KnowledgeAnswer {
  answer: string
  sourceIds: Identifier[]
  coverageImplications: CoverageMatrixEntry[]
  confidence: ConfidenceResult
  reviewRequired: boolean
  execution: AIExecutionRecord
}

export interface AIProvider {
  getName(): string
  getHealth(): Promise<AIProviderHealthReport>
  chat(message: string, context: string): Promise<AIChatResult>
  stream(message: string, context: string): AsyncGenerator<string, void, unknown>
  parseAgreementDocument(text: string): Promise<AgreementExtractionResult>
  answerKnowledgeQuestion(message: string, context: string): Promise<KnowledgeAnswer>
}
