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
  const coverageMatrixEntries = workspace.coverageMatrixEntries ?? []
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
    coverageMatrixCount: coverageMatrixEntries.length,
    computeWithReviewCount: coverageMatrixEntries.filter(
      (entry) => entry.operationalStatus === 'compute_with_review'
    ).length,
    cannotComputeCount: coverageMatrixEntries.filter(
      (entry) => entry.operationalStatus === 'cannot_compute'
    ).length,
    certifiedCoverageCount,
    criticalPrivateCorpusCount: criticalPrivateCorpus.length,
    workstreamStatusCounts: statusCounts
  }
}

function buildFeaturedCoveragePack(workspace, snapshot) {
  const coverageEntries = workspace.coverageMatrixEntries ?? []
  const featuredEntry =
    coverageEntries.find((entry) => entry.code === 'coverage_vr_retail_foundation') ??
    coverageEntries.find((entry) => entry.operationalStatus === 'compute_with_review') ??
    null

  if (!featuredEntry) {
    return null
  }

  const ruleSetVersions = snapshot.ruleSetVersions ?? []
  const statutoryParameterSets = snapshot.statutoryParameterSets ?? []
  const pensionRoutingRules = snapshot.pensionRoutingRules ?? []
  const unionRoutingRules = snapshot.unionRoutingRules ?? []
  const payrollInputs = snapshot.payrollInputs ?? []
  const agreementScopeAssessments = snapshot.agreementScopeAssessments ?? []
  const privateCorpusSubmissions = snapshot.privateCorpusSubmissions ?? []
  const privateCorpusIntakePackages = snapshot.privateCorpusIntakePackages ?? []
  const privateCorpusIntakeBlueprints = snapshot.privateCorpusIntakeBlueprints ?? []
  const contracts = snapshot.contracts ?? []
  const payslips = snapshot.payslips ?? []
  const payslipEvidenceRecords = snapshot.payslipEvidenceRecords ?? []
  const validationResults = snapshot.validationResults ?? []
  const reviewTasks = snapshot.reviewTasks ?? []

  const relatedPayslips = payslips.filter((entry) =>
    payslipEvidenceRecords.some(
      (record) =>
        record.payslipId === entry.id &&
        (featuredEntry.lineItemBoundaries ?? []).some((boundary) => boundary.code === record.lineItemCode)
    )
  )

  const evidenceByLineItem = (featuredEntry.lineItemBoundaries ?? []).map((boundary) => {
    const records = payslipEvidenceRecords.filter((record) => record.lineItemCode === boundary.code)

    return {
      code: boundary.code,
      label: boundary.label,
      status: boundary.status,
      evidenceCount: records.length,
      payslipIds: [...new Set(records.map((entry) => entry.payslipId))],
      sourceReferenceIds: [...new Set(records.flatMap((entry) => entry.sourceReferenceIds ?? []))],
      narratives: records.map((entry) => entry.narrative)
    }
  })

  const varianceFindings = relatedPayslips.flatMap((payslip) => {
    const contract = contracts.find((entry) => entry.employeeId === payslip.employeeId) ?? null
    const input = payrollInputs.find((entry) => entry.employeeId === payslip.employeeId) ?? null
    const validation = validationResults.find((entry) => entry.payrollRunId === payslip.payrollRunId) ?? null

    const findings = []

    if (contract && input && contract.expectedMonthlyBaseSalary) {
      const expectedGross =
        contract.expectedMonthlyBaseSalary.amount +
        Math.round((input.eveningHours ?? 0) * (contract.eveningPremiumRate?.amount ?? 0))
      const varianceAmount = payslip.grossPay.amount - expectedGross

      findings.push({
        id: `variance_gross_${payslip.employeeId}`,
        employeeId: payslip.employeeId,
        contractId: contract.id,
        relatedPayslipId: payslip.id,
        status: varianceAmount === 0 ? 'aligned' : 'review_required',
        severity: varianceAmount === 0 ? 'info' : 'warning',
        title: 'Brúttólaun gegn ráðningarkjörum og skráðum stundum',
        summary:
          varianceAmount === 0
            ? 'Brúttólaun á launaseðli stemma við grunnsamning og skráðar kvöldstundir í þessu demótilviki.'
            : 'Brúttólaun víkja frá væntri niðurstöðu úr grunnsamningi og skráðum kvöldstundum og þurfa yfirferð.',
        expectedAmount: { currency: 'ISK', amount: expectedGross },
        actualAmount: payslip.grossPay,
        varianceAmount: { currency: 'ISK', amount: varianceAmount },
        requiredPrivateCorpusCodes:
          varianceAmount === 0 ? [] : ['timesheets_and_work_patterns', 'employment_contracts_and_terms']
      })
    }

    if (input && (input.eveningHours ?? 0) > 0) {
      findings.push({
        id: `variance_evening_${payslip.employeeId}`,
        employeeId: payslip.employeeId,
        contractId: contract?.id ?? null,
        relatedPayslipId: payslip.id,
        status: 'review_required',
        severity: 'warning',
        title: 'Kvöldálag byggir enn á óvottuðum stundagögnum',
        summary:
          'Kvöldálag er reiknað úr skráðum stundum, en launa-nátengd tímaskrárgögn vantar enn til að loka yfirferðarstöðu.',
        expectedAmount: null,
        actualAmount: null,
        varianceAmount: null,
        requiredPrivateCorpusCodes: ['timesheets_and_work_patterns']
      })
    }

    const relatedValidationMismatch = validation?.mismatches?.find(
      (entry) => entry.employeeId === payslip.employeeId
    )

    if (relatedValidationMismatch) {
      findings.push({
        id: `variance_validation_${payslip.employeeId}`,
        employeeId: payslip.employeeId,
        contractId: contract?.id ?? null,
        relatedPayslipId: payslip.id,
        status: 'mismatch',
        severity: 'critical',
        title: 'Validation mismatch á launaseðli',
        summary: relatedValidationMismatch.message,
        expectedAmount: { currency: 'ISK', amount: relatedValidationMismatch.expectedAmount },
        actualAmount: { currency: 'ISK', amount: relatedValidationMismatch.actualAmount },
        varianceAmount: {
          currency: 'ISK',
          amount: relatedValidationMismatch.actualAmount - relatedValidationMismatch.expectedAmount
        },
        requiredPrivateCorpusCodes: []
      })
    }

    const relatedReviewCount = reviewTasks.filter((entry) => entry.relatedEntityId === payslip.employeeId).length

    if (relatedReviewCount > 0) {
      findings.push({
        id: `variance_review_${payslip.employeeId}`,
        employeeId: payslip.employeeId,
        contractId: contract?.id ?? null,
        relatedPayslipId: payslip.id,
        status: 'review_required',
        severity: 'warning',
        title: 'Opnir review verkliðir tengdir starfsmanni',
        summary: `${relatedReviewCount} opin yfirferðarverkefni eru enn tengd starfsmanninum og halda keyrslunni í compute_with_review stöðu.`,
        expectedAmount: null,
        actualAmount: null,
        varianceAmount: null,
        requiredPrivateCorpusCodes: []
      })
    }

    return findings
  })

  const scopeAssessments = agreementScopeAssessments.map((assessment) => {
    const contract = contracts.find((entry) => entry.id === assessment.contractId) ?? null

    if (
      assessment.proposedAgreementPackId !== featuredEntry.relatedAgreementPackIds?.[0] &&
      !featuredEntry.relatedAgreementPackIds?.includes(assessment.proposedAgreementPackId)
    ) {
      return null
    }

    const relatedAgreementPack =
      (workspace.collectiveAgreementPacks ?? []).find(
        (entry) => entry.id === assessment.proposedAgreementPackId
      ) ?? null

    return {
      ...assessment,
      employeeName:
        snapshot.employees?.find((entry) => entry.id === assessment.employeeId)?.fullName ??
        assessment.employeeId,
      jobTitle: contract?.jobTitle ?? 'Óþekkt starf',
      agreementPackTitle: relatedAgreementPack?.title ?? 'Óþekktur samningspakki'
    }
  }).filter(Boolean)

  const scopeAssessmentSummary = {
    totalCount: scopeAssessments.length,
    matchedCount: scopeAssessments.filter((entry) => entry.status === 'matched').length,
    reviewRequiredCount: scopeAssessments.filter((entry) => entry.status === 'review_required').length,
    blockedCount: scopeAssessments.filter((entry) => entry.status === 'blocked').length
  }

  const requiredPrivateCorpusCodes = [
    ...new Set([
      ...(featuredEntry.lineItemBoundaries ?? []).flatMap((entry) => entry.requiredPrivateCorpusCodes ?? []),
      ...varianceFindings.flatMap((entry) => entry.requiredPrivateCorpusCodes ?? []),
      ...scopeAssessments.flatMap((entry) => entry.requiredPrivateCorpusCodes ?? [])
    ])
  ]

  const privateCorpusReadiness = requiredPrivateCorpusCodes.map((code) => {
    const requirement =
      (workspace.requiredPrivateCorpus ?? []).find((entry) => entry.code === code) ?? null
    const relatedSubmissions = privateCorpusSubmissions.filter(
      (entry) =>
        entry.code === code &&
        (!entry.relatedAgreementPackId ||
          featuredEntry.relatedAgreementPackIds?.includes(entry.relatedAgreementPackId))
    )

    let status = 'missing'
    if (relatedSubmissions.some((entry) => entry.status === 'validated')) {
      status = 'validated'
    } else if (relatedSubmissions.some((entry) => entry.status === 'received')) {
      status = 'received'
    } else if (relatedSubmissions.some((entry) => entry.status === 'review_required')) {
      status = 'review_required'
    }

    return {
      code,
      title: requirement?.title ?? code,
      priority: requirement?.priority ?? 'high',
      minimumTarget: requirement?.minimumTarget ?? 'Óskilgreint',
      whyItMatters: requirement?.whyItMatters ?? 'Skýring vantar.',
      status,
      submissionCount: relatedSubmissions.length,
      validatedCount: relatedSubmissions.filter((entry) => entry.status === 'validated').length,
      receivedCount: relatedSubmissions.filter((entry) => entry.status === 'received').length,
      reviewRequiredCount: relatedSubmissions.filter((entry) => entry.status === 'review_required')
        .length,
      summaries: relatedSubmissions.map((entry) => entry.summary)
    }
  })

  const privateCorpusReadinessSummary = {
    totalCount: privateCorpusReadiness.length,
    validatedCount: privateCorpusReadiness.filter((entry) => entry.status === 'validated').length,
    receivedCount: privateCorpusReadiness.filter((entry) => entry.status === 'received').length,
    reviewRequiredCount: privateCorpusReadiness.filter((entry) => entry.status === 'review_required')
      .length,
    missingCount: privateCorpusReadiness.filter((entry) => entry.status === 'missing').length,
    realSubmissionCount: privateCorpusSubmissions.filter(
      (entry) =>
        entry.dataOrigin !== 'demo_seed' &&
        (!entry.relatedAgreementPackId || featuredEntry.relatedAgreementPackIds?.includes(entry.relatedAgreementPackId))
    ).length
  }

  const privateCorpusIntakePackage =
    privateCorpusIntakePackages.find(
      (entry) =>
        !entry.agreementPackId || featuredEntry.relatedAgreementPackIds?.includes(entry.agreementPackId)
    ) ?? null

  const privateCorpusIntakeBlueprint =
    privateCorpusIntakeBlueprints.find(
      (entry) =>
        !entry.agreementPackId || featuredEntry.relatedAgreementPackIds?.includes(entry.agreementPackId)
    ) ?? null

  const privateCorpusProvenance = {
    demoSubmissionCount: privateCorpusSubmissions.filter(
      (entry) =>
        entry.dataOrigin === 'demo_seed' &&
        (!entry.relatedAgreementPackId || featuredEntry.relatedAgreementPackIds?.includes(entry.relatedAgreementPackId))
    ).length,
    customerSubmissionCount: privateCorpusSubmissions.filter(
      (entry) =>
        entry.dataOrigin !== 'demo_seed' &&
        (!entry.relatedAgreementPackId || featuredEntry.relatedAgreementPackIds?.includes(entry.relatedAgreementPackId))
    ).length,
    anonymizedCount: privateCorpusSubmissions.filter(
      (entry) =>
        entry.anonymizationStatus === 'anonymized' || entry.anonymizationStatus === 'validated'
    ).length
  }

  return {
    ...clone(featuredEntry),
    statutoryParameterSets: (featuredEntry.statutoryParameterSetIds ?? [])
      .map((id) => statutoryParameterSets.find((entry) => entry.id === id))
      .filter(Boolean),
    pensionRoutingRules: (featuredEntry.pensionRoutingRuleIds ?? [])
      .map((id) => pensionRoutingRules.find((entry) => entry.id === id))
      .filter(Boolean),
    unionRoutingRules: (featuredEntry.unionRoutingRuleIds ?? [])
      .map((id) => unionRoutingRules.find((entry) => entry.id === id))
      .filter(Boolean),
    ruleSetVersions: (featuredEntry.sampleRuleSetVersionIds ?? [])
      .map((id) => ruleSetVersions.find((entry) => entry.id === id))
      .filter(Boolean),
    agreementScopeAssessments: scopeAssessments,
    agreementScopeSummary: scopeAssessmentSummary,
    privateCorpusReadiness,
    privateCorpusReadinessSummary,
    privateCorpusIntakePackage,
    privateCorpusIntakeBlueprint,
    privateCorpusProvenance,
    payslips: relatedPayslips,
    evidenceByLineItem,
    varianceFindings
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

    getPrivateCorpusIntakeBlueprints() {
      return clone(
        [...(snapshot.privateCorpusIntakeBlueprints ?? [])].sort((left, right) =>
          left.code.localeCompare(right.code)
        )
      )
    },

    getCoverageMatrix() {
      return clone(
        [...(researchWorkspace.coverageMatrixEntries ?? [])].sort((left, right) =>
          left.code.localeCompare(right.code)
        )
      )
    },

    getFeaturedCoveragePack() {
      return clone(buildFeaturedCoveragePack(researchWorkspace, snapshot))
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
        payslipCount: snapshot.payslips?.length ?? 0,
        payslipEvidenceRecordCount: snapshot.payslipEvidenceRecords?.length ?? 0,
        agreementScopeAssessmentCount: snapshot.agreementScopeAssessments?.length ?? 0,
        privateCorpusSubmissionCount: snapshot.privateCorpusSubmissions?.length ?? 0,
        privateCorpusIntakePackageCount: snapshot.privateCorpusIntakePackages?.length ?? 0,
        privateCorpusIntakeBlueprintCount: snapshot.privateCorpusIntakeBlueprints?.length ?? 0,
        researchWorkstreamCount: researchSummary.workstreamCount,
        legalObligationCount: researchSummary.legalObligationCount,
        coverageMatrixCount: researchSummary.coverageMatrixCount
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
          coverageMatrixEntries: [],
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
