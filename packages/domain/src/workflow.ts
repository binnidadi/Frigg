import type { Identifier, IsoDateTime } from './primitives.js'
import type { ReviewState } from './review.js'

export type ReviewTaskType =
  | 'document_field'
  | 'classification_candidate'
  | 'permit_requirement'
  | 'landed_cost_calculation'
  | 'source_snapshot'

export type ReviewTaskStatus = 'open' | 'in_review' | 'blocked' | 'resolved' | 'cancelled'

export interface ReviewTaskRecord {
  id: Identifier
  importerId: Identifier | null
  sourceSnapshotId: Identifier | null
  taskType: ReviewTaskType
  status: ReviewTaskStatus
  entityType: string
  entityId: Identifier
  title: string
  description: string
  priority: number
  assignedTo: Identifier | null
  dueAt: IsoDateTime | null
  resolvedAt: IsoDateTime | null
  resolution: string | null
}

export interface DecisionRecord {
  id: Identifier
  importerId: Identifier | null
  sourceId: Identifier | null
  sourceSnapshotId: Identifier | null
  entityType: string
  entityId: Identifier
  decisionType: string
  decisionState: ReviewState
  rationale: string
  sourceReferences: Record<string, unknown>
  decidedBy: Identifier
  decidedAt: IsoDateTime
}
