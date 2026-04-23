const API_BASE_URL =
  document.querySelector('meta[name="frigg-api-base-url"]')?.getAttribute('content') ??
  window.FRIGG_API_BASE_URL ??
  'http://localhost:4310'

function setText(id, value) {
  const element = document.getElementById(id)
  if (element) {
    element.textContent = value
  }
}

function setList(id, items, formatter) {
  const element = document.getElementById(id)
  if (!element) {
    return
  }

  element.innerHTML = ''

  if (!items || items.length === 0) {
    const item = document.createElement('li')
    item.textContent = 'Engin gögn tiltæk.'
    element.appendChild(item)
    return
  }

  for (const entry of items) {
    const item = document.createElement('li')
    const formatted = formatter(entry)

    if (typeof formatted === 'string') {
      item.textContent = formatted
      element.appendChild(item)
      continue
    }

    if (formatted.strong) {
      const strong = document.createElement('strong')
      strong.textContent = formatted.strong
      item.appendChild(strong)
    }

    if (formatted.span) {
      const span = document.createElement('span')
      span.textContent = formatted.span
      item.appendChild(span)
    }

    element.appendChild(item)
  }
}

function badgeClass(level) {
  if (level === 'high' || level === 'green') {
    return 'status-badge'
  }

  if (level === 'medium' || level === 'yellow' || level === 'warning') {
    return 'status-badge status-badge-warning'
  }

  return 'status-badge status-badge-danger'
}

function formatDataOrigin(value) {
  if (value === 'demo_seed') {
    return 'Demóinntak'
  }

  if (value === 'anonymous_customer_upload') {
    return 'Nafnlaus viðskiptavinainnslátt'
  }

  if (value === 'manual_customer_entry') {
    return 'Handvirk viðskiptavinaskráning'
  }

  return value ?? 'Óþekktur uppruni'
}

function formatRuntimeReadiness(value) {
  if (value === 'demo_only') {
    return 'Aðeins demógrunnur'
  }

  if (value === 'not_ready') {
    return 'Ekki tilbúið fyrir runtime'
  }

  if (value === 'ready_for_review_runtime') {
    return 'Tilbúið fyrir review-runtime'
  }

  return value ?? 'Óþekkt runtime-staða'
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return response.json()
}

async function loadHealthSnapshot() {
  const health = await fetchJson('/ai/health')
  const title =
    health.overallStatus === 'green'
      ? 'Allir veitendur tilbúnir'
      : health.overallStatus === 'yellow'
        ? 'Hluti veitenda tilbúinn'
        : 'Enginn veitandi tengdur'

  setText('ai-health-title', title)
  setText('ai-health-status', String(health.overallStatus).toUpperCase())
  setText(
    'ai-health-summary',
    `${health.providers.filter((provider) => provider.status === 'healthy').length} af ${
      health.providers.length
    } veitendum eru virkir í þessari uppsetningu.`
  )

  setList('ai-health-list', health.providers, (provider) => {
    const stateLabel =
      provider.status === 'healthy'
        ? 'virkur'
        : provider.status === 'missing_key'
          ? 'vantar lykil'
          : provider.status

    return {
      strong: provider.name,
      span: `${provider.model} · ${stateLabel}`
    }
  })

  setText(
    'home-ai-status-title',
    health.overallStatus === 'red'
      ? 'AI-veitur eru ekki tengdar í þessari vél'
      : 'Staða AI-veitna er sýnileg í viðmótinu'
  )

  setText(
    'home-ai-status-summary',
    `${health.providers.length} veitendur eru skráðir í failover-keðjuna og stöðumynd þeirra er nú sýnileg í viðmótinu.`
  )

  setText(
    'login-workspace-status',
    health.overallStatus === 'red'
      ? 'AI-veitulagið bíður eftir umhverfislyklum áður en lifandi köll verða virk.'
      : 'AI-veitulagið er tengt og tilbúið fyrir forsýningar og yfirferð.'
  )
}

