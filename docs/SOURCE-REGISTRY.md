# Heimildaskrá Frigg

Síðast uppfært: 2026-04-24

## Markmið

Heimildaskráin heldur utan um þær opinberu og viðurkenndu heimildir sem Frigg má nota til að styðja tillögur, viðvaranir, reglur og review. Hún er ekki sjálfvirk regluniðurstaða. Hver heimild þarf útgáfu, sóttan dag, checksum eða varðveisluvísun og review state áður en hún er notuð í production workflow.

Vélrænn grunnur heimildaskrárinnar er í `knowledge/sources/regulatory-sources.json`. Snapshot-stubbar eru í `knowledge/sources/source-snapshots.json`. Þessar skrár innihalda aðeins metadata og engin raw ytri gögn.

## Forgangsröðun heimilda

| Kóði | Heimild | Eigandi | Flokkur | Trust tier | Notkun |
| --- | --- | --- | --- | --- | --- |
| `skatturinn-innflutningur` | https://www.skatturinn.is/atvinnurekstur/tollamal/innflutningur/ | Skatturinn | Opinber stjórnsýsluheimild | Primary | Almenn innflutningsferli, aðflutningsgjöld og tollafgreiðsla. |
| `skatturinn-tollskra` | https://www.skatturinn.is/atvinnurekstur/tollamal/tollskra/ | Skatturinn | Opinber stjórnsýsluheimild | Primary | Tollskrá, veftollskrá, bindandi álit og tollflokkunargrunnur. |
| `skatturinn-tollskrarlyklar` | https://www.skatturinn.is/fagadilar/tollamal/hugbunadarhus/tollskrarlyklar/ | Skatturinn | Machine/reference heimild | Primary | Tollskrárnúmer, skilmálar, gjöld, leyfi, bönn og villuprófun. |
| `skatturinn-smt` | https://www.skatturinn.is/fagadilar/tollamal/hugbunadarhus/smt-tollafgreidsla/ | Skatturinn | Integration heimild | Primary | SMT/EDI tollafgreiðsla og rafræn samskipti við Tollakerfið. |
| `skatturinn-edi-stadlar` | https://www.skatturinn.is/fagadilar/tollamal/hugbunadarhus/smt/edi-stadlar/ | Skatturinn | Integration heimild | Primary | CUSDEC, CUSRES, CUSCAR og íslensk EDI skeyti. |
| `skatturinn-cusdec-doc` | https://www.skatturinn.is/fagadilar/tollamal/hugbunadarhus/cusdec-skjalakodar/ | Skatturinn | Integration/regluheimild | Primary | Leyfi, vottorð, undanþágur og reitur 44 í aðflutningsskýrslu. |
| `mast-dyraafurdir-utan-ees` | https://www.mast.is/is/matvaelafyrirtaeki/inn-og-utflutningur/innflutningur-utan-ees | Matvælastofnun | Opinber leyfis-/eftirlitsheimild | Primary | Dýraafurðir frá þriðju ríkjum, BCP, vottorð og eftirlit. |
| `mast-dyraafurdir-ees` | https://www.mast.is/is/matvaelafyrirtaeki/inn-og-utflutningur/innflutningur-innan-ees | Matvælastofnun | Opinber leyfis-/eftirlitsheimild | Primary | Dýraafurðir frá EES og sérskilyrði. |
| `mast-fodur` | https://www.mast.is/is/annad/fodur/innflutningur | Matvælastofnun | Opinber leyfis-/eftirlitsheimild | Primary | Fóður, skráning innflytjanda og skráning fóðurs. |
| `mast-plontur` | https://www.mast.is/is/annad/plontur/innflutningur | Matvælastofnun | Opinber leyfis-/eftirlitsheimild | Primary | Plöntur, plöntuafurðir og plöntuheilbrigðisvottorð. |
| `mast-dyr` | https://www.mast.is/is/dyraeigendur/innflutningur-dyra | Matvælastofnun | Opinber leyfis-/eftirlitsheimild | Primary | Innflutningur dýra, leyfi, heilbrigðisskilyrði og einangrun. |
| `lyfjastofnun-avanaefni` | https://www.lyfjastofnun.is/leyfisskyld-starfsemi/avana-og-fikniefni/avana-og-fikniefni/ | Lyfjastofnun | Opinber leyfisheimild | Primary | Inn- og útflutningsleyfi ávana- og fíkniefna. |
| `lyfjastofnun-samhlida-innflutningur` | https://www.lyfjastofnun.is/lyf/lyfjaskraningar/onnur-leyfi/ | Lyfjastofnun | Opinber leyfisheimild | Primary | Samhliða innflutningur lyfja og markaðsleyfisskilyrði. |
| `wco-hs` | https://www.wcoomd.org/en/topics/nomenclature/overview/what-is-the-harmonized-system.aspx | World Customs Organization | Alþjóðlegur staðall | Primary | HS flokkunargrunnur og alþjóðlegt vörunúmerakerfi. |
| `wco-data-model` | https://www.wcoomd.org/datamodel | World Customs Organization | Alþjóðlegt gagnalíkan | Primary | Cross-border data exchange, Single Window, permits, certificates og customs messages. |
| `wco-revised-kyoto` | https://www.wcoomd.org/en/topics/facilitation/instrument-and-tools/conventions/pf_revised_kyoto_conv.aspx?p=1 | World Customs Organization | Alþjóðlegt customs best practice | Secondary | Gagnsæi, einföldun, risk management, audit-based controls og IT notkun. |
| `eu-importation` | https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/importation_en | European Commission | Regulatory guidance | Secondary | Import procedure, ENS, customs clearance og tollferli í evrópsku samhengi. |
| `eu-origin` | https://taxation-customs.ec.europa.eu/customs-4/international-affairs/origin-goods_en | European Commission | Regulatory guidance | Secondary | Upprunareglur, preferential/non-preferential origin og tollmeðferð. |
| `nist-ai-rmf` | https://www.nist.gov/itl/ai-risk-management-framework | NIST | AI governance viðmið | Reference | Trustworthy AI, governance, map, measure og manage fyrir AI-lag. |

## Notkunarreglur

- Heimild í þessari skrá má styðja tillögu, viðvörun eða review task, en ekki sjálfkrafa staðfesta tollflokkun eða leyfisskyldu.
- Production regla þarf að vísa í `SourceSnapshot` með útgáfu, sóttum tíma og review state.
- Ef heimildir rekast á skal opinber íslensk frumheimild ganga framar erlendu viðmiði.
- Vendor lausnir og bloggfærslur mega aðeins styðja product/UX/architecture viðmið, ekki íslenska reglufylgni.
- `tools/check-sources.mjs` staðfestir að vélræna registry-ið sé samræmt, innihaldi skylduheimildir og vísi ekki í raw skjalasnið.
