export const employers = [
  {
    id: 'employer_frigg_demo',
    tenantId: 'tenant_frigg',
    kennitala: '1234567890',
    legalName: 'Frigg Demo ehf.',
    displayName: 'Frigg Demo',
    municipalityCode: '0000'
  }
]

export const employees = [
  {
    id: 'employee_gudrun',
    tenantId: 'tenant_frigg',
    kennitala: '1111111111',
    fullName: 'Guðrún S.',
    dateOfBirth: '1995-04-11'
  },
  {
    id: 'employee_jon',
    tenantId: 'tenant_frigg',
    kennitala: '2222222222',
    fullName: 'Jón B.',
    dateOfBirth: '1990-11-03'
  }
]

export const contracts = [
  {
    id: 'contract_gudrun_001',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_gudrun',
    employmentType: 'monthly',
    jobTitle: 'Verslunarfulltrúi',
    jobCode: 'store_assistant',
    agreementScopeCode: 'vr-retail-store',
    expectedMonthlyBaseSalary: { currency: 'ISK', amount: 590000 },
    expectedMonthlyHours: 173.33,
    eveningPremiumRate: { currency: 'ISK', amount: 1000 },
    validFrom: '2026-01-01',
    validTo: null
  },
  {
    id: 'contract_jon_001',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_jon',
    employmentType: 'hourly',
    jobTitle: 'Vaktstjóri',
    jobCode: 'shift_lead',
    agreementScopeCode: 'vr-retail-shift',
    defaultHourlyRate: { currency: 'ISK', amount: 3950 },
    validFrom: '2026-02-01',
    validTo: null
  }
]

export const payrollInputs = [
  {
    tenantId: 'tenant_frigg',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_gudrun',
    contractId: 'contract_gudrun_001',
    period: { validFrom: '2026-04-01', validTo: '2026-04-30' },
    hoursWorked: 173.33,
    eveningHours: 18,
    weekendHours: 0,
    holidayHours: 0,
    leaveHours: 0,
    baseRateOverride: null,
    municipalityCode: '0000',
    taxCreditAllocation: {
      employeeId: 'employee_gudrun',
      primaryPayerId: 'employer_frigg_demo',
      monthlyCreditAmount: 72492,
      creditPercentage: 1,
      secondaryPayerIds: [],
      source: 'employee_instruction'
    },
    a1Certificate: null,
    leaveEvents: [],
    pensionRoutingRuleId: 'pension_route_live_retail',
    unionRoutingRuleId: 'union_route_vr_retail'
  },
  {
    tenantId: 'tenant_frigg',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_jon',
    contractId: 'contract_jon_001',
    period: { validFrom: '2026-04-01', validTo: '2026-04-30' },
    hoursWorked: 162,
    eveningHours: 26,
    weekendHours: 12,
    holidayHours: 0,
    leaveHours: 0,
    baseRateOverride: { currency: 'ISK', amount: 3950 },
    municipalityCode: '0000',
    taxCreditAllocation: null,
    a1Certificate: {
      employeeId: 'employee_jon',
      certificateCountryCode: 'PL',
      validFrom: '2026-04-01',
      validTo: '2026-10-01',
      verifiedAt: '2026-04-02T09:00:00Z',
      status: 'verified'
    },
    leaveEvents: [],
    pensionRoutingRuleId: 'pension_route_live_retail',
    unionRoutingRuleId: 'union_route_vr_retail'
  }
]

export const agreementVersions = [
  {
    id: 'agreement_version_vr_2026_2',
    agreementId: 'agreement_vr_retail',
    code: 'vr-retail',
    title: 'VR retail 2026.2',
    version: '2026.2',
    validFrom: '2026-04-01',
    validTo: null,
    sourceDocumentIds: ['source_vr_collective_2026'],
    supportedEmploymentGroups: ['retail'],
    effectivePeriod: { validFrom: '2026-04-01', validTo: null }
  }
]

