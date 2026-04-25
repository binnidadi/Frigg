import {
  calculateLandedCost,
  createLandedCostComputedAuditDraft,
  createLandedCostInputFromImportReviewScenario,
  createLandedCostReviewTaskDraft,
  landedCostEngineBoundary,
  type ImportReviewScenarioForCosting,
  type LandedCostScenarioAssumptions
} from '@frigg/engine'
import importReviewScenario from '../../../fixtures/synthetic/import-review-scenario.json'

const workflowSteps = [
  {
    title: 'Lesa fylgiskjöl',
    text: 'Safna reikningum, farmbréfum og öðrum fylgigögnum í rekjanlegt innflutningsmál.'
  },
  {
    title: 'Stinga upp á flokkun',
    text: 'Birta tollflokkunartillögur sem tillögur, með heimildum, confidence og yfirferðarstöðu.'
  },
  {
    title: 'Reikna kostnað',
    text: 'Reikna landað kostnaðarverð með determinískri reiknivél, skýrum inntökum og review-skyldri niðurstöðu.'
  },
  {
    title: 'Undirbúa bókun',
    text: 'Halda utan um samþættingar, audit trail og export án þess að fela óvissu eða milliskref.'
  }
]

const trustStates = [
  'AI niðurstaða byrjar sem tillaga.',
  'Óvissa er merkt með review state.',
  'Staðfest niðurstaða þarf heimild, reglu eða yfirferð.'
]

type DemoScenario = ImportReviewScenarioForCosting & {
  readonly fixtureVersion: string
  readonly notes: string[]
  readonly importer: {
    readonly id: string
    readonly name: string
    readonly registrationId: string
  }
  readonly supplier: {
    readonly name: string
    readonly countryCode: string
  }
  readonly shipment: ImportReviewScenarioForCosting['shipment'] & {
    readonly reference: string
    readonly status: string
    readonly originCountry: string
    readonly destinationCountry: string
    readonly expectedArrival: string
  }
  readonly shipmentItems: ImportReviewScenarioForCosting['shipmentItems']
  readonly documents: ReadonlyArray<{
    readonly id: string
    readonly type: string
    readonly fileName: string
    readonly reviewState: string
  }>
  readonly extractedFields: ReadonlyArray<{
    readonly fieldKey: string
    readonly normalizedValue: string
    readonly confidence: string
    readonly confidenceScore: number
    readonly reviewState: string
  }>
  readonly hsCodes: ReadonlyArray<{
    readonly id: string
    readonly code: string
    readonly description: string
  }>
  readonly classificationCandidates: ReadonlyArray<{
    readonly shipmentItemId: string
    readonly hsCodeId: string
    readonly rationale: string
    readonly confidence: string
    readonly confidenceScore: number
    readonly reviewState: string
  }>
  readonly permitRequirements: ReadonlyArray<{
    readonly shipmentItemId: string
    readonly title: string
    readonly rationale: string
    readonly authority: string
    readonly reviewState: string
  }>
  readonly reviewTasks: ReadonlyArray<{
    readonly title: string
    readonly taskType: string
    readonly priority: number
    readonly status: string
  }>
}

const scenario = importReviewScenario as DemoScenario

const landedCostAssumptions: LandedCostScenarioAssumptions = {
  calculationId: 'calc_synthetic_landed_cost_001',
  outputCurrency: 'ISK',
  exchangeRate: {
    id: 'fx_synthetic_eur_isk_2026_04_24',
    baseCurrency: 'EUR',
    quoteCurrency: 'ISK',
    rate: '150.25',
    rateDate: '2026-04-24',
    sourceReference: 'synthetic-exchange-rate'
  },
  roundingPolicy: {
    mode: 'half_up',
    scale: 0,
    description: 'Rúnnað í heilar ISK með half-up reglu í synthetic prófi.'
  },
  adjustments: [
    {
      code: 'freight',
      label: 'Flutningur',
      amountMinor: 30000,
      currency: 'EUR',
      sourceReference: 'synthetic-freight-input'
    },
    {
      code: 'insurance',
      label: 'Trygging',
      amountMinor: 5000,
      currency: 'EUR',
      sourceReference: 'synthetic-insurance-input'
    }
  ],
  taxRules: [
    {
      code: 'synthetic_customs_duty',
      label: 'Synthetic tollur til prófunar',
      rate: '0.035',
      base: 'customs_value',
      sourceReference: 'synthetic-duty-rule'
    },
    {
      code: 'synthetic_vat',
      label: 'Synthetic VSK til prófunar',
      rate: '0.24',
      base: 'customs_value_plus_prior_taxes',
      sourceReference: 'synthetic-vat-rule'
    }
  ],
  sourceReferences: [
    'skatturinn-tollskrarlyklar',
    'synthetic-exchange-rate',
    'synthetic-duty-rule',
    'synthetic-vat-rule'
  ]
}

