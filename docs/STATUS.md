# Staða Tollvarðar Pro

Síðast uppfært: 2026-04-24

## Núverandi staða

- Repository hefur verið hreinsað og endurræst fyrir Tollvörð Pro.
- Source-of-truth skjöl eru komin fyrir arkitektúr, ákvarðanir, vegvísi, gagnalíkan, orðasafn og AI Foundry mörk.
- TypeScript/Next.js/Prisma tæknigrunnur er kominn í repo.
- Workspace inniheldur `apps/web`, `packages/domain`, `packages/engine`, `packages/ai` og `prisma/schema.prisma`.
- `.env.example` skilgreinir aðeins placeholder heiti fyrir gagnagrunn og AI provider lykla; raunveruleg leyndarmál skulu ekki fara í Git.
- Engin tollflokkun, leyfisskylda, reglufylgni eða peningaleg reiknirökfræði hefur verið útfærð enn.

## Lokið

- Lota 1: hreinn grunnur og source-of-truth skjöl.
- Lota 2: tæknigrunnur, pakkaskipan, Next.js app, Prisma boundary og grunnskipanir.

## Í vinnslu

- Undirbúningur fyrir Lotu 3: Prisma schema og domain contracts.

## Næst

1. Hanna og útfæra Prisma schema fyrir fyrstu import/customs domain einingar.
2. Útfæra domain contracts sem spegla schema án þess að fela review state eða óvissu.
3. Bæta við fyrstu schema/type tests fyrir constraints, enums og rekjanleika.
4. Uppfæra skjöl samhliða schema svo staða og næstu skref haldist skýr.
