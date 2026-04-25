# Project context fyrir Frigg

Þetta skjal er stutt inngangssamhengi fyrir ný AI sessions og nýja þróunaraðila. Nánari source-of-truth skjöl eru í `README.md` og `docs`.

## Verkefni

Frigg er SaaS-first hugbúnaður fyrir innflutningsumsýslu, tollafgreiðslu, skjalaúrvinnslu, rekjanlegar tillögur, landað kostnaðarverð, review workflow, audit trail og samþættingar á íslenskum markaði.

## Marknotendur

- Innflytjendur og starfsfólk sem heldur utan um innflutningsmál.
- Fjármála-, bókhalds- og rekstrarteymi sem þurfa skýran landed cost grunn.
- Sérfræðingar sem þurfa að yfirfara tollflokkun, leyfisskyldu og reglufylgni.

## Virði

Frigg á að draga úr handvirkri vinnu án þess að fórna rekjanleika, mannlegri yfirferð eða stærðfræðilegri sannreynanleika.

## Tæknistafli

- Next.js og TypeScript í `apps/web`.
- Prisma schema fyrir Postgres/Supabase í `prisma/schema.prisma`.
- Modular monolith með `packages/domain`, `packages/engine` og `packages/ai`.
- Synthetic fixtures í `fixtures/synthetic`.
- Vélrænn heimildagrunnur í `knowledge/sources`.

## Mikilvægar möppur

- `apps/web`: framendi og síðar Next server layer.
- `packages/domain`: canonical types og domain contracts.
- `packages/engine`: determinísk landed cost reiknivél.
- `packages/ai`: AI provider boundary og framtíðar adapterar.
- `prisma`: gagnalíkan.
- `docs`: source-of-truth skjöl.
- `tools`: vélræn skjala-, schema-, fixture- og source checks.

## Commands

```bash
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm prisma:validate
corepack pnpm build
corepack pnpm dev
```

## Vinnureglur

- Vandað íslenskt málfar er krafa.
- Frigg er canonical vöruheiti.
- AI er capability layer, ekki core decision engine.
- Landed cost og önnur fjárhagsleg/tolltengd rökfræði skal vera determinísk og prófanleg.
- Tollflokkun og leyfisskylda eru review-stýrðar tillögur nema staðfestar með heimild/reglu/review state.
- Raw gögn og secrets mega ekki fara í Git.
- Eftir hverja lotu skal uppfæra skjöl og gefa quality gate.

## Núverandi staða

Sjá `docs/STATUS.md`.

## Næstu skref

Sjá `docs/ROADMAP.md`.

## Definition of done

Breyting er tilbúin þegar:

- hún leysir skilgreint vandamál með minnstu réttu breytingu
- kóði, schema, docs og tests eru samræmd
- viðeigandi verification commands hafa verið keyrð
- regression risk hefur verið metinn
- quality gate hefur verið gefið út
- commit og push hafa verið framkvæmd ef lota er samþykkt
