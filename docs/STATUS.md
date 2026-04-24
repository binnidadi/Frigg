# Staða Tollvarðar Pro

Síðast uppfært: 2026-04-24

## Núverandi staða

- Repository hefur verið hreinsað og endurræst fyrir Tollvörð Pro.
- Source-of-truth skjöl eru komin fyrir arkitektúr, ákvarðanir, vegvísi, gagnalíkan, orðasafn og AI Foundry mörk.
- TypeScript/Next.js/Prisma tæknigrunnur er kominn í repo.
- Workspace inniheldur `apps/web`, `packages/domain`, `packages/engine`, `packages/ai` og `prisma/schema.prisma`.
- `.env.example` skilgreinir aðeins placeholder heiti fyrir gagnagrunn og AI provider lykla; raunveruleg leyndarmál skulu ekki fara í Git.
- UX-greining og gagnainventory eru komin í source-of-truth skjöl.
- Ytra gagnasafnið `HREIN_GOGN` var kortlagt, en engin raunveruleg gögn þaðan voru afrituð í repo.
- Prisma schema og TypeScript domain contracts eru komin fyrir fyrstu import/customs einingar.
- Fyrsta schema-yfirferð er komin í `tools/check-schema.mjs` og keyrir með `pnpm test`.
- Engin tollflokkun, leyfisskylda, reglufylgni eða peningaleg reiknirökfræði hefur verið útfærð sem production logic enn.

## Lokið

- Lota 1: hreinn grunnur og source-of-truth skjöl.
- Lota 2: tæknigrunnur, pakkaskipan, Next.js app, Prisma boundary og grunnskipanir.
- UX- og gagnainventory lota: skýrari forsíða, UX-review og flokkun á ytra gagnasafni án innflutnings í Git.
- Lota 3 grunnur: Prisma schema, domain contracts og schema-yfirferð fyrir innflytjanda, birgja, sendingar, skjöl, flokkunartillögur, reglur, landed cost metadata, audit og samþættingar.

## Í vinnslu

- Undirbúningur fyrir næstu lotu: schema tests, fyrstu öruggu fixtures og síðar determinísk landed cost reiknivél.

## Næst

1. Skilgreina reglur um örugg fixtures áður en raunveruleg ytri gögn eru notuð.
2. Bæta við fyrstu seed eða fixture drögum án raw viðskiptavinagagna.
3. Hefja Lotu 4 með determinískri landed cost reiknivél þegar schema-grunnurinn hefur verið staðfestur.
4. Uppfæra skjöl samhliða hverri lotu svo staða og næstu skref haldist skýr.