async function loadDashboardAI() {
  const parsePreview = await fetchJson('/ai/parse-preview')
  const knowledgePreview = await fetchJson('/ai/knowledge-preview?q=staðgreiðsla A1')

  setText('parse-preview-summary', parsePreview.summary)

  const confidenceBadge = document.getElementById('parse-confidence-badge')
  if (confidenceBadge) {
    confidenceBadge.className = badgeClass(parsePreview.confidence.level)
    confidenceBadge.textContent = `${parsePreview.confidence.badge} · ${Math.round(
      parsePreview.confidence.score * 100
    )}%`
  }

  const reviewBadge = document.getElementById('parse-review-badge')
  if (reviewBadge) {
    reviewBadge.className = parsePreview.reviewRequired
      ? 'status-badge status-badge-warning'
      : 'status-badge'
    reviewBadge.textContent = parsePreview.reviewRequired
      ? 'Handvirk yfirferð krafist'
      : 'Sjálfvirk yfirferð ekki krafist'
  }

  setList('parse-stage-list', parsePreview.parserStages, (stage) => ({
    strong: stage.stage,
    span: stage.summary
  }))

  setText('knowledge-answer', knowledgePreview.answer)
  setList('knowledge-source-list', knowledgePreview.sourceIds, (sourceId) => ({
    strong: String(sourceId),
    span: 'Staðfest heimild tengd fyrirspurninni.'
  }))
}

