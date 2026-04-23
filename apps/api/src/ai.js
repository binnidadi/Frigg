import { coverageMatrixEntries, knowledgeSources } from './data.js'

const PROVIDERS = [
  {
    name: 'GitHub Models',
    model: 'gpt-4o-mini',
    envKey: 'GITHUB_MODELS_TOKEN'
  },
  {
    name: 'Gemini',
    model: 'gemini-2.5-flash',
    envKey: 'GEMINI_API_KEY'
  },
  {
    name: 'SambaNova',
    model: 'Meta-Llama-3.1-70B-Instruct',
    envKey: 'SAMBANOVA_API_KEY'
  },
  {
    name: 'Mistral',
    model: 'mistral-large-latest',
    envKey: 'MISTRAL_API_KEY'
  }
]

export const sampleAgreementText = `
Kjarasamningur um almenn starfskjör í verslun.

Starfsmaður á rétt á orlofsuppbót samkvæmt gildandi samningi.
Starfsmaður á einnig rétt á desemberuppbót samkvæmt nánari skilyrðum samnings.
Eftir 12 mánuði í starfi skal yfirfara starfsaldurstengd réttindi samkvæmt launatöflu.
`.trim()

function nowIso() {
  return new Date().toISOString()
}

function buildConfidence(score, factors) {
  const roundedScore = Math.max(0, Math.min(1, Number(score.toFixed(4))))
  const level = roundedScore >= 0.85 ? 'high' : roundedScore >= 0.6 ? 'medium' : 'low'

  return {
    score: roundedScore,
    level,
    reviewRequired: level !== 'high',
    badge:
      level === 'high' ? 'Öruggt mat' : level === 'medium' ? 'Yfirfara vandlega' : 'Handvirkt mat krafist',
    factors
  }
}

export function getAIHealthSnapshot() {
  const checkedAt = nowIso()
  const providers = PROVIDERS.map((provider) => {
    const configured = Boolean(process.env[provider.envKey])
    return {
      name: provider.name,
      status: configured ? 'healthy' : 'missing_key',
      checkedAt,
      latencyMs: null,
      message: configured ? null : `Vantar ${provider.envKey}.`,
      model: provider.model,
      cooldownUntil: null
    }
  })

  const healthyCount = providers.filter((provider) => provider.status === 'healthy').length

  return {
    overallStatus: healthyCount === 0 ? 'red' : healthyCount === providers.length ? 'green' : 'yellow',
    checkedAt,
    providers
  }
}

function buildRuleDraft({ id, agreementId, agreementVersion, effectiveFrom, target, label, excerpt }) {
  return {
    id,
    agreementId,
    agreementVersion,
    status: 'review_pending',
    effectivePeriod: {
      validFrom: effectiveFrom,
      validTo: null
    },
    scope: {
      employeeGroups: [],
      employmentTypes: ['monthly', 'hourly'],
      locations: ['IS'],
      jobCodes: [],
      minimumAgeYears: null
    },
    triggerEvent: 'payroll_run',
    priority: 200,
    stackingMode: 'stack',
    conditions: {
      condition: {
        fact: 'employment.active',
        operator: 'eq',
        value: true
      }
    },
    actions: [
      {
        type: 'set_fixed_amount',
        target
      }
    ],
    source: {
      documentId: 'source_preview_document',
      clauseReference: label,
      pages: [],
      excerpt
    },
    audit: {
      createdAt: nowIso(),
      createdBy: 'api-parse-preview',
      reviewedAt: null,
      reviewedBy: null
    }
  }
}

