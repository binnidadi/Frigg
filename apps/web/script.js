const API_BASE_URL = 'http://localhost:4310'

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
    item.innerHTML = formatter(entry)
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

    return `<strong>${provider.name}</strong><span>${provider.model} · ${stateLabel}</span>`
  })

  setText(
    'home-ai-status-title',
    health.overallStatus === 'red'
      ? 'AI veitendur eru ekki tengdir í þessari vél'
      : 'AI trust lagið er komið í gegnum API'
  )

  setText(
    'home-ai-status-summary',
    `${health.providers.length} veitendur eru skráðir í failover-keðjuna og health snapshot er nú sýnilegt í viðmótinu.`
  )

  setText(
    'login-workspace-status',
    health.overallStatus === 'red'
      ? 'AI provider layer bíður eftir umhverfislyklum áður en lifandi köll eru virk.'
      : 'AI provider layer er tengt og tilbúið fyrir review preview flæði.'
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
      ? 'Handvirk review krafist'
      : 'Sjálfvirk review ekki krafist'
  }

  setList('parse-stage-list', parsePreview.parserStages, (stage) => {
    return `<strong>${stage.stage}</strong><span>${stage.summary}</span>`
  })

  setText('knowledge-answer', knowledgePreview.answer)
  setList('knowledge-source-list', knowledgePreview.sourceIds, (sourceId) => {
    return `<strong>${sourceId}</strong><span>Staðfest heimild tengd fyrirspurninni.</span>`
  })
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
    tr.innerHTML = row
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
    setText('dashboard-run-title', `Keyrsla ${currentRun.id.replace('payroll_run_', '').replaceAll('_', ' ')} í stöðu ${currentRun.status}.`)
    setText(
      'dashboard-status-title',
      `${validation?.mismatches?.length ?? 0} validation frávik og ${snapshot.reviewTasks?.length ?? 0} review verkefni tengd núverandi keyrslu.`
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
      `${activeRuleSet.approvalStatus} · ${activeRuleSet.reviewNotes?.[0] ?? 'Engar review athugasemdir.'}`
    )
  }

  setTableRows('change-table-body', [
    `<td>${snapshot.employees?.[0]?.fullName ?? 'Óþekktur starfsmaður'}</td><td>Review task opið</td><td>${
      snapshot.reviewTasks?.[0]?.reason ?? 'Engin ástæða skráð'
    }</td><td>Yfirferð krafist</td>`,
    `<td>${snapshot.employees?.[1]?.fullName ?? 'Óþekktur starfsmaður'}</td><td>Validation mismatch</td><td>${
      validation?.mismatches?.[0]?.message ?? 'Engin mismatch skráð'
    }</td><td>Blocker</td>`,
    `<td>${activeAgreement?.title ?? 'Virkt reglusett'}</td><td>Coverage stöðumat</td><td>${
      snapshot.coverageMatrixEntries?.[0]?.title ?? 'Engin coverage færsla'
    }</td><td>${snapshot.coverageMatrixEntries?.[0]?.coverageStatus ?? 'óþekkt'}</td>`
  ])

  setList('validation-list', validation?.mismatches ?? [], (mismatch) => {
    return `<strong>${mismatch.lineItemCode}</strong><span>${mismatch.employeeId} · ${mismatch.message}</span>`
  })

  setList('scenario-list', scenarios.slice(0, 4), (scenario) => {
    return `<strong>${scenario.id} · ${scenario.title}</strong><span>${scenario.expectedOutcome}</span>`
  })
}

async function main() {
  const page = document.body.dataset.page

  try {
    await loadHealthSnapshot()

    if (page === 'dashboard') {
      await Promise.all([loadDashboardAI(), loadDashboardSnapshot()])
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? `Ekki náðist samband við API: ${error.message}.`
        : 'Ekki náðist samband við API.'

    setText('ai-health-title', 'AI snapshot ekki tiltækt')
    setText('ai-health-status', 'OFFLINE')
    setText('ai-health-summary', message)
    setText('home-ai-status-title', 'API tenging vantar')
    setText('home-ai-status-summary', message)
    setText('login-workspace-status', message)
    setText('dashboard-run-title', 'Snapshot API ekki tiltækt')
    setText('dashboard-status-title', 'Ekki tókst að hlaða run model gögnum')
    setText('dashboard-status-summary', message)
  }
}

main()
