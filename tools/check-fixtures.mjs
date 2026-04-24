import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const fixtureRoot = 'fixtures'
const forbiddenExtensions = new Set(['.xlsx', '.xlsm', '.pdf', '.png', '.jpg', '.jpeg'])
const requiredTopLevelKeys = [
  'fixtureKind',
  'fixtureVersion',
  'classification',
  'containsRawCustomerData',
  'sources',
  'importer',
  'supplier',
  'shipment',
  'shipmentItems',
  'documents',
  'extractedFields',
  'classificationCandidates',
  'permitRequirements',
  'reviewTasks',
  'decisionRecords'
]

function listFiles(path) {
  const stat = statSync(path)
  if (stat.isFile()) {
    return [path]
  }

  return readdirSync(path).flatMap((entry) => listFiles(join(path, entry)))
}

const files = listFiles(fixtureRoot)
const findings = []

for (const file of files) {
  const lower = file.toLowerCase()

  for (const extension of forbiddenExtensions) {
    if (lower.endsWith(extension)) {
      findings.push(`${file}: raw skjalasnið er ekki leyfilegt í fixtures.`)
    }
  }
}

const scenarioFile = 'fixtures/synthetic/import-review-scenario.json'
const scenario = JSON.parse(readFileSync(scenarioFile, 'utf8'))
const landedCostScenarioFile = 'fixtures/synthetic/landed-cost-golden-scenario.json'
const landedCostScenario = JSON.parse(readFileSync(landedCostScenarioFile, 'utf8'))

for (const key of requiredTopLevelKeys) {
  if (!(key in scenario)) {
    findings.push(`${scenarioFile}: vantar top-level lykilinn ${key}.`)
  }
}

if (scenario.containsRawCustomerData !== false) {
  findings.push(`${scenarioFile}: containsRawCustomerData verður að vera false.`)
}

if (scenario.classification !== 'synthetic_only') {
  findings.push(`${scenarioFile}: classification verður að vera synthetic_only.`)
}

const hasSuggestedClassification = scenario.classificationCandidates?.some(
  (candidate) => candidate.reviewState === 'suggested' || candidate.reviewState === 'needs_review'
)

if (!hasSuggestedClassification) {
  findings.push(`${scenarioFile}: vantar tollflokkunartillögu með suggested eða needs_review stöðu.`)
}

const hasPermitWarning = scenario.permitRequirements?.some(
  (permit) => permit.status === 'warning' && permit.reviewState === 'needs_review'
)

if (!hasPermitWarning) {
  findings.push(`${scenarioFile}: vantar leyfisskylduviðvörun með needs_review stöðu.`)
}

const hasResolvedDecision = scenario.decisionRecords?.some(
  (decision) => decision.decisionState === 'approved'
)

if (hasResolvedDecision) {
  findings.push(`${scenarioFile}: fixture má ekki innihalda samþykkta ákvörðun í þessari lotu.`)
}

if (landedCostScenario.containsRawCustomerData !== false) {
  findings.push(`${landedCostScenarioFile}: containsRawCustomerData verður að vera false.`)
}

if (landedCostScenario.classification !== 'synthetic_only') {
  findings.push(`${landedCostScenarioFile}: classification verður að vera synthetic_only.`)
}

if (landedCostScenario.expected?.currency !== 'ISK') {
  findings.push(`${landedCostScenarioFile}: expected.currency verður að vera ISK í þessari lotu.`)
}

if (!landedCostScenario.input?.roundingPolicy?.description?.includes('synthetic')) {
  findings.push(`${landedCostScenarioFile}: rounding policy þarf að merkja prófið sem synthetic.`)
}

const hasSyntheticTaxComponents = landedCostScenario.expected?.taxComponents?.every((component) =>
  component.code?.startsWith('synthetic_')
)

if (!hasSyntheticTaxComponents) {
  findings.push(`${landedCostScenarioFile}: gjaldaliðir í golden fixture þurfa að vera synthetic.`)
}

if (findings.length > 0) {
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log('Fixture-yfirferð stóðst: aðeins synthetic gögn og review-skyldar tillögur eru til staðar.')
