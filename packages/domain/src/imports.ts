import type { CurrencyCode, Identifier, IsoDateTime } from './primitives.js'
import type { ReviewState } from './review.js'

export type ShipmentStatus =
  | 'draft'
  | 'documents_received'
  | 'classification_review'
  | 'costing_review'
  | 'ready_for_export'
  | 'exported'
  | 'archived'

export interface ImporterRecord {
  id: Identifier
  name: string
  registrationId: string | null
  countryCode: string
}

export interface SupplierRecord {
  id: Identifier
  importerId: Identifier
  name: string
  countryCode: string
  externalRef: string | null
}

export interface ShipmentRecord {
  id: Identifier
  importerId: Identifier
  supplierId: Identifier | null
  reference: string
  status: ShipmentStatus
  originCountry: string | null
  destinationCountry: string
  currency: CurrencyCode
  expectedArrival: IsoDateTime | null
}

export interface ShipmentItemRecord {
  id: Identifier
  shipmentId: Identifier
  lineNumber: number
  description: string
  quantity: string
  unitOfMeasure: string | null
  unitPriceMinor: number
  currency: CurrencyCode
  originCountry: string | null
  reviewState: ReviewState
}
