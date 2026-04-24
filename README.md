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

Þetta repository var hreinsað og endurræst fyrir Tollvörð Pro. Fyrsta lota er skjala- og arkitektúrgrunnur; runtime-kóði, Prisma schema og reiknivél koma í næstu lotum.

## Source of truth

- [Arkitektúr](docs/ARCHITECTURE.md)
- [Ákvarðanir](docs/DECISIONS.md)
- [Vegvísir](docs/ROADMAP.md)
- [Gagnalíkan](docs/DATABASE-MODEL.md)
- [Orðasafn](docs/DOMAIN-GLOSSARY.md)
- [AI Foundry mörk](docs/AI-FOUNDRY-BOUNDARY.md)
