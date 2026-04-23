# Source Architecture Frigg

Síðast uppfært: 2026-04-23

## Tilgangur

Frigg þarf heimilda-, gagna- og skjalaarkitektúr sem styður þrjár ófrávíkjanlegar kröfur:

- lagalega og bókhaldslega rekjanleika
- deterministic payroll runtime
- sveigjanlegt AI Foundry lag fyrir extraction, flokkun, review og greiningu

Þessi arkitektúr á að gera skýrt:

- hvað er frumheimild
- hvað er afleitt knowledge lag
- hvað er runtime-hæf regla
- hvað er aðeins hjálpar- eða review-lag

## 1. Recommended source architecture

Frigg á að byggjast á sex skýrum lögum:

### A. Source registry layer

Heldur utan um:

- hvaða heimild er til
- hvaðan hún kemur
- hvaða aðgangsstig gildir
- hvaða útgáfa eða dagsetning gildir
- hvort heimild sé primary, secondary eða guidance-only

Þetta lag er registry, ekki túlkun.

### B. Canonical source record layer

Heldur utan um stöðluð source records með:

- source ID
- source type
- source authority
- acquisition metadata
- effective period
- checksum eða content fingerprint
- citation fields

Þetta lag er rekjanleg útgáfa af hráu heimildinni.

### C. Knowledge normalization layer

Brýtur source records niður í reusable einingar:

- clauses
- legal obligations
- interpretation notes
- remittance requirements
- parameter records
- change notices

Þetta lag má vera stutt af AI, en verður að vera review-hæft og provenance-tengt.

### D. Rule candidate and certified rule layer

Heldur utan um:

- rule drafts
- reviewer decisions
- certified rules
- effective-dated rule packs

Þetta er brúin milli knowledge og deterministic runtime.

### E. Evidence and payroll truth layer

Heldur utan um:

- launaseðla
- tímaskrár
- ráðningarsamninga
- routing sannleiksgögn
- skilagreinar
- validation niðurstöður
- review/signoff artifacts

Þetta lag er tenant- og payroll-native sannleikslagið.

### F. AI Foundry layer

Heldur utan um:

- extraction outputs
- clause suggestions
- classification proposals
- memo drög
- regulatory diff drög
- advisor artifacts

Þetta lag má vera sveigjanlegra, en það má ekki verða source-of-truth fyrir certified runtime eða legal proof.

## 2. Hvað á að vera primary source

Primary sources eru þær heimildir sem mega styðja:

- certified rules
- legal obligations
- statutory parameters
- routing/regluákvarðanir
- audit proof

Þær eiga fyrst og fremst að vera:

- lög og reglugerðir frá Alþingi
- opinber birting frá Skattinum
- opinber og gildandi kjarasamningsgögn frá stéttarfélögum eða viðurkenndum samningsaðilum
- opinber skilalýsing og reglur frá lífeyrissjóðum og stéttarfélögum
- opinber viðmið um skil, varðveislu og launatengd gjöld
- viðskiptavinagögn sem eru payroll-native truth:
  - launaseðlar
  - tímaskrár
  - ráðningarsamningar
  - routing sannleiksgögn
  - skilagreinar

Primary source þarf að vera:

- dagsett
- útgáfustýrð
- tengd acquisition record
- tengd citation og fingerprint

## 3. Hvað á að vera secondary source

Secondary sources styðja túlkun, forgangsröðun og issue spotting, en eiga ekki ein og sér að búa til certified runtime logic.

Þar undir falla til dæmis:

- ASÍ vinnuréttarvefur
- leiðbeiningar frá félögum og sjóðum sem útskýra framkvæmd
- opinberar samantektir og skýringar frá stofnunum
- innri minnisblöð frá ráðgjöfum eða viðskiptavinum, ef þau eru skráð sem interpretation en ekki source-of-law

Secondary source má styðja:

- review decisions
- interpretation records
- unresolved questions
- guidance í UI

En secondary source á ekki að duga eitt og sér fyrir:

- certified rule
- statutory parameter
- endanlega routing niðurstöðu

## 4. Hvað má nota sem guidance only

Guidance-only efni má hjálpa AI og notendum, en má ekki:

- loka review
- samþykkja runtime niðurstöðu
- teljast fullnægjandi lagastoð

Þar undir falla:

- bloggfærslur
- óformlegar útskýringar
- support svör
- glósur frá fundum
- innri product notes
- heuristic extraction drög

Guidance-only efni á að vera merkt skýrt:

- `guidance_only: true`
- `runtime_eligible: false`
- `legal_weight: low`

## 5. Hvernig á að merkja heimildir

Hver heimild þarf að bera að lágmarki þessi merki:

- `source_id`
- `source_type`
  - statutory
  - collective_agreement
  - pension
  - union
  - interpretation
  - private_corpus
  - guidance_only
- `authority`
- `access_level`
  - public
  - customer_supplied
  - login_protected
  - internal_only
- `trust_level`
  - primary
  - secondary
  - guidance_only
- `effective_period`
- `published_at`
- `acquired_at`
- `acquired_by`
- `checksum`
- `storage_reference`
- `content_fingerprint`
- `language`
- `review_status`
  - mapped
  - normalized
  - reviewed
  - certified_for_runtime
- `runtime_eligibility`
  - no
  - review_only
  - certified

## 6. Hvernig á að útbúa evidence trail

Evidence trail þarf að vera samsettur, ekki eitt log-lag.

Hver payroll niðurstaða sem á að vera lögfræðilega eða bókhaldslega rekjanleg þarf að tengjast:

1. input truth
   - launaseðill
   - tímaskrá
   - ráðningarsamningur
   - routing mapping
   - skilagrein

2. rule truth
   - certified rule ID
   - rule pack version
   - statutory parameter set version

