import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔍 Vérification complète de la base de données...')
const db = new Database(dbPath)

try {
  // Vérifier toutes les tables principales
  const tables = [
    'bento_blocks',
    'projects', 
    'skills',
    'formations',
    'profile',
    'social_links',
    'stage',
    'custom_blocks'
  ]
  
  for (const table of tables) {
    try {
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get()
      console.log(`📊 ${table}: ${count.count} enregistrements`)
      
      if (count.count > 0 && table === 'bento_blocks') {
        const blocks = db.prepare(`SELECT id, title, component, col_span, "order", visible FROM ${table} ORDER BY "order"`).all()
        console.log('   Blocs bento:')
        blocks.forEach(block => {
          console.log(`   - ${block.title} (${block.component}) - ${block.col_span} cols - ordre: ${block.order} - visible: ${block.visible}`)
        })
      }
      
      if (count.count > 0 && table === 'projects') {
        const projects = db.prepare(`SELECT id, title, status FROM ${table} LIMIT 3`).all()
        console.log('   Projets:')
        projects.forEach(project => {
          console.log(`   - ${project.title} (${project.status})`)
        })
      }
      
    } catch (error) {
      console.log(`❌ Erreur avec ${table}: ${error.message}`)
    }
  }
  
} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('✨ Vérification terminée!')
}