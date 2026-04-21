import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const pages = ['index.html', 'login.html', 'dashboard.html']

for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8')

  if (!html.includes('Frigg')) {
    throw new Error(`${page} vantar Frigg auðkenni.`)
  }

  if (!html.includes('styles.css')) {
    throw new Error(`${page} vantar styles.css tengingu.`)
  }

  if (!html.includes('script.js')) {
    throw new Error(`${page} vantar script.js tengingu.`)
  }
}

const css = readFileSync(resolve(root, 'styles.css'), 'utf8')

for (const selector of ['.hero', '.auth-layout', '.dashboard-grid']) {
  if (!css.includes(selector)) {
    throw new Error(`styles.css vantar selector ${selector}.`)
  }
}

const script = readFileSync(resolve(root, 'script.js'), 'utf8')

for (const marker of ['API_BASE_URL', 'loadHealthSnapshot', 'loadDashboardAI']) {
  if (!script.includes(marker)) {
    throw new Error(`script.js vantar ${marker}.`)
  }
}

console.log('Frigg web check passed.')
