import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { join } from 'path'

// Use process.cwd() to get the project root directory
const dbPath = join(process.cwd(), 'db', 'portfolio.db')

// Create SQLite connection
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')

// Create Drizzle instance
export const db = drizzle(sqlite, { schema })

// Export schema for type safety
export * from './schema'

// Export database instance for raw SQL if needed
export { sqlite }