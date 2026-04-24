# Arkitektúr Frigg

## Markmið

Frigg skal vera domain-first, SaaS-first kerfi fyrir innflutning og tollafgreiðslu. Fyrsta hönnun miðar að modular monolith með skýrum mörkum milli innlesturs, tollflokkunar, regluviðvarana, landaðs kostnaðarverðs, audit og samþættinga.

## Verkefnastrúktúr

- `apps/web`: Next.js framendi fyrir innflutningsmál, review workflow, skýringar og stjórnborð.
- `packages/domain`: canonical TypeScript contracts, enums og síðar runtime validation.
- `packages/engine`: boundary fyrir determiníska landed cost reiknivél og sannreynanleg skýringarlög.
- `packages/ai`: provider abstraction fyrir LLM, embeddings og AI Foundry tengingar.
- `prisma/schema.prisma`: canonical gagnalíkan fyrir Postgres/Supabase, innflutningsmál, heimildir, review, audit, landed cost og samþættingar.
- `docs`: source-of-truth skjöl, ADR og stöðumat.

Sérstakt `apps/api` verður aðeins stofnað ef Next server layer dugar ekki fyrir domain API, integration jobs eða bakgrunnsvinnslu. Sjálfgefin stefna er að byrja með einfaldasta modular monolith grunni og bæta við aðskildu API appi þegar þörfin er skýr.

## Domain mörk

Kerfið skiptist í eftirfarandi ábyrgðarsvið:

- Snjall-innlestur: móttaka skjala, metadata, OCR/útdráttur, source mapping, confidence og review state.
- Tollskrárvél: HS-kóðar, leit, flokkunartillögur, rökstuðningur, heimildir og mannleg staðfesting.
- Regluvörður: versioned reglur, leyfisskylduviðvaranir og rekjanleg tenging við heimildir.
- Landað kostnaðarverð: determinísk reiknivél fyrir verð, flutning, tryggingar, gengi, tolla, gjöld og VSK.
- Audit og review: append-only audit log fyrir lykilákvarðanir, AI tillögur, staðfestingar og export.
- Samþættingar: adapter-lög fyrir bókhald, banka, birgðakerfi og sendingaraðila með idempotency og retry stefnu.

## AI og Foundry

AI Foundry má styðja við skjalalestur, retrieval, tillögur, samantektir og agent workflow. Foundry má ekki stjórna domain-líkaninu, reikna fjárhagslegar niðurstöður eða staðfesta tollflokkun án review state.

Allar AI niðurstöður skulu vera merktar sem tillögur með confidence, provider metadata, source mapping og audit trail. Provider-lagið skal vera útskiptanlegt svo hægt sé að bæta við eða skipta út AI þjónustu síðar.

## Rekjanleiki

Allar lykilniðurstöður þurfa að vera endurbyggjanlegar út frá vistuðum inntökum, útgáfum, reglum og audit log. Þetta á sérstaklega við um:

- staðfesta tollflokkun
- leyfisskylduviðvaranir
- gengi og gengisdag
- landed cost calculation
- accounting export
- AI tillögur og review ákvarðanir
