import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const apiRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const repoRoot = dirname(dirname(apiRoot))
const dbRoot = resolve(repoRoot, 'db')
const migrationsRoot = resolve(dbRoot, 'migrations')
const migrationStateRoot = resolve(dbRoot, '.state')
const schemaPath = resolve(dbRoot, 'schema.sql')
const initialMigrationPath = resolve(migrationsRoot, '001_initial_schema.sql')
const manifestPath = resolve(migrationsRoot, 'manifest.json')
const statePath = resolve(migrationStateRoot, 'local-migration-state.json')

if (!existsSync(schemaPath)) {
  throw new Error('Vantar db/schema.sql.')
}

const schemaSql = readFileSync(schemaPath, 'utf8')
const checksum = createHash('sha256').update(schemaSql).digest('hex')
const generatedAt = new Date().toISOString()

mkdirSync(migrationsRoot, { recursive: true })
mkdirSync(migrationStateRoot, { recursive: true })

writeFileSync(initialMigrationPath, schemaSql)

const manifest = {
  sourceOfTruth: 'db/schema.sql',
  generatedAt,
  migrations: [
    {
      id: '001_initial_schema',
      file: '001_initial_schema.sql',
      checksum,
      description: 'Fyrsta canonical gagnagrunnsskemá Frigg.'
    }
  ]
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))

const previousState = existsSync(statePath)
  ? JSON.parse(readFileSync(statePath, 'utf8'))
  : {
      driver: 'unbound',
      appliedMigrations: []
    }

const migrationAlreadyTracked = previousState.appliedMigrations.some(
  (entry) => entry.id === '001_initial_schema'
)

const nextState = {
  driver: 'unbound',
  updatedAt: generatedAt,
  note: 'Enginn gagnagrunnsdrifari er tengdur enn. Runner undirbýr migration artifacts og heldur utan um staðbundna stöðu.',
  appliedMigrations: migrationAlreadyTracked
    ? previousState.appliedMigrations.map((entry) =>
        entry.id === '001_initial_schema'
          ? {
              ...entry,
              checksum,
              refreshedAt: generatedAt
            }
          : entry
      )
    : [
        ...previousState.appliedMigrations,
        {
          id: '001_initial_schema',
          checksum,
          preparedAt: generatedAt,
          status: 'prepared'
        }
      ]
}

writeFileSync(statePath, JSON.stringify(nextState, null, 2))

console.log('Frigg migration artifacts updated.')
