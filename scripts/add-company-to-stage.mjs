import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔄 Connexion à la base de données...')
const db = new Database(dbPath)

try {
  console.log('📦 Ajout de la colonne company à la table stage...')
  
  db.exec(`
    ALTER TABLE stage ADD COLUMN company TEXT;
  `)

  console.log('✅ Colonne company ajoutée avec succès!')
  
  // Vérification
  const tableInfo = db.prepare("PRAGMA table_info(stage)").all()
  console.log('📋 Structure mise à jour de la table stage:')
  tableInfo.forEach(column => {
    console.log(`  - ${column.name}: ${column.type} ${column.notnull ? 'NOT NULL' : ''} ${column.dflt_value ? `DEFAULT ${column.dflt_value}` : ''}`)
  })

} catch (error) {
  console.error('❌ Erreur lors de la migration:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('\n✨ Migration terminée!')
}