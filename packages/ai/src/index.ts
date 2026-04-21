import type { AIProvider } from '@frigg/contracts'

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
}
