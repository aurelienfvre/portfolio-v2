import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔧 Nettoyage des custom blocks...')
const db = new Database(dbPath)

try {
  // 1. Supprimer tous les blocs existants pour repartir à zéro
  console.log('🗑️ Suppression des blocs corrompus...')
  db.prepare('DELETE FROM custom_blocks').run()
  
  // 2. Créer un bloc experience propre
  console.log('✨ Création d\'un bloc experience propre...')
  const insertBlock = db.prepare(`
    INSERT INTO custom_blocks (type, title, content, col_span, "order", visible, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  const experienceContent = {
    experiences: [
      {
        position: "Développeur Frontend",
        company: "Mon Entreprise",
        period: "2023 - Présent",
        description: "Développement d'applications web modernes avec Vue.js et Nuxt.js"
      }
    ]
  }
  
  const now = new Date().toISOString()
  
  insertBlock.run(
    'experience',           // type correct
    'Mes Expériences',      // title
    JSON.stringify(experienceContent),  // content sans nested type
    8,                      // col_span
    0,                      // order
    1,                      // visible
    now,                    // created_at
    now                     // updated_at
  )
  
  console.log('✅ Bloc experience créé avec succès!')
  
  // 3. Vérification
  const blocks = db.prepare('SELECT * FROM custom_blocks').all()
  console.log('📋 État final:')
  blocks.forEach(block => {
    console.log(`- ID: ${block.id}, Type: ${block.type}, Titre: ${block.title}`)
    console.log(`  Content: ${block.content}`)
  })
  
} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('✨ Nettoyage terminé!')
}