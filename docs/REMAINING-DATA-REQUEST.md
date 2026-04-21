# Godn sem standa eftir fyrir Frigg

Sidast uppfaert: 2026-04-21

## Hlutverk

Thetta skjal listar þau gogn sem Frigg getur ekki fengid sjalft af opnum vefjum og tharf thvi ad koma fra notanda, vidskiptavini eda innskradum kerfum.

## Það sem stendur eftir

### Payroll-native rekstrargogn

- Nafnlausir launasedlar ur raunverulegum launakeyrslum.
- Timaskraningar, vaktaplon og hra vinnustundagogn.
- Radningarsamningar og vidbaetur vid radningarkjor.
- Starfsmannaskrar med starfstitli, starfshlutfalli, vinnustad og tengingu vid felag/sjod.

### Routing og adild

- Hvaða starfsmadur greidir i hvaða lifeyrissjod.
- Hvaða starfsmadur tilheyrir hvaða stettarfelagi.
- Hvenær fyrirtæki nota serkjor eda fyrirtækjasamninga sem vikja fra almennri grunnleid.
- Innri mapping milli starfa, starfsstodva og kjarasamningsumhverfis.

### Skil og reconciliation

- Raunverulegar skilagreinar til lifeyrissjoda og stettarfelaga.
- Bankaskrar fyrir utborgun launa.
- Daemi um leidrettingar, afturvirkar breytingar og endurkeyrslur.
- Raunveruleg launamanna- og launaframtalsskil ur launakerfi.

### Lokud og innskraningarvord gogn

- Godn af launagreidendavefjum sem krefjast innskraningar.
- Veflyklar, API-lyklar og taeknilegar skilalysingar sem ekki eru birtar opinberlega.
- Innri handbaekur hja sjodum, felogum eda vidskiptavinum.

### Tulkun og review

- Logfraedialit, minnisblod og innri verklagsreglur.
- Daemi um agreiningsmal, fravik og tulkanir sem ekki birtast a opinberum vef.
- Stadfesting a thvi hvaða edge cases eru algengust i raunrekstri vidskiptavina.

## Forgangur fyrir naestu lotu

1. `10-20` nafnlausir launasedlar med mismunandi tilvikum.
2. `10-20` timaskraningar eda vaktaplon sem tengjast theim launasedlum.
3. Daemi um `3-5` raunveruleg sjoda- eda stettarfelagaskil.
4. `5-10` radningarsamningar eda stadladar radningarforsendur i nafnlausri mynd.
5. Listi yfir hvaða stettarfelog og lifeyrissjodi fyrstu vidskiptavinirnir nota i raun.

## Athugasemd um HREIN_GOGN

- Nuverandi innihald i `HREIN_GOGN` er mjog verdmaett fyrir bokhald, afstemmingu og framtalsrekjanleika.
- Það dugar hins vegar ekki eitt og ser til ad byggja payroll rule engine, routing engine eda golden scenario safn fyrir launavel.
