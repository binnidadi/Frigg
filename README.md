# Tollvörð Pro

Tollvörð Pro er SaaS-first hugbúnaður fyrir innflutningsumsýslu, tollafgreiðslu og rekjanlega ákvörðunartöku á íslenskum markaði.

Markmiðið er að byggja kerfi þar sem skjöl, tollflokkunartillögur, leyfisskylduviðvaranir, landað kostnaðarverð, samþættingar og audit trail eru hluti af sama stýrða ferli. Kerfið á að styðja sjálfvirkni þar sem hún er raunhæf, en án þess að fela óvissu eða setja fram óstaðfestar niðurstöður sem staðreyndir.

## Kjarnaafstaða

- SaaS-kjarni fyrst: innflutningsferli, review state, audit log, permissions, landed cost og samþættingar verða í eigin domain-lagi.
- AI er capability layer: skjalalestur, retrieval, tillögur, samantektir og workflow-stuðningur fara í gegnum afmarkað provider-lag.
- Fjárhagsleg og tolltengd reiknirökfræði verður determinísk, prófanleg og útskýrð með inntökum, formúlum og milliskrefum.
- Tollflokkun, leyfisskylda og reglufylgni verða ekki sett fram sem staðreyndir nema heimild, regla eða review state styðji niðurstöðuna.
- Íslenskt málfar í skjölum, villum, skýringum og notendaviðmóti er hluti af vörugæðum.

## Núverandi staða

Þetta repository var hreinsað og endurræst fyrir Tollvörð Pro. Fyrsta lota var skjala- og arkitektúrgrunnur. Önnur lota setur upp TypeScript/Next.js/Prisma tæknigrunn án þess að útfæra tollflokkun, reglufylgni eða peningalega reiknirökfræði.

## Tæknigrunnur

- `apps/web`: lágmarks Next.js app og íslenskt upphafsyfirborð.
- `packages/domain`: sameiginleg grunnheiti og types.
- `packages/engine`: boundary fyrir framtíðar landed cost reiknivél.
- `packages/ai`: boundary fyrir framtíðar AI provider lag.
- `prisma/schema.prisma`: Prisma datasource og generator; domain models koma í næstu lotu.
- `docs/UX-REVIEW.md`: mat á vefupplifun, skýrleika og trausti.
- `docs/DATA-INVENTORY.md`: inventory yfir ytri gögn sem hafa verið skoðuð án þess að afrita þau í repo.

## Keyrsla

```bash
pnpm install
pnpm typecheck
pnpm prisma:validate
pnpm build
pnpm lint
pnpm test
```

## Source of truth

- [Arkitektúr](docs/ARCHITECTURE.md)
- [Ákvarðanir](docs/DECISIONS.md)
- [Vegvísir](docs/ROADMAP.md)
- [Gagnalíkan](docs/DATABASE-MODEL.md)
- [Orðasafn](docs/DOMAIN-GLOSSARY.md)
- [AI Foundry mörk](docs/AI-FOUNDRY-BOUNDARY.md)
- [Staða](docs/STATUS.md)
- [UX-greining](docs/UX-REVIEW.md)
- [Gagnainventory](docs/DATA-INVENTORY.md)
