import type { AIProvider } from '@frigg/contracts'

export * from './agreement-parser.js'
export * from './confidence.js'
export * from './failover-provider.js'
export * from './factory.js'
export * from './parser-pipeline.js'
export * from './prompts.js'
export * from './provider-adapters.js'
export * from './retrieval-engine.js'

export class AIEngine {
  constructor(private readonly provider: AIProvider) {}

  getProviderName(): string {
    return this.provider.getName()
  }

  async getHealth() {
    return this.provider.getHealth()
  }

  async chat(message: string, context: string) {
    return this.provider.chat(message, context)
  }

  stream(message: string, context: string) {
    return this.provider.stream(message, context)
  }

  async parseAgreementDocument(text: string) {
    return this.provider.parseAgreementDocument(text)
  }

  async answerKnowledgeQuestion(message: string, context: string) {
    return this.provider.answerKnowledgeQuestion(message, context)
  }
}
