export const goldenScenarios = [
  {
    id: 'GS-001',
    title: 'Fjölgreiðendur og persónuafsláttur',
    category: 'multi_payer',
    summary:
      'Starfsmaður fær greitt frá tveimur launagreiðendum og fullnýtir persónuafslátt hjá aðallaunagreiðanda.',
    expectedOutcome:
      'Kerfið flaggar ef aukagreiðandi notar rangt skattþrep eða ef review vantar fyrir skiptingu persónuafsláttar.',
    entities: ['employees', 'taxCreditAllocations', 'payrollRuns', 'validationResults']
  },
  {
    id: 'GS-002',
    title: 'A1 vottorð með lækkuðu tryggingagjaldi',
    category: 'a1',
    summary:
      'Erlendur starfsmaður með gilt A1-vottorð starfar tímabundið hjá íslenskum launagreiðanda.',
    expectedOutcome:
      'Rétt tryggingagjald er notað og keyrslan heldur utan um staðfestan gildistíma vottorðs.',
    entities: ['employees', 'a1CertificateStatuses', 'statutoryParameterSets', 'payrollRuns']
  },
  {
    id: 'GS-003',
    title: 'Veikindi barns',
    category: 'sickness_child',
    summary:
      'Starfsmaður notar rétt vegna veikinda barns innan gildandi reglna og kjarasamnings.',
    expectedOutcome:
      'Kerfið meðhöndlar fjarvistina sem sérstakt leave event og skýrir áhrif á keyrslu og launaseðil.',
    entities: ['contracts', 'payrollRuns', 'validationResults']
  },
  {
    id: 'GS-004',
    title: 'Fæðingarorlof og hlutastarf',
    category: 'parental_leave',
    summary:
      'Starfsmaður er í hlutastarfi og fær jafnframt greiðslur vegna fæðingarorlofs á sama tímabili.',
    expectedOutcome:
      'Kerfið krefst review á persónuafslætti ef hætta er á tvínýtingu og heldur utan um leave events.',
    entities: ['taxCreditAllocations', 'reviewTasks', 'payrollRuns']
  },
  {
    id: 'GS-005',
    title: 'Afturvirk leiðrétting vegna nýs reglusetts',
    category: 'retro',
    summary:
      'Nýtt samþykkt reglusett tekur gildi aftur í tímann og hefur áhrif á þegar lokaðar keyrslur.',
    expectedOutcome:
      'Retro batch myndast með rekjanlegri breytingasýn og nýjum audit events.',
    entities: ['ruleSetVersions', 'payrollRuns', 'auditEvents']
  },
  {
    id: 'GS-006',
    title: 'Routing í réttan sjóð og félag',
    category: 'routing',
    summary:
      'Starfsmaður flyst í starf þar sem önnur routing regla gildir fyrir sjóð og stéttarfélag.',
    expectedOutcome:
      'Ný routing regla tekur gildi frá réttum degi án þess að eldri keyrslur breytist.',
    entities: ['pensionRoutingRules', 'unionRoutingRules', 'contracts', 'payrollRuns']
  }
]
