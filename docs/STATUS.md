# Staða Frigg

Síðast uppfært: 2026-04-21

## Hvar við erum

- Repo hefur verið sett upp sem grunn-monorepo.
- Source-of-truth skjöl hafa verið stofnuð.
- Fyrstu canonical TypeScript contracts fyrir AI, reglur og launadomain hafa verið skilgreind.
- Fyrstu arkitektúr- og vöruprinsippskjöl hafa verið fest.
- Fyrsta sýnilega product surface fyrir forsíðu, innskráningu og mælaborð hefur verið sett upp í `apps/web`.
- Fyrsta compliance- og knowledge-lag hefur verið mótað í canonical contracts.
- Fyrsta database-first SQL-skemað, golden scenarios og API snapshot lag hafa verið sett upp.
- AI failover grunnur, parser pipeline og confidence contracts hafa verið innleidd í `packages/ai` og `packages/contracts`.
- Fyrstu provider adapterarnir og deterministic agreement parser adapter hafa verið sett upp í `packages/ai`.
- `apps/api` birtir nú AI health, parse preview og knowledge preview endapunkta.
- `apps/web` sækir nú AI health og preview gögn úr API í forsíðu, innskráningu og mælaborð.
- `apps/web` sækir nú einnig `/snapshot` og `/scenarios` til að birta run model samhengi á mælaborði.
- Web rendering í `apps/web/script.js` hefur verið hert þannig að listi- og töflusmíði notar DOM í stað `innerHTML`.
- Enginn tengdur production bakendi er kominn í loftið enn.

## Hvað er lokið

- Verkefnaheiti og kjarnaafstaða fest
- Monorepo grunnur
- Docs pipeline fyrir stöðu, roadmap og ákvarðanir
- Grunnorðasafn fyrir samræmda íslensku
- Fyrsti domain contract grunnur
- Arkitektúrgrunnur og vöruprinsipp
- Fyrsta UI yfirborð með AI-premium trust-first stefnu
- Compliance contracts fyrir skatt, routing, A1, deadlines og audit evidence
- SQL-skema, golden scenario backlog og fyrsta lesanlega API snapshot lag
- AI contracts fyrir execution records, parser stages, provider health og confidence
- Fyrsti grunnur fyrir failover provider, deterministic knowledge retrieval og parser pipeline
- Provider adapterar fyrir GitHub Models, Gemini, SambaNova og Mistral
- Deterministic agreement parser adapter fyrir fyrstu review-hæfu regludrög
- AI snapshot endpointar fyrir health, parse preview og knowledge preview
- Web script lag sem tengir UI við AI snapshot endpointa
- Dashboard tengt við snapshot run model, validation mismatch og golden scenarios
- Öruggari rendering í web-lagi fyrir listi- og töfluúttak

## Hvað er í vinnslu

- Canonical architecture fyrir payroll engine, trust center og AI review pipeline
- Framlenging contracts yfir í gagnamódel fyrir run lifecycle og audit reconstruction
- Database-first skýrsla fyrir statutory parameters, knowledge records og review tasks
- Repository layer og raunveruleg persistence strategy yfir SQL-skemuð
- Tengingar frá AI grunni yfir í raunverulega provider adapters og provider-specific prompts
- Timeout, retry og observability stefna fyrir ytri AI kall
- Tengja `apps/web` við nýju AI endpointana svo trust center og review yfirborð sýni lifandi stöðu
- Færa web tengingar úr statískri fetch-grind yfir í skipulegt state/view model

## Hvað er næst

1. Byggja repository layer og migration runner yfir `db/schema.sql`.
2. Tengja provider adapters við lifandi lykla, telemetry og raunveruleg parse/knowledge flows.
3. Færa web-lagið frá einfaldri fetch-grind yfir í skipulegt state/view model.
4. Útfæra engine path sem notar pinned routing, statutory og rule set records.

## Áhætta núna

- Repo er nýtt og hefur enga dependency uppsetningu enn.
- Engin golden scenarios hafa verið skráð enn.
- Engin formleg coverage matrix fyrir kjarasamninga hefur verið stofnuð enn.
- UI er enn statískt yfirborð án raunverulegra gagna eða state management.
- Lífeyrissjóðir og stéttarfélög eru enn ekki komin með raunveruleg routing records í gagnalíkan.
- API notar enn in-memory snapshot gögn en ekki gagnagrunn.
- AI provider layer er enn án lifandi tenginga við ytri veitendur og án raunverulegra health mælinga.
