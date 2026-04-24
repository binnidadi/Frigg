# Orðasafn

Þessi skrá tryggir samræmt orðalag í kóða, skjölum og notendaviðmóti. Íslensk heiti skulu vera skýr og fagleg; ensk heiti eru notuð í kóða þar sem það eykur samræmi við TypeScript, Prisma og API contracts.

| Íslenskt heiti | Enskt kóðaheiti | Skýring |
| --- | --- | --- |
| Innflytjandi | `Importer` | Rekstrareining sem ber ábyrgð á innflutningi. |
| Birgir | `Supplier` | Aðili sem selur eða afhendir vörur. |
| Sending | `Shipment` | Innflutningsmál með skjölum, vörulínum og stöðu. |
| Vörulína | `ShipmentItem` | Einstök vara eða lína í sendingu. |
| Skjal | `Document` | Reikningur, farmbréf, pökkunarlisti eða fylgigagn. |
| Útdregið gagnastak | `ExtractedField` | Gildi sem hefur verið lesið úr skjali með source mapping og confidence. |
| Tollflokkunartillaga | `ClassificationCandidate` | Tillaga að HS/tollskrárkóða, ekki staðfest niðurstaða. |
| Tollskrárkóði | `HsCode` | HS- eða tollskrárkóði með lýsingu og útgáfu. |
| Regluviðvörun | `RegulatoryRule` | Útgáfustýrð regla sem getur valdið viðvörun eða review. |
| Leyfisskyldukrafa | `PermitRequirement` | Tillaga, viðvörun eða staðfest krafa um leyfi. |
| Gengi | `ExchangeRate` | Gengisskráning með dagsetningu og heimild. |
| Landað kostnaðarverð | `LandedCostCalculation` | Útreikningur á heildarkostnaði vöru kominnar til landsins. |
| Kostnaðarlína | `LandedCostLine` | Sundurliðað skref eða lína í landed cost útreikningi. |
| Gjaldaliður | `TaxComponent` | Tollur, vörugjald, VSK eða annað opinbert gjald. |
| Audit færsla | `AuditLog` | Rekjanleg atburðaskrá fyrir breytingar og ákvarðanir. |
| Samþættingarverk | `IntegrationJob` | Keyrsla gagnaskipta við ytra kerfi. |
| Bókunarútflutningur | `AccountingExport` | Export til bókhalds- eða ERP kerfis. |

## Málfarsreglur

- Nota skal „tillaga“ þegar niðurstaða er ekki staðfest.
- Nota skal „staðfest“ aðeins þegar review state eða regla styður það.
- Nota skal „leyfisskylduviðvörun“ fremur en „leyfisskylda“ ef niðurstaða er ekki staðfest.
- Forðast skal óljós orð eins og „smart“, „magic“ eða „auto“ í notendatexta.
- Skýringar skulu nefna inntök, heimildir og stöðu frekar en að gefa óstudda niðurstöðu.
