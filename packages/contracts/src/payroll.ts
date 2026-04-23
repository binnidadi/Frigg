import type {
  EffectivePeriod,
  Identifier,
  PayrollRunStatus
} from './domain.js'
import type {
  A1CertificateStatus,
  TaxCreditAllocation
} from './compliance.js'

export interface MoneyAmount {
  currency: 'ISK'
  amount: number
}

export interface LeaveAndAbsenceEvent {
  type:
    | 'vacation'
    | 'sickness'
    | 'child_sickness'
    | 'parental_leave'
    | 'unpaid_leave'
  from: string
  to: string
  ratioOfDay: number
  source: 'timesheet' | 'manual' | 'external_system'
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
  municipalityCode: string
  taxCreditAllocation: TaxCreditAllocation | null
  a1Certificate: A1CertificateStatus | null
  leaveEvents: LeaveAndAbsenceEvent[]
  pensionRoutingRuleId: Identifier | null
  unionRoutingRuleId: Identifier | null
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
  evidenceRecordId: Identifier | null
}

export interface PayrollResult {
  grossPay: MoneyAmount
  netPay: MoneyAmount
  employeeDeductions: PayrollLineItem[]
  employerCharges: PayrollLineItem[]
  earnings: PayrollLineItem[]
}

export interface Payslip {
  id: Identifier
  employeeId: Identifier
  payrollRunId: Identifier
  issuedAt: string
  grossPay: MoneyAmount
  netPay: MoneyAmount
  evidenceRecordIds: Identifier[]
}

export type PayrollVarianceStatus = 'aligned' | 'review_required' | 'mismatch' | 'blocked'

export interface PayrollVarianceFinding {
  id: Identifier
  employeeId: Identifier
  contractId: Identifier | null
  relatedPayslipId: Identifier | null
  status: PayrollVarianceStatus
  severity: 'info' | 'warning' | 'critical'
  title: string
  summary: string
  expectedAmount: MoneyAmount | null
  actualAmount: MoneyAmount | null
  varianceAmount: MoneyAmount | null
  requiredPrivateCorpusCodes: string[]
}

export interface PayrollRun {
  id: Identifier
  employerId: Identifier
  period: EffectivePeriod
  status: PayrollRunStatus
  ruleSetVersionIds: Identifier[]
  statutoryParameterSetId: Identifier
  startedAt: string
  completedAt: string | null
  reviewTaskIds: Identifier[]
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
