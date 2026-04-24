import { strict as assert } from 'node:assert'
import {
  calculateLandedCost,
  createLandedCostComputedAuditDraft,
  createLandedCostReviewTaskDraft,
  landedCostEngineBoundary,
  type LandedCostInput
} from './index.js'

const goldenInput: LandedCostInput = {
  calculationId: 'calc_synthetic_landed_cost_001',
  shipmentId: 'shp_synthetic_2026_0001',
  outputCurrency: 'ISK',
  exchangeRate: {
    id: 'fx_synthetic_eur_isk_2026_04_24',
    baseCurrency: 'EUR',
    quoteCurrency: 'ISK',
    rate: '150.25',
    rateDate: '2026-04-24',
    sourceReference: 'synthetic-exchange-rate'
  },
  roundingPolicy: {
    mode: 'half_up',
    scale: 0,
    description: 'Rúnnað í heilar ISK með half-up reglu í synthetic prófi.'
  },
  items: [
    {
      shipmentItemId: 'item_synthetic_001',
      lineNumber: 1,
      description: 'Rafknúinn garðklippari fyrir heimilisnotkun',
      quantity: '12.000000',
      unitPriceMinor: 8950,
      currency: 'EUR'
    },
    {
      shipmentItemId: 'item_synthetic_002',
      lineNumber: 2,
      description: 'Lifandi kryddjurt í potti til endursölu',
      quantity: '80.000000',
      unitPriceMinor: 225,
      currency: 'EUR'
    }
  ],
  adjustments: [
    {
      code: 'freight',
      label: 'Flutningur',
      amountMinor: 30000,
      currency: 'EUR',
      sourceReference: 'synthetic-freight-input'
    },
    {
      code: 'insurance',
      label: 'Trygging',
      amountMinor: 5000,
      currency: 'EUR',
      sourceReference: 'synthetic-insurance-input'
    }
  ],
  taxRules: [
    {
      code: 'synthetic_customs_duty',
      label: 'Synthetic tollur til prófunar',
      rate: '0.035',
      base: 'customs_value',
      sourceReference: 'synthetic-duty-rule'
    },
    {
      code: 'synthetic_vat',
      label: 'Synthetic VSK til prófunar',
      rate: '0.24',
      base: 'customs_value_plus_prior_taxes',
      sourceReference: 'synthetic-vat-rule'
    }
  ],
  sourceReferences: [
    'skatturinn-tollskrarlyklar',
    'synthetic-exchange-rate',
    'synthetic-duty-rule',
    'synthetic-vat-rule'
  ]
}

const result = calculateLandedCost(goldenInput, '2026-04-24T00:00:00.000Z')
const halfUpRoundingInput: LandedCostInput = {
  ...goldenInput,
  calculationId: 'calc_synthetic_rounding_half_up',
  exchangeRate: {
    ...goldenInput.exchangeRate,
    rate: '1.00'
  },
  items: [
    {
      shipmentItemId: 'item_synthetic_rounding_001',
      lineNumber: 1,
      description: 'Synthetic rounding próf',
      quantity: '1.000000',
      unitPriceMinor: 150,
      currency: 'EUR'
    }
  ],
  adjustments: [],
  taxRules: []
}
const halfUpRoundingResult = calculateLandedCost(halfUpRoundingInput, '2026-04-24T00:00:00.000Z')

assert.equal(landedCostEngineBoundary.status, 'implemented')
assert.equal(result.status, 'computed')
assert.equal(result.currency, 'ISK')
assert.equal(result.lines.length, 4)
assert.equal(result.taxComponents.length, 2)
assert.equal(result.explanation.customsValueMinor, 241002)
assert.equal(result.taxComponents[0]?.amountMinor, 8435)
assert.equal(result.taxComponents[1]?.amountMinor, 59865)
assert.equal(result.totalMinor, 309302)
assert.match(result.taxComponents[0]?.formula ?? '', /round/)
assert.match(result.explanation.warnings.join(' '), /ekki staðfest/)
assert.equal(halfUpRoundingResult.totalMinor, 2)
assert.equal(halfUpRoundingResult.explanation.customsValueMinor, 2)

const auditDraft = createLandedCostComputedAuditDraft(result, {
  importerId: 'imp_synthetic_nordurljos',
  actorId: 'system_landed_cost_engine',
  createdAt: '2026-04-24T00:00:00.000Z'
})

assert.equal(auditDraft.action, 'computed')
assert.equal(auditDraft.entityType, 'LandedCostCalculation')
assert.equal(auditDraft.entityId, result.calculationId)
assert.equal(auditDraft.metadata.eventKind, 'landed_cost_computed')
assert.equal(auditDraft.metadata.totalMinor, 309302)
assert.deepEqual(auditDraft.metadata.sourceReferences, goldenInput.sourceReferences)

const reviewTask = createLandedCostReviewTaskDraft(result, {
  importerId: 'imp_synthetic_nordurljos',
  sourceSnapshotId: 'snap_skatturinn_tollskrarlyklar_2026_04_24',
  priority: 40,
  createdAt: '2026-04-24T00:00:00.000Z'
})

assert.equal(reviewTask.taskType, 'landed_cost_calculation')
assert.equal(reviewTask.status, 'open')
assert.equal(reviewTask.entityId, result.calculationId)
assert.match(reviewTask.description, /Yfirfara/)

assert.throws(
  () =>
    calculateLandedCost(
      {
        ...goldenInput,
        outputCurrency: 'USD' as 'ISK'
      },
      '2026-04-24T00:00:00.000Z'
    ),
  /styður aðeins ISK/
)

assert.throws(
  () =>
    calculateLandedCost(
      {
        ...goldenInput,
        exchangeRate: {
          ...goldenInput.exchangeRate,
          baseCurrency: 'CHF'
        }
      },
      '2026-04-24T00:00:00.000Z'
    ),
  /Óstuddur grunngjaldmiðill/
)

assert.throws(
  () =>
    calculateLandedCost(
      {
        ...goldenInput,
        items: [
          {
            shipmentItemId: 'item_synthetic_currency_mismatch',
            lineNumber: 1,
            description: 'Synthetic currency mismatch próf',
            quantity: '1.000000',
            unitPriceMinor: 100,
            currency: 'USD'
          }
        ]
      },
      '2026-04-24T00:00:00.000Z'
    ),
  /gengi er fyrir EUR/
)

assert.throws(
  () =>
    calculateLandedCost(
      {
        ...goldenInput,
        exchangeRate: {
          ...goldenInput.exchangeRate,
          rate: '0'
        }
      },
      '2026-04-24T00:00:00.000Z'
    ),
  /Gengi þarf að vera jákvætt tugabrot/
)

assert.throws(
  () =>
    calculateLandedCost(
      {
        ...goldenInput,
        taxRules: [
          {
            ...goldenInput.taxRules[0]!,
            rate: '0'
          }
        ]
      },
      '2026-04-24T00:00:00.000Z'
    ),
  /þarf að vera með jákvætt rate-gildi/
)

console.log('Landed cost golden próf stóðst: útreikningur er determinískur og útskýrður.')
