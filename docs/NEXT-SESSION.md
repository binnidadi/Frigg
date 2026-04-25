# Næsta session fyrir Frigg

Síðast uppfært: 2026-04-25

## Markmið

Næsta lota á að styrkja read-only import review prototype án þess að bæta við mutation, persistence eða production tollflokkun. Aðalmarkmiðið er að færa demo composition úr `apps/web/app/page.tsx` yfir í skýrt service/API boundary svo vefurinn verði viðhaldsvænni áður en interactive review flæði bætast við.

## Current state

- Read-only prototype er kominn í `apps/web/app/page.tsx`.
- Prototype notar synthetic import-review fixture og determiníska landed cost reiknivél.
- `packages/engine` inniheldur `createLandedCostInputFromImportReviewScenario`.
- UI sýnir skjöl, extracted fields, tollflokkunartillögur, leyfisskylduviðvörun, landed cost, review verkefni og audit draft.
- Niðurstöður eru skýrt merktar sem synthetic/read-only og ekki staðfest toll-, gjalda-, leyfis- eða reglufylgniniðurstaða.

## Stærsta tæknilega áhætta

`apps/web/app/page.tsx` ber of mikla ábyrgð:

- sækir fixture
- skilgreinir demo assumptions
- keyrir engine
- býr til audit/review draft
- sér um rendering

Þetta er ásættanlegt fyrir fyrstu prototype lotu, en má ekki verða framtíðar architecture.

## Næsta rétta skref

1. Búa til read-only service boundary fyrir synthetic import case.
2. Færa demo composition, landed cost assumptions, engine call og audit/review draft creation úr `page.tsx`.
3. Láta `page.tsx` fá tilbúið view model.
4. Halda allri business/reiknirökfræði áfram í `packages/engine`.
5. Halda fixture gögnum synthetic og án raw viðskiptavinagagna.
6. Uppfæra skjöl ef boundary eða workflow breytist.
7. Bæta við eða skilgreina UI smoke/component próf sem næsta quality gate skilyrði.

## Mælt skráaskipulag

Byrja með minnsta rétta skrefi:

```text
apps/web/app/page.tsx
apps/web/app/demo-import-case.ts
```

`demo-import-case.ts` ætti að:

- import-a synthetic fixture
- skilgreina landed cost assumptions
- keyra `createLandedCostInputFromImportReviewScenario`
- keyra `calculateLandedCost`
- búa til audit draft og review task draft
- skila typed view model fyrir UI

Ekki stofna `apps/api` í þessari lotu nema skýr þörf komi fram. Núverandi architecture segir að Next server layer sé sjálfgefið API lag í fyrstu.

## Prófanir

Keyra að lágmarki:

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm prisma:validate
corepack pnpm build
```

Ef UI smoke prófun er innleidd:

```bash
corepack pnpm dev
```

og staðfesta viðmót með Playwright/browser tools ef tiltækt.

## Ekki gera í næstu lotu

- Ekki bæta við production tollflokkun.
- Ekki bæta við production leyfisskylduákvörðun.
- Ekki bæta við LLM-kalli í landed cost eða tollarökfræði.
- Ekki vista raw gögn úr `HREIN_GOGN` í repo.
- Ekki byggja fulla persistence/mutation virkni fyrr en read-only service boundary er skýr.

## Startup prompt fyrir næsta session

```text
Þú ert að vinna í Frigg.

Primary hlutverk: principal product engineer / implementation architect.
Secondary hlutverk: quality gate owner og UX/SaaS reviewer.

Lestu fyrst:
- AGENTS.md
- README.md
- docs/PROJECT_CONTEXT.md
- docs/AI_WORKFLOW.md
- docs/STATUS.md
- docs/ROADMAP.md
- docs/NEXT-SESSION.md
- docs/ARCHITECTURE.md
- docs/LANDED-COST-ENGINE.md

Current state:
Read-only prototype sýnir synthetic import-review mál, document extraction metadata, tollflokkunartillögur, leyfisskylduviðvörun, landed cost útreikning og audit/review draft. Quality gate síðustu lotu var APPROVED WITH CONDITIONS vegna þess að vantar raunverulegt UI smoke/component próf og page.tsx ber of mikla demo composition ábyrgð.

Verkefni:
Færðu read-only demo composition úr apps/web/app/page.tsx í skýrt service/view-model boundary, til dæmis apps/web/app/demo-import-case.ts. Haltu business logic í packages/engine, ekki í UI. Uppfærðu skjöl ef boundary breytist. Keyrðu viðeigandi quality gate og push-aðu ef allt stenst.

Ófrávíkjanlegt:
Ekki setja tollflokkun, leyfisskyldu eða reglufylgni fram sem staðreynd. Ekki fela peningalega eða tolltengda rökfræði í LLM-köllum. Ekki setja secrets eða raw gögn í repo.
```
