import type {
  ApprovalStatus,
  AuditMetadata,
  EffectivePeriod,
  Identifier,
  SourceReference
} from './domain.js'

export type ConditionOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'contains'

export type RuleActionType =
  | 'set_base_rate'
  | 'set_fixed_amount'
  | 'apply_percentage_premium'
  | 'apply_fixed_premium'
  | 'set_deduction_rate'
  | 'set_employer_contribution_rate'
  | 'keep_higher_rate'

export interface RuleCondition {
  fact: string
  operator: ConditionOperator
  value?: string | number | boolean | string[]
  valueFact?: string
}

export interface RuleConditionGroup {
  all?: RuleConditionGroup[]
  any?: RuleConditionGroup[]
  not?: RuleConditionGroup
  condition?: RuleCondition
}

export interface RuleAction {
  type: RuleActionType
  target: string
  value?: string | number | boolean
  valueSource?:
    | {
        kind: 'static'
        value: string | number | boolean
      }
    | {
        kind: 'wage_table_lookup'
        tableId: Identifier
        rowKey: string
      }
}

export interface RuleScope {
  employeeGroups: string[]
  employmentTypes: string[]
  locations: string[]
  jobCodes: string[]
  minimumAgeYears: number | null
}

export interface RuleDecisionTree {
  id: Identifier
  agreementId: Identifier
  agreementVersion: string
  status: ApprovalStatus
  effectivePeriod: EffectivePeriod
  scope: RuleScope
  triggerEvent: 'payroll_run' | 'retro_run' | 'payslip_export'
  priority: number
  stackingMode: 'stack' | 'replace' | 'exclusive'
  conditions: RuleConditionGroup
  actions: RuleAction[]
  source: SourceReference
  audit: AuditMetadata
}
