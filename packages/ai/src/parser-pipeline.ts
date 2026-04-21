import type { ParserStageResult } from '@frigg/contracts'

export interface ParserWarning {
  code: string
  message: string
}

export interface DocumentParser<TParsed, TNormalized, TPreview> {
  detect(text: string): {
    documentType: string
    detectedLanguage: 'is'
    warnings: ParserWarning[]
  }
  parse(text: string): {
    summary: string
    parsed: TParsed
    warnings: ParserWarning[]
  }
  normalize(parsed: TParsed): {
    normalized: TNormalized
    warnings: ParserWarning[]
  }
  preview(normalized: TNormalized): {
    preview: TPreview
    warnings: ParserWarning[]
  }
}

function toStageResult(
  stage: ParserStageResult['stage'],
  summary: string,
  warnings: ParserWarning[],
  failed = false
): ParserStageResult {
  return {
    stage,
    status: failed ? 'failed' : warnings.length > 0 ? 'warning' : 'completed',
    summary,
    warnings: warnings.map((warning) => warning.message)
  }
}

export function runDocumentParser<TParsed, TNormalized, TPreview>(
  parser: DocumentParser<TParsed, TNormalized, TPreview>,
  text: string
): {
  stages: ParserStageResult[]
  detectedLanguage: 'is'
  documentType: string
  parsed: TParsed
  normalized: TNormalized
  preview: TPreview
  warnings: string[]
} {
  const detectResult = parser.detect(text)
  const parseResult = parser.parse(text)
  const normalizeResult = parser.normalize(parseResult.parsed)
  const previewResult = parser.preview(normalizeResult.normalized)

  const allWarnings = [
    ...detectResult.warnings,
    ...parseResult.warnings,
    ...normalizeResult.warnings,
    ...previewResult.warnings
  ]

  const warningMessages = allWarnings.map((warning) => warning.message)

  return {
    stages: [
      toStageResult(
        'detect',
        `Skjal flokkað sem ${detectResult.documentType}.`,
        detectResult.warnings
      ),
      toStageResult('parse', parseResult.summary, parseResult.warnings),
      toStageResult(
        'normalize',
        'Gögn færð yfir í canonical reglusnið Frigg.',
        normalizeResult.warnings
      ),
      toStageResult('preview', 'Forsýning útbúin fyrir review pipeline.', previewResult.warnings),
      toStageResult(
        'warnings',
        warningMessages.length === 0
          ? 'Engar sérstakar viðvaranir komu fram.'
          : `Samtals ${warningMessages.length} viðvaranir merktar til yfirferðar.`,
        allWarnings
      )
    ],
    detectedLanguage: detectResult.detectedLanguage,
    documentType: detectResult.documentType,
    parsed: parseResult.parsed,
    normalized: normalizeResult.normalized,
    preview: previewResult.preview,
    warnings: warningMessages
  }
}
