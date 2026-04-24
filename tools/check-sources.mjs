import { readFileSync } from 'node:fs'

const sourceRegistryFile = 'knowledge/sources/regulatory-sources.json'
const snapshotRegistryFile = 'knowledge/sources/source-snapshots.json'

const allowedSourceTypes = new Set([
  'official_authority',
  'machine_reference',
  'international_standard',
  'regulatory_guidance',
  'ai_governance',
  'vendor_reference'
])
const allowedTrustTiers = new Set(['primary', 'secondary', 'reference'])
const allowedReviewStates = new Set(['draft', 'needs_review', 'approved', 'superseded'])
const requiredPrimarySources = [
  'skatturinn-innflutningur',
  'skatturinn-tollskra',
  'skatturinn-tollskrarlyklar',
  'mast-plontur',
  'lyfjastofnun-avanaefni'
]
const forbiddenRawExtensions = ['.pdf', '.xlsx', '.xlsm', '.docx', '.png', '.jpg', '.jpeg']

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}

function isHttpUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

const sourceRegistry = readJson(sourceRegistryFile)
const snapshotRegistry = readJson(snapshotRegistryFile)
const findings = []

if (sourceRegistry.containsRawExternalData !== false) {
  findings.push(`${sourceRegistryFile}: containsRawExternalData verður að vera false.`)
}

if (!Array.isArray(sourceRegistry.sources) || sourceRegistry.sources.length === 0) {
  findings.push(`${sourceRegistryFile}: sources má ekki vera tómt.`)
}

const sourceCodes = new Set()

for (const source of sourceRegistry.sources ?? []) {
  const label = `${sourceRegistryFile}: ${source.code ?? 'óþekkt heimild'}`

  if (!source.code || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.code)) {
    findings.push(`${label}: code þarf að vera kebab-case.`)
  }

  if (sourceCodes.has(source.code)) {
    findings.push(`${label}: tvítekinn source code.`)
  }

  sourceCodes.add(source.code)

  for (const key of [
    'title',
    'owner',
    'jurisdiction',
    'sourceType',
    'trustTier',
    'url',
    'intendedUse',
    'reviewState',
    'notes'
  ]) {
    if (!source[key]) {
      findings.push(`${label}: vantar ${key}.`)
    }
  }

  if (!allowedSourceTypes.has(source.sourceType)) {
    findings.push(`${label}: óþekkt sourceType ${source.sourceType}.`)
  }

  if (!allowedTrustTiers.has(source.trustTier)) {
    findings.push(`${label}: óþekkt trustTier ${source.trustTier}.`)
  }

  if (!allowedReviewStates.has(source.reviewState)) {
    findings.push(`${label}: óþekkt reviewState ${source.reviewState}.`)
  }

  if (!isHttpUrl(source.url)) {
    findings.push(`${label}: url þarf að vera gild HTTPS slóð.`)
  }
}

for (const requiredSource of requiredPrimarySources) {
  if (!sourceCodes.has(requiredSource)) {
    findings.push(`${sourceRegistryFile}: vantar skylduheimild ${requiredSource}.`)
  }
}

const icelandicPrimarySources = [...sourceCodes].filter((code) => {
  const source = sourceRegistry.sources.find((entry) => entry.code === code)
  return source?.jurisdiction === 'IS' && source?.trustTier === 'primary'
})

if (icelandicPrimarySources.length < 8) {
  findings.push(`${sourceRegistryFile}: þarf að innihalda að minnsta kosti átta íslenskar primary heimildir.`)
}

if (snapshotRegistry.containsRawExternalData !== false) {
  findings.push(`${snapshotRegistryFile}: containsRawExternalData verður að vera false.`)
}

if (!Array.isArray(snapshotRegistry.snapshots)) {
  findings.push(`${snapshotRegistryFile}: snapshots þarf að vera fylki.`)
}

for (const snapshot of snapshotRegistry.snapshots ?? []) {
  const label = `${snapshotRegistryFile}: ${snapshot.sourceCode ?? 'óþekkt snapshot'}`

  if (!sourceCodes.has(snapshot.sourceCode)) {
    findings.push(`${label}: sourceCode vísar ekki í skráða heimild.`)
  }

  if (!snapshot.version || !snapshot.retrievedAt || !snapshot.checksum) {
    findings.push(`${label}: vantar version, retrievedAt eða checksum.`)
  }

  if (!allowedReviewStates.has(snapshot.reviewState)) {
    findings.push(`${label}: óþekkt reviewState ${snapshot.reviewState}.`)
  }

  if (snapshot.storageUri !== null) {
    const lowerStorageUri = String(snapshot.storageUri).toLowerCase()
    if (forbiddenRawExtensions.some((extension) => lowerStorageUri.endsWith(extension))) {
      findings.push(`${label}: storageUri má ekki vísa í raw skjalasnið í þessari lotu.`)
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log('Heimildayfirferð stóðst: source registry er vélrænt, rekjanlegt og án raw gagna.')
