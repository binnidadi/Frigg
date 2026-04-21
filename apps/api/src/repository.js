import { goldenScenarios } from './scenarios.js'
import { payrollDomainSnapshot } from './data.js'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function createInMemoryRepository(input = {}) {
  const snapshot = clone(input.snapshot ?? payrollDomainSnapshot)
  const scenarios = clone(input.scenarios ?? goldenScenarios)

  return {
    driver: 'memory',

    getSnapshot() {
      return clone(snapshot)
    },

    getScenarios() {
      return clone(scenarios)
    },

    getCurrentPayrollRun() {
      return clone(snapshot.payrollRuns?.[0] ?? null)
    },

    getValidationResultForRun(payrollRunId) {
      return clone(
        snapshot.validationResults.find((entry) => entry.payrollRunId === payrollRunId) ?? null
      )
    },

    getActiveRuleSet() {
      return clone(snapshot.ruleSetVersions?.[0] ?? null)
    },

    getAgreementVersionById(agreementVersionId) {
      return clone(
        snapshot.agreementVersions.find((entry) => entry.id === agreementVersionId) ?? null
      )
    },

    getUpcomingDeadlines() {
      return clone(
        [...(snapshot.complianceDeadlines ?? [])].sort((left, right) =>
          left.dueDate.localeCompare(right.dueDate)
        )
      )
    },

    getRepositoryStatus() {
      return {
        driver: 'memory',
        snapshotLoaded: true,
        scenarioCount: scenarios.length,
        employerCount: snapshot.employers.length,
        payrollRunCount: snapshot.payrollRuns.length,
        validationResultCount: snapshot.validationResults.length
      }
    }
  }
}

export function createRepository() {
  return createInMemoryRepository()
}
