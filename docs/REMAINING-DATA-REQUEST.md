# Gögn sem standa eftir fyrir Frigg

Síðast uppfært: 2026-04-22

## Hlutverk

Þetta skjal listar þau gögn sem Frigg getur ekki fengið sjálft af opnum vefjum og þurfa því að koma frá notanda, viðskiptavini eða innskráðum kerfum.

## Það sem stendur eftir

### Payroll-native rekstrargögn

- Nafnlausir launaseðlar úr raunverulegum launakeyrslum.
- Tímaskráningar, vaktaplön og hrá vinnustundagögn.
- Ráðningarsamningar og viðbætur við ráðningarkjör.
- Starfsmannaskrár með starfstitli, starfshlutfalli, vinnustað og tengingu við félag eða sjóð.

### Routing og aðild

- Hvaða starfsmaður greiðir í hvaða lífeyrissjóð.
- Hvaða starfsmaður tilheyrir hvaða stéttarfélagi.
- Hvenær fyrirtæki nota sérkjör eða fyrirtækjasamninga sem víkja frá almennri grunnleið.
- Innri mapping milli starfa, starfsstöðva og kjarasamningsumhverfis.

### Skil og reconciliation

- Raunverulegar skilagreinar til lífeyrissjóða og stéttarfélaga.
- Bankaskrár fyrir útborgun launa.
- Dæmi um leiðréttingar, afturvirkar breytingar og endurkeyrslur.
- Raunveruleg launamiða- og launaframtalsskil úr launakerfi.

### Lokuð og innskráningarvarin gögn

- Gögn af launagreiðendavefjum sem krefjast innskráningar.
- Veflyklar, API-lyklar og tæknilegar skilalýsingar sem ekki eru birtar opinberlega.
- Innri handbækur hjá sjóðum, félögum eða viðskiptavinum.

### Túlkun og review

- Lögfræðiálit, minnisblöð og innri verklagsreglur.
- Dæmi um ágreiningsmál, frávik og túlkanir sem ekki birtast á opinberum vef.
- Staðfesting á því hvaða edge cases eru algengust í raunrekstri viðskiptavina.

## Forgangur fyrir næstu lotu

1. `10-20` nafnlausir launaseðlar með mismunandi tilvikum.
2. `10-20` tímaskráningar eða vaktaplön sem tengjast þeim launaseðlum.
3. Dæmi um `3-5` raunveruleg sjóða- eða stéttarfélagaskil.
4. `5-10` ráðningarsamningar eða staðlaðar ráðningarforsendur í nafnlausri mynd.
5. Listi yfir hvaða stéttarfélög og lífeyrissjóði fyrstu viðskiptavinirnir nota í raun.

## Núverandi intake-staða í repo

- Intake pakkinn fyrir `VR retail` er nú til sem demógrunnur í repo og sýnir hvaða afhending telst hluti af fyrsta payroll-native pakkanum.
- Sá pakki er enn merktur `demo_only` og má ekki túlka sem raunverulega viðskiptavinainnslátt eða certified runtime grunn.
- Næsta raunverulega framför er að skipta einstökum demófærslum út fyrir nafnlaus customer uploads með skýrri nafnlausnar- og sannprófunarstöðu.
- Fyrsta afhendingarsniðið segir nú nákvæmlega hvaða fimm gagnategundir þurfa að koma saman fyrir fyrsta raunverulega `VR retail` pakka, í hvaða formi og með hvaða lágmarki.
- Repo sýnir nú líka móttökumat sem verður ekki grænt fyrr en raunveruleg nafnlaus innsending hefur lokað þessum skilyrðum.

## Fyrsta afhendingarsniðið sem við viljum fá næst

Safnið einum samhangandi pakka fyrir sama tímabil og sama samningssvið:

1. `3+` nafnlausir launaseðlar fyrir sömu keyrslu.
2. Heill mánuður af tímaskrám eða vaktaplani fyrir sömu starfsmenn.
3. Ráðningarsamningur eða staðfest kjör fyrir alla í pakkanum.
4. Routing tafla sem segir hvaða stéttarfélag og lífeyrissjóður gildir fyrir hvern starfsmann.
5. Að minnsta kosti ein skilagrein eða skilastaðfesting fyrir sama tímabil.

Lágmarksskilyrði:

- Sömu dulnefndu starfsmannakenni verða að vera notuð í launaseðlum, tímaskrám og ráðningargögnum.
- Sama keyrslutímabil þarf að liggja undir öllum skjölum í pakkanum.
- Persónugreinanlegar upplýsingar skulu fjarlægðar eða dulnefndar áður en gögn eru send inn.

## Athugasemd um HREIN_GOGN

- Núverandi innihald í `HREIN_GOGN` er mjög verðmætt fyrir bókhald, afstemmingu og framtalsrekjanleika.
- Það dugar hins vegar ekki eitt og sér til að byggja payroll rule engine, routing engine eða golden scenario safn fyrir launavél.
