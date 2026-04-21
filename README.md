# Frigg

Frigg er compliance-first launavél fyrir íslenskan vinnumarkað. Markmiðið er að byggja traustasta, skýranlegasta og rekjanlegasta SaaS launakerfi Íslands fyrir lítil og meðalstór fyrirtæki.

## Staða

Verkefnið er á grunnstigi. Núverandi áhersla er að festa:

- monorepo-grind
- source-of-truth skjöl
- canonical domain contracts
- trust-first arkitektúr

Nánari staða er í [docs/STATUS.md](/C:/Users/PC/Desktop/Frigg/docs/STATUS.md).

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
  ai/         AI provider layer, prompts og RAG workflows
  contracts/  Sameiginleg Zod schemas og TypeScript contracts
  engine/     Deterministic launavél og sannprófun
docs/         Source-of-truth skjöl fyrir stöðu, stefnu og ákvarðanir
```

## Source of Truth

- [docs/STATUS.md](/C:/Users/PC/Desktop/Frigg/docs/STATUS.md)
- [docs/ROADMAP.md](/C:/Users/PC/Desktop/Frigg/docs/ROADMAP.md)
- [docs/DECISIONS.md](/C:/Users/PC/Desktop/Frigg/docs/DECISIONS.md)
- [docs/ARCHITECTURE.md](/C:/Users/PC/Desktop/Frigg/docs/ARCHITECTURE.md)
- [docs/PRODUCT-PRINCIPLES.md](/C:/Users/PC/Desktop/Frigg/docs/PRODUCT-PRINCIPLES.md)
- [docs/KNOWLEDGE-SOURCES.md](/C:/Users/PC/Desktop/Frigg/docs/KNOWLEDGE-SOURCES.md)
- [docs/GLOSSARY.md](/C:/Users/PC/Desktop/Frigg/docs/GLOSSARY.md)

## Næstu skref

1. Festa canonical reglusnið fyrir kjarasamninga.
2. Byggja deterministic payroll engine með tvöfaldri sannprófun.
3. Setja upp RAG pipeline með human-in-the-loop review.
4. Hanna homepage, innskráningu og dashboard með trust-first UX.
