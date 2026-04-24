# AI Foundry Mörk

## Hlutverk AI-lags

AI Foundry og önnur AI þjónusta má nýtast sem afmarkað capability layer ofan á Tollvörð Pro. AI-lagið á að auka hraða og gæði í úrvinnslu, en ekki taka yfir domain core.

Leyfileg verkefni:

- lesa texta úr PDF, JPG og öðrum skjölum
- stinga upp á structured fields úr skjölum
- finna líklega vörulýsingu eða tollflokkunartillögu
- styðja retrieval úr heimildum og innri gögnum
- búa til samantektir fyrir review
- undirbúa workflow verkefni fyrir mannlega yfirferð

Óleyfileg verkefni:

- reikna endanlegt landað kostnaðarverð
- ákvarða tolla, gjöld, skatta eða VSK sem production niðurstöðu
- staðfesta tollflokkun án review state
- staðfesta leyfisskyldu án rekjanlegrar reglu eða mannlegrar yfirferðar
- breyta accounting export án domain validation

## Provider boundary

Allar AI tengingar skulu fara í gegnum provider/service lag. Domain services mega ekki kalla beint í Foundry, LLM eða embedding þjónustu.

Provider contract skal síðar halda utan um:

- provider name
- model eða deployment
- request kind
- input og output metadata
- latency og token usage þar sem við á
- confidence eða scoring
- warnings
- source mapping
- audit reference

## Review state

AI output skal sjálfgefið vera `suggested` eða `needs_review`. Aðeins domain workflow má færa niðurstöðu í `approved`.

Þetta gildir sérstaklega um:

- útdregin skjalaatriði
- tollflokkunartillögur
- leyfisskylduviðvaranir
- samantektir sem hafa áhrif á ákvarðanir

## Útskiptanleiki

Kerfið skal hannað þannig að hægt sé að:

- nota Azure AI Foundry í fyrstu útfærslu
- bæta við öðrum LLM eða OCR veitanda síðar
- skipta um embedding þjónustu án breytinga á domain-líkani
- endurkeyra úrvinnslu án þess að missa audit trail
