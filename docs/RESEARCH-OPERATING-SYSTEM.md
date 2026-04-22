# Research Operating System Frigg

Síðast uppfært: 2026-04-22

## Tilgangur

Frigg þarf formlegt rannsóknar- og heimildakerfi sem heldur utan um:

- hvaða lög, reglur, kjarasamningar, lífeyrissjóðir og stéttarfélög hafa verið kortlögð
- hvaða gögn hafa borist inn og með hvaða aðgangsstigi
- hvaða lagalegu skyldur kerfið þarf að geta reiknað eða sent í review
- hvaða svið eru aðeins kortlögð og hvaða svið eru certified fyrir runtime

Þetta lag er brúin milli `public corpus`, `private corpus`, review workflow og deterministic runtime.

## Kjarnahlutir

### Research workstreams

Research workstream lýsir skipulögðum rannsóknarstraumi, til dæmis:

- almennum vinnumarkaði
- opinberum markaði
- skattaskilum
- lífeyrissjóðarouting
- stéttarfélagsaðild og félagsgjöldum

Hver workstream hefur:

- markaðssvið
- forgang
- stöðu
- ábyrgðarhlutverk
- skýrar athugasemdir um hvaða þekja vantar

### Source acquisition

Source acquisition record skráir hvernig heimild barst inn:

- úr opinberu registry
- með handvirku niðurhali
- með viðskiptavinaupphleðslu
- með samstarfsaðila eða API

Þar með verður rekjanlegt:

- hvaða aðgangsstig gildir um heimild
- hvar hún er vistuð
- hver aflaði hennar
- hvort hún sé aðeins skráð eða komin í review

### Legal obligations

Legal obligation record lýsir reiknanlegri eða review-skyldri skyldu, til dæmis:

- staðgreiðslu
- tryggingagjaldi
- orlofi
- veikindarétti
- félagsgjaldi
- lífeyrissjóðsiðgjaldi
- varðveislu launagagna

Obligation record þarf að segja:

- hvaða lagasvið hún tilheyrir
- hvaða heimildir styðja hana
- hvaða artifacts hún hefur áhrif á
- hvort Frigg geti ekki reiknað hana, geti reiknað hana með review eða geti reiknað hana certified

### Coverage packs og profile records

Coverage pack eða profile record er research-niðurstaða sem hefur verið nægilega kortlögð til að verða runtime-hæf.

Þetta nær yfir:

- kjarasamningspakka
- lífeyrissjóðaprófíla
- stéttarfélagsprófíla

Hver slíkur record þarf að halda utan um:

- coverage stöðu
- operational status
- source depth
- tengdar heimildir
- skýringu á því hvað sé fullstutt og hvað fari í review

## Operational status

Frigg notar þrjú operational states:

- `cannot_compute`: ekki nægileg þekja til að reikna eða samþykkja niðurstöðu
- `compute_with_review`: hægt að reikna með skýru review flaggi og residual risk
- `compute_certified`: nægileg þekja, review og validation til að teljast certified runtime

## Source depth

Frigg notar fimm source-depth stig:

- `registry_only`
- `structured_summary`
- `clause_level`
- `rule_level`
- `validated_runtime`

Regla:
engin heimild telst certified fyrir runtime fyrr en hún hefur náð að minnsta kosti `rule_level` og viðeigandi review/validation.

## Samband við private corpus

`public corpus` dugar til að kortleggja stóran hluta laga, sjóða, félaga og samningsumgjarðar.

Til að verða fullkomið payroll kerfi þarf Frigg þó einnig:

- payroll-native launaseðla
- tímaskráningar og vaktaplön
- ráðningarsamninga og sérkjör
- raunverulegar skilagreinar
- starfsmanna- og routing sannleiksgögn

Research operating system á að gera þessi gögn sýnileg sem skýran gap-lista, ekki falda ósamræmið.

## Næstu skref

1. Fylla `db/seeds/research-workspace.json` með raunverulegri kortlagningu.
2. Tengja research records við gagnagrunnsdrifara.
3. Sýna þessi records síðar í Trust Center og internal review surface.
4. Nota legal obligations sem undirlag fyrir deterministic rule engine og validation engine.
