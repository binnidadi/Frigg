import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { goldenScenarios } from './scenarios.js'
import { payrollDomainSnapshot } from './data.js'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildResearchSummary(workspace) {
  const workstreams = workspace.researchWorkstreams ?? []
  const sourceAcquisitionRecords = workspace.sourceAcquisitionRecords ?? []
  const obligations = workspace.legalObligations ?? []
  const pensionFundProfiles = workspace.pensionFundProfiles ?? []
  const unionProfiles = workspace.unionProfiles ?? []
  const collectiveAgreementPacks = workspace.collectiveAgreementPacks ?? []
  const requiredPrivateCorpus = workspace.requiredPrivateCorpus ?? []

  const statusCounts = workstreams.reduce((counts, workstream) => {
    counts[workstream.status] = (counts[workstream.status] ?? 0) + 1
    return counts
  }, {})

  const criticalPrivateCorpus = requiredPrivateCorpus.filter((item) => item.priority === 'critical')
  const certifiedCoverageCount =
    pensionFundProfiles.filter((profile) => profile.operationalStatus === 'compute_certified').length +
    unionProfiles.filter((profile) => profile.operationalStatus === 'compute_certified').length +
    collectiveAgreementPacks.filter((pack) => pack.operationalStatus === 'compute_certified').length

  return {
    workstreamCount: workstreams.length,
    mappedWorkstreamCount: workstreams.filter((entry) => entry.status === 'mapped').length,
    certifiedWorkstreamCount: workstreams.filter((entry) => entry.status === 'certified').length,
    sourceAcquisitionCount: sourceAcquisitionRecords.length,
    legalObligationCount: obligations.length,
    pensionFundProfileCount: pensionFundProfiles.length,
    unionProfileCount: unionProfiles.length,
    collectiveAgreementPackCount: collectiveAgreementPacks.length,
    certifiedCoverageCount,
    criticalPrivateCorpusCount: criticalPrivateCorpus.length,
    workstreamStatusCounts: statusCounts
  }
}

function buildRepositoryApi({
  driver,
  snapshot,
  scenarios,
  researchWorkspace,
  sourcePath = null,
  researchSourcePath = null
}) {
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

    getResearchWorkspace() {
      return clone(researchWorkspace)
    },

    getResearchSummary() {
      return clone(buildResearchSummary(researchWorkspace))
    },

    getCriticalPrivateCorpus() {
      return clone(
        [...(researchWorkspace.requiredPrivateCorpus ?? [])]
          .filter((entry) => entry.priority === 'critical')
          .sort((left, right) => left.code.localeCompare(right.code))
      )
    },

    getRepositoryStatus() {
      const researchSummary = buildResearchSummary(researchWorkspace)

      return {
        driver,
        sourcePath,
        researchSourcePath,
        snapshotLoaded: true,
        scenarioCount: scenarios.length,
        employerCount: snapshot.employers.length,
        payrollRunCount: snapshot.payrollRuns.length,
        validationResultCount: snapshot.validationResults.length,
        researchWorkstreamCount: researchSummary.workstreamCount,
        legalObligationCount: researchSummary.legalObligationCount
      }
    }
  }
}

export function getDefaultSeedFilePath() {
  const apiRoot = dirname(fileURLToPath(import.meta.url))
  const repoRoot = dirname(dirname(dirname(apiRoot)))
  return resolve(repoRoot, 'db', 'seeds', 'demo-repository.json')
}

export function getDefaultResearchWorkspacePath() {
  const apiRoot = dirname(fileURLToPath(import.meta.url))
  const repoRoot = dirname(dirname(dirname(apiRoot)))
  return resolve(repoRoot, 'db', 'seeds', 'research-workspace.json')
}

export function createFileRepository(input = {}) {
  const sourcePath = input.sourcePath ?? process.env.FRIGG_REPOSITORY_FILE ?? getDefaultSeedFilePath()
  const researchSourcePath =
    input.researchSourcePath ??
    process.env.FRIGG_RESEARCH_WORKSPACE_FILE ??
    getDefaultResearchWorkspacePath()

  if (!existsSync(sourcePath)) {
    throw new Error(`Repository seed file fannst ekki: ${sourcePath}`)
  }

  if (!existsSync(researchSourcePath)) {
    throw new Error(`Research workspace file fannst ekki: ${researchSourcePath}`)
  }

  const fileData = JSON.parse(readFileSync(sourcePath, 'utf8'))
  const researchWorkspace = JSON.parse(readFileSync(researchSourcePath, 'utf8'))

  return buildRepositoryApi({
    driver: 'file',
    snapshot: clone(fileData.snapshot ?? payrollDomainSnapshot),
    scenarios: clone(fileData.scenarios ?? goldenScenarios),
    researchWorkspace: clone(researchWorkspace),
    sourcePath,
    researchSourcePath
  })
}

export function createRepository(options = {}) {
  const driver = options.driver ?? process.env.FRIGG_REPOSITORY_DRIVER ?? 'memory'

  if (driver === 'file') {
    return createFileRepository(options)
  }

  return createInMemoryRepository(options)
}

export function createInMemoryRepository(input = {}) {
  const researchWorkspacePath = getDefaultResearchWorkspacePath()
  const researchWorkspace = input.researchWorkspace ??
    (existsSync(researchWorkspacePath)
      ? JSON.parse(readFileSync(researchWorkspacePath, 'utf8'))
      : {
          generatedAt: new Date().toISOString(),
          researchWorkstreams: [],
          legalObligations: [],
          pensionFundProfiles: [],
          unionProfiles: [],
          collectiveAgreementPacks: [],
          requiredPrivateCorpus: []
        })

  return buildRepositoryApi({
    driver: 'memory',
    snapshot: clone(input.snapshot ?? payrollDomainSnapshot),
    scenarios: clone(input.scenarios ?? goldenScenarios),
    researchWorkspace: clone(researchWorkspace),
    researchSourcePath: researchWorkspacePath
  })
}
