import type { Identifier } from './primitives.js'

export type AuditAction =
  | 'created'
  | 'updated'
  | 'suggested'
  | 'reviewed'
  | 'approved'
  | 'rejected'
  | 'computed'
  | 'exported'

export type IntegrationStatus = 'pending' | 'running' | 'succeeded' | 'failed' | 'retrying' | 'cancelled'

export type AccountingExportStatus = 'draft' | 'ready' | 'exported' | 'failed' | 'voided'

export interface AuditLogRecord {
  id: Identifier
  importerId: Identifier | null
  actorId: Identifier | null
  action: AuditAction
  entityType: string
  entityId: Identifier
  before: Record<string, unknown> | null
  after: Record<string, unknown> | null
  metadata: Record<string, unknown> | null
  createdAt: string
}

export interface IntegrationJobRecord {
  id: Identifier
  importerId: Identifier
  shipmentId: Identifier | null
  provider: string
  jobType: string
  status: IntegrationStatus
  idempotencyKey: string
  attempts: number
  nextRunAt: string | null
}

export interface AccountingExportRecord {
  id: Identifier
  importerId: Identifier
  shipmentId: Identifier | null
  calculationId: Identifier | null
  provider: string
  status: AccountingExportStatus
  externalRef: string | null
  exportedAt: string | null
}
