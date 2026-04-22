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
      ? 'AI veitendur eru ekki tengdir í þessari vél'
      : 'AI trust lagið er komið í gegnum API'
  )

  setText(
    'home-ai-status-summary',
    `${health.providers.length} veitendur eru skráðir í failover-keðjuna og stöðumynd þeirra er nú sýnileg í viðmótinu.`
  )

  setText(
    'login-workspace-status',
    health.overallStatus === 'red'
      ? 'AI veitendalagið bíður eftir umhverfislyklum áður en lifandi köll verða virk.'
      : 'AI veitendalagið er tengt og tilbúið fyrir forsýningar og yfirferð.'
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
    } sjóða- og félagaprófílar eru nú kortlögð. ${researchSummary.computeWithReviewCount} svið eru komin í compute_with_review. ${researchSummary.criticalPrivateCorpusCount} forgangsgagnasöfn vantar enn.`
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
      `${featuredCoverage.operationalStatus} · ${featuredCoverage.coverageStatus} · residual risk ${featuredCoverage.residualRisk}. Þetta er fyrsti pakkinn sem tengir saman samning, statutory lag og routing í einni lesanlegri vöruafmörkun.`
    )

    setList(
      'featured-coverage-details',
      [
        ...(featuredCoverage.ruleSetVersions ?? []).map((entry) => ({
          label: 'Reglusett',
          value: `${entry.code} ${entry.version}`
        })),
        ...(featuredCoverage.statutoryParameterSets ?? []).map((entry) => ({
          label: 'Statutory lag',
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
      `Keyrsla ${currentRun.id.replace('payroll_run_', '').replaceAll('_', ' ')} í stöðu ${currentRun.status}.`
    )
    setText(
      'dashboard-status-title',
      `${validation?.mismatches?.length ?? 0} sannprófunarfrávik og ${snapshot.reviewTasks?.length ?? 0} yfirferðarverkefni tengd núverandi keyrslu.`
    )
    setText(
      'dashboard-status-summary',
      `Launakeyrsla er pinnuð við ${currentRun.ruleSetVersionIds?.length ?? 0} reglusett og statutory útgáfu ${currentRun.statutoryParameterSetId}.`
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
    setText('dashboard-status-title', 'Ekki tókst að hlaða gögnum um keyrslulíkan')
    setText('dashboard-status-summary', message)
    setText('research-title', 'Rannsóknargögn ekki tiltæk')
    setText('research-count', 'ÓTILTÆKT')
    setText('research-summary', message)
    setList('coverage-matrix-list', [], () => '')
    setText('featured-coverage-title', 'Traustmörk ekki tiltæk')
    setText('featured-coverage-summary', message)
    setList('featured-coverage-details', [], () => '')
  }
}

main()
