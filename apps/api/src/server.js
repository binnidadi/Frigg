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
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')
    const { pathname } = requestUrl
    const method = request.method ?? 'GET'
    const allowGetOnly = () => {
      if (method === 'GET') {
        return true
      }

      response.statusCode = 405
      response.setHeader('Allow', 'GET')
      response.end(JSON.stringify({ error: 'Aðferð ekki leyfð á þessari leið.' }))
      return false
    }

    if (pathname === '/') {
      if (!allowGetOnly()) {
        return
      }
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
            '/research/coverage-matrix',
            '/research/featured-coverage',
            '/research/private-corpus',
            '/ai/health',
            '/ai/parse-preview',
            '/ai/knowledge-preview'
          ]
        })
      )
      return
    }

    if (pathname === '/snapshot') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getSnapshot()))
      return
    }

    if (pathname === '/scenarios') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getScenarios()))
      return
    }

    if (pathname === '/repository/status') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getRepositoryStatus()))
      return
    }

    if (pathname === '/research/workspace') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getResearchWorkspace()))
      return
    }

    if (pathname === '/research/summary') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getResearchSummary()))
      return
    }

    if (pathname === '/research/coverage-matrix') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getCoverageMatrix()))
      return
    }

    if (pathname === '/research/featured-coverage') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getFeaturedCoveragePack()))
      return
    }

    if (pathname === '/research/private-corpus') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(repository.getCriticalPrivateCorpus()))
      return
    }

    if (pathname === '/ai/health') {
      if (!allowGetOnly()) {
        return
      }
      response.end(JSON.stringify(getAIHealthSnapshot()))
      return
    }

    if (pathname === '/ai/knowledge-preview') {
      if (!allowGetOnly()) {
        return
      }
      const query = requestUrl.searchParams.get('q') ?? ''
      response.end(JSON.stringify(buildKnowledgePreview(query)))
      return
    }

    if (pathname === '/ai/parse-preview') {
      try {
        if (method !== 'GET' && method !== 'POST') {
          response.statusCode = 405
          response.setHeader('Allow', 'GET, POST')
          response.end(JSON.stringify({ error: 'Aðferð ekki leyfð á þessari leið.' }))
          return
        }

        const payload = method === 'POST' ? await readJsonBody(request) : {}
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
