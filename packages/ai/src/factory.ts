import type { AIProvider } from '@frigg/contracts'

import { DeterministicAgreementParserAdapter, type AgreementParserOptions } from './agreement-parser.js'
import { FailoverAIProvider, type ProviderAdapter } from './failover-provider.js'
import { GeminiProviderAdapter, OpenAICompatibleProviderAdapter } from './provider-adapters.js'

export interface BuildDefaultAIProviderOptions {
  providers?: ProviderAdapter[]
}

export function buildDefaultProviderAdapters(): ProviderAdapter[] {
  return [
    new OpenAICompatibleProviderAdapter({
      name: 'GitHub Models',
      model: 'gpt-4o-mini',
      envKey: 'GITHUB_MODELS_TOKEN',
      baseUrl: 'https://models.inference.ai.azure.com'
    }),
    new GeminiProviderAdapter({
      model: 'gemini-2.5-flash',
      envKey: 'GEMINI_API_KEY'
    }),
    new OpenAICompatibleProviderAdapter({
      name: 'SambaNova',
      model: 'Meta-Llama-3.1-70B-Instruct',
      envKey: 'SAMBANOVA_API_KEY',
      baseUrl: 'https://api.sambanova.ai/v1'
    }),
    new OpenAICompatibleProviderAdapter({
      name: 'Mistral',
      model: 'mistral-large-latest',
      envKey: 'MISTRAL_API_KEY',
      baseUrl: 'https://api.mistral.ai/v1'
    })
  ]
}

export function buildDefaultAIProvider(
  options: BuildDefaultAIProviderOptions = {}
): AIProvider {
  return new FailoverAIProvider(options.providers ?? buildDefaultProviderAdapters())
}

export function buildDeterministicAgreementParser(options: AgreementParserOptions) {
  return new DeterministicAgreementParserAdapter(options)
}