async function loadResearchWorkspace() {
  const [researchSummary, coverageMatrix, featuredCoverage, criticalPrivateCorpus] = await Promise.all([
    fetchJson('/research/summary'),
    fetchJson('/research/coverage-matrix'),
    fetchJson('/research/featured-coverage'),
    fetchJson('/research/private-corpus')
  ])

  setText('research-title', 'Rannsóknarvinnusvæði')
  setText(
    'research-count',
    `${researchSummary.workstreamCount} straumar · ${researchSummary.legalObligationCount} skyldur`
  )
  setText(
    'research-summary',
    `${researchSummary.mappedWorkstreamCount} rannsóknarstraumar, ${researchSummary.sourceAcquisitionCount} skráðar heimildir, ${researchSummary.legalObligationCount} lagaskyldur og ${
      researchSummary.pensionFundProfileCount + researchSummary.unionProfileCount
    } sjóða- og félagaprófílar eru nú kortlögð. ${researchSummary.computeWithReviewCount} svið eru komin á stig þar sem reikna má með yfirferð. ${researchSummary.criticalPrivateCorpusCount} forgangsgagnasöfn vantar enn.`
  )

  setList('private-corpus-list', criticalPrivateCorpus, (entry) => ({
    strong: entry.title,
    span: `${entry.minimumTarget} · ${entry.whyItMatters}`
  }))

  setList('coverage-matrix-list', coverageMatrix.slice(0, 5), (entry) => ({
    strong: `${entry.title} · ${entry.operationalStatus}`,
    span: `Styður ${entry.supportedScenarios.join(', ') || 'engin sviðsmynd'} · Blokkar ${
      entry.blockedScenarios.join(', ') || 'ekkert skráð'
    }`
  }))

  if (featuredCoverage) {
    setText('featured-coverage-title', featuredCoverage.title)
    setText(
      'featured-coverage-summary',
      `${featuredCoverage.operationalStatus} · ${featuredCoverage.coverageStatus} · afgangsáhætta ${featuredCoverage.residualRisk}. Þetta er fyrsti pakkinn sem tengir saman samning, lagaleg viðmið og routing í einni lesanlegri vöruafmörkun.`
    )
    setText(
      'featured-scope-summary',
      `${featuredCoverage.agreementScopeSummary?.matchedCount ?? 0} starfsmenn falla nú sjálfkrafa innan pakkans, ${
        featuredCoverage.agreementScopeSummary?.reviewRequiredCount ?? 0
      } eru enn í yfirferð og ${
        featuredCoverage.agreementScopeSummary?.blockedCount ?? 0
      } eru blokkaðir þar til samningssvið er skýrt.`
    )
    setText(
      'featured-private-corpus-summary',
      `${featuredCoverage.privateCorpusReadinessSummary?.validatedCount ?? 0} gagnasöfn eru sannreynd, ${
        featuredCoverage.privateCorpusReadinessSummary?.receivedCount ?? 0
      } hafa borist en bíða staðfestingar, ${
        featuredCoverage.privateCorpusReadinessSummary?.reviewRequiredCount ?? 0
      } eru í yfirferð og ${
        featuredCoverage.privateCorpusReadinessSummary?.missingCount ?? 0
      } vantar enn fyrir pakkann. ${
        featuredCoverage.privateCorpusReadinessSummary?.realSubmissionCount ?? 0
      } raunverulegar innsendingar hafa borist hingað til.`
    )
    setText(
      'featured-intake-package-title',
      featuredCoverage.privateCorpusIntakePackage?.title ?? 'Intake pakki ekki tiltækur'
    )

    setList(
      'featured-coverage-details',
      [
        ...(featuredCoverage.ruleSetVersions ?? []).map((entry) => ({
          label: 'Reglusett',
          value: `${entry.code} ${entry.version}`
        })),
        ...(featuredCoverage.statutoryParameterSets ?? []).map((entry) => ({
          label: 'Lagaleg viðmið',
          value: `${entry.code} ${entry.version}`
        })),
        ...(featuredCoverage.pensionRoutingRules ?? []).map((entry) => ({
          label: 'Lífeyrissjóðsrouting',
          value: `${entry.code} · ${entry.minimumEmployeeContributionRate * 100}% starfsmannsframlag`
        })),
        ...(featuredCoverage.unionRoutingRules ?? []).map((entry) => ({
          label: 'Stéttarfélagsrouting',
          value: `${entry.code} · ${(entry.employeeFeeRate ?? 0) * 100}% félagsgjald`
        }))
      ],
      (entry) => ({
        strong: entry.label,
        span: entry.value
      })
    )

    setList(
      'featured-scope-list',
      featuredCoverage.agreementScopeAssessments ?? [],
      (entry) => ({
        strong: `${entry.employeeName} · ${entry.jobTitle} · ${entry.status}`,
        span: `${entry.rationale} Samningspakki: ${entry.agreementPackTitle}${
          entry.requiredPrivateCorpusCodes?.length
            ? ` Vantar: ${entry.requiredPrivateCorpusCodes.join(', ')}.`
            : ''
        }${
          entry.unresolvedQuestions?.[0]
            ? ` Óleyst: ${entry.unresolvedQuestions[0]}`
            : ''
        }`
      })
    )

    setList(
      'featured-intake-package-list',
      featuredCoverage.privateCorpusIntakePackage
        ? [
            {
              strong: `Staða · ${featuredCoverage.privateCorpusIntakePackage.status}`,
              span: `${featuredCoverage.privateCorpusIntakePackage.targetScopeSummary} Næsta skref: ${featuredCoverage.privateCorpusIntakePackage.nextStep}`
            },
            {
              strong: `Uppruni · ${formatDataOrigin(featuredCoverage.privateCorpusIntakePackage.dataOrigin)}`,
              span: `${formatRuntimeReadiness(featuredCoverage.privateCorpusIntakePackage.runtimeReadiness)}. ${featuredCoverage.privateCorpusIntakePackage.runtimeReadinessReason}`
            },
            ...featuredCoverage.privateCorpusIntakePackage.blockers.map((blocker) => ({
              strong: 'Blokkun',
              span: blocker
            }))
          ]
        : [],
      (entry) => entry
    )

    setList(
      'featured-private-corpus-list',
      featuredCoverage.privateCorpusReadiness ?? [],
      (entry) => ({
        strong: `${entry.title} · ${entry.status}`,
        span: `${entry.whyItMatters} ${
          entry.summaries?.[0] ?? 'Engin innsending eða sannprófun skráð enn.'
        } Vænt lágmark: ${entry.minimumTarget}.`
      })
    )

    setList(
      'featured-line-item-boundaries',
      featuredCoverage.lineItemBoundaries ?? [],
      (entry) => ({
        strong: `${entry.label} · ${entry.status}`,
        span: `${entry.rationale}${
          entry.requiredPrivateCorpusCodes.length > 0
            ? ` Vantar: ${entry.requiredPrivateCorpusCodes.join(', ')}.`
            : ''
        }`
      })
    )

    setList(
      'featured-evidence-list',
      featuredCoverage.evidenceByLineItem ?? [],
      (entry) => ({
        strong: `${entry.label} · ${entry.evidenceCount} sönnunarfærslur`,
        span: `${entry.status}. ${
          entry.narratives?.[0] ?? 'Engin skýring komin.'
        }${
          entry.sourceReferenceIds?.length
            ? ` Heimildir: ${entry.sourceReferenceIds.join(', ')}.`
            : ''
        }`
      })
    )

    setList(
      'featured-variance-list',
      featuredCoverage.varianceFindings ?? [],
      (entry) => ({
        strong: `${entry.title} · ${entry.status}`,
        span: `${entry.summary}${
          entry.expectedAmount && entry.actualAmount
            ? ` Vænt: ${entry.expectedAmount.amount} ISK · Raun: ${entry.actualAmount.amount} ISK.`
            : ''
        }${
          entry.requiredPrivateCorpusCodes?.length
            ? ` Vantar: ${entry.requiredPrivateCorpusCodes.join(', ')}.`
            : ''
        }`
      })
    )
  }
}

