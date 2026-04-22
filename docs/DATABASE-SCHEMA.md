# Gagnagrunnsskem­a Frigg

Síðast uppfært: 2026-04-22

## Markmið

Gagnamódelið þarf að vera `database-first` og nægilega sterkt til að halda utan um:

- launakeyrslur og snapshots
- útgáfustýrð reglusett og lagaforsendur
- routing í lífeyrissjóði og stéttarfélög
- review tasks og compliance deadlines
- launaseðla sem sönnunargögn
- research workstreams, legal obligations og source acquisition
- coverage packs fyrir kjarasamninga, lífeyrissjóði og stéttarfélög

## Kjarnatöflur

- `tenants`, `employers`, `employees`, `employment_contracts`
- `agreement_versions`, `rule_set_versions`, `statutory_parameter_sets`
- `pension_routing_rules`, `union_routing_rules`
- `tax_credit_allocations`, `a1_certificate_statuses`
- `knowledge_sources`, `research_workstreams`, `source_acquisition_records`
- `legal_obligations`, `collective_agreement_packs`
- `pension_fund_profiles`, `union_profiles`, `coverage_matrix_entries`
- `payroll_runs`, `payroll_run_rule_sets`, `payroll_inputs`
- `validation_results`, `payslips`, `payslip_evidence_records`
- `audit_events`, `review_tasks`, `compliance_deadlines`

## Hönnunarákvörðun

- Textaauðkenni eru notuð í fyrstu lotu til að halda gagnamódelinu einföldu og rekjanlegu.
- JSON reitir eru notaðir tímabundið þar sem undirlíkön eru enn að mótast:
  - `leave_events_json`
  - `mismatches_json`
  - `rule_ids`
  - `review_notes`
  - `supported_scenarios`
  - `blocked_scenarios`
  - `source_ids`
  - `affected_artifacts`
  - `remittance_channels`
  - `notes`
- Þegar API og engine verða keyrsluhæf skal meta hvort skipta eigi sumum þessara reita í undir­töflur.

## Invariants

- Hver `payroll_run` pinnir eitt `statutory_parameter_set`.
- Tengitaflan `payroll_run_rule_sets` leyfir fleiri en eitt `rule_set_version` á hverja keyrslu.
- Hver `payroll_input` bendir á valin tax, A1 og routing records fyrir nákvæma endurkeyrslu.
- Hver `payslip_evidence_record` tengist bæði keyrslu og launaseðli.
- `audit_events` eru append-only í hönnun þó það sé ekki enn þvingað með trigger.
- `source_acquisition_records` gera kleift að rekja hvernig heimild barst inn í kerfið og hvaða aðgangsstig gildir um hana.
- `legal_obligations` lýsa því hvaða lagalegu skyldur þarf að geta reiknað, útskýrt eða sent í review.
- `collective_agreement_packs`, `pension_fund_profiles` og `union_profiles` eru certified coverage records sem brú milli research lags og runtime lags.

## Næstu skref

1. Tengja þetta skema við raunverulegan gagnagrunnsdrifara í `apps/api`.
2. Halda research seed- og fixture-gögnum samstilltum í `db/seeds` fyrir docs, demo og þróun.
3. Fylla nýju research töflurnar með raunverulegri legal/fund/union kortlagningu.
4. Festa hvort nota eigi PostgreSQL sem frumskerfi strax og skipta þá úr `memory`/`file` repository yfir í database driver.