export function buildAgreementParsePreview(input = {}) {
  const text = typeof input.text === 'string' && input.text.trim().length > 0 ? input.text : sampleAgreementText
  const agreementId = typeof input.agreementId === 'string' && input.agreementId ? input.agreementId : 'agreement_preview'
  const agreementVersion =
    typeof input.agreementVersion === 'string' && input.agreementVersion ? input.agreementVersion : 'draft'
  const effectiveFrom =
    typeof input.effectiveFrom === 'string' && input.effectiveFrom ? input.effectiveFrom : '2026-04-21'

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const warnings = []
  const extractedRules = []

  if (!/kjarasamning/i.test(text)) {
    warnings.push('Skjalið lítur ekki ótvírætt út eins og kjarasamningur.')
  }

  const holidayLine = lines.find((line) => /orlofsuppb[oó]t/i.test(line))
  if (holidayLine) {
    extractedRules.push(
      buildRuleDraft({
        id: `${agreementId}-holiday-bonus`,
        agreementId,
        agreementVersion,
        effectiveFrom,
        target: 'earnings.holiday_bonus',
        label: 'orlofsuppbót',
        excerpt: holidayLine
      })
    )
  }

  const decemberLine = lines.find((line) => /desemberuppb[oó]t/i.test(line))
  if (decemberLine) {
    extractedRules.push(
      buildRuleDraft({
        id: `${agreementId}-december-bonus`,
        agreementId,
        agreementVersion,
        effectiveFrom,
        target: 'earnings.december_bonus',
        label: 'desemberuppbót',
        excerpt: decemberLine
      })
    )
  }

  if (lines.some((line) => /starfsaldur|12 mánu|eitt ár/i.test(line))) {
    warnings.push(
      'Starfsaldurstexti fannst, en lestrarlagið skilur hann eftir í yfirferð þar sem frekari túlkun á launatöflu vantar.'
    )
  }

  if (extractedRules.length === 0) {
    warnings.push('Engin skýr reglumynstur fundust sem hægt var að umbreyta sjálfvirkt í regludrög.')
  }

  const sourceCoverage = extractedRules.length > 0 ? 0.72 : 0.45
  const schemaFit = extractedRules.length > 0 ? 0.8 : 0.55
  const extractionClarity = warnings.length === 0 ? 0.85 : 0.58
  const routingClarity = 0.5
  const warningPenalty = Math.min(warnings.length * 0.08, 0.4)

  const confidence = buildConfidence(
    (sourceCoverage * 0.35) +
      (schemaFit * 0.25) +
      (extractionClarity * 0.25) +
      (Math.max(0, routingClarity - warningPenalty) * 0.15),
    [
      {
        code: 'source_coverage',
        label: 'Heimildaþekja',
        weight: 0.35,
        contribution: sourceCoverage,
        rationale: 'Mælir hvort skýr samningsákvæði fundust sem hægt var að umbreyta í regludrög.'
      },
      {
        code: 'schema_fit',
        label: 'Samhæfi við canonical skema',
        weight: 0.25,
        contribution: schemaFit,
        rationale: 'Mælir hversu hreint lestrarlagið gat fært niðurstöðuna yfir í reglusnið Frigg.'
      },
      {
        code: 'extraction_clarity',
        label: 'Skýrleiki útdráttar',
        weight: 0.25,
        contribution: extractionClarity,
        rationale: 'Mælir tvíræðni texta og hversu mikið fór í review.'
      },
      {
        code: 'routing_clarity',
        label: 'Skýrleiki routing',
        weight: 0.15,
        contribution: Math.max(0, routingClarity - warningPenalty),
        rationale: 'Lestrarlagið metur routing aðeins að hluta á þessu stigi og skilur óvissu eftir til yfirferðar.'
      }
    ]
  )

  return {
    agreementId,
    agreementVersion,
    detectedLanguage: 'is',
    summary: `Lestrarlagið fann ${extractedRules.length} regludrög sem þarf að yfirfara áður en þau fara í reglusafnið.`,
    extractedRules,
    referencedSources: knowledgeSources.filter((source) => source.sourceType === 'collective_agreement').slice(0, 2),
    warnings,
    reviewRequired: true,
    confidence,
    parserStages: [
      {
        stage: 'detect',
        status: /kjarasamning/i.test(text) ? 'completed' : 'warning',
        summary: 'Skjal metið sem kjarasamningstengt skjal.',
        warnings: /kjarasamning/i.test(text) ? [] : ['Skjalið var ekki ótvírætt auðkennt sem kjarasamningur.']
      },
      {
        stage: 'parse',
        status: 'completed',
        summary: `Skjal brotið niður í ${lines.length} textalínur.`,
        warnings: []
      },
      {
        stage: 'normalize',
        status: warnings.length > 0 ? 'warning' : 'completed',
        summary: 'Skýr ákvæði færð yfir í fyrstu regludrög sem þarf að yfirfara.',
        warnings
      },
      {
        stage: 'preview',
        status: 'completed',
        summary: 'Forsýning útbúin fyrir yfirferðarferli samnings.',
        warnings: []
      },
      {
        stage: 'warnings',
        status: warnings.length > 0 ? 'warning' : 'completed',
        summary:
          warnings.length > 0
            ? `Samtals ${warnings.length} viðvaranir merktir til yfirferðar.`
            : 'Engar sérstakar viðvaranir komu fram.',
        warnings
      }
    ],
    execution: {
      requestKind: 'agreement_parse',
      status: 'completed',
      startedAt: nowIso(),
      completedAt: nowIso(),
      providerName: 'deterministic-agreement-parser',
      providerModel: 'keyword-preview',
      fallbackDepth: 0,
      latencyMs: 0,
      usage: {
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0
      },
      warnings,
      failures: []
    }
  }
}

