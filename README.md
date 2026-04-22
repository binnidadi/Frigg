# Frigg

Frigg er compliance-first launavél fyrir íslenskan vinnumarkað. Markmiðið er að byggja traustasta, skýranlegasta og rekjanlegasta SaaS launakerfi Íslands fyrir lítil og meðalstór fyrirtæki.

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

Nánari staða er í `docs/STATUS.md`.

## Kjarnaforsendur

- AI má aðstoða við lestur, flokkun og tillögur að reglum.
- Production laun skulu alltaf reiknuð með deterministic regluvél.
- Hver niðurstaða á að vera útskýrð niður í heimild, reglu og reikniskref.
- Öll notendamiðuð skjöl og viðmót skulu vera á vandaðri íslensku.

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

1. Tengja repository layer við raunverulegan gagnagrunnsdrifara í stað file seed drivers.
2. Virkja rannsóknarvinnusvæðið fyrir lög, sjóði, félög, lagaskyldur og skráningu heimilda.
3. Færa opinbera heimildaskrá yfir í útgáfustýrðar þekkingarfærslur og coverage matrix.
4. Bæta einkagagnasafni við með launaseðlum, tímaskráningu, skilagreinum og routing gögnum.
5. Tengja provider adapters við lifandi umhverfislykla, health telemetry og lestur samningsgagna.
