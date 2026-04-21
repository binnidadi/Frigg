import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { payrollDomainSnapshot } from '../src/data.js'
import { goldenScenarios } from '../src/scenarios.js'

const apiRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const repoRoot = dirname(dirname(dirname(apiRoot)))
const seedsRoot = resolve(repoRoot, 'db', 'seeds')
const seedPath = resolve(seedsRoot, 'demo-repository.json')

if (!existsSync(seedsRoot)) {
  mkdirSync(seedsRoot, { recursive: true })
}

writeFileSync(
  seedPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      snapshot: payrollDomainSnapshot,
      scenarios: goldenScenarios
    },
    null,
    2
  )
)

console.log('Frigg repository seed updated.')
