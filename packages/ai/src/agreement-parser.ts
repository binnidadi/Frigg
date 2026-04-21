import type {
  AgreementExtractionResult,
  Identifier,
  KnowledgeSourceRecord,
  RuleDecisionTree,
  SourceReference
} from '@frigg/contracts'

import { buildAgreementConfidence } from './confidence.js'
import type { ProviderOperationResult } from './failover-provider.js'
import type { DocumentParser, ParserWarning } from './parser-pipeline.js'
import { runDocumentParser } from './parser-pipeline.js'

export interface AgreementParserOptions {
  agreementId: Identifier
  agreementVersion: string
  sourceDocumentId: Identifier
  effectiveFrom?: string
  referencedSources?: KnowledgeSourceRecord[]
}

interface ParsedAgreementDraft {
  lines: string[]
}

interface NormalizedAgreementDraft {
  summary: string
  extractedRules: RuleDecisionTree[]
  warnings: string[]
}

interface AgreementPreview {
  summary: string
  ruleCount: number
}

function buildSourceReference(
  sourceDocumentId: Identifier,
  clauseReference: string,
  excerpt: string
): SourceReference {
  return {
    documentId: sourceDocumentId,
    clauseReference,
    pages: [],
    excerpt
  }
}

function buildFixedBonusRule(input: {
  id: Identifier
  agreementId: Identifier
  agreementVersion: string
  effectiveFrom: string
  sourceDocumentId: Identifier
  triggerEvent: RuleDecisionTree['triggerEvent']
  target: string
  label: string
  excerpt: string
}): RuleDecisionTree {
  return {
    id: input.id,
    agreementId: input.agreementId,
    agreementVersion: input.agreementVersion,
    status: 'review_pending',
    effectivePeriod: {
      validFrom: input.effectiveFrom,
      validTo: null
    },
    scope: {
      employeeGroups: [],
      employmentTypes: ['monthly', 'hourly'],
      locations: ['IS'],
      jobCodes: [],
      minimumAgeYears: null
    },
    triggerEvent: input.triggerEvent,
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
        target: input.target
      }
    ],
    source: buildSourceReference(input.sourceDocumentId, input.label, input.excerpt),
    audit: {
      createdAt: new Date().toISOString(),
      createdBy: 'agreement-parser',
      reviewedAt: null,
      reviewedBy: null
    }
  }
}

class KeywordAgreementParser
  implements DocumentParser<ParsedAgreementDraft, NormalizedAgreementDraft, AgreementPreview>
{
  constructor(private readonly options: AgreementParserOptions) {}

  detect(text: string) {
    const warnings: ParserWarning[] = []

    if (!/kjarasamning/i.test(text)) {
      warnings.push({
        code: 'document_type_uncertain',
        message: 'Skjalið lítur ekki ótvírætt út eins og kjarasamningur.'
      })
    }

    return {
      documentType: 'collective_agreement',
      detectedLanguage: 'is' as const,
      warnings
    }
  }

  parse(text: string) {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    const warnings: ParserWarning[] = []
    if (lines.length < 4) {
      warnings.push({
        code: 'short_document',
        message: 'Skjalið er stutt og gæti þurft handvirka yfirferð áður en það er túlkað.'
      })
    }

    return {
      summary: `Skjal brotið niður í ${lines.length} textalínur til frekari normaliseringar.`,
      parsed: {
        lines
      },
      warnings
    }
  }

  normalize(parsed: ParsedAgreementDraft) {
    const extractedRules: RuleDecisionTree[] = []
    const warnings: ParserWarning[] = []

    const holidayLine = parsed.lines.find((line) => /orlofsuppb[oó]t/i.test(line))
    if (holidayLine) {
      extractedRules.push(
        buildFixedBonusRule({
          id: `${this.options.agreementId}-holiday-bonus`,
          agreementId: this.options.agreementId,
          agreementVersion: this.options.agreementVersion,
          effectiveFrom: this.options.effectiveFrom ?? new Date().toISOString().slice(0, 10),
          sourceDocumentId: this.options.sourceDocumentId,
          triggerEvent: 'payroll_run',
          target: 'earnings.holiday_bonus',
          label: 'orlofsuppbót',
          excerpt: holidayLine
        })
      )
    }

    const decemberLine = parsed.lines.find((line) => /desemberuppb[oó]t/i.test(line))
    if (decemberLine) {
      extractedRules.push(
        buildFixedBonusRule({
          id: `${this.options.agreementId}-december-bonus`,
          agreementId: this.options.agreementId,
          agreementVersion: this.options.agreementVersion,
          effectiveFrom: this.options.effectiveFrom ?? new Date().toISOString().slice(0, 10),
          sourceDocumentId: this.options.sourceDocumentId,
          triggerEvent: 'payroll_run',
          target: 'earnings.december_bonus',
          label: 'desemberuppbót',
          excerpt: decemberLine
        })
      )
    }

    const seniorityLine = parsed.lines.find((line) => /starfsaldur|eitt ár|12 mánu/i.test(line))
    if (seniorityLine) {
      warnings.push({
        code: 'seniority_review_required',
        message: 'Starfsaldurstexti fannst, en deterministic parser setti ekki sjálfvirka reglu án mannlegrar yfirferðar.'
      })
    }

    if (extractedRules.length === 0) {
      warnings.push({
        code: 'no_structured_rules',
        message: 'Engin skýr bonus- eða álagsmynstur fundust sem parser gat umbreytt sjálfvirkt.'
      })
    }

    return {
      normalized: {
        summary: `Parser fann ${extractedRules.length} regludrög sem þarf að fara í review.`,
        extractedRules,
        warnings: warnings.map((warning) => warning.message)
      },
      warnings
    }
  }

  preview(normalized: NormalizedAgreementDraft) {
    return {
      preview: {
        summary: normalized.summary,
        ruleCount: normalized.extractedRules.length
      },
      warnings: normalized.warnings.map((message, index) => ({
        code: `preview_warning_${index + 1}`,
        message
      }))
    }
  }
}

export class DeterministicAgreementParserAdapter {
  constructor(private readonly options: AgreementParserOptions) {}

  parse(text: string): ProviderOperationResult<Omit<AgreementExtractionResult, 'execution'>> {
    const parser = new KeywordAgreementParser(this.options)
    const result = runDocumentParser(parser, text)
    const confidence = buildAgreementConfidence({
      sourceCoverage: result.normalized.extractedRules.length > 0 ? 0.72 : 0.45,
      schemaFit: result.normalized.extractedRules.length > 0 ? 0.8 : 0.55,
      extractionClarity: result.warnings.length === 0 ? 0.85 : 0.55,
      routingClarity: 0.5,
      warnings: result.warnings
    })

    return {
      result: {
        agreementId: this.options.agreementId,
        agreementVersion: this.options.agreementVersion,
        detectedLanguage: result.detectedLanguage,
        summary: result.preview.summary,
        extractedRules: result.normalized.extractedRules,
        referencedSources: this.options.referencedSources ?? [],
        warnings: result.warnings,
        reviewRequired: confidence.reviewRequired || result.warnings.length > 0,
        confidence,
        parserStages: result.stages
      },
      warnings: result.warnings,
      usage: {
        inputTokens: 0,
        outputTokens: 0,
        cachedTokens: 0
      }
    }
  }
}
