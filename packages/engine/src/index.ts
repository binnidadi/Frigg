import type { AuditAction, CurrencyCode, Identifier, IsoDateTime, ReviewTaskType } from '@frigg/domain'

export type RoundingMode = 'half_up'

export interface RoundingPolicy {
  readonly mode: RoundingMode
  readonly scale: 0
  readonly description: string
}

export interface ExchangeRateInput {
  readonly id: Identifier
  readonly baseCurrency: CurrencyCode
  readonly quoteCurrency: CurrencyCode
  readonly rate: string
  readonly rateDate: string
  readonly sourceReference: string
}

export interface LandedCostItemInput {
  readonly shipmentItemId: Identifier
  readonly lineNumber: number
  readonly description: string
  readonly quantity: string
  readonly unitPriceMinor: number
  readonly currency: CurrencyCode
}

export interface LandedCostAdjustmentInput {
  readonly code: string
  readonly label: string
  readonly amountMinor: number
  readonly currency: CurrencyCode
  readonly sourceReference: string
}

export type TaxBase = 'customs_value' | 'customs_value_plus_prior_taxes'

export interface LandedCostTaxRuleInput {
  readonly code: string
  readonly label: string
  readonly rate: string
  readonly base: TaxBase
  readonly sourceReference: string
}

export interface LandedCostInput {
  readonly calculationId: Identifier
  readonly shipmentId: Identifier
  readonly outputCurrency: 'ISK'
  readonly exchangeRate: ExchangeRateInput
  readonly roundingPolicy: RoundingPolicy
  readonly items: LandedCostItemInput[]
  readonly adjustments: LandedCostAdjustmentInput[]
  readonly taxRules: LandedCostTaxRuleInput[]
  readonly sourceReferences: string[]
}

export interface LandedCostLineResult {
  readonly code: string
  readonly label: string
  readonly amountMinor: number
  readonly currency: 'ISK'
  readonly formula: string
  readonly inputs: Record<string, unknown>
  readonly sortOrder: number
  readonly shipmentItemId: Identifier | null
}

export interface TaxComponentResult {
  readonly code: string
  readonly label: string
  readonly amountMinor: number
  readonly currency: 'ISK'
  readonly formula: string
  readonly inputs: Record<string, unknown>
  readonly roundingPolicy: string
  readonly sourceReference: string
}

export interface LandedCostExplanation {
  readonly roundingPolicy: RoundingPolicy
  readonly exchangeRate: ExchangeRateInput
  readonly customsValueMinor: number
  readonly taxableValueMinor: number
  readonly warnings: string[]
}

export interface LandedCostResult {
  readonly calculationId: Identifier
  readonly shipmentId: Identifier
  readonly status: 'computed'
  readonly currency: 'ISK'
  readonly inputSnapshot: LandedCostInput
  readonly explanation: LandedCostExplanation
  readonly lines: LandedCostLineResult[]
  readonly taxComponents: TaxComponentResult[]
  readonly totalMinor: number
  readonly computedAt: IsoDateTime
}

export type LandedCostAuditEventKind = 'landed_cost_computed' | 'landed_cost_review_requested'

export interface LandedCostAuditContext {
  readonly importerId: Identifier | null
  readonly actorId: Identifier | null
  readonly createdAt: IsoDateTime
}

export interface LandedCostAuditDraft {
  readonly action: AuditAction
  readonly entityType: 'LandedCostCalculation'
  readonly entityId: Identifier
  readonly importerId: Identifier | null
  readonly actorId: Identifier | null
  readonly before: null
  readonly after: Record<string, unknown>
  readonly metadata: {
    readonly eventKind: LandedCostAuditEventKind
    readonly shipmentId: Identifier
    readonly totalMinor: number
    readonly currency: 'ISK'
    readonly sourceReferences: string[]
    readonly warningCount: number
  }
  readonly createdAt: IsoDateTime
}

export interface LandedCostReviewTaskContext {
  readonly importerId: Identifier | null
  readonly sourceSnapshotId: Identifier | null
  readonly priority: number
  readonly createdAt: IsoDateTime
}

export interface LandedCostReviewTaskDraft {
  readonly taskType: ReviewTaskType
  readonly status: 'open'
  readonly importerId: Identifier | null
  readonly sourceSnapshotId: Identifier | null
  readonly entityType: 'LandedCostCalculation'
  readonly entityId: Identifier
  readonly title: string
  readonly description: string
  readonly priority: number
  readonly assignedTo: null
  readonly dueAt: null
  readonly resolvedAt: null
  readonly resolution: null
  readonly createdAt: IsoDateTime
}

export interface LandedCostEngineBoundary {
  readonly module: 'landed_cost'
  readonly status: 'implemented'
  readonly plannedFor: 'lota_4'
  readonly definedAt: IsoDateTime
  readonly owner: Identifier
  readonly guarantees: string[]
}

interface Rational {
  readonly numerator: bigint
  readonly denominator: bigint
}

const currencyMinorFactor: Record<string, bigint> = {
  ISK: 1n,
  EUR: 100n,
  USD: 100n,
  GBP: 100n,
  DKK: 100n,
  NOK: 100n,
  SEK: 100n
}

