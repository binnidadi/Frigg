# Lykilákvarðanir

## D-001: Tollvörð Pro er SaaS-first innflutningskerfi

- Staða: Samþykkt
- Ástæða: Kjarnavirði vörunnar liggur í stýrðu innflutningsferli, rekjanleika, audit, samþættingum og determinískri reiknirökfræði.

## D-002: AI Foundry er capability layer, ekki kjarni vörunnar

- Staða: Samþykkt
- Ástæða: Foundry getur aukið virði í skjalalestri, retrieval og tillögum, en domain core verður að vera eign kerfisins og útskiptanlegur frá AI-laginu.

## D-003: Engin fake certainty í tollflokkun eða reglufylgni

- Staða: Samþykkt
- Ástæða: Tollflokkun, leyfisskylda og reglufylgni geta haft fjárhagslegar og lagalegar afleiðingar. Kerfið skal sýna tillögur, óvissu, heimildir og review state skýrt.

## D-004: Peningaleg rökfræði er determinísk

- Staða: Samþykkt
- Ástæða: Landað kostnaðarverð, skattar, gjöld, tollar og VSK verða að vera prófanleg, endurkeyranleg og útskýrð með formúlum og milliskrefum.

## D-005: Skjöl og staða uppfærast í hverri lotu

- Staða: Samþykkt
- Ástæða: Repository á alltaf að sýna hvar verkefnið er statt, hvert það stefnir og hvaða ákvarðanir hafa verið teknar.

## D-006: Vandað íslenskt málfar er vörukrafa

- Staða: Samþykkt
- Ástæða: Tollvörð Pro vinnur fyrir íslenskan markað. Skýr, nákvæm og fagleg íslenska eykur traust og minnkar hættu á misskilningi.

## D-007: Tæknigrunnur kemur á undan business logic

- Staða: Samþykkt
- Ástæða: Prisma schema, domain contracts og landed cost reiknivél eiga að byggja á stöðugri TypeScript, workspace og check keðju. Lota 2 stofnar því tæknigrunn án þess að falsa tollflokkun, reglufylgni eða fjárhagslega útreikninga.

## D-008: Next server layer er sjálfgefið API lag í fyrstu

- Staða: Samþykkt
- Ástæða: Sérstakt API app er ekki nauðsynlegt fyrr en samþættingar, bakgrunnsvinnsla eða deployment mörk kalla á það. Þetta heldur fyrstu útfærslu einfaldri og PR-vænni.

## D-009: Heimildir eru versioned domain artifacts

- Staða: Samþykkt
- Ástæða: Tollflokkunartillögur, leyfisskylduviðvaranir og reglur þurfa að vísa í skýrar heimildir með útgáfu, sóttum tíma, checksum eða varðveisluvísun og review state. Heimildaskrá er því domain-lag, ekki aðeins skjölun.

## D-010: Raw viðskiptavinagögn fara ekki í Git

- Staða: Samþykkt
- Ástæða: Gögn eins og bankayfirlit, framtöl, skjöl og bókhaldsgögn geta innihaldið viðkvæmar upplýsingar. Repo skal aðeins nota synthetic eða samþykkt hreinsuð fixtures.
