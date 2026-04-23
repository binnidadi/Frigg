# Frigg

Frigg er compliance-first vinnuréttar-, kjarasamninga- og launavél fyrir íslenskan vinnumarkað. Markmiðið er að byggja traustasta, skýranlegasta og rekjanlegasta SaaS stýrikerfið á Íslandi fyrir laun, kjarasamninga og vinnuréttarlegt compliance.

## Staða

Verkefnið er á grunnstigi. Núverandi áhersla er að festa:

- monorepo-grind
- source-of-truth skjöl
- canonical domain contracts
- trust-first arkitektúr
- fyrsta product surface fyrir forsíðu, innskráningu og mælaborð
- compliance- og knowledge-lag fyrir íslenskan vinnumarkað
- database-first gagnamódel og fyrsta API snapshot lag
- AI failover grunn, parser pipeline og composite confidence lag
- repository lag og migration runner ofan á `db/schema.sql`
- `memory` og `file` repository driver með seed workflow fyrir varanleg demo-gögn
- opinbert source registry fyrir lög, Skattinn, lífeyrissjóði og stéttarfélög
- rannsóknarvinnusvæði með grunnlagi fyrir rannsóknarstrauma, lagaskyldur og readiness á einkagagnasafni
- grunnlag fyrir afhendanleika með `.env.example`, stillanlegu API grunnslóði í vefnum og CI keyrslu
- fyrsta raunverulega research-kortlagning fyrir skattaskyldur, routing, VR, Eflingu, SGS og valda lífeyrissjóði
- fyrsta coverage matrix fyrir studd, review-skyld og blokkuð research-svið
- fyrsti sýnilegi trust boundary pakkinn fyrir `VR retail + staðgreiðsla + tryggingagjald + LIVE routing`
- fyrsta line-item niðurbrotið sem sýnir hvað er vottað, review-skylt og blokkað innan trust boundary pakkans
- fyrsta evidence-lagið sem tengir launaseðil, launalínu og sönnunarfærslur inn í featured trust boundary pakkann
- uppfærða category-afstöðu: Frigg er ekki bara launakerfi heldur labour/payroll compliance operating system

Nánari staða er í `docs/STATUS.md`.

## Kjarnaforsendur

- AI má aðstoða við lestur, flokkun og tillögur að reglum.
- Production laun skulu alltaf reiknuð með deterministic regluvél.
- Hver niðurstaða á að vera útskýrð niður í heimild, reglu og reikniskref.
- Öll notendamiðuð skjöl og viðmót skulu vera á vandaðri íslensku.

## Núverandi stefna

- Frigg er byggt sem `software + review workflow`, ekki sem þjónustuteymi falið á bak við viðmót.
- Fyrsta markaðssneið er atvinnurekendur, launafulltrúar, bókarar, ráðgjafar og HR teymi á almennum vinnumarkaði.
- Starfsmannahamur og víðari réttindagátt eru mikilvæg framtíðarsvið, en ekki rétt fyrsta wedge.
- Samkeppnisvörnin á að koma úr rekjanleika, skýringum, evidence-lagi, review-stýringum og coverage-sýnileika.

## Verkefnagrind

```text
apps/
  api/        Bakendi og útgáfa API
  web/        Framendi og stjórnborð
packages/
  ai/         AI provider failover, parser pipeline, confidence og knowledge retrieval
  contracts/  Sameiginleg TypeScript contracts
  engine/     Deterministic launavél og sannprófun
docs/         Source-of-truth skjöl fyrir stöðu, stefnu og ákvarðanir
db/           SQL-skema, migrations og seed gögnum
```

## Ubuntu ræsileið

1. Virkja `corepack` og setja upp workspace:
   ```bash
   corepack enable
   pnpm install
   ```
2. Afrita umhverfisgrunn:
   ```bash
   cp .env.example .env
   ```
3. Ræsa API:
   ```bash
   pnpm --filter @frigg/api dev
   ```
4. Opna vefskrárnar úr `apps/web/` eða keyra build:
   ```bash
   pnpm --filter @frigg/web build
   ```

## Núverandi runtime-afstaða

- `apps/api` og `apps/web` eru nú JS-first runtime lög með einföldum `node` skriftum.
- `packages/contracts`, `packages/ai` og `packages/engine` bera áfram TypeScript domain- og arkitektúrgrunn.
- Næsta skref er að herða tooling og checks áður en runtime apps fara í fulla TypeScript build-keðju.

## Source of Truth

- `docs/STATUS.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/ARCHITECTURE.md`
- `docs/PRODUCT-PRINCIPLES.md`
- `docs/KNOWLEDGE-SOURCES.md`
- `docs/PUBLIC-SOURCE-REGISTRY.md`
- `docs/RESEARCH-OPERATING-SYSTEM.md`
- `docs/REMAINING-DATA-REQUEST.md`
- `docs/HREIN-GOGN-INVENTORY.md`
- `docs/COMPLIANCE-RESEARCH.md`
- `docs/GLOSSARY.md`

## Næstu skref

1. Festa fyrsta payroll-native private corpus pakkann: nafnlausa launaseðla, tímaskráningar, ráðningarsamninga, routing gögn og skilagreinar.
2. Byggja samningssviðsgreiningu svo kerfið geti valið rétt kjarasamningssvið áður en flóknari útreikningar eru vottaðir.
3. Bæta contract-vs-timesheet-vs-pay frávikagreiningu ofan á nýja evidence-lagið.
4. Tengja repository layer við raunverulegan gagnagrunnsdrifara í stað file seed drivers.
5. Búa til `pnpm-lock.yaml` í fyrsta `pnpm install` umhverfi og festa hana í repo.
