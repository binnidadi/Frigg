# Gagnalíkan Frigg

## Markmið

Gagnalíkanið skal styðja innflutningsferli frá skjalamóttöku til bókunar og audit. Prisma schema er nú canonical grunnur í `prisma/schema.prisma`, en business logic og production útreikningar eru ekki komin inn.

## Fyrstu kjarnalíkön

- `Importer`: innflytjandi, tenant-ready rekstrareining og eigandi innflutningsmála.
- `Supplier`: erlendur eða innlendur birgir tengdur innflytjanda.
- `Shipment`: innflutningsmál með stöðu, uppruna, sendingarupplýsingum, gjaldmiðli og skjölum.
- `ShipmentItem`: vörulína með lýsingu, magni, verði, upprunalandi, tollflokkunarstöðu og kostnaðarútreikningi.
- `Document`: reikningur, farmbréf, pökkunarlisti, upprunavottorð eða annað fylgiskjal.
- `ExtractedField`: útdregið gagnastak með confidence, source mapping, provider metadata og review state.
- `HsCode`: tollskrár- eða HS-kóði með útgáfu, lýsingu og gildistíma.
- `ClassificationCandidate`: tillaga að tollflokkun með rökstuðningi, heimildum, confidence og review state.
- `RegulatoryRule`: útgáfustýrð regla fyrir viðvörun eða mat á leyfisskyldu.
- `PermitRequirement`: rekjanleg leyfisskylduviðvörun eða staðfest krafa tengd vöru eða sendingu.
- `ExchangeRate`: gengi, gjaldmiðill, dagsetning, heimild og útgáfa.
- `LandedCostCalculation`: keyrsla fyrir landað kostnaðarverð með input snapshot, stöðu og skýringu.
- `LandedCostLine`: sundurliðaðar kostnaðarlínur og milliskref.
- `TaxComponent`: tollar, vörugjöld, VSK eða önnur gjöld með formúlu og heimild.
- `AuditLog`: append-only atburðaskrá fyrir breytingar, AI tillögur, review og export.
- `IntegrationJob`: samþættingarverk með stöðu, idempotency lykli, retry upplýsingum og niðurstöðu.
- `AccountingExport`: bókunar- eða ERP export með stöðu, tengdum útreikningum og audit slóð.
- `RegulatorySource`: heimild sem má styðja reglur, tillögur eða review, til dæmis Skatturinn, MAST, Lyfjastofnun, WCO eða NIST.
- `SourceSnapshot`: tiltekin útgáfa eða sótt snapshot af heimild með checksum, gildistíma og review state.
- `ReviewTask`: verkefni fyrir mannlega yfirferð á útdregnum gögnum, flokkunartillögum, leyfisskylduviðvörunum, útreikningum eða heimildum.
- `DecisionRecord`: staðfest ákvörðun með actor, rationale og heimildavísunum.

Þessi líkön eru komin í fyrsta Prisma schema. Útfærslan er vísvitandi metadata- og rekjanleikamiðuð: hún skráir tillögur, review state, source reference, input snapshot og audit tengingar án þess að gefa í skyn að tollflokkun eða leyfisskylda sé staðfest sjálfkrafa.

## Lykil enums

- `ReviewState`: `draft`, `suggested`, `needs_review`, `approved`, `rejected`, `superseded`.
- `ConfidenceLevel`: `low`, `medium`, `high`.
- `DocumentType`: `invoice`, `bill_of_lading`, `packing_list`, `certificate_of_origin`, `permit`, `other`.
- `ShipmentStatus`: `draft`, `documents_received`, `classification_review`, `costing_review`, `ready_for_export`, `exported`, `archived`.
- `CalculationStatus`: `draft`, `computed`, `needs_review`, `approved`, `voided`.
- `AuditAction`: `created`, `updated`, `suggested`, `reviewed`, `approved`, `rejected`, `computed`, `exported`.
- `IntegrationStatus`: `pending`, `running`, `succeeded`, `failed`, `retrying`, `cancelled`.

## Constraints og indexes

Fyrsta Prisma schema skal hannað með:

- tenant/importer scoping á öllum viðskiptatengdum töflum
- indexes á `shipmentId`, `shipmentItemId`, `documentId`, `reviewState`, `status` og `createdAt`
- unique idempotency lykli á `IntegrationJob`
- version og validity reitum á reglum, HS kóðum og gengisskráningu
- audit tengingu við actor, entity type, entity id og action

Fyrsta schema notar `Importer` sem tenant-ready scope fyrir viðskiptatengdar töflur. Þetta heldur multi-tenant readiness opnu án þess að bæta við fullu permissions- eða identity-lagi of snemma.

## Ófrávíkjanlegar reglur

- AI tillaga má aldrei yfirskrifa staðfesta niðurstöðu án review.
- Landed cost calculation skal geyma input snapshot svo hægt sé að endurbyggja útreikning.
- Tax component skal geyma formúlu, inntök og rounding policy.
- Permit requirement skal sýna hvort um sé að ræða tillögu, viðvörun eða staðfesta kröfu.

## Domain contracts

`packages/domain` speglar fyrstu schema-hugtökin í TypeScript:

- `imports.ts`: innflytjandi, birgir, sending og vörulína.
- `documents.ts`: skjöl, útdregin gagnastök, confidence og source mapping.
- `classification.ts`: HS-kóðar, tollflokkunartillögur, reglur og leyfisskylduviðvaranir.
- `costing.ts`: gengi, landed cost calculation, kostnaðarlínur og gjaldaliðir.
- `audit.ts`: audit log, integration jobs og accounting exports.
- `review.ts`: review state og confidence.
- `sources.ts`: regulatory source og source snapshot contracts.
- `workflow.ts`: review task og decision record contracts.
