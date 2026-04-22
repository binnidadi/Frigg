# Opinber heimildaskrá Frigg

Síðast uppfært: 2026-04-22

## Hlutverk

Þetta skjal heldur utan um fyrstu söfnunarlotu af opnum heimildum fyrir Frigg.
Markmiðið er að festa hvaða gögn hafa verið kortlögð, hvaðan þau koma og hvernig þau nýtast í payroll- og compliance-lagi vörunnar.

## Staða

- Fyrsta opinbera söfnunarlotan hefur verið kortlögð og færð í véllesanlegt registry í `db/seeds/public-source-registry.json`.
- Heimildirnar ná yfir `lög`, `Skattinn`, `lífeyrissjóði`, `stéttarfélög` og `túlkunarheimildir`.
- Registry-ið geymir aðeins opnar heimildir og opinberar slóðir, ekki innskráningarvarið efni eða viðskiptavinagögn.

## Flokkar

### Lög og reglur

- Alþingi: bókhald, staðgreiðsla, tryggingagjald, tekjuskattur, orlof, veikindaréttur, lágmarkskjör, lífeyrissjóðslög, fæðingarorlof, persónuvernd og jafnréttislög.
- Þessar heimildir skilgreina lágmarkskröfur, varðveislu, launagreiðendaábyrgð og skyldubundin gjöld.

### Skatturinn

- Lagasafn Skattsins, skattþrep, persónuafsláttur, skattmat, reiknað endurgjald, tryggingagjald, launagreiðendaskrá, launamiðar, launaframtal og rafræn skil.
- Þessar heimildir mynda statutory parameter lagið og skilalagið fyrir Frigg.

### Lífeyrissjóðir

- Lifeyrismal.is sem heildarskrá yfir sjóði.
- Opið launagreiðendaefni frá `LIVE`, `Gildi`, `Frjálsa`, `Stapa` og `Festu`.
- Þessar heimildir nýtast í routing, gjalddaga, eindaga, sjóðsnúmer og skilagreinar.

### Stéttarfélög

- Opið efni frá `VR`, `Eflingu`, `SGS` og sambærilegum aðilum.
- Þessar heimildir nýtast í kjarasamninga, gjöld, uppbætur og skil til félaga og tengdra sjóða.

### Túlkunarheimildir

- Vinnurettarvefur ASÍ og sambærilegar opinberar leiðbeiningasíður.
- Þessar heimildir nýtast í skýringar á launaseðli, veikindarétti, veikindum barna og sambærilegum edge cases.

## Helstu niðurstöður

- Mjög stór hluti af `statutory` og `open payroll guidance` er aðgengilegur án þess að notast við viðskiptavinagögn.
- `Routing` í lífeyrissjóðum og stéttarfélögum er að hluta opinbert, en endanleg ákvörðun fyrir hvern starfsmann og atvinnurekanda krefst private gagna.
- `HREIN_GOGN` inniheldur einkum afstemmingar, framtöl, bankagögn og bókhaldsyfirlit en ekki nægileg payroll-native gögn fyrir fulla launavél.

## Hvernig þetta nýtist næst

- Registry-ið er undirlag fyrir versioned knowledge records.
- Það er hægt að nota sem grunn fyrir coverage matrix og Trust Center.
- Það afmarkar skýrt hvaða gögn Frigg getur fengið sjálft og hvaða gögn notandi þarf að útvega.
