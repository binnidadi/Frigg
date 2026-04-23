# Staða Frigg

Síðast uppfært: 2026-04-23

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
- Research workspace hefur nú verið fyllt með fyrstu raunverulegu kortlagningu fyrir skattaskyldur, lífeyrissjóði, stéttarfélög, túlkunarheimildir og VR coverage pakka.
- Coverage matrix hefur verið bætt við research workspace, API og mælaborð með fyrstu studdu, review-skyldu og blokkuðu sviðunum.
- Fyrsti featured coverage pakkinn tengir nú saman reglusett, statutory parameter set og routing-reglur í lesanlegt trust boundary.
- Trust boundary pakkinn er nú brotinn niður í launalínumörk sem sýna hvað er vottað, hvað er review-skylt og hvað er blokkað.
- Fyrsta evidence-lagið tengir nú launaseðil, evidence records og line-item trust mörk í featured coverage pakkanum.
- Fyrsta frávikagreiningarlagið ber nú saman ráðningarkjör, skráðar stundir og launaseðil í sama featured pakka.
- Notendatexti í forsíðu, innskráningu, mælaborði og AI-forsýningum hefur verið hertur til að vera skýrari, íslenskari og faglegri.
- `HREIN_GOGN` hefur verið greint og staðfest sem bókhalds- og afstemmingalag fremur en payroll-native truth layer.
- Grunnlag rannsóknarvinnusvæðis hefur verið bætt við í contracts, gagnamódeli, seed gögnum og source-of-truth skjölum.
- Heildarúttekt á stefnu, product direction og heimildalandslagi hefur verið framkvæmd og category-afstaða hert: Frigg er labour/payroll compliance operating system, ekki bara launakerfi með AI lagi.

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
- Fyrstu raunverulegu prófílar fyrir LIVE, Gildi, Frjálsa, Stapa, Festu, VR, Eflingu og SGS
- Fyrsti skýri `compute_with_review` pakkinn fyrir `VR retail + staðgreiðsla + tryggingagjald + LIVE routing`
- Fyrsta sýnilega trust boundary samantektin fyrir þennan pakka í API og mælaborði
- Fyrsta line-item skýringarlagið fyrir trust boundary pakkann
- Fyrsta sönnunarlagið sem sýnir hvaða launalínur hafa raunverulegar evidence færslur í demo-snapshot
- Fyrsta contract-vs-timesheet-vs-pay frávikagreiningin í API og mælaborði
- Skýrari stefnumynd um markaðssneið, category og forgangsröðun næstu capability-lotu

## Hvað er í vinnslu

- Canonical architecture fyrir payroll engine, Trust Center og AI review pipeline
- Framlenging contracts yfir í gagnamódel fyrir run lifecycle og audit reconstruction
- Database-first skráning fyrir statutory parameters, knowledge records, review tasks og research operating system
- Raunverulegur gagnagrunnsdrifari í stað file/memory drivers
- Lifandi tengingar við ytri AI veitendur og telemetry
- Coverage matrix fyrir kjarasamninga, sjóði og félög
- Trust Center yfirborð sem sýnir coverage og residual risk
- Samningssviðsgreining fyrir rétta flokkun starfa, starfstöðva og kjarasamningsumhverfis
- Evidence lag fyrir launaseðla, tímaskráningar, ráðningarsamninga og frávikagreiningu

## Hvað er næst

1. Fá inn fyrsta payroll-native private corpus pakkann: launaseðla, tímaskráningar, ráðningarsamninga, routing gögn og skilagreinar.
2. Byggja samningssviðsgreiningu fyrir rétta flokkun starfa og samningsumhverfis.
3. Festa fyrsta payroll-native private corpus pakkann inn í frávikagreiningu og review workflow.
4. Tengja repository layer við raunverulegan gagnagrunnsdrifara.
5. Búa til og festa `pnpm-lock.yaml` í fyrsta umhverfi þar sem `pnpm` er tiltækt.

## Áhætta núna

- Enginn production gagnagrunnur er kominn í loftið enn.
- `pnpm-lock.yaml` vantar enn þar sem `pnpm` er ekki tiltækt í núverandi vél, svo full endurtekningarhæfni er ekki komin í repo enn.
- Public corpus er registry og URL-kortlagning en ekki fullt raw-download archive.
- Private corpus fyrir launaseðla, tímaskráningu, skilagreinar og routing vantar enn.
- AI provider layer er enn án lifandi tenginga við ytri veitendur og án raunverulegra health mælinga.
- Samningssviðsgreining og samanburður milli kjarasamninga eru ekki komin í keyrsluhæft lag enn.
- Núverandi checks verja foundation og research readiness, en ekki enn raunverulega payroll hegðun eða golden scenarios.
