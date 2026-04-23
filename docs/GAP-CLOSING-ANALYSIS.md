# Gap-Closing Greining Frigg

Síðast uppfært: 2026-04-23

## Hlutverk

Þetta skjal dregur saman mikilvægustu gloppurnar milli:

- núverandi stefnu Frigg
- raunverulegrar stöðu í repo og vefyfirborði
- þess sem þarf til að Frigg geti orðið category-defining labour/payroll compliance operating system á Íslandi

Markmiðið er ekki að telja upp allt sem væri gaman að byggja. Markmiðið er að loka bilinu milli:

- loforðs
- capability
- operational readiness

## Critical now

### 1. Samningssviðsgreining er enn of grunn miðað við loforðið

- Af hverju þetta skiptir máli:
  Án réttrar samningssviðsgreiningar er Frigg ekki enn raunveruleg kjarasamninga launavél heldur compliance shell með sýnilegu review lagi.
- Núverandi veikleiki:
  Núverandi featured pakki sýnir aðeins fyrstu samningssviðsfærslur fyrir eitt demósvið. Kerfið velur ekki enn samningssvið sem rekstrarhæfa kjarnacapability.
- Hvað þarf að bæta:
  Byggja þröngan en raunverulegan resolver fyrir `VR retail` sem styðst við starf, starfshlutfall, vinnustað, routing og payroll-native gögn.
- Betri útgáfa af viðkomandi efni:
  `Frigg velur ekki lengur bara sýnidæmis-samningssvið heldur metur formlega hvaða samningspakki gildir, hvaða merki styðja valið og hvaða gögn halda niðurstöðunni í review.`

### 2. Payroll-native raungögn vantar enn í keyrsluna

- Af hverju þetta skiptir máli:
  Án raunverulegra nafnlausra launaseðla, tímaskráa, ráðningarsamninga, routing gagna og skilagreina verða evidence, frávik, intake og signoff áfram demódrifin.
- Núverandi veikleiki:
  Repo er heiðarlegt um að intake sé `demo_only`, en kjarnacapability getur ekki harðnað án private corpus.
- Hvað þarf að bæta:
  Fá fyrsta raunverulega `VR retail` gagnapakkann samkvæmt núverandi afhendingarsniði og tengja hann beint inn í featured flæðið.
- Betri útgáfa af viðkomandi efni:
  `Featured pakkinn skal byggja á raunverulegum nafnlausum gögnum áður en hann má færast úr demógrunni yfir í review-runtime eða certified þróunarstefnu.`

### 3. Golden scenarios verja ekki enn hegðun

- Af hverju þetta skiptir máli:
  Núverandi checks verja uppbyggingu og sýnilegt lag, en ekki það sem skiptir mestu þegar logic fer að þyngjast: hegðun og regressions.
- Núverandi veikleiki:
  Golden scenarios eru til sem backlog og stefnumynd, en ekki sem keyrandi behavioral vernd.
- Hvað þarf að bæta:
  Festa fyrstu 1-2 sviðsmyndir sem raunveruleg runtime tests sem sannreyna samningssvið, evidence, frávik og signoff blokk.
- Betri útgáfa af viðkomandi efni:
  `Golden scenarios verða ekki lengur aðeins lýsingar í skjölum heldur keyrandi regressionsvörn fyrir viðkvæmustu payroll/compliance flæðin.`

### 4. Packages og checks lofa meira en þau standa undir

- Af hverju þetta skiptir máli:
  Repo lítur út eins og þroskað monorepo, en `packages/*` eru enn með placeholder scripts. Það skapar falskt öryggi.
- Núverandi veikleiki:
  CI keyrir “græn” build/check skref sem sanna ekki enn capability í `contracts`, `ai` og `engine`.
- Hvað þarf að bæta:
  Skipta placeholder `build/check/typecheck` út fyrir raunverulegar staðfestingar eða láta þau falla skýrt þar til slíkar staðfestingar eru til.
- Betri útgáfa af viðkomandi efni:
  `Workspace checks eiga annaðhvort að sanna eitthvað raunverulegt eða segja skýrt að capability sé ekki enn tilbúið.`

### 5. Demo-yfirborðið lofar sums staðar meiri þroska en runtime styður

- Af hverju þetta skiptir máli:
  Traust brotnar hraðar á ofloforði en á takmörkuðu scope.
- Núverandi veikleiki:
  Forsíða og sum cards á vefnum sýna mjög sannfærandi niðurstöðu, en runtime er enn að stórum hluta demo-samsetning.
- Hvað þarf að bæta:
  Herða product honesty: sýna skýrar hvar um demó, `compute_with_review`, blokkað scope eða certified grunn er að ræða.
- Betri útgáfa af viðkomandi efni:
  `Vefurinn á að tala eins og traustur compliance hugbúnaður, en aldrei láta demólag líta út eins og full operational coverage.`

## High value next

### 6. Review/signoff workflow er komið á lagið en ekki enn samþætt acceptance- og coverage-stöðu

- Af hverju þetta skiptir máli:
  Review og signoff verða aðeins traust ef þau loka raunverulega á lokasamþykki þegar scope, intake eða reconciliation eru óuppgerð.
- Núverandi veikleiki:
  Signoff pakkinn er góður grunnur, en er enn aðskilinn frá intake acceptance, coverage state og Trust Center.
- Hvað þarf að bæta:
  Tengja employer approver og compliance reviewer beint við intake acceptance, evidence status og featured blockers.
