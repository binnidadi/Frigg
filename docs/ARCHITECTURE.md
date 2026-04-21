# Arkitektúr Frigg

## Markmið

Arkitektúr Frigg þarf að þjóna þremur ófrávíkjanlegum kröfum:

- nákvæmni í production launum
- fullum rekjanleika fyrir audit og skýringar
- sveigjanlegri innleiðingu nýrra kjarasamninga

## Yfirsýn

Frigg er byggt sem monorepo með skýra aðgreiningu milli vörulaga:

- `apps/web`: framendi fyrir homepage, innskráningu, dashboard, pay runs og Trust Center
- `apps/api`: API-first bakendi fyrir launainput, keyrslur, review workflows og exports
- `packages/contracts`: canonical schemas og domain contracts
- `packages/engine`: deterministic launavél og sannprófunarvél
- `packages/ai`: AI provider failover, parser pipeline, confidence engine og deterministic knowledge retrieval
- `db`: SQL-skema, migrations og seed gögn

## Meginflæði

1. Notandi eða samþætting skilar inn launainputum.
2. API normalíserar input og festir snapshot.
3. Payroll engine sækir gildandi statutory parameters og approved rule set.
4. Aðalvél reiknar niðurstöðu.
5. Sannprófunarvél endurreiknar sömu keyrslu.
6. Frávik blokkar samþykki.
7. Úttak birtist með skýringum á launalínum.
8. Export batches og audit metadata eru vistuð með hash og útgáfum.

## Trust-by-design

- Allar reglur eru effective-dated.
- Engar reglur eru uppfærðar in-place; ný útgáfa er búin til.
- Allar niðurstöður geyma rule set version IDs.
- Hver launalína heldur utan um explanation og source rule IDs.
- AI output verður aðeins að draft artifact sem þarf mannlega yfirferð.

## Knowledge-by-design

- Public corpus er skráð í `db/seeds/public-source-registry.json`.
- Public corpus geymir opnar heimildir frá Alþingi, Skattinum, lífeyrissjóðum, stéttarfélögum og túlkunarsíðum.
- Private corpus geymir raunveruleg launagögn, skilagreinar, innskráningarvarið efni og fyrirtækjabundið mapping.
- `HREIN_GOGN` telst nú bókhalds- og afstemmingalag en ekki fullkomið payroll truth layer.

## Compliance-by-design

- `StatutoryParameterSet` heldur utan um skattþrep, persónuafslátt og tryggingagjald út frá gildistíma.
- `PensionRoutingRule` og `UnionRoutingRule` stýra í hvaða sjóð eða félag greiðslur fara og hvenær þarf yfirferð.
- `A1CertificateStatus` er sértækt lag fyrir erlenda starfsmenn sem geta borið lægra tryggingagjald.
- `TaxCreditAllocation` er geymd sérstaklega svo kerfið geti skýrt og sannreynt nýtingu persónuafsláttar yfir fleiri en einn greiðanda.
- `PayslipEvidenceRecord` tryggir að launaseðill sé ekki bara úttak heldur einnig rekjanlegt sönnunargagn.

## AI lag

AI lagið hefur þrjú verkefni:

- lesa og skipta niður kjarasamningum
- stinga upp á structured rules
- svara spurningum um þekkingargögn

AI lagið hefur ekki heimild til að reikna production laun eða sleppa yfirferð.

## Næstu arkitektúrskref

1. Tengja provider adapters við raunveruleg umhverfi, timeout stefnu og telemetry geymslu.
2. Færa public source registry inn í gagnalíkan sem versioned knowledge records.
3. Bæta private corpus við með launaseðlum, tímaskráningu, skilagreinum og routing gögnum.
4. Hanna event log, audit reconstruction model og review queues.
