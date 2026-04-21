# Opinber heimildaskra Frigg

Sidast uppfaert: 2026-04-21

## Hlutverk

Thetta skjal heldur utan um fyrstu sofnunarlotu a opnum heimildum fyrir Frigg.
Markmidid er ad festa hvaoa gogh hafa verid kortlogd, hvaoan þau koma og hvernig þau nytast i payroll- og compliance-lagi vorrunnar.

## Stada

- Fyrsta opinbera sofnunarlotan hefur verid kortlogd og faerd i vellesanlegt registry i `db/seeds/public-source-registry.json`.
- Heimildirnar na yfir `log`, `Skattinn`, `lifeyrissjodi`, `stettarfelog` og `tulkunarheimildir`.
- Registry-id geymir adeins opnar heimildir og opinberar slodir, ekki innskraningarvarid efni eda vidskiptavinagoghn.

## Flokkar

### Log og reglur

- Althingi: bokhald, stadgreidsla, tryggingagjald, tekjuskattur, orlof, veikindarettur, lagmarkskjor, lifeyrissjodslög, faedingarorlof, personuvernd og jafnrettislog.
- Thettar heimildir skilgreina lagmarkskrofur, vardveislu, launagreidendaabyrgd og skyldubundin gjold.

### Skatturinn

- Lagasafn Skattsins, skattthrep, personuafslattur, skattmat, reiknad endurgjald, tryggingagjald, launagreidendaskra, launamidar, launaframtal og rafraen skil.
- Thettar heimildir mynda statutory parameter lagid og skilalagid fyrir Frigg.

### Lifeyrissjodir

- Lifeyrismal.is sem heildarskra yfir sjodi.
- Opið launagreidendaefni fra `LIVE`, `Gildi`, `Frjalsa`, `Stapa` og `Festu`.
- Thettar heimildir nytast i routing, gjalddaga, eindaga, sjodsnumer og skilagreinar.

### Stettarfelog

- Opið efni fra `VR`, `Eflingu`, `SGS` og sambærilegum adilum.
- Thettar heimildir nytast i kjarasamninga, gjold, uppbaetur og skil til felaga og tengdra sjoda.

### Tulkunarheimildir

- Vinnurettarvefur ASI og sambærilegar opinberar leidbeiningasidur.
- Thettar heimildir nytast i skyringar a launasedli, veikindaretti, veikindum barna og sambærilegum edge cases.

## Helstu nidurstodur

- Mjog stor hluti af `statutory` og `open payroll guidance` er adgengilegur an thess ad notast vid vidskiptavinagogn.
- `Routing` i lifeyrissjodi og stettarfelog er ad hluta opinbert, en endanleg akvordun per starfsmadur og atvinnurekandi krefst private gagna.
- `HREIN_GOGN` inniheldur einkum afstemmingar, framtol, bankagogn og bokhaldsyfirlit en ekki naegileg payroll-native gogn fyrir fulla launavel.

## Hvernig thetta nytist naest

- Registry-id er undirlag fyrir versioned knowledge records.
- Það er haegt ad nota sem grunn fyrir coverage matrix og Trust Center.
- Það afmarkar skyrt hvaða gogn Frigg getur fengid sjalft og hvaða gogn notandi thearf ad utvega.
