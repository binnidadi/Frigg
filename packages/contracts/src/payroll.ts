import type {
  EffectivePeriod,
  Identifier,
  PayrollRunStatus
} from './domain.js'

export interface MoneyAmount {
  currency: 'ISK'
  amount: number
}

export interface PayrollInput {
  tenantId: Identifier
  employerId: Identifier
  employeeId: Identifier
  contractId: Identifier
  period: EffectivePeriod
  hoursWorked: number
  eveningHours: number
  weekendHours: number
  holidayHours: number
  leaveHours: number
  baseRateOverride: MoneyAmount | null
}

export interface PayrollLineItem {
  code: string
  label: string
  category:
    | 'earning'
    | 'premium'
    | 'bonus'
    | 'deduction'
    | 'employer_charge'
  amount: MoneyAmount
  explanation: string
  sourceRuleIds: Identifier[]
}

export interface PayrollResult {
  grossPay: MoneyAmount
  netPay: MoneyAmount
  employeeDeductions: PayrollLineItem[]
  employerCharges: PayrollLineItem[]
  earnings: PayrollLineItem[]
}

export interface PayrollRunSnapshot {
  runId: Identifier
  status: PayrollRunStatus
  ruleSetVersionIds: Identifier[]
  statutoryVersionIds: Identifier[]
  inputs: PayrollInput[]
  results: PayrollResult[]
  createdAt: string
}

export interface RetroCalculationRequest {
  batchId: Identifier
  reason: string
  affectedRunIds: Identifier[]
  effectiveFrom: string
  effectiveTo: string
}
