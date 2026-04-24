# Vegvísir Tollvarðar Pro

## Lota 1: Hreinn grunnur og source of truth

- Hreinsa eldra verkefni úr repo.
- Stofna nýjan skjala- og arkitektúrgrunn.
- Festa SaaS-first afstöðu og AI Foundry mörk.
- Skilgreina fyrsta gagnalíkansramma og domain orðasafn.

## Lota 2: Tæknigrunnur

- Staða: Lokið í tæknigrunni.
- Setja upp Next.js 14+ og TypeScript.
- Setja upp Prisma, Supabase/Postgres stefnu og grunnstillingar.
- Skilgreina `packages/domain`, `packages/engine` og `packages/ai`.
- Bæta við lint, typecheck og test grunnskipan.

## Lota 3: Prisma schema og domain contracts

- Staða: Grunnur kominn.
- Hanna schema fyrir importer, supplier, shipment, shipment item, document, extracted field, HS code, classification candidate, regulatory rule, permit requirement, exchange rate, landed cost calculation, landed cost line, tax component, audit log, integration job og accounting export.
- Skilgreina enums fyrir review state, confidence, document type, calculation status, audit action, integration status og export status.
- Bæta við indexes og constraints fyrir tenant readiness, rekjanleika og idempotency.
- Halda raw `HREIN_GOGN` gögnum utan repo og nota aðeins hreinsuð, samþykkt fixtures þegar gagnanotkun hefst.

## Lota 3b: Schema tests og örugg fixtures

- Staða: Lokið í grunni.
- Bæta við fyrstu schema/type tests fyrir review state, enum mapping og audit invariants.
- Skilgreina fixture policy fyrir hreinsuð sýnigögn.
- Undirbúa örugg seed drög án raw fjárhags- eða viðskiptavinagagna.
- Fyrsta synthetic import-review fixture er komið í `fixtures/synthetic/import-review-scenario.json`.

## Source registry og review foundation

- Staða: Lokið í grunni.
- Heimildaskrá skráð í `docs/SOURCE-REGISTRY.md`.
- Fixture stefna skráð í `docs/FIXTURE-POLICY.md`.
- Prisma schema bætt með `RegulatorySource`, `SourceSnapshot`, `ReviewTask` og `DecisionRecord`.

## UX- og gagnainventory lota

- Staða: Lokið.
- Skýrari forsíða með vörugildi, vinnuferli, traustmörkum og heiðarlegri stöðu.
- UX-review skráð í `docs/UX-REVIEW.md`.
- Ytra gagnasafn kortlagt í `docs/DATA-INVENTORY.md` án þess að afrita raw gögn í Git.

## Lota 4: Determinísk landed cost reiknivél

- Útfæra typed input og output contracts.
- Reikna vöruverð, flutning, tryggingar, gengi, tolla, vörugjöld, VSK og önnur gjöld út frá skýrum inntökum.
- Skila skýringum með formúlum, inntökum, milliskrefum og rounding policy.
- Bæta við unit tests og golden scenarios.

## Lota 5: Ingestion, classification og AI boundary

- Útfæra document ingestion metadata.
- Útfæra extracted fields með confidence og source mapping.
- Útfæra HS classification foundation með tillögum, rökstuðningi og review state.
- Útfæra AI provider abstraction og Foundry adapter án provider lock-in.

## Lota 6: Audit, samþættingar og export

- Útfæra audit log grunn.
- Útfæra integration job lifecycle með retry og idempotency.
- Útfæra accounting export grunn fyrir bókhaldskerfi.
- Tengja lykilaðgerðir við audit trail.
