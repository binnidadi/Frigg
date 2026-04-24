import type { Identifier, IsoDateTime } from '@frigg/domain'

export type AiCapability =
  | 'document_extraction'
  | 'retrieval'
  | 'classification_suggestion'
  | 'review_summary'

export interface AiProviderBoundary {
  readonly providerName: string
  readonly capabilities: AiCapability[]
  readonly createdAt: IsoDateTime
  readonly auditReference: Identifier | null
}

export interface AiProvider {
  getBoundary(): AiProviderBoundary
}
