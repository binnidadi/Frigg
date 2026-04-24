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
- Engin tollflokkun, leyfisskylda, reglufylgni eða peningaleg reiknirökfræði hefur verið útfærð enn.

## Lokið

- Lota 1: hreinn grunnur og source-of-truth skjöl.
- Lota 2: tæknigrunnur, pakkaskipan, Next.js app, Prisma boundary og grunnskipanir.
- UX- og gagnainventory lota: skýrari forsíða, UX-review og flokkun á ytra gagnasafni án innflutnings í Git.

## Í vinnslu

- Undirbúningur fyrir Lotu 3: Prisma schema, domain contracts og fyrsta örugga document metadata líkan.

## Næst

1. Hanna og útfæra Prisma schema fyrir fyrstu import/customs domain einingar.
2. Útfæra domain contracts sem spegla schema án þess að fela review state eða óvissu.
3. Skilgreina reglur um örugg fixtures áður en raunveruleg ytri gögn eru notuð.
4. Bæta við fyrstu schema/type tests fyrir constraints, enums og rekjanleika.
5. Uppfæra skjöl samhliða schema svo staða og næstu skref haldist skýr.