export const ruleSetVersions = [
  {
    id: 'rule_set_vr_2026_2',
    agreementVersionId: 'agreement_version_vr_2026_2',
    code: 'vr-retail',
    version: '2026.2',
    approvalStatus: 'approved',
    coverageStatus: 'certified',
    ruleIds: ['rule_base_pay_001', 'rule_evening_001'],
    reviewNotes: ['Vottað fyrir almenna retail keyrslu og A1 checks.'],
    effectivePeriod: { validFrom: '2026-04-01', validTo: null }
  }
]

export const statutoryParameterSets = [
  {
    id: 'statutory_2026',
    code: 'is-statutory',
    version: '2026.1',
    effectivePeriod: { validFrom: '2026-01-01', validTo: null },
    taxThresholdLevel1: 498122,
    taxThresholdLevel2: 1398450,
    taxRateLevel1: 0.3149,
    taxRateLevel2: 0.3799,
    taxRateLevel3: 0.4629,
    monthlyPersonalTaxCredit: 72492,
    standardInsuranceLevyRate: 0.0635,
    a1InsuranceLevyRate: 0.00425,
    fishermanInsuranceLevyRate: 0.07,
    employeePensionDeductionRate: 0.04,
    additionalPensionDeductionCapRate: 0.04
  }
]

export const pensionRoutingRules = [
  {
    id: 'pension_route_live_retail',
    code: 'live-retail',
    version: '2026.1',
    agreementId: 'agreement_vr_retail',
    unionId: 'union_vr',
    employerId: null,
    pensionFundId: 'pension_live',
    appliesToEmploymentTypes: ['monthly', 'hourly'],
    minimumEmployeeContributionRate: 0.04,
    employerContributionRate: 0.115,
    additionalSavingsEmployerRate: 0.02,
    requiresManualReview: false,
    effectivePeriod: { validFrom: '2026-01-01', validTo: null }
  }
]

export const unionRoutingRules = [
  {
    id: 'union_route_vr_retail',
    code: 'vr-retail',
    version: '2026.1',
    unionId: 'union_vr',
    agreementId: 'agreement_vr_retail',
    appliesToLocations: ['IS'],
    employeeFeeRate: 0.007,
    employerFundContributionRate: 0.003,
    sicknessFundContributionRate: 0.01,
    requiresManualReview: false,
    effectivePeriod: { validFrom: '2026-01-01', validTo: null }
  }
]

export const taxCreditAllocations = [
  {
    employeeId: 'employee_gudrun',
    primaryPayerId: 'employer_frigg_demo',
    monthlyCreditAmount: 72492,
    creditPercentage: 1,
    secondaryPayerIds: [],
    source: 'employee_instruction'
  }
]

export const a1CertificateStatuses = [
  {
    employeeId: 'employee_jon',
    certificateCountryCode: 'PL',
    validFrom: '2026-04-01',
    validTo: '2026-10-01',
    verifiedAt: '2026-04-02T09:00:00Z',
    status: 'verified'
  }
]

export const knowledgeSources = [
  {
    id: 'source_statutory_2026',
    code: 'stadgreidsla-2026',
    version: '2026.1',
    sourceType: 'statutory',
    title: 'Staðgreiðsla og skattþrep 2026',
    sourceUrl: 'https://www.skatturinn.is/einstaklingar/stadgreidsla/skattthrep/2026/',
    coverageStatus: 'supported',
    transformedIntoRules: true,
    notes: ['Persónuafsláttur og skattþrep fest í statutory parameter set.'],
    effectivePeriod: { validFrom: '2026-01-01', validTo: null },
    audit: {
      createdAt: '2026-04-21T10:00:00Z',
      createdBy: 'system',
      reviewedAt: '2026-04-21T11:00:00Z',
      reviewedBy: 'legal_reviewer'
    }
  },
  {
    id: 'source_a1_2026',
    code: 'a1-levy-2026',
    version: '2026.1',
    sourceType: 'statutory',
    title: 'A1 vottorð og tryggingagjald',
    sourceUrl: 'https://www.skatturinn.is/atvinnurekstur/skattar-og-gjold/tryggingagjald/nr/91',
    coverageStatus: 'supported',
    transformedIntoRules: true,
    notes: ['Notað í A1 levy logic og compliance review.'],
    effectivePeriod: { validFrom: '2026-01-01', validTo: null },
    audit: {
      createdAt: '2026-04-21T10:00:00Z',
      createdBy: 'system',
      reviewedAt: '2026-04-21T11:30:00Z',
      reviewedBy: 'legal_reviewer'
    }
  }
]

