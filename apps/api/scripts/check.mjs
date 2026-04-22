import { buildAgreementParsePreview, buildKnowledgePreview, getAIHealthSnapshot } from '../src/ai.js'
import { createRepository } from '../src/repository.js'

const repository = createRepository()
const goldenScenarios = repository.getScenarios()
const payrollDomainSnapshot = repository.getSnapshot()
const repositoryStatus = repository.getRepositoryStatus()
const fileRepository = createRepository({ driver: 'file' })
const fileRepositoryStatus = fileRepository.getRepositoryStatus()

if (goldenScenarios.length < 6) {
  throw new Error('Golden scenarios eru of fá.')
}

if (payrollDomainSnapshot.payrollRuns.length === 0) {
  throw new Error('Vantar payroll run gögn í snapshot.')
}

if (payrollDomainSnapshot.statutoryParameterSets.length === 0) {
  throw new Error('Vantar statutory parameter set.')
}

if (getAIHealthSnapshot().providers.length < 4) {
  throw new Error('AI health snapshot vantar veitendur.')
}

if (buildAgreementParsePreview().parserStages.length !== 5) {
  throw new Error('AI parse preview vantar parser stages.')
}

if (!Array.isArray(buildKnowledgePreview('A1').sourceIds)) {
  throw new Error('AI knowledge preview er ekki rétt formgert.')
}

if (repository.getResearchSummary().workstreamCount === 0) {
  throw new Error('Research summary vantar workstreams.')
}

if (repository.getResearchSummary().sourceAcquisitionCount < 5) {
  throw new Error('Research summary vantar nægilega skráningu heimilda.')
}

if (repository.getResearchSummary().legalObligationCount < 6) {
  throw new Error('Research summary vantar nægilega lagaskyldukortlagningu.')
}

if (repository.getResearchSummary().pensionFundProfileCount < 4) {
  throw new Error('Research summary vantar nægilega lífeyrissjóðaprófíla.')
}

if (repository.getResearchSummary().unionProfileCount < 3) {
  throw new Error('Research summary vantar nægilega stéttarfélaga- eða túlkunarprófíla.')
}

if (repository.getCriticalPrivateCorpus().length === 0) {
  throw new Error('Research workspace vantar critical private corpus lista.')
}

if (repositoryStatus.driver !== 'memory') {
  throw new Error('Repository driver er ekki skilgreindur rétt.')
}

if (fileRepositoryStatus.driver !== 'file') {
  throw new Error('File repository driver er ekki skilgreindur rétt.')
}

if (fileRepositoryStatus.researchWorkstreamCount === 0) {
  throw new Error('File repository vantar research workspace gögn.')
}

console.log('Frigg api check passed.')