3. source truth
   - source record IDs
   - clause IDs
   - legal obligation IDs

4. decision truth
   - review task IDs
   - reviewer decision
   - signoff package
   - audit event

5. output truth
   - line item
   - variance finding
   - export batch
   - remittance or filing artifact

Minimum evidence trail fyrir hverja launalínu:

- `line_item_id`
- `payroll_run_id`
- `rule_set_version_id`
- `source_rule_ids`
- `source_record_ids`
- `evidence_record_ids`
- `review_decision_ids`
- `calculated_at`
- `calculation_hash`

## 7. Hvernig á að aðgreina staðfest gögn, inferred data, assumptions og unresolved questions

Þetta þarf að vera explicit í öllum layers.

### Staðfest gögn

Merki:

- `data_status: verified`
- tengd primary source eða verified private corpus
- má nota í runtime og audit

### Inferred data

Merki:

- `data_status: inferred`
- búið til með afleiðslu, samsetningu eða AI flokkun
- má styðja review eða issue spotting
- má ekki ein og sér loka review eða verða certified runtime niðurstaða

### Assumptions

Merki:

- `data_status: assumption`
- skráð af hverju forsendan var tekin
- tengt risk level
- þarf annaðhvort staðfestingu eða sýnilegt review flagg

### Unresolved questions

Merki:

- `data_status: unresolved`
- skráð sem opið blocking eða review atriði
- tengt owner, deadline og impacted artifacts

Regla:

Ekkert sem er `inferred`, `assumption` eða `unresolved` má birtast sem certified truth.

## 8. Hvernig á að byggja versioning og update model

Versioning þarf að vera mismunandi eftir lögum:

### Heimildir

- ný útgáfa við efnisbreytingu
- aldrei uppfæra in-place
- geyma fingerprint og publication date

### Clauses og normalized knowledge

- ný útgáfa þegar túlkun, skipting eða merking breytist
- tengja við foreldraheimild og effective period

### Rule drafts og certified rules

- rule draft getur lifað stutt
- certified rule þarf:
  - version
  - reviewer
  - approved_at
  - effective_from
  - replaced_by

### Payroll evidence og tenant gögn

- append-only audit events
- ný innsending eða ný sannprófun er ný færsla eða ný staða með tímamerki
- ekki eyða historíu

### Update model

Frigg þarf þrjú update triggers:

- `source changed`
- `customer data arrived`
- `review decision changed`

Hvert trigger þarf að geta svarað:

- hvað breyttist
- hvaða rules eða packs verða fyrir áhrifum
- hvaða tenants eða keyrslur verða fyrir áhrifum
- hvort ný review sé skylda

## 9. Hvaða gögn þarf að normalisera

Þessi gögn verða að fara í normalized form ef Frigg á að verða reusable knowledge system:

- lagagreinar og reglur
- kjarasamningsákvæði
- lífeyrissjóðsreglur
- stéttarfélagsreglur
- skilakröfur og filing metadata
- statutory parameters
- routing criteria
- leave réttindareglur
- uppbótar- og föst greiðsluform
- interpretation records
- change notices
- review decisions
- evidence records

Private corpus þarf líka normalization í:

- payslip headers
- line items
- work pattern records
- contract terms
- routing mappings
- remittance mappings

## 10. Hvernig best sé að umbreyta núverandi gögnum í reusable knowledge system

Núverandi gögn eiga að þróast í þessari röð:

### Skref 1. Registry í canonical source records

Umbreyta:

- `docs/PUBLIC-SOURCE-REGISTRY.md`
- `db/seeds/public-source-registry.json`

í:

- canonical `SourceRecord`
- acquisition metadata
- trust level
- runtime eligibility

### Skref 2. Research workspace í normalized knowledge graph

Umbreyta:

- `legalObligations`
- `collectiveAgreementPacks`
- `pensionFundProfiles`
- `unionProfiles`
- `coverageMatrixEntries`

í tengd records:

- `ClauseRecord`
- `LegalObligationRecord`
- `InterpretationRecord`
- `RuleDraft`
- `CertifiedRule`
- `CoverageUnit`

### Skref 3. Featured pack demo í reusable operational template

Núverandi featured `VR retail` pakki á að verða:

- reusable pack template
- með skýru scope resolver
- evidence requirements
- intake requirements
- signoff requirements

Ekki bara eitt handsmíðað demótilvik.

### Skref 4. Private corpus intake í tenant truth layer

Umbreyta:

- `privateCorpusSubmissions`
- `privateCorpusIntakePackages`
- `privateCorpusIntakeBlueprints`
- `privateCorpusIntakeAcceptance`

í:

- tenant-specific source records
- evidence records
- acceptance decisions
- review blockers

### Skref 5. Demo snapshot í event-driven audit trail

Núverandi snapshot-lag á að þróast í:

- event log
- decision log
- evidence graph
- runtime reconstruction model

## Hvað þarf að vera lögfræðilega eða bókhaldslega rekjanlegt

Þetta þarf að vera fullrekjanlegt:

- statutory parameters
- certified rules
- effective periods
- samningssviðsákvörðun
- routing niðurstaða
- launalínur
- frávik
- review decisions
- signoff
- skil og export batches
- launaseðill sem sönnunargagn
- varðveislu- og audit atburðir

## Hvað má vera sveigjanlegra AI layer

Þetta má vera AI-aðstoðað og sveigjanlegra, svo lengi sem provenance og review eru skýr:

- clause extraction
- entity extraction
- flokkunartillögur
- rule draft tillögur
- memo drög
- regulatory diff drög
- advisor summaries
- employee-friendly explanations

Regla:

AI má hjálpa til við að mynda candidate knowledge og candidate guidance.
AI má ekki einn og sér mynda certified payroll truth.
