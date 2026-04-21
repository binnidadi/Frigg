import { mkdirSync, rmSync, existsSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildAgreementParsePreview, buildKnowledgePreview, getAIHealthSnapshot } from '../src/ai.js'
import { createRepository } from '../src/repository.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = resolve(root, 'dist')
const repository = createRepository()
const goldenScenarios = repository.getScenarios()
const payrollDomainSnapshot = repository.getSnapshot()

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true })
}

mkdirSync(dist, { recursive: true })
writeFileSync(resolve(dist, 'snapshot.json'), JSON.stringify(payrollDomainSnapshot, null, 2))
writeFileSync(resolve(dist, 'scenarios.json'), JSON.stringify(goldenScenarios, null, 2))
writeFileSync(resolve(dist, 'repository-status.json'), JSON.stringify(repository.getRepositoryStatus(), null, 2))
writeFileSync(resolve(dist, 'ai-health.json'), JSON.stringify(getAIHealthSnapshot(), null, 2))
writeFileSync(resolve(dist, 'ai-parse-preview.json'), JSON.stringify(buildAgreementParsePreview(), null, 2))
writeFileSync(
  resolve(dist, 'ai-knowledge-preview.json'),
  JSON.stringify(buildKnowledgePreview('staðgreiðsla A1'), null, 2)
)

console.log('Frigg api build complete.')
