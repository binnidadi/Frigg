import type { ConfidenceLevel, ReviewState } from './review.js'

export interface HsCodeRecord {
  id: string
  code: string
  version: string
  description: string
  validFrom: string
  validTo: string | null
  sourceReference: string | null
}

export interface ClassificationCandidateRecord {
  id: string
  shipmentItemId: string
  hsCodeId: string
  rationale: string
  evidence: Record<string, unknown> | null
  confidence: ConfidenceLevel
  confidenceScore: number | null
  sourceReference: string | null
  providerName: string | null
  reviewState: ReviewState
}

export type PermitRequirementStatus = 'suggested' | 'warning' | 'confirmed' | 'dismissed'

export interface PermitRequirementRecord {
  id: string
  shipmentId: string
  shipmentItemId: string | null
  regulatoryRuleId: string | null
  status: PermitRequirementStatus
  title: string
  rationale: string
  authority: string | null
  sourceReference: string | null
  reviewState: ReviewState
}

export interface RegulatoryRuleRecord {
  id: string
  code: string
  version: string
  title: string
  description: string
  authority: string | null
  hsCodeId: string | null
  rulePayload: Record<string, unknown>
  validFrom: string
  validTo: string | null
  reviewState: ReviewState
}
