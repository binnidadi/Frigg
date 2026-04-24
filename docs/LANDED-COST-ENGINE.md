# Landað Kostnaðarverð

Síðast uppfært: 2026-04-24

## Markmið

Reiknivél fyrir landað kostnaðarverð í Frigg skal vera determinísk, prófanleg og útskýranleg. Hún má ekki nota LLM til að reikna fjárhagslegar niðurstöður, tolla, gjöld eða skatta.

## Núverandi staða

Lota 4 hefur sett upp fyrsta TypeScript grunn í `packages/engine`. Grunnurinn styður:

- vörulínur með magni, einingaverði og gjaldmiðli
- flutnings- og tryggingarkostnað sem inntak
- gengi sem skýrt inntak með source reference
- synthetic gjaldareglur sem prófunarinntak
- úttak í ISK
- formúlur, inntök, milliskref, warnings og rounding policy

Þessi lota skilgreinir ekki production tolla, vörugjöld eða VSK. Öll gjaldahlutföll koma sem inntak og þurfa síðar að tengjast yfirfarinni heimild, reglu eða mannlegri staðfestingu.

## Rounding Policy

Fyrsta útgáfa styður aðeins:

- `mode`: `half_up`
- `scale`: `0`
- úttak: heilar ISK

Þetta er vísvitandi þröngt til að halda reiknirökfræði einfaldri, endurkeyranlegri og auðprófanlegri.

## Golden Scenario

Golden próf er byggt á synthetic fixture:

- `fixtures/synthetic/import-review-scenario.json`
- `fixtures/synthetic/landed-cost-golden-scenario.json`

Prófið notar synthetic EUR/ISK gengi og synthetic gjaldareglur. Niðurstaðan má aðeins nota til að sannreyna reiknivélina, ekki sem toll-, gjalda- eða skattaniðurstöðu.

## Næsta Skref

Næsta costing-lota ætti að:

1. Tengja engine input við domain contracts í `packages/domain`.
2. Bæta við fleiri rounding-prófum og edge cases.
3. Bæta við audit event fyrir útreikning.
4. Undirbúa rule artifact format fyrir raunverulegar gjaldareglur með review state.