export const coverageMatrixEntries = [
  {
    code: 'coverage_vr_retail',
    title: 'VR retail almennar launakeyrslur',
    sourceType: 'collective_agreement',
    coverageStatus: 'supported',
    residualRisk: 'medium',
    supportedScenarios: ['GS-001', 'GS-005', 'GS-006'],
    blockedScenarios: ['opinberur markaður', 'sjómenn']
  },
  {
    code: 'coverage_a1',
    title: 'A1 og tímabundið EES starfsfólk',
    sourceType: 'statutory',
    coverageStatus: 'supported',
    residualRisk: 'medium',
    supportedScenarios: ['GS-002'],
    blockedScenarios: ['óstaðfest A1 gögn']
  }
]

export const payrollRuns = [
  {
    id: 'payroll_run_2026_04',
    employerId: 'employer_frigg_demo',
    period: { validFrom: '2026-04-01', validTo: '2026-04-30' },
    status: 'review_required',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    statutoryParameterSetId: 'statutory_2026',
    startedAt: '2026-04-30T09:00:00Z',
    completedAt: null,
    reviewTaskIds: ['review_task_a1', 'review_task_parental']
  }
]

export const validationResults = [
  {
    payrollRunId: 'payroll_run_2026_04',
    status: 'warning',
    checkedAt: '2026-04-30T09:30:00Z',
    mismatches: [
      {
        employeeId: 'employee_jon',
        lineItemCode: 'INSURANCE_LEVY',
        expectedAmount: 425,
        actualAmount: 6350,
        message: 'A1 staða þarf review áður en lækkað tryggingagjald er samþykkt.'
      }
    ]
  }
]

export const payslips = [
  {
    id: 'payslip_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    issuedAt: '2026-04-30T10:00:00Z',
    grossPay: { currency: 'ISK', amount: 612000 },
    netPay: { currency: 'ISK', amount: 433148 },
    evidenceRecordIds: [
      'evidence_base_gudrun_2026_04',
      'evidence_evening_gudrun_2026_04',
      'evidence_pension_gudrun_2026_04',
      'evidence_union_gudrun_2026_04',
      'evidence_levy_gudrun_2026_04'
    ]
  }
]

export const payslipEvidenceRecords = [
  {
    id: 'evidence_base_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    payslipId: 'payslip_gudrun_2026_04',
    lineItemCode: 'BASE',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    sourceReferenceIds: ['source_statutory_2026', 'source_vr_collective_2026'],
    narrative:
      'Grunnlaun byggja á pinned VR retail reglusetti, ráðningarsamningi Guðrúnar og samþykktri aprílkeyrslu fyrir fullt starf.',
    calculatedAt: '2026-04-30T09:22:00Z'
  },
  {
    id: 'evidence_evening_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    payslipId: 'payslip_gudrun_2026_04',
    lineItemCode: 'EVENING_PREMIUM',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    sourceReferenceIds: ['source_vr_collective_2026'],
    narrative:
      'Kvöldálag var reiknað út frá 18 skráðum kvöldstundum, en launa-nátengd tímaskrárgögn vantar enn til að votta launalínuna án yfirferðar.',
    calculatedAt: '2026-04-30T09:24:00Z'
  },
  {
    id: 'evidence_pension_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    payslipId: 'payslip_gudrun_2026_04',
    lineItemCode: 'PENSION_EMPLOYEE',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    sourceReferenceIds: ['source-althingi-129-1997', 'source-live-launagreidendur'],
    narrative:
      'Lífeyrissjóðsiðgjald var dregið með 4% starfsmannsframlagi, en aðild og atvinnurekandasértækt routing eru enn í yfirferð.',
    calculatedAt: '2026-04-30T09:25:00Z'
  },
  {
    id: 'evidence_union_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    payslipId: 'payslip_gudrun_2026_04',
    lineItemCode: 'UNION_FEE',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    sourceReferenceIds: ['source-vr-kjarasamningar'],
    narrative:
      'Stéttarfélagsgjald fylgir VR retail pakkanum, en landfræðileg aðild og möguleg frávik frá almennri grunnleið krefjast enn yfirferðar.',
    calculatedAt: '2026-04-30T09:25:30Z'
  },
  {
    id: 'evidence_levy_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    payrollRunId: 'payroll_run_2026_04',
    payslipId: 'payslip_gudrun_2026_04',
    lineItemCode: 'INSURANCE_LEVY',
    ruleSetVersionIds: ['rule_set_vr_2026_2'],
    sourceReferenceIds: ['source-althingi-113-1990', 'source_a1_2026'],
    narrative:
      'Tryggingagjald var reiknað með staðlaðri álagningu, en sami run inniheldur A1 review task sem heldur employer charges í compute_with_review stöðu.',
    calculatedAt: '2026-04-30T09:27:00Z'
  }
]

