import { readFileSync } from 'node:fs'

const schema = readFileSync('prisma/schema.prisma', 'utf8')

const requiredModels = [
  'Importer',
  'Supplier',
  'Shipment',
  'ShipmentItem',
  'Document',
  'ExtractedField',
  'HsCode',
  'ClassificationCandidate',
  'RegulatoryRule',
  'PermitRequirement',
  'ExchangeRate',
  'LandedCostCalculation',
  'LandedCostLine',
  'TaxComponent',
  'AuditLog',
  'RegulatorySource',
  'SourceSnapshot',
  'ReviewTask',
  'DecisionRecord',
  'IntegrationJob',
  'AccountingExport'
]

const requiredEnums = [
  'ReviewState',
  'ConfidenceLevel',
  'DocumentType',
  'ShipmentStatus',
  'CalculationStatus',
  'AuditAction',
  'IntegrationStatus',
  'SourceType',
  'TrustTier',
  'ReviewTaskType',
  'ReviewTaskStatus'
]

const requiredFragments = [
  'reviewState',
  'inputSnapshot',
  'roundingPolicy',
  'idempotencyKey',
  '@@unique([provider, idempotencyKey])',
  '@@index([entityType, entityId])',
  '@@unique([sourceId, version, retrievedAt])',
  'sourceReferences',
  'decisionState',
  'MACHINE_REFERENCE',
  'AI_GOVERNANCE'
]

const findings = []

for (const model of requiredModels) {
  if (!schema.includes(`model ${model} `)) {
    findings.push(`Vantar Prisma model: ${model}`)
  }
}

for (const enumName of requiredEnums) {
  if (!schema.includes(`enum ${enumName} `)) {
    findings.push(`Vantar Prisma enum: ${enumName}`)
  }
}

for (const fragment of requiredFragments) {
  if (!schema.includes(fragment)) {
    findings.push(`Vantar schema invariant: ${fragment}`)
  }
}

if (findings.length > 0) {
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log('Schema-yfirferð stóðst: models, enums og rekjanleikareitir eru til staðar.')
