import type {
  CoverageMatrixEntry,
  Identifier,
  KnowledgeAnswer,
  KnowledgeSourceRecord
} from '@frigg/contracts'

import { buildKnowledgeConfidence } from './confidence.js'

export class DeterministicKnowledgeRetriever {
  constructor(
    private readonly sources: KnowledgeSourceRecord[],
    private readonly coverageEntries: CoverageMatrixEntry[]
  ) {}

  getSourceById(sourceId: Identifier): KnowledgeSourceRecord | null {
    return this.sources.find((source) => source.id === sourceId) ?? null
  }

  searchByTerms(terms: string[]): KnowledgeSourceRecord[] {
    const normalizedTerms = terms.map((term) => term.trim().toLowerCase()).filter(Boolean)

    if (normalizedTerms.length === 0) {
      return []
    }

    return this.sources.filter((source) => {
      const searchableFields = [source.title, source.code, source.notes.join(' ')].join(' ').toLowerCase()
      return normalizedTerms.some((term) => searchableFields.includes(term))
    })
  }

  getCoverageImplications(sourceIds: Identifier[]): CoverageMatrixEntry[] {
    const sourceCodes = this.sources
      .filter((source) => sourceIds.includes(source.id))
      .map((source) => source.code)

    return this.coverageEntries.filter((entry) => sourceCodes.includes(entry.code))
  }

  answerQuestion(question: string): KnowledgeAnswer {
    const now = new Date().toISOString()
    const terms = question
      .split(/\s+/)
      .map((term) => term.replace(/[^\p{L}\p{N}_-]/gu, ''))
      .filter((term) => term.length >= 3)

    const matches = this.searchByTerms(terms)
    const sourceIds = matches.map((match) => match.id)
    const coverageImplications = this.coverageEntries.filter((entry) =>
      matches.some((match) => match.code === entry.code)
    )

    const highestCoverageStatus =
      coverageImplications.find((entry) => entry.coverageStatus === 'supported')?.coverageStatus ??
      coverageImplications.find((entry) => entry.coverageStatus === 'partial')?.coverageStatus ??
      'unsupported'

    const confidence = buildKnowledgeConfidence({
      sourceCoverage: matches.length === 0 ? 0 : Math.min(1, matches.length / 3),
      sourceCount: matches.length,
      coverageStatus:
        highestCoverageStatus === 'supported' || highestCoverageStatus === 'partial'
          ? highestCoverageStatus
          : 'unsupported'
    })

    return {
      answer:
        matches.length === 0
          ? 'Engin staðfest heimild fannst sem svarar spurningunni nægilega skýrt.'
          : `Fundust ${matches.length} staðfestar heimildir sem tengjast spurningunni.`,
      sourceIds,
      coverageImplications,
      confidence,
      reviewRequired: confidence.reviewRequired,
      execution: {
        requestKind: 'knowledge',
        status: 'completed',
        startedAt: now,
        completedAt: now,
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
          matches.length === 0 ? ['Spurningin þarfnast handvirkrar yfirferðar eða fleiri heimilda.'] : [],
        failures: []
      }
    }
  }
}
