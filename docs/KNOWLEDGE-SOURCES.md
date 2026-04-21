# Þekkingarheimildir

Síðast uppfært: 2026-04-21

## Staða

Þetta skjal heldur utan um hvaða heimildir Frigg byggir á og hvort þær hafi verið færðar í formlegt knowledge registry.

Fyrsta opinbera söfnunarlotan er nú skráð í:

- `docs/PUBLIC-SOURCE-REGISTRY.md`
- `db/seeds/public-source-registry.json`
- `docs/REMAINING-DATA-REQUEST.md`
- `docs/HREIN-GOGN-INVENTORY.md`

## Heimildaflokkar

| Heimildaflokkur | Dæmi | Hlutverk | Staða |
| --- | --- | --- | --- |
| statutory | Alþingi, Skatturinn | lög, skattar, skil og compliance | registry komið |
| collective_agreement | VR, Efling | kjarasamningar, uppbætur og samningsbundin gjöld | registry komið |
| pension | LIVE, Gildi, Frjálsi, Stapi, Festa | lífeyrisrouting, gjalddagar og skil | registry komið |
| union | VR, Efling, SGS og félagaskrár | félagsgjöld, sjóðir og coverage | registry komið |
| interpretation | ASÍ og sambærilegar leiðbeiningar | launaseðill, veikindaréttur og edge cases | registry komið |

## Mikilvæg niðurstaða

- Frigg hefur nú skýrt `public corpus` fyrir stóran hluta af payroll- og compliance-laginu.
- `HREIN_GOGN` er ekki payroll-native source-of-truth heldur fyrst og fremst bókhalds- og afstemmingalag.
- Það sem stendur eftir er að mestu `private corpus`: raunveruleg launagögn, skilagreinar, innskráningarvarið efni og fyrirtækjabundið mapping.

## Næstu skref

- Umbreyta registry í versioned knowledge records í gagnalagi.
- Stofna coverage matrix fyrir lög, sjóði, félög og samninga.
- Merkja hvaða heimildir eru `supported`, `partial` eða `review_required`.
- Bæta private corpus ofan á public corpus þegar notandi útvegar það efni sem vantar.
