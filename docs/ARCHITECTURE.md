# Arkitektúr Frigg

## Markmið

Arkitektúr Frigg þarf að þjóna þremur ófrávíkjanlegum kröfum:

- nákvæmni í production launum
- fullum rekjanleika fyrir audit og skýringar
- sveigjanlegri innleiðingu nýrra kjarasamninga

## Yfirsýn

Frigg er byggt sem monorepo með skýra aðgreiningu milli vörulaga:

- `apps/web`: framendi fyrir homepage, innskráningu, dashboard, pay runs og trust center
- `apps/api`: API-first bakendi fyrir launainput, keyrslur, review workflows og exports
- `packages/contracts`: canonical schemas og domain contracts
- `packages/engine`: deterministic launavél og sannprófunarvél
- `packages/ai`: AI provider failover, structured extraction og prompt registry

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

## AI lag

AI lagið hefur þrjú verkefni:

- lesa og skipta niður kjarasamningum
- stinga upp á structured rules
- svara spurningum um þekkingargögn

AI lagið hefur ekki heimild til að reikna production laun eða sleppa yfirferð.

## Næstu arkitektúrskref

1. Stofna prompt registry og provider failover implementations.
2. Bæta við canonical database schema.
3. Skipta engine í execution path og validation path.
4. Hanna event log og audit reconstruction model.
