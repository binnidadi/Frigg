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
  | 'validating'
  | 'blocked'
  | 'approved'
  | 'exported'

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
