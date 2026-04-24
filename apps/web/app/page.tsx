import { landedCostEngineBoundary } from '@frigg/engine'

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
        <span>Reiknivél í grunni</span>
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
    </main>
  )
}