- Betri útgáfa af viðkomandi efni:
  `Lokasamþykki skal sjálfkrafa lokast ef intake acceptance, scope eða reconciliation eru ekki komin á nægilegt stig.`

### 7. Trust Center er enn loforð frekar en raunveruleg vara

- Af hverju þetta skiptir máli:
  Coverage, residual risk og certified scope eiga að vera sýnileg vara, ekki aðeins innri gagnastrúktúr.
- Núverandi veikleiki:
  Coverage matrix og trust boundary eru í mælaborði, en ekkert eiginlegt Trust Center view er til.
- Hvað þarf að bæta:
  Hanna og birta fyrsta Trust Center yfirborðið fyrir featured pakka.
- Betri útgáfa af viðkomandi efni:
  `Frigg á að sýna hverju það styður, á hvaða dýpt og með hvaða afgangsáhættu í sérstöku traustyfirliti.`

### 8. Public corpus er of mikið registry og of lítið keyrslutengt knowledge graph

- Af hverju þetta skiptir máli:
  Registry eitt og sér breytist ekki í rule-level capability eða regulatory diff.
- Núverandi veikleiki:
  Heimildir eru vel skráðar, en ekki enn normalíseraðar niður í clauses, interpretations, rule drafts og certified rules.
- Hvað þarf að bæta:
  Hanna normalized knowledge model og færa public registry yfir í versioned knowledge records.
- Betri útgáfa af viðkomandi efni:
  `Frumheimildir eiga að lifa sem útgáfustýrð knowledge records sem geta tengst rules, evidence og impact diffi.`

### 9. Repository layer er að verða of miðlægt

- Af hverju þetta skiptir máli:
  Eftir því sem featured pakkinn stækkar verður ein samsetningarskrá fljótt brothætt og erfið í review.
- Núverandi veikleiki:
  `apps/api/src/repository.js` ber sífellt meiri product logic, readiness mat, acceptance og samsetningar.
- Hvað þarf að bæta:
  Skipta samsetningarlógík í minni einingar: scope, evidence, intake, signoff, coverage.
- Betri útgáfa af viðkomandi efni:
  `Repository lagið á að lesa og afhenda gögn, en flóknari samsetningar eiga að skiptast í smærri og endurskoðanlegri ábyrgðarsvæði.`

### 10. Terminology og category-line eru orðnar sterkar, en ekki enn nógu stífar yfir allt yfirborðið

- Af hverju þetta skiptir máli:
  Varan er að byggja trust moat. Þar þarf language discipline jafn mikla hörku og code discipline.
- Núverandi veikleiki:
  Mikið hefur batnað, en enn er ósamræmi milli “demo”, “review-runtime”, “certified”, “supported” og “compute_with_review”.
- Hvað þarf að bæta:
  Festa stutta canonical orðabók fyrir state labels sem mega birtast í UI og skjölum.
- Betri útgáfa af viðkomandi efni:
  `Sama staða á alltaf að heita sama nafni í docs, API og vefyfirborði.`

## Later

### 11. Employee mode og rights portal eiga ekki að koma of snemma

- Af hverju þetta skiptir máli:
  Þetta er sterkt framtíðartækifæri en getur auðveldlega dregið fókus frá employer/advisor wedge.
- Núverandi veikleiki:
  Strategy talar réttilega um þetta sem framtíðarlag, en hættan er að það verði tekið of snemma inn sem UI eða messaging.
- Hvað þarf að bæta:
  Halda því skýrt utan fyrstu operational capability-lotna.
- Betri útgáfa af viðkomandi efni:
  `Employee mode byggist ofan á sannprófuðu evidence og skýringarlagi, ekki á undan því.`

### 12. Opinberi markaðurinn og sérgreinar eiga ekki að blandast inn í fyrsta certified scope

- Af hverju þetta skiptir máli:
  Scope dilution er líklegasta leiðin til að teygja product direction of snemma.
- Núverandi veikleiki:
  Repo er almennt skýrt um þetta, en það þarf að halda línunni stífri.
- Hvað þarf að bæta:
  Halda fyrstu certified capability innan þröngs almenns markaðssviðs.
- Betri útgáfa af viðkomandi efni:
  `Frigg vinnur einn þröngan samningsheim vel áður en næstu markaðsheimum er bætt við.`

## Rangt forgangsraðað eða of dreift

- Fleiri research scaffolding lotur án raungagna: rangt næst.
- Meiri yfirborðsleg frontend stækkun áður en Trust Center eða runtime dýpkar: rangt næst.
- Fara í employee portal áður en employer/advisor workflow er operational: rangt næst.
- Stór TS-endurhönnun áður en behavioral tests og private corpus eru komin: rangt næst.

## Mælt forgangssvar næst

### Critical now

1. Fá fyrsta raunverulega nafnlausa `VR retail` gagnapakkann.
2. Festa 1-2 golden scenarios sem raunverulegar hegðunarprófanir.
3. Herða package scripts svo workspace checks séu ekki placeholders.
4. Dýpka samningssviðsgreiningu á raungögnum.

### High value next

1. Tengja signoff workflow beint við intake acceptance og coverage blockers.
2. Smíða fyrsta Trust Center view fyrir featured pakka.
3. Færa public corpus í normalized knowledge records.
4. Brjóta `repository.js` niður í minni ábyrgðarsvæði.

### Later

1. Employee mode.
2. Opinber markaður.
3. Sérgreinar.
4. Víðari advisor/partner API vara.
