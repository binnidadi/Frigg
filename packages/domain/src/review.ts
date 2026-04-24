export type ReviewState = 'draft' | 'suggested' | 'needs_review' | 'approved' | 'rejected' | 'superseded'

export type ConfidenceLevel = 'low' | 'medium' | 'high'

export interface ReviewMetadata {
  reviewState: ReviewState
  reviewedAt: string | null
  reviewedBy: string | null
}