function formatDaysUntil(dateString) {
  const now = new Date()
  const target = new Date(dateString)
  const diffMs = target.getTime() - now.getTime()
  const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
  return `${days} dagar`
}

function setTableRows(id, rows) {
  const element = document.getElementById(id)
  if (!element) {
    return
  }

  element.innerHTML = ''

  for (const row of rows) {
    const tr = document.createElement('tr')

    for (const cell of row) {
      const td = document.createElement('td')
      td.textContent = cell
      tr.appendChild(td)
    }

    element.appendChild(tr)
  }
}

async function loadDashboardSnapshot() {
  const [snapshot, scenarios] = await Promise.all([fetchJson('/snapshot'), fetchJson('/scenarios')])

  const currentRun = snapshot.payrollRuns?.[0]
  const validation = snapshot.validationResults?.find(
    (entry) => entry.payrollRunId === currentRun?.id
  )
  const activeRuleSet = snapshot.ruleSetVersions?.[0]
  const activeAgreement = snapshot.agreementVersions?.find(
    (entry) => entry.id === activeRuleSet?.agreementVersionId
  )
  const nextDeadline = [...(snapshot.complianceDeadlines ?? [])].sort((left, right) =>
    left.dueDate.localeCompare(right.dueDate)
  )[0]

  if (currentRun) {
    setText(
      'dashboard-run-title',
      `Launakeyrsla ${currentRun.id.replace('payroll_run_', '').replaceAll('_', ' ')} er í stöðu ${currentRun.status}.`
    )
    setText(
      'dashboard-status-title',
      `${validation?.mismatches?.length ?? 0} sannprófunarfrávik og ${snapshot.reviewTasks?.length ?? 0} yfirferðarverkefni tengd núverandi keyrslu.`
    )
    setText(
      'dashboard-status-summary',
      `Launakeyrslan byggir á ${currentRun.ruleSetVersionIds?.length ?? 0} reglusettum og lagalegri útgáfu ${currentRun.statutoryParameterSetId}.`
    )
  }

  setText('stat-employees', String(snapshot.employees?.length ?? 0))
  setText('stat-review-tasks', String(snapshot.reviewTasks?.length ?? 0))
  setText('stat-validation', String(validation?.mismatches?.length ?? 0))

  if (nextDeadline) {
    setText('deadline-title', nextDeadline.title)
    setText('deadline-days', formatDaysUntil(nextDeadline.dueDate))
    setText('deadline-description', nextDeadline.description)
  }

  if (activeRuleSet) {
    setText('ruleset-title', activeAgreement?.title ?? activeRuleSet.code)
    setText('ruleset-status', String(activeRuleSet.coverageStatus ?? 'óþekkt').toUpperCase())
    setText(
      'ruleset-summary',
      `${activeRuleSet.approvalStatus} · ${activeRuleSet.reviewNotes?.[0] ?? 'Engar athugasemdir úr yfirferð.'}`
    )
  }

  setTableRows('change-table-body', [
    [
      snapshot.employees?.[0]?.fullName ?? 'Óþekktur starfsmaður',
      'Yfirferðarverkefni opið',
      snapshot.reviewTasks?.[0]?.reason ?? 'Engin ástæða skráð',
      'Yfirferð krafist'
    ],
    [
      snapshot.employees?.[1]?.fullName ?? 'Óþekktur starfsmaður',
      'Sannprófunarfrávik',
      validation?.mismatches?.[0]?.message ?? 'Engin frávik skráð',
      'Stöðvar samþykki'
    ],
    [
      activeAgreement?.title ?? 'Virkt reglusett',
      'Þekjustaða',
      snapshot.coverageMatrixEntries?.[0]?.title ?? 'Engin þekjufærsla',
      snapshot.coverageMatrixEntries?.[0]?.coverageStatus ?? 'óþekkt'
    ]
  ])

  setList('validation-list', validation?.mismatches ?? [], (mismatch) => ({
    strong: mismatch.lineItemCode,
    span: `${mismatch.employeeId} · ${mismatch.message}`
  }))

  setList('scenario-list', scenarios.slice(0, 4), (scenario) => ({
    strong: `${scenario.id} · ${scenario.title}`,
    span: scenario.expectedOutcome
  }))
}

