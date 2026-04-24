import { landedCostEngineBoundary } from '@tollvord/engine'

const principles = [
  'SaaS-kjarni fyrst, AI sem útskiptanlegt capability-lag.',
  'Engin óstudd staðfesta í tollflokkun, leyfisskyldu eða reglufylgni.',
  'Peningaleg rökfræði verður determinísk, prófanleg og útskýranleg.'
]

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Tollvörð Pro</p>
        <h1>Rekjanlegt stýrikerfi fyrir innflutning og tollafgreiðslu.</h1>
        <p className="lead">
          Fyrsti tæknigrunnur er kominn á hreint: Next.js, TypeScript, Prisma boundary og
          skýr pakkaskipan fyrir domain, engine og AI.
        </p>
      </section>

      <section className="panel" aria-labelledby="principles-heading">
        <h2 id="principles-heading">Grunnreglur</h2>
        <ul>
          {principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </section>

      <section className="panel muted" aria-labelledby="engine-heading">
        <h2 id="engine-heading">Engine boundary</h2>
        <p>
          `{landedCostEngineBoundary.module}` er merkt sem `{landedCostEngineBoundary.status}` og
          verður útfært í `{landedCostEngineBoundary.plannedFor}`.
        </p>
      </section>
    </main>
  )
}
