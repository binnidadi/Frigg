import type {
  AuditMetadata,
  CoverageStatus,
  EffectivePeriod,
  Identifier,
  KnowledgeSourceType,
  VersionedRecord
} from './domain.js'

export type ValidationStatus = 'passed' | 'failed' | 'warning'

export interface StatutoryParameterSet extends VersionedRecord {
  taxThresholdLevel1: number
  taxThresholdLevel2: number
  taxRateLevel1: number
  taxRateLevel2: number
  taxRateLevel3: number
  monthlyPersonalTaxCredit: number
  standardInsuranceLevyRate: number
  a1InsuranceLevyRate: number
  fishermanInsuranceLevyRate: number
  employeePensionDeductionRate: number
  additionalPensionDeductionCapRate: number
}

export interface TaxCreditAllocation {
  employeeId: Identifier
  primaryPayerId: Identifier
  monthlyCreditAmount: number
  creditPercentage: number
  secondaryPayerIds: Identifier[]
  source: 'employee_instruction' | 'system_default' | 'review_override'
}

export interface PensionRoutingRule extends VersionedRecord {
  agreementId: Identifier | null
  unionId: Identifier | null
  employerId: Identifier | null
  pensionFundId: Identifier
  appliesToEmploymentTypes: string[]
  minimumEmployeeContributionRate: number
  employerContributionRate: number
  additionalSavingsEmployerRate: number | null
  requiresManualReview: boolean
}

export interface UnionRoutingRule extends VersionedRecord {
  unionId: Identifier
  agreementId: Identifier | null
  appliesToLocations: string[]
  employeeFeeRate: number | null
  employerFundContributionRate: number | null
  sicknessFundContributionRate: number | null
  requiresManualReview: boolean
}

export interface A1CertificateStatus {
  employeeId: Identifier
  certificateCountryCode: string
  validFrom: string
  validTo: string
  verifiedAt: string | null
  status: 'pending' | 'verified' | 'expired' | 'rejected'
}

export interface ComplianceDeadline {
  id: Identifier
  employerId: Identifier
  category:
    | 'withholding_tax'
    | 'insurance_levy'
    | 'pension_remittance'
    | 'union_remittance'
    | 'bank_file'
    | 'equal_pay'
  dueDate: string
  title: string
  description: string
  severity: 'info' | 'warning' | 'critical'
}

export interface PayslipEvidenceRecord {
  employeeId: Identifier
  payrollRunId: Identifier
  payslipId: Identifier
  lineItemCode: string
  ruleSetVersionIds: Identifier[]
  sourceReferenceIds: Identifier[]
  narrative: string
  calculatedAt: string
}

export interface ValidationResult {
  payrollRunId: Identifier
  status: ValidationStatus
  checkedAt: string
  mismatches: Array<{
    employeeId: Identifier
    lineItemCode: string
    expectedAmount: number
    actualAmount: number
    message: string
  }>
}

export interface AuditEvent {
  id: Identifier
  employerId: Identifier
  entityType:
    | 'payroll_run'
    | 'payslip'
    | 'rule_set'
    | 'agreement_version'
    | 'knowledge_source'
    | 'review_task'
  entityId: Identifier
  action:
    | 'created'
    | 'updated'
    | 'review_requested'
    | 'review_approved'
    | 'review_rejected'
    | 'exported'
  performedAt: string
  performedBy: Identifier
  summary: string
}

export interface KnowledgeSourceRecord extends VersionedRecord {
  sourceType: KnowledgeSourceType
  title: string
  sourceUrl: string
  coverageStatus: CoverageStatus
  transformedIntoRules: boolean
  notes: string[]
  audit: AuditMetadata
}

export interface CoverageMatrixEntry {
  code: string
  title: string
  sourceType: KnowledgeSourceType
  coverageStatus: CoverageStatus
  residualRisk: 'low' | 'medium' | 'high'
  supportedScenarios: string[]
  blockedScenarios: string[]
}

export interface ReviewTask {
  id: Identifier
  taskType:
    | 'rule_extraction'
    | 'pension_routing'
    | 'union_routing'
    | 'tax_credit_review'
    | 'retro_review'
  employerId: Identifier | null
  relatedEntityId: Identifier
  status: 'open' | 'in_review' | 'approved' | 'rejected'
  assigneeId: Identifier | null
  reason: string
  createdAt: string
}
