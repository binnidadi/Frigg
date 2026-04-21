# Gagnagrunnsskem­a Frigg

Síðast uppfært: 2026-04-21

## Markmið

Gagnamódelið þarf að vera `database-first` og nægilega sterkt til að halda utan um:

- launakeyrslur og snapshots
- útgáfustýrð reglusett og lagaforsendur
- routing í lífeyrissjóði og stéttarfélög
- review tasks og compliance deadlines
- launaseðla sem sönnunargögn

## Kjarnatöflur

- `tenants`, `employers`, `employees`, `employment_contracts`
- `agreement_versions`, `rule_set_versions`, `statutory_parameter_sets`
- `pension_routing_rules`, `union_routing_rules`
- `tax_credit_allocations`, `a1_certificate_statuses`
- `knowledge_sources`, `coverage_matrix_entries`
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
- Þegar API og engine verða keyrsluhæf skal meta hvort skipta eigi sumum þessara reita í undir­töflur.

## Invariants

- Hver `payroll_run` pinnir eitt `statutory_parameter_set`.
- Tengitaflan `payroll_run_rule_sets` leyfir fleiri en eitt `rule_set_version` á hverja keyrslu.
- Hver `payroll_input` bendir á valin tax, A1 og routing records fyrir nákvæma endurkeyrslu.
- Hver `payslip_evidence_record` tengist bæði keyrslu og launaseðli.
- `audit_events` eru append-only í hönnun þó það sé ekki enn þvingað með trigger.

## Næstu skref

1. Tengja þetta skema við raunverulegan gagnagrunnsdrifara í `apps/api`.
2. Útbúa seed- eða fixture-gögn fyrir fyrstu golden scenarios.
3. Festa hvort nota eigi PostgreSQL sem frumskerfi strax og skipta þá úr `memory` repository yfir í database driver.