export const agreementScopeAssessments = [
  {
    id: 'scope_gudrun_2026_04',
    employeeId: 'employee_gudrun',
    contractId: 'contract_gudrun_001',
    payrollInputEmployeeId: 'employee_gudrun',
    proposedAgreementPackId: 'agreement_pack_vr_retail',
    proposedAgreementScopeCode: 'vr-retail-store',
    status: 'matched',
    confidence: 'high',
    assessedAt: '2026-04-30T08:55:00Z',
    rationale:
      'Starfsheiti, starfskóði, vinnustaður og routing styðja öll almennt retail samningssvið VR án ósamræmis í þessu demótilviki.',
    evaluatedSignals: [
      {
        label: 'Starfsheiti',
        value: 'Verslunarfulltrúi',
        outcome: 'supports_match'
      },
      {
        label: 'Starfskóði',
        value: 'store_assistant',
        outcome: 'supports_match'
      },
      {
        label: 'Samningskóði í ráðningarsamningi',
        value: 'vr-retail-store',
        outcome: 'supports_match'
      },
      {
        label: 'Stéttarfélagsrouting',
        value: 'union_route_vr_retail',
        outcome: 'supports_match'
      }
    ],
    unresolvedQuestions: [],
    requiredPrivateCorpusCodes: []
  },
  {
    id: 'scope_jon_2026_04',
    employeeId: 'employee_jon',
    contractId: 'contract_jon_001',
    payrollInputEmployeeId: 'employee_jon',
    proposedAgreementPackId: 'agreement_pack_vr_retail',
    proposedAgreementScopeCode: 'vr-retail-shift',
    status: 'review_required',
    confidence: 'medium',
    assessedAt: '2026-04-30T08:57:00Z',
    rationale:
      'Jón líkist retail vaktstjóra innan VR sviðs, en vaktastjórnarhlutverk, erlendur A1 starfsmaður og ófull private sannleiksgögn halda samningssviðinu í yfirferð.',
    evaluatedSignals: [
      {
        label: 'Starfsheiti',
        value: 'Vaktstjóri',
        outcome: 'supports_review'
      },
      {
        label: 'Starfskóði',
        value: 'shift_lead',
        outcome: 'supports_review'
      },
      {
        label: 'Samningskóði í ráðningarsamningi',
        value: 'vr-retail-shift',
        outcome: 'supports_match'
      },
      {
        label: 'Launa-nátengd tímaskrárgögn',
        value: 'vantar',
        outcome: 'missing'
      }
    ],
    unresolvedQuestions: [
      'Staðfesta þarf hvort vaktstjórnarhlutverkið fylgi alveg sama retail pakka eða kalli á sérsniðna túlkun fyrir álags- og yfirvinnureglur.',
      'Vantar payroll-native tímaskrárgögn sem sýna raunverulegt vaktafyrirkomulag og verkstjórnarhlutverk.'
    ],
    requiredPrivateCorpusCodes: ['timesheets_and_work_patterns', 'employment_contracts_and_terms']
  }
]

