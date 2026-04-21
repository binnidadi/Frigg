import type {
  PayrollInput,
  PayrollLineItem,
  PayrollResult,
  RuleDecisionTree
} from '@frigg/contracts'

export interface CalculationTrace {
  appliedRuleIds: string[]
  notes: string[]
}

export interface EngineCalculationResult {
  result: PayrollResult
  trace: CalculationTrace
}

export function calculatePayroll(
  input: PayrollInput,
  rules: RuleDecisionTree[]
): EngineCalculationResult {
  const earnings: PayrollLineItem[] = []
  const employeeDeductions: PayrollLineItem[] = []
  const employerCharges: PayrollLineItem[] = []

  const appliedRuleIds = rules.map((rule) => rule.id)
  const hourlyBaseRate = input.baseRateOverride?.amount ?? 0
  const grossAmount = hourlyBaseRate * input.hoursWorked

  earnings.push({
    code: 'BASE',
    label: 'Grunnlaun',
    category: 'earning',
    amount: { currency: 'ISK', amount: grossAmount },
    explanation: 'Bráðabirgðaútreikningur úr grunnsamningi vélarinnar.',
    sourceRuleIds: appliedRuleIds
  })

  return {
    result: {
      grossPay: { currency: 'ISK', amount: grossAmount },
      netPay: { currency: 'ISK', amount: grossAmount },
      employeeDeductions,
      employerCharges,
      earnings
    },
    trace: {
      appliedRuleIds,
      notes: [
        'Þetta er fyrsta beinagrind payroll vélarinnar.',
        'Raunveruleg deduction og premium logic kemur í næstu lotu.'
      ]
    }
  }
}
