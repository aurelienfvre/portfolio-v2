import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔍 Inspection des custom blocks...')
const db = new Database(dbPath)

try {
  // Récupérer tous les custom blocks
  const customBlocks = db.prepare('SELECT * FROM custom_blocks ORDER BY id').all()
  
  console.log(`📦 Nombre total de custom blocks: ${customBlocks.length}`)
  console.log('')
  
  customBlocks.forEach((block, index) => {
    console.log(`--- BLOC ${index + 1} (ID: ${block.id}) ---`)
    console.log(`Type: ${block.type}`)
    console.log(`Titre: ${block.title}`)
    console.log(`ColSpan: ${block.col_span}`)
    console.log(`Order: ${block.order}`)
    console.log(`Visible: ${block.visible}`)
    console.log(`Content:`)
    
    if (block.content) {
      try {
        const parsed = JSON.parse(block.content)
        console.log(JSON.stringify(parsed, null, 2))
      } catch (e) {
        console.log(`❌ ERREUR JSON: ${block.content}`)
      }
    } else {
      console.log('(vide)')
    }
    
    console.log(`Created: ${block.created_at}`)
    console.log(`Updated: ${block.updated_at}`)
    console.log('')
  })
  
} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('✨ Inspection terminée!')
}