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

export type CoverageStatus =
  | 'planned'
  | 'in_review'
  | 'supported'
  | 'partial'
  | 'unsupported'

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
