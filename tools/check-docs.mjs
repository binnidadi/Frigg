import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['README.md', 'docs']
const bannedTerms = [
  /\bpayroll\b/i,
  /\bemployer\b/i,
  /\bemployee\b/i,
  /kjarasam/i,
  /laun/i
]

function listMarkdownFiles(path) {
  const stat = statSync(path)

  if (stat.isFile()) {
    return path.endsWith('.md') ? [path] : []
  }

  return readdirSync(path).flatMap((entry) => listMarkdownFiles(join(path, entry)))
}

const files = roots.flatMap(listMarkdownFiles)
const findings = []

for (const file of files) {
  const content = readFileSync(file, 'utf8')

  for (const pattern of bannedTerms) {
    if (pattern.test(content)) {
      findings.push(`${file}: fann eldra domain-hugtak sem á ekki heima í Tollverði Pro (${pattern}).`)
    }
  }
}

if (findings.length > 0) {
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log('Skjalayfirferð stóðst: engin gömul domain-hugtök fundust.')
