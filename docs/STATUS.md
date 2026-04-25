# Staða Frigg

Síðast uppfært: 2026-04-25

## Núverandi staða

- Repository hefur verið hreinsað og endurræst fyrir Frigg.
- Source-of-truth skjöl eru komin fyrir arkitektúr, ákvarðanir, vegvísi, gagnalíkan, orðasafn og AI Foundry mörk.
- TypeScript/Next.js/Prisma tæknigrunnur er kominn í repo.
- Workspace inniheldur `apps/web`, `packages/domain`, `packages/engine`, `packages/ai` og `prisma/schema.prisma`.
- `.env.example` skilgreinir aðeins placeholder heiti fyrir gagnagrunn og AI provider lykla; raunveruleg leyndarmál skulu ekki fara í Git.
- UX-greining og gagnainventory eru komin í source-of-truth skjöl.
- Ytra gagnasafnið `HREIN_GOGN` var kortlagt, en engin raunveruleg gögn þaðan voru afrituð í repo.
- Prisma schema og TypeScript domain contracts eru komin fyrir fyrstu import/customs einingar.
- Fyrsta schema-yfirferð er komin í `tools/check-schema.mjs` og keyrir með `pnpm test`.
- Heimildaskrá, source snapshots, review tasks og decision records eru komin í schema og domain contracts.
- Vélrænn metadata-grunnur fyrir heimildir er kominn í `knowledge/sources` og er staðfestur með `tools/check-sources.mjs`.
- Fixture stefna bannar raw `HREIN_GOGN` og önnur raunveruleg viðskiptavinagögn í Git.
- Fyrsta synthetic import fixture er komið í `fixtures/synthetic/import-review-scenario.json` og er staðfest með `tools/check-fixtures.mjs`.
- Fyrsti determiníski landed cost engine grunnur er kominn í `packages/engine` með synthetic golden prófi.
- Landed cost engine býr nú til audit draft og review task draft svo niðurstaða sé rekjanleg án sjálfvirkrar samþykktar.
- Landed cost engine hefur nú edge-case próf fyrir `half_up` rounding, óstuttan gjaldmiðil, gjaldmiðlamisræmi og ójákvætt gengi.
- AI workflow, agent leiðbeiningar, prompt banki og project context hafa verið innleidd og aðlöguð að Frigg án þess að yfirskrifa núverandi source-of-truth skjöl.
- Read-only internal prototype flæði sýnir nú synthetic innflutningsmál, document extraction metadata, tollflokkunartillögur, leyfisskylduviðvörun, landed cost útreikning og audit/review draft í einu samhengi.
- Engin tollflokkun, leyfisskylda, reglufylgni eða peningaleg reiknirökfræði hefur verið útfærð sem production logic enn.

## Lokið

- Lota 1: hreinn grunnur og source-of-truth skjöl.
- Lota 2: tæknigrunnur, pakkaskipan, Next.js app, Prisma boundary og grunnskipanir.
- UX- og gagnainventory lota: skýrari forsíða, UX-review og flokkun á ytra gagnasafni án innflutnings í Git.
- Lota 3 grunnur: Prisma schema, domain contracts og schema-yfirferð fyrir innflytjanda, birgja, sendingar, skjöl, flokkunartillögur, reglur, landed cost metadata, audit og samþættingar.
- Source registry og review foundation: heimildaskrá, source snapshots, review tasks, decision records og fixture policy.
- Synthetic fixture lota: öruggt import-review dæmi án raw viðskiptavinagagna.
- Vöruheiti samræmt: Frigg er canonical heiti í vöru, skjölum og notendaviðmóti.
- Knowledge registry lota: machine-readable source registry og snapshot-stubbar án raw ytri gagna.
- Lota 4 grunnur: determinísk landed cost reiknivél með synthetic golden scenario.
- Audit/review costing lota: audit draft og review task draft fyrir computed landed cost niðurstöður.
- Costing validation lota: rounding edge cases og strangari gjaldmiðla-/gengisvalidation.
- AI workflow lota: `AGENTS.md`, `PROMPT_BANK_MEMORY.md`, `docs/AI_WORKFLOW.md` og `docs/PROJECT_CONTEXT.md` sett inn sem samræmd vinnuregluskrá fyrir AI coding sessions.
- Read-only prototype lota: synthetic import-review gögn eru tengd við landed cost engine og birt í vefviðmóti með skýrum review/trust mörkum.

## Í vinnslu

- Undirbúningur fyrir næstu lotu: styrkja domain service boundary fyrir import workflow og skilgreina fyrsta persistence/API lag.

## Næst

1. Skilgreina Next server action eða service boundary fyrir read-only import case gögn.
2. Tengja audit/review draft við persistence/service lag þegar domain service lag verður útfært.
3. Bæta við UI smoke eða component-level prófun þegar prófunarumgjörð fyrir vef er valin.
4. Uppfæra skjöl samhliða hverri lotu svo staða og næstu skref haldist skýr.