export const privateCorpusSubmissions = [
  {
    id: 'private_payslip_gudrun_2026_04',
    code: 'payslips_corpus',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_gudrun',
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'validated',
    sourceType: 'customer_upload',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'validated',
    receivedAt: '2026-04-29T14:10:00Z',
    validatedAt: '2026-04-29T15:00:00Z',
    summary: 'Launaseðill Guðrúnar fyrir apríl hefur borist og verið staðfestur gegn demo-keyrslu.'
  },
  {
    id: 'private_contract_gudrun_001',
    code: 'employment_contracts_and_terms',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_gudrun',
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'validated',
    sourceType: 'customer_upload',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'validated',
    receivedAt: '2026-04-29T14:20:00Z',
    validatedAt: '2026-04-29T15:05:00Z',
    summary: 'Ráðningarsamningur Guðrúnar hefur verið nafnlausgerður og tengdur við samningssviðsmat.'
  },
  {
    id: 'private_timesheet_gudrun_2026_04',
    code: 'timesheets_and_work_patterns',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_gudrun',
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'received',
    sourceType: 'customer_upload',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'anonymized',
    receivedAt: '2026-04-29T16:10:00Z',
    validatedAt: null,
    summary: 'Tímaskrá Guðrúnar hefur borist, en hún hefur ekki enn verið sannreynd gegn kvöldálagslínu.'
  },
  {
    id: 'private_contract_jon_001',
    code: 'employment_contracts_and_terms',
    employerId: 'employer_frigg_demo',
    employeeId: 'employee_jon',
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'received',
    sourceType: 'customer_upload',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'anonymized',
    receivedAt: '2026-04-29T16:20:00Z',
    validatedAt: null,
    summary: 'Ráðningarsamningur Jóns hefur borist, en flokkun vaktstjóra er enn í yfirferð.'
  },
  {
    id: 'private_routing_vr_live',
    code: 'routing_truth',
    employerId: 'employer_frigg_demo',
    employeeId: null,
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'review_required',
    sourceType: 'manual_entry',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'not_applicable',
    receivedAt: '2026-04-29T17:00:00Z',
    validatedAt: null,
    summary: 'Routing tafla fyrir VR og LIVE hefur verið skráð handvirkt, en vantar staðfestingu per starfsmann.'
  },
  {
    id: 'private_remittance_missing_2026_04',
    code: 'remittance_truth',
    employerId: 'employer_frigg_demo',
    employeeId: null,
    relatedAgreementPackId: 'agreement_pack_vr_retail',
    status: 'missing',
    sourceType: 'system_seed',
    dataOrigin: 'demo_seed',
    anonymizationStatus: 'not_applicable',
    receivedAt: null,
    validatedAt: null,
    summary: 'Engin raunveruleg skilagrein eða skilastaðfesting hefur enn borist fyrir aprílkeyrslu.'
  }
]

export const privateCorpusIntakePackages = [
  {
    id: 'intake_vr_retail_april_2026',
    employerId: 'employer_frigg_demo',
    agreementPackId: 'agreement_pack_vr_retail',
    code: 'vr-retail-april-2026',
    title: 'VR retail intake pakki fyrir apríl 2026',
    status: 'review_required',
    targetScopeSummary:
      'Nær yfir retail starfsmenn, grunnlaun, kvöldálag, VR félagsgjöld, LIVE routing og skil fyrir aprílkeyrslu.',
    requiredSubmissionCodes: [
      'payslips_corpus',
      'timesheets_and_work_patterns',
      'employment_contracts_and_terms',
      'routing_truth',
      'remittance_truth'
    ],
    completedSubmissionCodes: ['payslips_corpus', 'employment_contracts_and_terms'],
    outstandingSubmissionCodes: [
      'timesheets_and_work_patterns',
      'routing_truth',
      'remittance_truth'
    ],
    blockers: [
      'Kvöldálag er ekki vottað fyrr en tímaskrár eru sannreyndar gegn launalínum.',
      'Routing er enn í yfirferð þar til aðild og sjóðstenging liggur fyrir per starfsmann.',
      'Skilagrein vantar enn og því er reconciliation ekki lokið.'
    ],
    nextStep:
      'Tengja raunverulegar nafnlausar tímaskrár, routing sannleiksgögn og fyrstu skilagrein við intake pakkann.',
    dataOrigin: 'demo_seed',
    runtimeReadiness: 'demo_only',
    runtimeReadinessReason:
      'Pakkinn byggir enn á handsmíðuðu demóinntaki og má ekki túlka sem raunverulega viðskiptavinainnslátt eða certified runtime grunn.',
    updatedAt: '2026-04-30T17:30:00Z'
  }
]

