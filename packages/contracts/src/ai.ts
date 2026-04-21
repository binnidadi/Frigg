import type { Identifier } from './domain.js'
import type { RuleDecisionTree } from './rules.js'

export type ProviderStatus = 'healthy' | 'degraded' | 'down' | 'missing_key'

export interface ProviderHealth {
  name: string
  status: ProviderStatus
  checkedAt: string
  latencyMs: number | null
  message: string | null
}

export interface AgreementExtractionResult {
  agreementId: Identifier
  agreementVersion: string
  detectedLanguage: 'is'
  summary: string
  extractedRules: RuleDecisionTree[]
  warnings: string[]
}

export interface AIProvider {
  getName(): string
  getHealth(): Promise<ProviderHealth>
  chat(message: string, context: string): Promise<string>
  stream(message: string, context: string): AsyncGenerator<string, void, unknown>
  parseAgreementDocument(text: string): Promise<AgreementExtractionResult>
}
