# Staða Frigg

Síðast uppfært: 2026-04-22

## Hvar við erum

- Repo hefur verið sett upp sem grunn-monorepo.
- Source-of-truth skjöl hafa verið stofnuð og samræmd.
- Source-of-truth skjöl fyrir public corpus, private corpus og `HREIN_GOGN` hafa verið leiðrétt þannig að þau standist kröfur um vandað íslenskt málfar.
- Fyrstu canonical TypeScript contracts fyrir AI, reglur, compliance og launadomain hafa verið skilgreind.
- Fyrsta SQL-skema, snapshot API, repository layer og seed workflow hafa verið sett upp.
- AI failover grunnur, parser pipeline, confidence lag og provider adapterar hafa verið innleidd í `packages/ai`.
- `apps/api` birtir nú snapshot, scenarios, repository status, AI health, parse preview og knowledge preview.
- `apps/api` birtir nú einnig rannsóknarvinnusvæði, rannsóknaryfirlit og forgangsgögn úr einkagagnasafni.
- `apps/web` sækir þessi gögn og birtir þau í forsíðu, innskráningu og mælaborði.
- `.env.example` og fyrsta CI workflow hafa verið bætt við svo grunnuppsetning og check keyrsla séu skýrari.
- Vefurinn styður nú stillanlegt API grunnslóð í gegnum `meta` stillingu í stað harðkóðaðrar forsendingar eingöngu í `script.js`.
- Fyrsta opinbera source collection lota hefur verið kortlögð í docs og véllesanlegu registry.
- `HREIN_GOGN` hefur verið greint og staðfest sem bókhalds- og afstemmingalag fremur en payroll-native truth layer.
- Grunnlag rannsóknarvinnusvæðis hefur verið bætt við í contracts, gagnamódeli, seed gögnum og source-of-truth skjölum.

## Hvað er lokið

- Verkefnaheiti og kjarnaafstaða fest
- Monorepo grunnur
- Docs pipeline fyrir stöðu, roadmap og ákvarðanir
- Grunnstaðfesting á `apps/api`, `apps/web`, migration runner og seed workflow með innbyggðum `node` scripts
- Grunnorðasafn fyrir samræmda íslensku
- Fyrsti domain contract grunnur
- Arkitektúrgrunnur og vöruprinsipp
- Fyrsta UI yfirborð með trust-first stefnu
- Compliance contracts fyrir skatt, routing, A1, deadlines og audit evidence
- SQL-skema, golden scenario backlog og fyrsta lesanlega API snapshot lag
- AI contracts fyrir execution records, parser stages, provider health og confidence
- Provider adapterar fyrir GitHub Models, Gemini, SambaNova og Mistral
- Öruggari rendering í web-lagi fyrir lista- og töfluúttak
- Repository driver, migration runner og file-based seed workflow
- Public source registry fyrir lög, Skattinn, sjóði, félög og túlkunarheimildir
- Vantalisti fyrir private corpus og greining á `HREIN_GOGN`
- Rannsóknarstraumar, lagaskyldur, skráning heimilda og prófílfærslur fyrir sjóði og félög
- Rannsóknarvinnusvæði tengt inn í API og mælaborð sem lesanlegt readiness lag
- Samþykkt afstaða um að runtime apps séu JS-first þar til foundation-lagið er tilbúið fyrir samræmda TypeScript build-keðju

## Hvað er í vinnslu

- Canonical architecture fyrir payroll engine, Trust Center og AI review pipeline
- Framlenging contracts yfir í gagnamódel fyrir run lifecycle og audit reconstruction
- Database-first skráning fyrir statutory parameters, knowledge records, review tasks og research operating system
- Raunverulegur gagnagrunnsdrifari í stað file/memory drivers
- Lifandi tengingar við ytri AI veitendur og telemetry
- Coverage matrix fyrir kjarasamninga, sjóði og félög
- Trust Center yfirborð sem sýnir coverage og residual risk

## Hvað er næst

1. Fylla research workstreams, legal obligations, pension fund profiles og union profiles með raunverulegri kortlagningu.
2. Búa til og festa `pnpm-lock.yaml` í fyrsta umhverfi þar sem `pnpm` er tiltækt.
3. Tengja repository layer við raunverulegan gagnagrunnsdrifara.
4. Færa public source registry inn í knowledge records og coverage matrix.
5. Bæta private corpus við með launaseðlum, tímaskráningu, skilagreinum og routing gögnum.

## Áhætta núna

- Enginn production gagnagrunnur er kominn í loftið enn.
- `pnpm-lock.yaml` vantar enn þar sem `pnpm` er ekki tiltækt í núverandi vél, svo full endurtekningarhæfni er ekki komin í repo enn.
- Public corpus er registry og URL-kortlagning en ekki fullt raw-download archive.
- Private corpus fyrir launaseðla, tímaskráningu, skilagreinar og routing vantar enn.
- AI provider layer er enn án lifandi tenginga við ytri veitendur og án raunverulegra health mælinga.
