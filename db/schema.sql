CREATE TABLE tenants (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE employers (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  kennitala TEXT NOT NULL UNIQUE,
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  municipality_code TEXT NOT NULL,
  withholding_register_id TEXT,
  default_bank_account_iban TEXT,
  created_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES tenants(id),
  kennitala TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  date_of_birth TEXT NOT NULL,
  citizenship_code TEXT,
  created_at TEXT NOT NULL,
  archived_at TEXT
);

CREATE TABLE employment_contracts (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL REFERENCES employers(id),
  employee_id TEXT NOT NULL REFERENCES employees(id),
  employment_type TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_code TEXT,
  union_id TEXT,
  pension_fund_id TEXT,
  base_salary_amount INTEGER,
  base_hourly_rate_amount INTEGER,
  ratio_numerator INTEGER NOT NULL DEFAULT 100,
  ratio_denominator INTEGER NOT NULL DEFAULT 100,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE agreement_versions (
  id TEXT PRIMARY KEY,
  agreement_id TEXT NOT NULL,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  version TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  source_document_ids TEXT NOT NULL,
  supported_employment_groups TEXT NOT NULL
);

CREATE TABLE rule_set_versions (
  id TEXT PRIMARY KEY,
  agreement_version_id TEXT NOT NULL REFERENCES agreement_versions(id),
  code TEXT NOT NULL,
  version TEXT NOT NULL,
  approval_status TEXT NOT NULL,
  coverage_status TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  rule_ids TEXT NOT NULL,
  review_notes TEXT NOT NULL
);

CREATE TABLE statutory_parameter_sets (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  version TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  tax_threshold_level_1 INTEGER NOT NULL,
  tax_threshold_level_2 INTEGER NOT NULL,
  tax_rate_level_1 REAL NOT NULL,
  tax_rate_level_2 REAL NOT NULL,
  tax_rate_level_3 REAL NOT NULL,
  monthly_personal_tax_credit INTEGER NOT NULL,
  standard_insurance_levy_rate REAL NOT NULL,
  a1_insurance_levy_rate REAL NOT NULL,
  fisherman_insurance_levy_rate REAL NOT NULL,
  employee_pension_deduction_rate REAL NOT NULL,
  additional_pension_deduction_cap_rate REAL NOT NULL
);

CREATE TABLE pension_routing_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  version TEXT NOT NULL,
  agreement_id TEXT,
  union_id TEXT,
  employer_id TEXT REFERENCES employers(id),
  pension_fund_id TEXT NOT NULL,
  applies_to_employment_types TEXT NOT NULL,
  minimum_employee_contribution_rate REAL NOT NULL,
  employer_contribution_rate REAL NOT NULL,
  additional_savings_employer_rate REAL,
  requires_manual_review INTEGER NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT
);

CREATE TABLE union_routing_rules (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  version TEXT NOT NULL,
  union_id TEXT NOT NULL,
  agreement_id TEXT,
  applies_to_locations TEXT NOT NULL,
  employee_fee_rate REAL,
  employer_fund_contribution_rate REAL,
  sickness_fund_contribution_rate REAL,
  requires_manual_review INTEGER NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT
);

CREATE TABLE tax_credit_allocations (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  primary_payer_id TEXT NOT NULL REFERENCES employers(id),
  monthly_credit_amount INTEGER NOT NULL,
  credit_percentage REAL NOT NULL,
  secondary_payer_ids TEXT NOT NULL,
  source TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT
);

CREATE TABLE a1_certificate_statuses (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  certificate_country_code TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT NOT NULL,
  verified_at TEXT,
  status TEXT NOT NULL
);

CREATE TABLE knowledge_sources (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  version TEXT NOT NULL,
  source_type TEXT NOT NULL,
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  coverage_status TEXT NOT NULL,
  transformed_into_rules INTEGER NOT NULL,
  notes TEXT NOT NULL,
  valid_from TEXT NOT NULL,
  valid_to TEXT,
  created_at TEXT NOT NULL,
  created_by TEXT NOT NULL,
  reviewed_at TEXT,
  reviewed_by TEXT
);

CREATE TABLE coverage_matrix_entries (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  source_type TEXT NOT NULL,
  coverage_status TEXT NOT NULL,
  residual_risk TEXT NOT NULL,
  supported_scenarios TEXT NOT NULL,
  blocked_scenarios TEXT NOT NULL
);

CREATE TABLE payroll_runs (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL REFERENCES employers(id),
  period_start TEXT NOT NULL,
  period_end TEXT NOT NULL,
  status TEXT NOT NULL,
  statutory_parameter_set_id TEXT NOT NULL REFERENCES statutory_parameter_sets(id),
  started_at TEXT NOT NULL,
  completed_at TEXT
);

CREATE TABLE payroll_run_rule_sets (
  payroll_run_id TEXT NOT NULL REFERENCES payroll_runs(id),
  rule_set_version_id TEXT NOT NULL REFERENCES rule_set_versions(id),
  PRIMARY KEY (payroll_run_id, rule_set_version_id)
);

CREATE TABLE payroll_inputs (
  id TEXT PRIMARY KEY,
  payroll_run_id TEXT NOT NULL REFERENCES payroll_runs(id),
  employee_id TEXT NOT NULL REFERENCES employees(id),
  contract_id TEXT NOT NULL REFERENCES employment_contracts(id),
  municipality_code TEXT NOT NULL,
  hours_worked REAL NOT NULL,
  evening_hours REAL NOT NULL,
  weekend_hours REAL NOT NULL,
  holiday_hours REAL NOT NULL,
  leave_hours REAL NOT NULL,
  base_rate_override_amount INTEGER,
  tax_credit_allocation_id TEXT REFERENCES tax_credit_allocations(id),
  a1_certificate_status_id TEXT REFERENCES a1_certificate_statuses(id),
  pension_routing_rule_id TEXT REFERENCES pension_routing_rules(id),
  union_routing_rule_id TEXT REFERENCES union_routing_rules(id),
  leave_events_json TEXT NOT NULL
);

CREATE TABLE validation_results (
  id TEXT PRIMARY KEY,
  payroll_run_id TEXT NOT NULL REFERENCES payroll_runs(id),
  status TEXT NOT NULL,
  checked_at TEXT NOT NULL,
  mismatches_json TEXT NOT NULL
);

CREATE TABLE payslips (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  payroll_run_id TEXT NOT NULL REFERENCES payroll_runs(id),
  issued_at TEXT NOT NULL,
  gross_pay_amount INTEGER NOT NULL,
  net_pay_amount INTEGER NOT NULL,
  evidence_record_ids TEXT NOT NULL
);

CREATE TABLE payslip_evidence_records (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  payroll_run_id TEXT NOT NULL REFERENCES payroll_runs(id),
  payslip_id TEXT NOT NULL REFERENCES payslips(id),
  line_item_code TEXT NOT NULL,
  rule_set_version_ids TEXT NOT NULL,
  source_reference_ids TEXT NOT NULL,
  narrative TEXT NOT NULL,
  calculated_at TEXT NOT NULL
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL REFERENCES employers(id),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  performed_at TEXT NOT NULL,
  performed_by TEXT NOT NULL,
  summary TEXT NOT NULL
);

CREATE TABLE review_tasks (
  id TEXT PRIMARY KEY,
  task_type TEXT NOT NULL,
  employer_id TEXT REFERENCES employers(id),
  related_entity_id TEXT NOT NULL,
  status TEXT NOT NULL,
  assignee_id TEXT,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE compliance_deadlines (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL REFERENCES employers(id),
  category TEXT NOT NULL,
  due_date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL
);
