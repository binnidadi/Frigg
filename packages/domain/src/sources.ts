import type { Identifier, IsoDateTime } from './primitives.js'
import type { ReviewState } from './review.js'

export type SourceType =
  | 'official_authority'
  | 'machine_reference'
  | 'international_standard'
  | 'regulatory_guidance'
  | 'ai_governance'
  | 'vendor_reference'
  | 'internal_policy'

export type TrustTier = 'primary' | 'secondary' | 'reference'

export interface RegulatorySourceRecord {
  id: Identifier
  code: string
  title: string
  owner: string
  jurisdiction: string
  sourceType: SourceType
  trustTier: TrustTier
  url: string
  notes: string | null
}

export interface SourceSnapshotRecord {
  id: Identifier
  sourceId: Identifier
  version: string
  retrievedAt: IsoDateTime
  checksum: string | null
  effectiveFrom: IsoDateTime | null
  effectiveTo: IsoDateTime | null
  storageUri: string | null
  reviewState: ReviewState
}
