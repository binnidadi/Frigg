import { createServer } from 'node:http'
import { buildAgreementParsePreview, buildKnowledgePreview, getAIHealthSnapshot } from './ai.js'
import { createRepository } from './repository.js'

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

export function startServer(port = Number(process.env.FRIGG_API_PORT ?? 4310)) {
  const repository = createRepository()
  const server = createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8')

    if (!request.url || request.url === '/') {
      response.end(
        JSON.stringify({
          name: 'frigg-api',
          status: 'ready',
          endpoints: [
            '/snapshot',
            '/scenarios',
            '/repository/status',
            '/research/workspace',
            '/research/summary',
            '/research/private-corpus',
            '/ai/health',
            '/ai/parse-preview',
            '/ai/knowledge-preview'
          ]
        })
      )
      return
    }

    if (request.url === '/snapshot') {
      response.end(JSON.stringify(repository.getSnapshot()))
      return
    }

    if (request.url === '/scenarios') {
      response.end(JSON.stringify(repository.getScenarios()))
      return
    }

    if (request.url === '/repository/status') {
      response.end(JSON.stringify(repository.getRepositoryStatus()))
      return
    }

    if (request.url === '/research/workspace') {
      response.end(JSON.stringify(repository.getResearchWorkspace()))
      return
    }

    if (request.url === '/research/summary') {
      response.end(JSON.stringify(repository.getResearchSummary()))
      return
    }

    if (request.url === '/research/private-corpus') {
      response.end(JSON.stringify(repository.getCriticalPrivateCorpus()))
      return
    }

    if (request.url === '/ai/health') {
      response.end(JSON.stringify(getAIHealthSnapshot()))
      return
    }

    if (request.url.startsWith('/ai/knowledge-preview')) {
      const requestUrl = new URL(request.url, 'http://localhost')
      const query = requestUrl.searchParams.get('q') ?? ''
      response.end(JSON.stringify(buildKnowledgePreview(query)))
      return
    }

    if (request.url === '/ai/parse-preview') {
      try {
        const payload = request.method === 'POST' ? await readJsonBody(request) : {}
        response.end(JSON.stringify(buildAgreementParsePreview(payload)))
      } catch {
        response.statusCode = 400
        response.end(JSON.stringify({ error: 'Ógild JSON gögn í beiðni.' }))
      }
      return
    }

    response.statusCode = 404
    response.end(JSON.stringify({ error: 'Leið fannst ekki.' }))
  })

  server.listen(port)
  return server
}
