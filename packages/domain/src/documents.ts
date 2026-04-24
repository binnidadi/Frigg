import type { ConfidenceLevel, ReviewState } from './review.js'

export type DocumentType =
  | 'invoice'
  | 'bill_of_lading'
  | 'packing_list'
  | 'certificate_of_origin'
  | 'permit'
  | 'other'

export interface SourceMapping {
  page: number | null
  boundingBox: Record<string, unknown> | null
}

export interface DocumentRecord {
  id: string
  shipmentId: string
  type: DocumentType
  fileName: string
  storageUri: string
  checksum: string | null
  reviewState: ReviewState
  createdAt: string
}

export interface ExtractedFieldRecord {
  id: string
  documentId: string
  shipmentItemId: string | null
  fieldKey: string
  rawValue: string
  normalizedValue: string | null
  confidence: ConfidenceLevel
  confidenceScore: number | null
  source: SourceMapping
  providerName: string | null
  reviewState: ReviewState
}