export const landedCostEngineBoundary: LandedCostEngineBoundary = {
  module: 'landed_cost',
  status: 'implemented',
  plannedFor: 'lota_4',
  definedAt: '2026-04-24T00:00:00.000Z',
  owner: 'frigg-core',
  guarantees: [
    'Reiknirökfræði er determinísk og notar ekki LLM.',
    'Gjöld og skattar eru aðeins reiknuð út frá input-reglum.',
    'Úttak inniheldur formúlur, inntök, milliskref og rounding policy.'
  ]
}

export function calculateLandedCost(input: LandedCostInput, computedAt: IsoDateTime): LandedCostResult {
  validateInput(input)

  const lines: LandedCostLineResult[] = []
  let customsValueMinor = 0n
  let sortOrder = 10

  for (const item of input.items) {
    const sourceAmountMinor = multiplyQuantityByUnitPrice(item.quantity, item.unitPriceMinor, input.roundingPolicy)
    const amountMinor = convertToOutputCurrency(sourceAmountMinor, item.currency, input.exchangeRate, input.roundingPolicy)
    customsValueMinor += amountMinor

    lines.push({
      code: `item_${item.lineNumber}`,
      label: `Vörulína ${item.lineNumber}: ${item.description}`,
      amountMinor: toSafeNumber(amountMinor, 'vörulína'),
      currency: input.outputCurrency,
      formula: 'round(quantity * unitPriceMinor * exchangeRate / currencyMinorFactor)',
      inputs: {
        quantity: item.quantity,
        unitPriceMinor: item.unitPriceMinor,
        sourceCurrency: item.currency,
        exchangeRate: input.exchangeRate.rate
      },
      sortOrder,
      shipmentItemId: item.shipmentItemId
    })

    sortOrder += 10
  }

  for (const adjustment of input.adjustments) {
    const amountMinor = convertToOutputCurrency(
      BigInt(adjustment.amountMinor),
      adjustment.currency,
      input.exchangeRate,
      input.roundingPolicy
    )
    customsValueMinor += amountMinor

    lines.push({
      code: adjustment.code,
      label: adjustment.label,
      amountMinor: toSafeNumber(amountMinor, adjustment.code),
      currency: input.outputCurrency,
      formula: 'round(amountMinor * exchangeRate / currencyMinorFactor)',
      inputs: {
        sourceAmountMinor: adjustment.amountMinor,
        sourceCurrency: adjustment.currency,
        exchangeRate: input.exchangeRate.rate,
        sourceReference: adjustment.sourceReference
      },
      sortOrder,
      shipmentItemId: null
    })

    sortOrder += 10
  }

  const taxComponents: TaxComponentResult[] = []
  let priorTaxMinor = 0n

  for (const taxRule of input.taxRules) {
    const baseMinor =
      taxRule.base === 'customs_value_plus_prior_taxes' ? customsValueMinor + priorTaxMinor : customsValueMinor
    const taxMinor = multiplyByRate(baseMinor, taxRule.rate, input.roundingPolicy)
    priorTaxMinor += taxMinor

    taxComponents.push({
      code: taxRule.code,
      label: taxRule.label,
      amountMinor: toSafeNumber(taxMinor, taxRule.code),
      currency: input.outputCurrency,
      formula: `round(${taxRule.base} * rate)`,
      inputs: {
        baseMinor: toSafeNumber(baseMinor, `${taxRule.code} base`),
        rate: taxRule.rate,
        sourceReference: taxRule.sourceReference
      },
      roundingPolicy: input.roundingPolicy.description,
      sourceReference: taxRule.sourceReference
    })
  }

  const totalMinor = customsValueMinor + priorTaxMinor

  return {
    calculationId: input.calculationId,
    shipmentId: input.shipmentId,
    status: 'computed',
    currency: input.outputCurrency,
    inputSnapshot: input,
    explanation: {
      roundingPolicy: input.roundingPolicy,
      exchangeRate: input.exchangeRate,
      customsValueMinor: toSafeNumber(customsValueMinor, 'customs value'),
      taxableValueMinor: toSafeNumber(customsValueMinor + priorTaxMinor, 'taxable value'),
      warnings: [
        'Útreikningurinn notar aðeins innsend inntök og synthetic gjaldareglur í prófum.',
        'Niðurstaðan er ekki staðfest toll-, gjalda- eða skattaniðurstaða án review state og heimildar.'
      ]
    },
    lines,
    taxComponents,
    totalMinor: toSafeNumber(totalMinor, 'heildarniðurstaða'),
    computedAt
  }
}

export function createLandedCostComputedAuditDraft(
  result: LandedCostResult,
  context: LandedCostAuditContext
): LandedCostAuditDraft {
  return {
    action: 'computed',
    entityType: 'LandedCostCalculation',
    entityId: result.calculationId,
    importerId: context.importerId,
    actorId: context.actorId,
    before: null,
    after: {
      status: result.status,
      totalMinor: result.totalMinor,
      currency: result.currency,
      computedAt: result.computedAt,
      lineCount: result.lines.length,
      taxComponentCount: result.taxComponents.length
    },
    metadata: {
      eventKind: 'landed_cost_computed',
      shipmentId: result.shipmentId,
      totalMinor: result.totalMinor,
      currency: result.currency,
      sourceReferences: result.inputSnapshot.sourceReferences,
      warningCount: result.explanation.warnings.length
    },
    createdAt: context.createdAt
  }
}

