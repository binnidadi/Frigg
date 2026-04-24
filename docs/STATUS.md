# Staða Frigg

Síðast uppfært: 2026-04-24

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

## Í vinnslu

- Undirbúningur fyrir næstu lotu: tengja landed cost engine við domain workflow, audit og UI demo.

## Næst

1. Tengja landed cost engine við review workflow og audit event taxonomy.
2. Bæta við fleiri rounding edge cases og validation fyrir óstuddar gjaldmiðlasamsetningar.
3. Hanna read-only UI demo fyrir synthetic import-review mál og landed cost útreikning.
4. Uppfæra skjöl samhliða hverri lotu svo staða og næstu skref haldist skýr.
