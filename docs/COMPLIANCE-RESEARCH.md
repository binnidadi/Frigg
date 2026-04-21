# Compliance Research Frigg

Síðast uppfært: 2026-04-21

## Markmið

Að festa þær rannsóknarniðurstöður sem ráða því hvort Frigg geti orðið besta og fullkomnasta launa-SaaS lausn Íslands fyrir almennan vinnumarkað.

## Það sem Frigg má ekki missa af

- `Persónuafsláttur yfir fleiri en einn greiðanda`
- `A1 vottorð` og lækkað tryggingagjald
- `Reiknað endurgjald`
- `Launaseðill sem sönnunargagn`
- `Lífeyrissjóðs- og stéttarfélagsrouting`
- `Veikindaréttur`, `veikindi barna`, `orlof` og `fæðingarorlof`
- `Persónuvernd` og aðgangsstýring að launagögnum

## Afleiðingar fyrir vöru

- Frigg þarf knowledge layer, ekki bara RAG index.
- Frigg þarf routing engine, ekki bara percentage calculator.
- Frigg þarf review workflow, ekki bara sjálfvirkan parse pipeline.
- Frigg þarf Trust Center sem sýnir coverage og residual risk.
- Frigg þarf payslip evidence model sem styður ágreining, endurskoðun og skýringar.

## V1 afmörkun

- Almennur vinnumarkaður
- A1 tilvik
- Software + review workflow

## Utan fyrstu lotu

- Opinber vinnumarkaður
- Sjómenn
- Aðrar sérgreinar sem krefjast sérlaga eða djúprar sérútfærslu frá fyrsta degi

## Ný staða eftir opinbera söfnunarlotu

- Public corpus hefur verið kortlagt í `docs/PUBLIC-SOURCE-REGISTRY.md`.
- Véllesanlegt registry hefur verið sett upp í `db/seeds/public-source-registry.json`.
- Vantalisti yfir private corpus hefur verið afmarkaður í `docs/REMAINING-DATA-REQUEST.md`.
- Greining á `HREIN_GOGN` hefur verið fest í `docs/HREIN-GOGN-INVENTORY.md`.

## Næsta vinna sem þessi rannsókn kallar á

1. Database schema fyrir statutory parameters, routing rules, knowledge sources og review tasks.
2. Golden scenarios fyrir fjölgreiðendur, A1, veikindi, fæðingarorlof og afturvirkar leiðréttingar.
3. Trust Center gagnalíkan og coverage matrix.
