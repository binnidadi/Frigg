import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { goldenScenarios } from './scenarios.js'
import { payrollDomainSnapshot } from './data.js'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildRepositoryApi({ driver, snapshot, scenarios, sourcePath = null }) {
  return {
    driver,

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
        driver,
        sourcePath,
        snapshotLoaded: true,
        scenarioCount: scenarios.length,
        employerCount: snapshot.employers.length,
        payrollRunCount: snapshot.payrollRuns.length,
        validationResultCount: snapshot.validationResults.length
      }
    }
  }
}

export function createInMemoryRepository(input = {}) {
  return buildRepositoryApi({
    driver: 'memory',
    snapshot: clone(input.snapshot ?? payrollDomainSnapshot),
    scenarios: clone(input.scenarios ?? goldenScenarios)
  })
}

export function getDefaultSeedFilePath() {
  const apiRoot = dirname(fileURLToPath(import.meta.url))
  const repoRoot = dirname(dirname(dirname(apiRoot)))
  return resolve(repoRoot, 'db', 'seeds', 'demo-repository.json')
}

export function createFileRepository(input = {}) {
  const sourcePath = input.sourcePath ?? process.env.FRIGG_REPOSITORY_FILE ?? getDefaultSeedFilePath()

  if (!existsSync(sourcePath)) {
    throw new Error(`Repository seed file fannst ekki: ${sourcePath}`)
  }

  const fileData = JSON.parse(readFileSync(sourcePath, 'utf8'))

  return buildRepositoryApi({
    driver: 'file',
    snapshot: clone(fileData.snapshot ?? payrollDomainSnapshot),
    scenarios: clone(fileData.scenarios ?? goldenScenarios),
    sourcePath
  })
}

export function createRepository(options = {}) {
  const driver = options.driver ?? process.env.FRIGG_REPOSITORY_DRIVER ?? 'memory'

  if (driver === 'file') {
    return createFileRepository(options)
  }

  return createInMemoryRepository(options)
}
