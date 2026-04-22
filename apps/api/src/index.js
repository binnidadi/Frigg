import { buildAgreementParsePreview, buildKnowledgePreview, getAIHealthSnapshot } from './ai.js'
import { createRepository } from './repository.js'

const repository = createRepository()
const snapshot = repository.getSnapshot()
const scenarios = repository.getScenarios()
const health = getAIHealthSnapshot()
const sampleParse = buildAgreementParsePreview()
const sampleKnowledge = buildKnowledgePreview('staðgreiðsla A1')

export const apiApp = {
  name: 'frigg-api',
  status: 'ready',
  endpoints: [
    '/snapshot',
    '/scenarios',
    '/repository/status',
    '/research/workspace',
    '/research/summary',
    '/research/coverage-matrix',
    '/research/private-corpus',
    '/ai/health',
    '/ai/parse-preview',
    '/ai/knowledge-preview'
  ],
  goldenScenarioCount: scenarios.length,
  employerCount: snapshot.employers.length,
  repository: repository.getRepositoryStatus(),
  research: repository.getResearchSummary(),
  ai: {
    providerCount: health.providers.length,
    sampleParseRuleCount: sampleParse.extractedRules.length,
    sampleKnowledgeSourceCount: sampleKnowledge.sourceIds.length
  }
}
