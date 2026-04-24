# Gagnainventory

Síðast uppfært: 2026-04-24

## Ytri gagnasafn

Slóð sem var skoðuð:

`/mnt/c/Users/brynj/Desktop/Silja/HREIN_GOGN`

Þessi gögn voru aðeins kortlögð. Engin raunveruleg skjöl eða innihald úr gagnasafninu voru afrituð inn í repository.

## Samantekt

- Heildarfjöldi skráa: 44.
- Skráargerðir: 41 `.xlsx`, 2 `.xlsm`, 1 `.pdf`.
- Helstu möppur: `Banki`, `Framtöl`, `Hreyfingalistar`, `Prófjöfnuðir`.
- Gögnin virðast fyrst og fremst vera bókhalds-, banka-, framtals-, skatta- og afstemmingargögn.
- Gögnin virðast ekki vera fyrsta hreina toll-/innflutningsgagnasafnið fyrir Frigg.

## Flokkun

| Flokkur | Dæmi | Mat |
| --- | --- | --- |
| Bankagögn | Bankayfirlit og bankatengdar Excel skrár | Hugsanlega gagnlegt síðar fyrir greiðslu- og afstemmingarlag. |
| Framtöl og skattaskjöl | Framtal, ársreikningur, skattalegar fyrningar, VSK afstemmingar | Viðkvæmt bókhalds- og skattasamhengi; ekki beint toll-domain truth source. |
| Hreyfingalistar | BC, DK, Navision, Payday og Stólpi hreyfingalistar | Gagnlegt síðar fyrir ERP/bókhalds-adaptera og reconciliation. |
| Prófjöfnuðir | DK, Navision, Payday og Stólpi prófjöfnuðir | Gagnlegt síðar fyrir bókhalds- og export sannprófun. |
| Skattabæklingur | Deloitte Legal skattabæklingur 2026 | Ytri heimild sem þarf skýra heimildaskráningu og höfundarréttarvarúð. |

## Áhættumat

- Gögnin kunna að innihalda viðkvæm fjárhagsgögn, kennitölur, bankaupplýsingar eða viðskiptalegar upplýsingar.
- Gögnin skulu ekki fara í Git nema þau hafi verið hreinsuð, samþykkt og minnkuð í örugg fixtures.
- `.xlsm` skrár geta innihaldið macro-virkni og skal ekki keyra þær óvarið.
- Skattaskjöl og bæklingar skulu ekki notuð sem reglufylgni-staðreyndir nema heimild, útgáfa og review state séu skýr.

## Ráðlögð notkun síðar

- Nota sem inventory fyrir framtíðar `AccountingEvidence` eða `FinancialReconciliationEvidence`, ekki sem fyrstu tollflokkunargögn.
- Búa til hreinsuð, nafnlaus og lágmarks fixtures áður en gögn eru notuð í prófum.
- Halda raw skjölum utan repository og vísa aðeins í þau með source metadata þar sem það er heimilt.
- Tengja mögulega síðar við bókhaldsútflutning, greiðsluafstemmingu og ERP adaptera.

## Næsta gagnaskref

Fyrir Frigg vantar frekar innflutningsmiðuð sýnigögn:

- vörureikning
- farmbréf
- pökkunarlista
- upprunavottorð
- vörulýsingu
- sendingarupplýsingar
- dæmi um tollflokkunartillögu með review state
