# Gagnalíkan Tollvarðar Pro

## Markmið

Gagnalíkanið skal styðja innflutningsferli frá skjalamóttöku til bókunar og audit. Prisma schema verður canonical þegar tæknigrunnur er settur upp, en þessi skrá skilgreinir fyrstu hönnun áður en kóði er skrifaður.

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

## Ófrávíkjanlegar reglur

- AI tillaga má aldrei yfirskrifa staðfesta niðurstöðu án review.
- Landed cost calculation skal geyma input snapshot svo hægt sé að endurbyggja útreikning.
- Tax component skal geyma formúlu, inntök og rounding policy.
- Permit requirement skal sýna hvort um sé að ræða tillögu, viðvörun eða staðfesta kröfu.
