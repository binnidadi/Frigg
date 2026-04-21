import type { ConfidenceFactor, ConfidenceLevel, ConfidenceResult } from '@frigg/contracts'

const HIGH_CONFIDENCE_THRESHOLD = 0.85
const MEDIUM_CONFIDENCE_THRESHOLD = 0.6

function toLevel(score: number): ConfidenceLevel {
  if (score >= HIGH_CONFIDENCE_THRESHOLD) {
    return 'high'
  }

  if (score >= MEDIUM_CONFIDENCE_THRESHOLD) {
    return 'medium'
  }

  return 'low'
}

function toBadge(level: ConfidenceLevel): string {
  switch (level) {
    case 'high':
      return 'Öruggt mat'
    case 'medium':
      return 'Yfirfara vandlega'
    default:
      return 'Handvirkt mat krafist'
  }
}

export function buildConfidenceResult(factors: ConfidenceFactor[]): ConfidenceResult {
  const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0)

  const weightedScore =
    totalWeight === 0
      ? 0
      : factors.reduce((sum, factor) => sum + factor.contribution * factor.weight, 0) / totalWeight

  const score = Math.max(0, Math.min(1, Number(weightedScore.toFixed(4))))
  const level = toLevel(score)

  return {
    score,
    level,
    reviewRequired: level !== 'high',
    badge: toBadge(level),
    factors
  }
}

export function buildAgreementConfidence(input: {
  sourceCoverage: number
  schemaFit: number
  extractionClarity: number
  routingClarity: number
  warnings: string[]
}): ConfidenceResult {
  const warningPenalty = Math.min(input.warnings.length * 0.08, 0.4)

  return buildConfidenceResult([
    {
      code: 'source_coverage',
      label: 'Heimildaþekja',
      weight: 0.35,
      contribution: input.sourceCoverage,
      rationale: 'Mælir hversu skýrt heimildir studdu niðurstöðuna.'
    },
    {
      code: 'schema_fit',
      label: 'Samhæfi við canonical skema',
      weight: 0.25,
      contribution: input.schemaFit,
      rationale: 'Mælir hvort niðurstaðan passi hreint inn í reglusnið Frigg.'
    },
    {
      code: 'extraction_clarity',
      label: 'Skýrleiki útdráttar',
      weight: 0.25,
      contribution: input.extractionClarity,
      rationale: 'Mælir tvíræðni í texta og túlkun.'
    },
    {
      code: 'routing_clarity',
      label: 'Skýrleiki routing',
      weight: 0.15,
      contribution: Math.max(0, input.routingClarity - warningPenalty),
      rationale: 'Mælir hvort greiðslur og reglur vísi ótvírætt í réttan aðila.'
    }
  ])
}

export function buildKnowledgeConfidence(input: {
  sourceCoverage: number
  sourceCount: number
  coverageStatus: 'supported' | 'partial' | 'unsupported'
}): ConfidenceResult {
  const sourceCountContribution = Math.min(1, input.sourceCount / 3)
  const coverageContribution =
    input.coverageStatus === 'supported'
      ? 1
      : input.coverageStatus === 'partial'
        ? 0.55
        : 0.2

  return buildConfidenceResult([
    {
      code: 'knowledge_coverage',
      label: 'Þekkingarþekja',
      weight: 0.5,
      contribution: input.sourceCoverage,
      rationale: 'Mælir hvort svör styðjist við staðfestar heimildir.'
    },
    {
      code: 'source_count',
      label: 'Fjöldi heimilda',
      weight: 0.2,
      contribution: sourceCountContribution,
      rationale: 'Fleiri samhljóða heimildir auka traust.'
    },
    {
      code: 'coverage_status',
      label: 'Coverage staða',
      weight: 0.3,
      contribution: coverageContribution,
      rationale: 'Supported coverage vegur þyngra en partial eða unsupported.'
    }
  ])
}
