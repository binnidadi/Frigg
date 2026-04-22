# Compliance Research Frigg

Síðast uppfært: 2026-04-22

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
- Research operating system baseline er nú skilgreint í `docs/RESEARCH-OPERATING-SYSTEM.md` og stutt í gagnamódeli og contracts.
- Fyrstu raunverulegu research records hafa verið skráðar í `db/seeds/research-workspace.json` fyrir staðgreiðslu, tryggingagjald, reiknað endurgjald, orlof, veikindi, lífeyrissjóðsiðgjöld, stéttarfélagsrouting og launaseðil sem sönnunargagn.
- Fyrstu prófílar fyrir `VR`, `Eflingu`, `SGS`, `LIVE`, `Gildi`, `Frjálsa`, `Stapa` og `Festu` hafa verið festir með operational status og source depth.
- Fyrsta coverage matrix hefur verið fest með skýrum mörkum milli `compute_with_review`, `cannot_compute` og blokkeraðra sviðsmynda.
- Fyrsti samsetti pakkinn `VR retail + staðgreiðsla + tryggingagjald + LIVE routing` er nú sýnilegur sem fyrsta raunverulega `compute_with_review` sviðið.
- Sami pakki er nú tengdur við raunverulegt demo-reglusett, statutory parameter set og routing-reglur svo trust boundary sé lesanlegt í vöruyfirborði.
- Nú liggur einnig fyrir fyrsta line-item niðurbrotið fyrir þennan pakka, með skýrum mörkum milli `certified`, `review_required` og `blocked`.

## Næsta vinna sem þessi rannsókn kallar á

1. Tengja source acquisition records við public registry og síðar private corpus intake.
2. Stækka coverage matrix yfir allan markaðinn með eiginlegum certified marksviðum.
3. Golden scenarios fyrir fjölgreiðendur, A1, veikindi, fæðingarorlof og afturvirkar leiðréttingar.
4. Brjóta `SGS` og aðrar heildarskrár niður í einstaklingsbundin félaga- og landfræðiprófíl.
5. Trust Center gagnalíkan og certified coverage reporting.
