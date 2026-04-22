export type Identifier = string

export type ApprovalStatus =
  | 'draft'
  | 'review_pending'
  | 'approved'
  | 'rejected'
  | 'archived'

export type EmploymentType =
  | 'monthly'
  | 'hourly'
  | 'shift_based'
  | 'temporary'
  | 'seasonal'

export type PayrollRunStatus =
  | 'draft'
  | 'review_required'
  | 'validating'
  | 'blocked'
  | 'approved'
  | 'exported'

export type KnowledgeSourceType =
  | 'statutory'
  | 'collective_agreement'
  | 'pension'
  | 'union'
  | 'interpretation'

export type MarketScope =
  | 'private_general'
  | 'private_specialized'
  | 'state'
  | 'municipality'
  | 'public_institution'
  | 'cross_market'

export type CoverageStatus =
  | 'planned'
  | 'in_review'
  | 'supported'
  | 'partial'
  | 'unsupported'

export type ResearchStatus =
  | 'unresearched'
  | 'mapped'
  | 'parsed'
  | 'draft_rules'
  | 'review_required'
  | 'certified'

export type CoverageOperationalStatus =
  | 'cannot_compute'
  | 'compute_with_review'
  | 'compute_certified'

export type SourceDepth =
  | 'registry_only'
  | 'structured_summary'
  | 'clause_level'
  | 'rule_level'
  | 'validated_runtime'

export type AccessLevel =
  | 'public'
  | 'customer_private'
  | 'partner_private'
  | 'restricted'

export interface EffectivePeriod {
  validFrom: string
  validTo: string | null
}

export interface SourceReference {
  documentId: Identifier
  clauseReference: string
  pages: number[]
  excerpt: string | null
}

export interface AuditMetadata {
  createdAt: string
  createdBy: Identifier
  reviewedAt: string | null
  reviewedBy: Identifier | null
}

export interface VersionedRecord {
  id: Identifier
  code: string
  version: string
  effectivePeriod: EffectivePeriod
}
