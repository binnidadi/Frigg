import type { CurrencyCode, Identifier, MoneyAmount } from './primitives.js'

export type CalculationStatus = 'draft' | 'computed' | 'needs_review' | 'approved' | 'voided'

export interface ExchangeRateRecord {
  id: Identifier
  baseCurrency: CurrencyCode
  quoteCurrency: CurrencyCode
  rate: string
  rateDate: string
  source: string
  sourceReference: string | null
}

export interface LandedCostCalculationRecord {
  id: Identifier
  shipmentId: Identifier
  exchangeRateId: Identifier | null
  status: CalculationStatus
  inputSnapshot: Record<string, unknown>
  explanation: Record<string, unknown> | null
  total: MoneyAmount | null
  computedAt: string | null
}

export interface LandedCostLineRecord {
  id: Identifier
  calculationId: Identifier
  shipmentItemId: Identifier | null
  code: string
  label: string
  amount: MoneyAmount
  formula: string
  inputs: Record<string, unknown>
  sortOrder: number
}

export interface TaxComponentRecord {
  id: Identifier
  calculationId: Identifier
  code: string
  label: string
  amount: MoneyAmount
  formula: string
  inputs: Record<string, unknown>
  roundingPolicy: string
  sourceReference: string | null
}