export const privateCorpusIntakeBlueprints = [
  {
    id: 'intake_blueprint_vr_retail_v1',
    agreementPackId: 'agreement_pack_vr_retail',
    code: 'vr-retail-payroll-native-v1',
    title: 'Afhendingarsnið fyrir fyrsta VR retail gagnapakkann',
    purpose:
      'Tryggja að fyrsta nafnlausa payroll-native innsendingin innihaldi lágmarksgögn fyrir samningssvið, launalínur, frávik og skilareconciliation.',
    deliverySteps: [
      'Safna saman nafnlausum launaseðlum, tímaskrám, ráðningarsamningum, routing gögnum og skilagrein fyrir sömu aprílkeyrslu.',
      'Merkja hvert skjal eða gagnasafn með starfsmannakenni, keyrslutímabili og tengdu samningssviði.',
      'Staðfesta að kennitölur, nöfn og aðrar persónugreinanlegar upplýsingar hafi verið fjarlægðar eða dulnefndar áður en innsending fer í review.',
      'Senda pakkann sem eina afhendingu svo Frigg geti tengt samningssvið, evidence, frávik og skil í sömu yfirferð.'
    ],
    checklist: [
      {
        code: 'payslips_corpus',
        title: 'Launaseðlar',
        recommendedFormat: 'PDF eða útflutningur úr launakerfi',
        minimumTarget: 'Að lágmarki 3 launaseðlar fyrir sömu keyrslu',
        anonymizationRequirement: 'Nafn, kennitala, bankaupplýsingar og heimilisfang fjarlægð eða dulnefnd',
        validationRequirement: 'Launaseðlar verða tengdir við line-item evidence og verða að passa við útgreidda keyrslu'
      },
      {
        code: 'timesheets_and_work_patterns',
        title: 'Tímaskráningar og vinnumynstur',
        recommendedFormat: 'CSV, XLSX eða PDF með dagsetningum og tímum',
        minimumTarget: 'Heill mánuður fyrir sömu starfsmenn og launaseðlana',
        anonymizationRequirement: 'Starfsmenn auðkenndir með sama dulnefnda lykli og í launaseðlum',
        validationRequirement: 'Kvöld-, helgar- og yfirvinnustundir þurfa að vera aðgreindar eða útskýrðar'
      },
      {
        code: 'employment_contracts_and_terms',
        title: 'Ráðningarsamningar og kjör',
        recommendedFormat: 'PDF eða textaútdráttur',
        minimumTarget: 'Samningur eða staðfest kjör fyrir alla starfsmenn í pakkanum',
        anonymizationRequirement: 'Persónuauðkenni fjarlægð, en starf, starfshlutfall og grunnkjör varðveitt',
        validationRequirement: 'Samningur þarf að sýna lágmark grunnlauna, starfshlutfall og viðeigandi sérkjör'
      },
      {
        code: 'routing_truth',
        title: 'Routing sannleiksgögn',
        recommendedFormat: 'CSV, XLSX eða tafla í texta',
        minimumTarget: 'Eitt mapping per starfsmann fyrir stéttarfélag og lífeyrissjóð',
        anonymizationRequirement: 'Notast við dulnefnd starfsmannakenni í stað nafna eða kennitalna',
        validationRequirement: 'Hver færsla þarf að segja hvaða félag/sjóður gildir og á hvaða forsendu'
      },
      {
        code: 'remittance_truth',
        title: 'Skilagrein eða skilastaðfesting',
        recommendedFormat: 'PDF, CSV eða skjáskot með lykiluplýsingum',
        minimumTarget: 'Að minnsta kosti ein skilagrein fyrir sama tímabil og launaseðlarnir',
        anonymizationRequirement: 'Fela viðkvæmar auðkenningarupplýsingar sem ekki skipta máli fyrir reconciliation',
        validationRequirement: 'Skil þurfa að vera tengjanleg við sömu keyrslu og routing gögnin'
      }
    ],
    acceptanceCriteria: [
      'Öll gögn vísa í sama keyrslutímabil og sama samningssvið.',
      'Sömu dulnefndu starfsmannakenni eru notuð í launaseðlum, tímaskrám og ráðningargögnum.',
      'Að minnsta kosti einn launaseðill, ein tímaskrá og einn ráðningarsamningur eru komin í `validated` stöðu áður en pakkinn má færast í review-runtime.',
      'Routing og skilagrein eru komin í það minnsta í `received` stöðu svo reconciliation sé ekki ósýnilegt.'
    ],
    nextPackageAfterThis:
      'Næsta pakki á að bæta við öðru félagssviði eða annarri álagsgerð, ekki bara fleiri afbrigðum af sama VR retail grunnflæði.'
  }
]

