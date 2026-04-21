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
- provider adaptera fyrir GitHub Models, Gemini, SambaNova og Mistral
- fyrstu API-endapunkta fyrir AI health, parse preview og knowledge preview
- vefyfirborð tengt við AI health og preview endapunkta
- mælaborð tengt við snapshot og scenarios fyrir run model samhengi
- web rendering hert gegn HTML injection í client-laginu
- repository lag og migration runner ofan á `db/schema.sql`

Nánari staða er í [stöðuskjalinu](docs/STATUS.md).

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
  contracts/  Sameiginleg Zod schemas og TypeScript contracts
  engine/     Deterministic launavél og sannprófun
docs/         Source-of-truth skjöl fyrir stöðu, stefnu og ákvarðanir
```

## Source of Truth

- [Staða verkefnis](docs/STATUS.md)
- [Vegvísir](docs/ROADMAP.md)
- [Ákvarðanir](docs/DECISIONS.md)
- [Arkitektúr](docs/ARCHITECTURE.md)
- [Vöruviðmið](docs/PRODUCT-PRINCIPLES.md)
- [Heimildasöfn](docs/KNOWLEDGE-SOURCES.md)
- [Regluverksrannsóknir](docs/COMPLIANCE-RESEARCH.md)
- [Orðasafn](docs/GLOSSARY.md)

## Næstu skref

1. Tengja repository layer við raunverulegan gagnagrunnsdrifara og seed gögn.
2. Tengja provider adapters við lifandi umhverfislykla, health telemetry og parser workflow.
3. Byggja deterministic payroll engine með tvöfaldri sannprófun.
4. Tengja product surface við snapshot API, review workflow og compliance states.