export function createLandedCostReviewTaskDraft(
  result: LandedCostResult,
  context: LandedCostReviewTaskContext
): LandedCostReviewTaskDraft {
  return {
    taskType: 'landed_cost_calculation',
    status: 'open',
    importerId: context.importerId,
    sourceSnapshotId: context.sourceSnapshotId,
    entityType: 'LandedCostCalculation',
    entityId: result.calculationId,
    title: 'Yfirfara landað kostnaðarverð',
    description:
      'Yfirfara þarf inntök, gengi, gjaldareglur, rounding policy og warnings áður en niðurstaða má teljast samþykkt.',
    priority: context.priority,
    assignedTo: null,
    dueAt: null,
    resolvedAt: null,
    resolution: null,
    createdAt: context.createdAt
  }
}

function validateInput(input: LandedCostInput) {
  if (input.outputCurrency !== 'ISK') {
    throw new Error('Landað kostnaðarverð styður aðeins ISK sem úttaksgjaldmiðil í þessari lotu.')
  }

  if (input.exchangeRate.quoteCurrency !== input.outputCurrency) {
    throw new Error('Gengi þarf að vera skráð gagnvart úttaksgjaldmiðli útreiknings.')
  }

  if (input.roundingPolicy.mode !== 'half_up' || input.roundingPolicy.scale !== 0) {
    throw new Error('Óstudd rounding policy. Lota 4 styður aðeins half_up í heilum ISK.')
  }

  if (input.items.length === 0) {
    throw new Error('Útreikningur þarf að innihalda að minnsta kosti eina vörulínu.')
  }

  for (const item of input.items) {
    if (item.currency !== input.exchangeRate.baseCurrency) {
      throw new Error(`Vörulína ${item.lineNumber} er í ${item.currency}, en gengi er fyrir ${input.exchangeRate.baseCurrency}.`)
    }

    if (item.unitPriceMinor < 0) {
      throw new Error(`Vörulína ${item.lineNumber} má ekki hafa neikvætt einingaverð.`)
    }
  }

  for (const adjustment of input.adjustments) {
    if (adjustment.currency !== input.exchangeRate.baseCurrency) {
      throw new Error(`Kostnaðarlínan ${adjustment.code} er í ${adjustment.currency}, en gengi er fyrir ${input.exchangeRate.baseCurrency}.`)
    }

    if (adjustment.amountMinor < 0) {
      throw new Error(`Kostnaðarlínan ${adjustment.code} má ekki vera neikvæð.`)
    }
  }
}

function multiplyQuantityByUnitPrice(quantity: string, unitPriceMinor: number, roundingPolicy: RoundingPolicy): bigint {
  const quantityRatio = parseDecimal(quantity)
  return roundRational(BigInt(unitPriceMinor) * quantityRatio.numerator, quantityRatio.denominator, roundingPolicy)
}

function convertToOutputCurrency(
  sourceAmountMinor: bigint,
  sourceCurrency: CurrencyCode,
  exchangeRate: ExchangeRateInput,
  roundingPolicy: RoundingPolicy
): bigint {
  const rate = parseDecimal(exchangeRate.rate)
  const minorFactor = currencyMinorFactor[sourceCurrency] ?? 100n
  return roundRational(sourceAmountMinor * rate.numerator, rate.denominator * minorFactor, roundingPolicy)
}

function multiplyByRate(amountMinor: bigint, rateValue: string, roundingPolicy: RoundingPolicy): bigint {
  const rate = parseDecimal(rateValue)
  return roundRational(amountMinor * rate.numerator, rate.denominator, roundingPolicy)
}

function parseDecimal(value: string): Rational {
  if (!/^\d+(?:\.\d+)?$/.test(value)) {
    throw new Error(`Ógilt tugabrot: ${value}.`)
  }

  const [whole, fraction = ''] = value.split('.')
  const denominator = 10n ** BigInt(fraction.length)
  const numerator = BigInt(`${whole}${fraction}`)

  return {
    numerator,
    denominator
  }
}

function roundRational(numerator: bigint, denominator: bigint, roundingPolicy: RoundingPolicy): bigint {
  if (denominator <= 0n) {
    throw new Error('Deilir í útreikningi þarf að vera stærri en núll.')
  }

  if (roundingPolicy.mode !== 'half_up') {
    throw new Error(`Óstudd rounding policy: ${roundingPolicy.mode}.`)
  }

  const quotient = numerator / denominator
  const remainder = numerator % denominator

  return remainder * 2n >= denominator ? quotient + 1n : quotient
}

function toSafeNumber(value: bigint, label: string): number {
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(`${label} er of há tala fyrir örugga JavaScript number framsetningu.`)
  }

  return Number(value)
}