export const reviewTasks = [
  {
    id: 'review_task_a1',
    taskType: 'tax_credit_review',
    employerId: 'employer_frigg_demo',
    relatedEntityId: 'employee_jon',
    status: 'open',
    assigneeId: null,
    reason: 'Staðfesta þarf A1-gögn áður en keyrsla má fara í samþykki.',
    createdAt: '2026-04-30T09:35:00Z'
  },
  {
    id: 'review_task_parental',
    taskType: 'retro_review',
    employerId: 'employer_frigg_demo',
    relatedEntityId: 'GS-004',
    status: 'open',
    assigneeId: null,
    reason: 'Yfirfara þarf persónuafslátt þegar fæðingarorlof og hlutastarf skarast.',
    createdAt: '2026-04-30T09:40:00Z'
  }
]

export const complianceDeadlines = [
  {
    id: 'deadline_withholding_2026_05_15',
    employerId: 'employer_frigg_demo',
    category: 'withholding_tax',
    dueDate: '2026-05-15',
    title: 'Skil á staðgreiðslu',
    description: 'Skila þarf staðgreiðslu og tryggingagjaldi vegna aprílmánaðar.',
    severity: 'critical'
  },
  {
    id: 'deadline_pension_2026_05_10',
    employerId: 'employer_frigg_demo',
    category: 'pension_remittance',
    dueDate: '2026-05-10',
    title: 'Skil á lífeyrisiðgjöldum',
    description: 'Skila þarf iðgjöldum og skilagreinum til viðeigandi lífeyrissjóðs.',
    severity: 'warning'
  }
]

export const auditEvents = [
  {
    id: 'audit_run_created',
    employerId: 'employer_frigg_demo',
    entityType: 'payroll_run',
    entityId: 'payroll_run_2026_04',
    action: 'created',
    performedAt: '2026-04-30T09:00:00Z',
    performedBy: 'system',
    summary: 'Aprílkeyrsla stofnuð með pinned statutory og rule set versions.'
  },
  {
    id: 'audit_review_requested',
    employerId: 'employer_frigg_demo',
    entityType: 'review_task',
    entityId: 'review_task_a1',
    action: 'review_requested',
    performedAt: '2026-04-30T09:35:00Z',
    performedBy: 'system',
    summary: 'A1 review task stofnað vegna mismatch í validation.'
  }
]

export const payrollDomainSnapshot = {
  employers,
  employees,
  contracts,
  payrollInputs,
  agreementScopeAssessments,
  privateCorpusSubmissions,
  privateCorpusIntakePackages,
  privateCorpusIntakeBlueprints,
  agreementVersions,
  ruleSetVersions,
  statutoryParameterSets,
  pensionRoutingRules,
  unionRoutingRules,
  taxCreditAllocations,
  a1CertificateStatuses,
  knowledgeSources,
  coverageMatrixEntries,
  payrollRuns,
  validationResults,
  payslips,
  payslipEvidenceRecords,
  reviewTasks,
  complianceDeadlines,
  auditEvents
}
