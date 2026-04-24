# Fixture stefna

Síðast uppfært: 2026-04-24

## Markmið

Fixture gögn eiga að gera prófanir, demo og þróun mögulega án þess að setja raunveruleg viðskiptavinagögn, fjárhagsgögn, persónuupplýsingar eða raw skjöl í Git.

## Ófrávíkjanlegar reglur

- Raw gögn úr `HREIN_GOGN` fara ekki í repository.
- `.xlsx`, `.xlsm`, `.pdf`, myndir og önnur raunveruleg fylgiskjöl fara ekki í repository nema þau hafi verið hreinsuð, samþykkt og sérstaklega merkt sem synthetic fixture.
- Leyndarmál, API lyklar, bankaupplýsingar, kennitölur og raunveruleg fyrirtækjanöfn fara aldrei í fixtures.
- `.xlsm` skrár skulu ekki keyrðar eða notaðar sem fixture vegna macro-áhættu.
- Fixture má ekki setja fram tollflokkun, leyfisskyldu eða gjaldareikning sem staðreynd nema hún sé merkt sem synthetic og notuð aðeins til tækniprófunar.

## Leyfileg fixture gögn

- Synthetic sendingar með tilbúnum innflytjanda, birgi og vörulínum.
- Synthetic skjalametadata án raunverulegs skjals.
- Synthetic extracted fields með source mapping sem sýnir form, ekki raunverulegt skjal.
- Synthetic classification candidate með review state `suggested` eða `needs_review`.
- Synthetic landed cost input snapshot til að prófa deterministic reiknivél síðar.

## Bannlista dæmi

- Raunverulegir bankahreyfingalistar.
- Raunveruleg framtöl, ársreikningar eða skattaskjöl.
- Raunverulegir vörureikningar eða farmbréf frá viðskiptavinum.
- Raunveruleg skjöl með kennitölum, bankareikningum, nöfnum starfsmanna eða samningsupplýsingum.

## Næsta fixture lota

Fyrsta fixture lota skal búa til lítið synthetic import scenario:

- einn tilbúinn innflytjanda
- einn tilbúinn birgi
- eina sendingu
- tvær vörulínur
- eitt invoice metadata record
- nokkur extracted fields
- eina classification candidate per vörulínu
- eina permit warning sem er merkt `suggested`

Þessi fixture lota skal ekki nota raunveruleg raw skjöl.
