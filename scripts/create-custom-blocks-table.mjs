import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔄 Connexion à la base de données...')
const db = new Database(dbPath)

try {
  console.log('📦 Création de la table custom_blocks...')
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      col_span INTEGER DEFAULT 6,
      \`order\` INTEGER DEFAULT 0,
      visible INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log('✅ Table custom_blocks créée avec succès!')
  
  // Vérification
  const tableInfo = db.prepare("PRAGMA table_info(custom_blocks)").all()
  console.log('📋 Structure de la table:')
  tableInfo.forEach(column => {
    console.log(`  - ${column.name}: ${column.type} ${column.notnull ? 'NOT NULL' : ''} ${column.dflt_value ? `DEFAULT ${column.dflt_value}` : ''}`)
  })

} catch (error) {
  console.error('❌ Erreur lors de la création de la table:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('\n✨ Migration terminée!')
}