async function main() {
  const page = document.body.dataset.page

  try {
    await loadHealthSnapshot()

    if (page === 'dashboard') {
      await Promise.all([loadDashboardAI(), loadDashboardSnapshot(), loadResearchWorkspace()])
    }
  } catch (error) {
    const message =
      error instanceof Error
      ? `Ekki náðist samband við API: ${error.message}.`
      : 'Ekki náðist samband við API.'

    setText('ai-health-title', 'Stöðumynd AI veitenda ekki tiltæk')
    setText('ai-health-status', 'ÓTILTÆKT')
    setText('ai-health-summary', message)
    setText('home-ai-status-title', 'API tenging vantar')
    setText('home-ai-status-summary', message)
    setText('login-workspace-status', message)
    setText('dashboard-run-title', 'Stöðumynd úr API ekki tiltæk')
    setText('dashboard-status-title', 'Ekki tókst að hlaða gögnum um launakeyrsluna')
    setText('dashboard-status-summary', message)
    setText('research-title', 'Rannsóknargögn ekki tiltæk')
    setText('research-count', 'ÓTILTÆKT')
    setText('research-summary', message)
    setList('coverage-matrix-list', [], () => '')
    setText('featured-coverage-title', 'Traustmörk ekki tiltæk')
    setText('featured-coverage-summary', message)
    setText('featured-scope-title', 'Samningssvið ekki tiltækt')
    setText('featured-scope-summary', message)
    setText('featured-private-corpus-title', 'Payroll-native gögn ekki tiltæk')
    setText('featured-intake-package-title', 'Intake pakki ekki tiltækur')
    setText('featured-private-corpus-summary', message)
    setList('featured-coverage-details', [], () => '')
    setList('featured-scope-list', [], () => '')
    setList('featured-intake-package-list', [], () => '')
    setList('featured-private-corpus-list', [], () => '')
    setList('featured-line-item-boundaries', [], () => '')
    setList('featured-evidence-list', [], () => '')
    setList('featured-variance-list', [], () => '')
  }
}

main()
