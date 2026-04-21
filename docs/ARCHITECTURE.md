# Arkitektúr Frigg

## Markmið

Arkitektúr Frigg þarf að þjóna þremur ófrávíkjanlegum kröfum:

- nákvæmni í production launum
- fullum rekjanleika fyrir audit og skýringar
- sveigjanlegri innleiðingu nýrra kjarasamninga

## Yfirsýn

Frigg er byggt sem monorepo með skýra aðgreiningu milli vörulaga:

- `apps/web`: framendi fyrir homepage, innskráningu, dashboard, pay runs og trust center
  - sækir nú AI health og preview gögn úr `apps/api`
  - sækir nú einnig snapshot og scenario gögn fyrir run model samhengi
- `apps/api`: API-first bakendi fyrir launainput, keyrslur, review workflows og exports
  - nú einnig með fyrstu AI review endpointum fyrir health, parse preview og knowledge preview
  - og með `repository` lagi sem getur síðar skipt úr memory driver yfir í raunverulegan gagnagrunn
- `packages/contracts`: canonical schemas og domain contracts
- `packages/engine`: deterministic launavél og sannprófunarvél
- `packages/ai`: AI provider failover, parser pipeline, confidence engine og deterministic knowledge retrieval

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

## Compliance-by-design

- `StatutoryParameterSet` heldur utan um skattþrep, persónuafslátt og tryggingagjald út frá gildistíma.
- `PensionRoutingRule` og `UnionRoutingRule` stýra í hvaða sjóð eða félag greiðslur fara og hvenær þarf yfirferð.
- `A1CertificateStatus` er sértækt lag fyrir erlenda starfsmenn sem geta borið lægra tryggingagjald.
- `TaxCreditAllocation` er geymd sérstaklega svo kerfið geti skýrt og sannreynt nýtingu persónuafsláttar yfir fleiri en einn greiðanda.
- `PayslipEvidenceRecord` tryggir að launaseðill sé ekki bara úttak heldur einnig rekjanlegt sönnunargagn.

## Knowledge-by-design

- Allar heimildir fara í `KnowledgeSourceRecord` sem er útgáfustýrt og merkt sem statutory, collective agreement, pension, union eða interpretation.
- `CoverageMatrixEntry` sýnir hvað er stutt, hvað er aðeins að hluta stutt og hvaða residual risk er eftir.
- AI les heimildir, stingur upp á reglum og svarar þekkingarspurningum, en öll áhrif á production fara í gegnum review workflow.

## AI lag

AI lagið hefur þrjú verkefni:

- lesa og skipta niður kjarasamningum
- stinga upp á structured rules
- svara spurningum um þekkingargögn

AI lagið hefur ekki heimild til að reikna production laun eða sleppa yfirferð.

### AI-byggingareiningar

- `FailoverAIProvider` stýrir forgangsröð veitenda, cooldown eftir rate limit og execution telemetry.
- `ParserPipeline` skiptir skjalalestri í `detect`, `parse`, `normalize`, `preview` og `warnings`.
- `ConfidenceEngine` sameinar LLM merki og deterministic þætti áður en review requirement er ákveðið.
- `DeterministicKnowledgeRetriever` sækir staðfestar heimildir úr knowledge layer án þess að treysta á frjálsa minni líkans.
- `OpenAICompatibleProviderAdapter` og `GeminiProviderAdapter` tengja failover lagið við ytri veitendur.
- `DeterministicAgreementParserAdapter` býr til fyrstu regludrög fyrir skýrar mynstragerðir eins og uppbætur, en skilur eftir review þegar texti er tvíræður.

## Næstu arkitektúrskref

1. Tengja provider adapters við raunveruleg umhverfi, timeout stefnu og telemetry geymslu.
2. Bæta við canonical database schema sem nær einnig yfir routing, deadlines og evidence records.
3. Skipta engine í execution path og validation path.
4. Hanna event log, audit reconstruction model og review queues.