const landedCostInput = createLandedCostInputFromImportReviewScenario(scenario, landedCostAssumptions)
const landedCostResult = calculateLandedCost(landedCostInput, '2026-04-24T00:00:00.000Z')
const auditDraft = createLandedCostComputedAuditDraft(landedCostResult, {
  importerId: scenario.importer.id,
  actorId: 'system_landed_cost_engine',
  createdAt: '2026-04-24T00:00:00.000Z'
})
const landedCostReviewTask = createLandedCostReviewTaskDraft(landedCostResult, {
  importerId: scenario.importer.id,
  sourceSnapshotId: 'snap_skatturinn_tollskrarlyklar_2026_04_24',
  priority: 40,
  createdAt: '2026-04-24T00:00:00.000Z'
})

const iskFormatter = new Intl.NumberFormat('is-IS', {
  style: 'currency',
  currency: 'ISK',
  maximumFractionDigits: 0
})

const percentFormatter = new Intl.NumberFormat('is-IS', {
  style: 'percent',
  maximumFractionDigits: 0
})

function formatIsk(amountMinor: number) {
  return iskFormatter.format(amountMinor)
}

function formatPercent(score: number) {
  return percentFormatter.format(score)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('is-IS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(value))
}

function findHsCode(hsCodeId: string) {
  return scenario.hsCodes.find((hsCode) => hsCode.id === hsCodeId)
}

function findShipmentItem(itemId: string) {
  return scenario.shipmentItems.find((item) => item.id === itemId)
}

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Frigg</p>
        <h1>Rekjanlegt vinnukerfi fyrir innflutning og tollafgreiðslu.</h1>
        <p className="lead">
          Frigg hjálpar innflytjendum og ráðgjöfum að lesa fylgiskjöl, rekja
          tollflokkunartillögur, undirbúa landað kostnaðarverð og flytja niðurstöður í bókhald
          án þess að fela óvissu.
        </p>
        <div className="cta-row" aria-label="Næstu aðgerðir">
          <a className="primary-link" href="#workflow-heading">
            Skoða vinnuflæði
          </a>
          <a className="secondary-link" href="#current-status">
            Skoða stöðu
          </a>
        </div>
      </section>

      <section className="status-strip" id="current-status" aria-label="Núverandi staða">
        <span>Tæknigrunnur og schema tilbúin</span>
        <span>Read-only demo tengt synthetic gögnum</span>
        <span>Engin production tollflokkun enn</span>
      </section>

      <section className="grid" aria-labelledby="workflow-heading">
        <div className="section-heading">
          <p className="eyebrow">Vinnuflæði</p>
          <h2 id="workflow-heading">Frá skjölum til rekjanlegrar niðurstöðu.</h2>
        </div>
        <div className="cards">
          {workflowSteps.map((step, index) => (
            <article className="card" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <article className="panel">
          <p className="eyebrow">Traust</p>
          <h2>Tillaga er ekki staðfesting.</h2>
          <ul>
            {trustStates.map((state) => (
              <li key={state}>{state}</li>
            ))}
          </ul>
        </article>

        <article className="panel muted">
          <p className="eyebrow">Staða reiknivélar</p>
          <h2>Landað kostnaðarverð er komið í tæknigrunn.</h2>
          <p>
            Reiknivél fyrir landað kostnaðarverð er merkt sem {landedCostEngineBoundary.status} og
            var sett upp í {landedCostEngineBoundary.plannedFor}. Hún byggir ekki á LLM-köllum og
            niðurstöður þurfa áfram review áður en þær teljast samþykktar.
          </p>
        </article>
      </section>

      <section className="demo" aria-labelledby="demo-heading">
        <div className="section-heading">
          <p className="eyebrow">Internal prototype</p>
          <h2 id="demo-heading">Synthetic innflutningsmál, reiknað og merkt til yfirferðar.</h2>
        </div>

        <div className="demo-grid">
          <article className="panel wide">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Mál</p>
                <h3>{scenario.shipment.reference}</h3>
              </div>
              <span className="badge">Read-only</span>
            </div>
            <dl className="facts">
              <div>
                <dt>Innflytjandi</dt>
                <dd>{scenario.importer.name}</dd>
              </div>
              <div>
                <dt>Birgir</dt>
                <dd>
                  {scenario.supplier.name}, {scenario.supplier.countryCode}
                </dd>
              </div>
              <div>
                <dt>Leið</dt>
                <dd>
                  {scenario.shipment.originCountry} til {scenario.shipment.destinationCountry}
                </dd>
              </div>
              <div>
                <dt>Áætluð koma</dt>
                <dd>{formatDate(scenario.shipment.expectedArrival)}</dd>
              </div>
            </dl>
            <p className="notice">
              Gögnin eru synthetic fixture útgáfa {scenario.fixtureVersion}. Þau mega ekki túlka sem
              staðfesta tollflokkun, leyfisskyldu eða gjaldaniðurstöðu.
            </p>
          </article>

          <article className="panel">
            <p className="eyebrow">Review biðröð</p>
            <h3>{scenario.reviewTasks.length + 1} opin atriði</h3>
            <ul className="task-list">
              {scenario.reviewTasks.map((task) => (
                <li key={task.title}>
                  <span>{task.title}</span>
                  <small>
                    {task.taskType} · forgangur {task.priority}
                  </small>
                </li>
              ))}
              <li>
                <span>{landedCostReviewTask.title}</span>
                <small>
                  {landedCostReviewTask.taskType} · forgangur {landedCostReviewTask.priority}
                </small>
              </li>
            </ul>
          </article>
        </div>

        <div className="demo-grid three">
          <article className="panel">
            <p className="eyebrow">Skjöl og útdráttur</p>
            <h3>{scenario.documents[0]?.fileName}</h3>
            <ul className="stack-list">
              {scenario.extractedFields.map((field) => (
                <li key={field.fieldKey}>
                  <span>{field.normalizedValue}</span>
                  <small>
                    {field.fieldKey} · {field.confidence} · {formatPercent(field.confidenceScore)} ·{' '}
                    {field.reviewState}
                  </small>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <p className="eyebrow">Tollflokkunartillögur</p>
            <h3>Tillögur, ekki staðfesting</h3>
            <ul className="stack-list">
              {scenario.classificationCandidates.map((candidate) => {
                const hsCode = findHsCode(candidate.hsCodeId)
                const item = findShipmentItem(candidate.shipmentItemId)

                return (
                  <li key={candidate.shipmentItemId}>
                    <span>
                      {hsCode?.code ?? 'Óþekktur HS-kóði'} · {item?.description ?? 'Óþekkt vörulína'}
                    </span>
                    <small>
                      {candidate.reviewState} · {formatPercent(candidate.confidenceScore)} · {candidate.rationale}
                    </small>
                  </li>
                )
              })}
            </ul>
          </article>

          <article className="panel warning">
            <p className="eyebrow">Regluvörður</p>
            <h3>Viðvörun þarfnast yfirferðar</h3>
            <ul className="stack-list">
              {scenario.permitRequirements.map((permit) => (
                <li key={permit.title}>
                  <span>{permit.title}</span>
                  <small>
                    {permit.authority} · {permit.reviewState} · {permit.rationale}
                  </small>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="demo-grid">
          <article className="panel wide">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Landað kostnaðarverð</p>
                <h3>{formatIsk(landedCostResult.totalMinor)}</h3>
              </div>
              <span className="badge review">Review required</span>
            </div>
            <div className="cost-table" role="table" aria-label="Landað kostnaðarverð">
              {[...landedCostResult.lines, ...landedCostResult.taxComponents].map((line) => (
                <div className="cost-row" role="row" key={line.code}>
                  <span role="cell">{line.label}</span>
                  <strong role="cell">{formatIsk(line.amountMinor)}</strong>
                  <small role="cell">{line.formula}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="panel muted">
            <p className="eyebrow">Audit draft</p>
            <h3>{auditDraft.metadata.eventKind}</h3>
            <p>
              Útreikningur býr til audit draft fyrir {auditDraft.entityType} með heild {formatIsk(auditDraft.metadata.totalMinor)}.
              Þetta er rekjanleg niðurstaða, en ekki samþykkt bókun eða staðfest tollaniðurstaða.
            </p>
            <ul className="source-list">
              {auditDraft.metadata.sourceReferences.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}