export function buildKnowledgePreview(query = '') {
  const normalizedTerms = String(query)
    .split(/\s+/)
    .map((term) => term.replace(/[^\p{L}\p{N}_-]/gu, '').toLowerCase())
    .filter((term) => term.length >= 3)

  const sourceMatches =
    normalizedTerms.length === 0
      ? []
      : knowledgeSources.filter((source) => {
          const searchable = [source.title, source.code, source.notes.join(' ')].join(' ').toLowerCase()
          return normalizedTerms.some((term) => searchable.includes(term))
        })

  const coverageImplications = coverageMatrixEntries.filter((entry) =>
    sourceMatches.some((source) => source.code === entry.code)
  )

  const confidence = buildConfidence(
    sourceMatches.length === 0 ? 0.2 : Math.min(0.88, 0.45 + sourceMatches.length * 0.12),
    [
      {
        code: 'knowledge_coverage',
        label: 'Þekkingarþekja',
        weight: 0.6,
        contribution: sourceMatches.length === 0 ? 0.2 : Math.min(1, sourceMatches.length / 3),
        rationale: 'Mælir hvort staðfestar heimildir fundust sem svara fyrirspurninni.'
      },
      {
        code: 'coverage_matrix',
        label: 'Coverage staða',
        weight: 0.4,
        contribution:
          coverageImplications.some((entry) => entry.coverageStatus === 'supported')
            ? 1
            : coverageImplications.some((entry) => entry.coverageStatus === 'partial')
              ? 0.55
              : 0.2,
        rationale: 'Mælir hvort Frigg styður viðkomandi svið formlega eða aðeins að hluta.'
      }
    ]
  )

  return {
    answer:
      sourceMatches.length === 0
        ? 'Engin staðfest heimild fannst sem svarar fyrirspurninni nægilega skýrt.'
        : `Fundust ${sourceMatches.length} staðfestar heimildir sem tengjast fyrirspurninni.`,
    sourceIds: sourceMatches.map((source) => source.id),
    coverageImplications,
    confidence,
    reviewRequired: confidence.reviewRequired,
    execution: {
      requestKind: 'knowledge',
      status: 'completed',
      startedAt: nowIso(),
      completedAt: nowIso(),
      providerName: 'deterministic-knowledge-retriever',
      providerModel: 'local-search',
      fallbackDepth: 0,
      latencyMs: 0,
      usage: {
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0
      },
      warnings:
        sourceMatches.length === 0
          ? ['Fyrirspurn þarfnast handvirkrar yfirferðar eða fleiri heimilda.']
          : [],
      failures: []
    }
  }
}
