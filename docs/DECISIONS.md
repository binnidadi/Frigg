# Lykilákvarðanir

## D-001: Frigg er compliance-first launakerfi

- Staða: Samþykkt
- Ástæða: Samkeppnisvörnin verður nákvæmni, audit og trust fremur en flashy AI automation.

## D-002: AI er hjálparlag, ekki production útreikningsvél

- Staða: Samþykkt
- Ástæða: Laun verða að vera deterministic, sannprófanleg og endurkeyranleg.

## D-003: Hver króna skal vera útskýrð

- Staða: Samþykkt
- Ástæða: Þetta er kjarninn í adoption, retention og compliance trausti.

## D-004: Vandað íslenskt málfar er hluti af vörugæðum

- Staða: Samþykkt
- Ástæða: Frigg vinnur íslenskan markað og verður að tala skýrt, rétt og faglega á íslensku.

## D-005: Eftir hverja uppfærslu skal samræma skjöl

- Staða: Samþykkt
- Ástæða: Repo á alltaf að sýna núverandi stöðu, stefnu og næstu skref án gloppna.

## D-006: Almennur vinnumarkaður með A1 er sjálfgefin lagaleg afmörkun

- Staða: Samþykkt
- Ástæða: Nær raunverulegum SME edge cases með sterku markaðsgildi án þess að teygja fyrstu útgáfur yfir í alla sérheima vinnumarkaðarins.

## D-007: Compliance birtist sem software + review workflow

- Staða: Samþykkt
- Ástæða: Skalar betur en þjónustudrifið líkan og verður trust moat með skýringum, audit trail og mannlegri yfirferð þar sem óvissa er til staðar.

## D-008: AI veitendur skulu keyrðir í failover röð með telemetry og cooldown

- Staða: Samþykkt
- Ástæða: AI lagið má ekki velta á einum veitanda og verður að skýra hvaða módel svaraði og hvenær fallback var notað.

## D-009: Kjarasamningslestur skal fara í gegnum staged parser pipeline

- Staða: Samþykkt
- Ástæða: `detect`, `parse`, `normalize`, `preview` og `warnings` gera review workflow, explainability og bilanagreiningu skýrari en eitt svart parse skref.

## D-010: Confidence skal vera samsett úr deterministic og AI merkjum

- Staða: Samþykkt
- Ástæða: Sjálfsmat líkans eitt og sér er ekki nægilega traust fyrir payroll og compliance.

## D-011: Public corpus og private corpus skulu haldin aðskilin

- Staða: Samþykkt
- Ástæða: Opið efni má skrá og útgáfustýra sjálfstætt, en viðskiptavinagögn og innskráningarvarið efni þurfa sérmeðferð, strangari aðgangsstýringu og skýra rekjanleika.

## D-012: Runtime apps haldast JS-first þar til foundation-lagið er hert

- Staða: Samþykkt
- Ástæða: `apps/api` og `apps/web` eru enn á grunnstigi með einföldum `node` skriftum, seed gögnum og léttum checks. Á þessu stigi er skýrara og öruggara að halda runtime-lögunum JS-first, herða config, CI, lock-skrá og afhendanleika fyrst, og fara síðan í samræmda TypeScript build-keðju í einni markvissri lotu.
