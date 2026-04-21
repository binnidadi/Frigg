import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = resolve(root, 'dist')

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true })
}

mkdirSync(dist, { recursive: true })

for (const file of ['index.html', 'login.html', 'dashboard.html', 'styles.css', 'script.js']) {
  cpSync(resolve(root, file), resolve(dist, file))
}

console.log('Frigg web build complete.')
