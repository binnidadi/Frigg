import { buildAgreementParsePreview, buildKnowledgePreview, getAIHealthSnapshot } from './ai.js'
import { goldenScenarios } from './scenarios.js'
import { payrollDomainSnapshot } from './data.js'

export const apiApp = {
  name: 'frigg-api',
  status: 'ready',
  endpoints: ['/snapshot', '/scenarios', '/ai/health', '/ai/parse-preview', '/ai/knowledge-preview'],
  goldenScenarioCount: goldenScenarios.length,
  employerCount: payrollDomainSnapshot.employers.length,
  ai: {
    providerCount: getAIHealthSnapshot().providers.length,
    sampleParseRuleCount: buildAgreementParsePreview().extractedRules.length,
    sampleKnowledgeSourceCount: buildKnowledgePreview('staðgreiðsla A1').sourceIds.length
  }
} as const
