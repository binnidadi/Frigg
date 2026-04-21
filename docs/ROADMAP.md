# Vegvísir Frigg

## Núverandi áfangi

Grunnur fyrir mission-critical launakerfi með compliance-first hugsun.

## Áfangi 1: Foundation

- monorepo
- source-of-truth skjöl
- contracts og domain language
- architecture baseline
- product principles baseline
- database-first schema baseline
- golden scenarios baseline

## Áfangi 2: Core Engine

- deterministic payroll engine
- effective-dated rule sets
- line item model
- independent validation engine
- retro calculation batches
- tax credit allocation og multi-payer checks
- A1 og routing logic fyrir sjóði og félög

## Áfangi 3: Agreement Intelligence

- document ingestion
- clause chunking og provenance
- AI structured extraction
- provider failover og cooldown orchestration
- provider adapterar fyrir raunveruleg módel
- parser pipeline með staged outputs
- deterministic parser adapter fyrir review-hæf regludrög
- confidence engine og review flags
- reviewer workflow
- certified rule packs
- versioned knowledge records
- coverage matrix og residual risk reporting

## Áfangi 4: Product Surface

- homepage
- innskráning
- dashboard
- pay run review
- payslip explanation view
- trust center

### Núverandi staða á Product Surface

- fyrstu statísku útgáfur af homepage, innskráningu og dashboardi komnar
- AI health og preview gögn birtast nú úr API
- snapshot og scenario gögn birtast nú á mælaborði
- næst þarf að færa yfirborðið í skipulegt state/view model og síðan Trust Center

## Áfangi 2.5: Persistence og Snapshot API

- SQL-skema og migrations
- repository layer
- snapshot endpoint fyrir dashboard og trust center
- scenario endpoint fyrir golden tests og coverage vinnu
- AI health endpoint
- AI parse preview endpoint
- AI knowledge preview endpoint

## Áfangi 5: Pilot Readiness

- VR/Efling class coverage
- tax, pension og union deduction support
- export batches
- audit reconstruction
- pilot tenant onboarding
