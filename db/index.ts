import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get current directory for database path
const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'portfolio.db')

// Create SQLite connection
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

// Create Drizzle instance
export const db = drizzle(sqlite, { schema })

// Export schema for type safety
export * from './schema'

// Export database instance for raw SQL if needed
export { sqlite }