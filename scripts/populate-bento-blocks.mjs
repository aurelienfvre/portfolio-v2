import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔄 Connexion à la base de données...')
const db = new Database(dbPath)

// Default professional portfolio bento blocks
const defaultBentoBlocks = [
  {
    title: 'Photo de profil',
    type: 'section',
    component: 'ProfileSection',
    colSpan: 4,
    order: 0,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Introduction',
    type: 'section', 
    component: 'IntroSection',
    colSpan: 8,
    order: 1,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Stage',
    type: 'section',
    component: 'StageSection', 
    colSpan: 6,
    order: 2,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Liens',
    type: 'section',
    component: 'LinksSection',
    colSpan: 6,
    order: 3,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Formation',
    type: 'section',
    component: 'FormationSection',
    colSpan: 4,
    order: 4,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Compétences', 
    type: 'section',
    component: 'SkillsSection',
    colSpan: 8,
    order: 5,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Projets',
    type: 'section',
    component: 'ProjectsSection',
    colSpan: 12,
    order: 6,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  },
  {
    title: 'Contact',
    type: 'section', 
    component: 'ContactSection',
    colSpan: 12,
    order: 7,
    visible: 1,
    content: null,
    props: null,
    backgroundColor: null
  }
]

try {
  console.log('🧹 Suppression des anciens blocs...')
  db.prepare('DELETE FROM bento_blocks').run()

  console.log('📦 Insertion des blocs par défaut...')
  const insertStmt = db.prepare(`
    INSERT INTO bento_blocks (
      title, type, component, col_span, [order], visible, 
      content, props, background_color, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `)

  let insertedCount = 0
  
  for (const block of defaultBentoBlocks) {
    const result = insertStmt.run(
      block.title,
      block.type,
      block.component,
      block.colSpan,
      block.order,
      block.visible,
      block.content,
      block.props,
      block.backgroundColor
    )
    
    if (result.changes > 0) {
      insertedCount++
      console.log(`✅ Bloc "${block.title}" (${block.component}) ajouté`)
    }
  }

  console.log(`\n🎉 ${insertedCount} blocs bento ajoutés avec succès!`)
  
  // Vérification
  const totalBlocks = db.prepare('SELECT COUNT(*) as count FROM bento_blocks').get()
  console.log(`📊 Total des blocs dans la BDD: ${totalBlocks.count}`)
  
  const blocksList = db.prepare('SELECT title, component, col_span, [order] FROM bento_blocks ORDER BY [order]').all()
  console.log('\n📋 Blocs créés:')
  blocksList.forEach((block, index) => {
    console.log(`${index + 1}. ${block.title} (${block.component}) - ${block.col_span}/12 - ordre: ${block.order}`)
  })

} catch (error) {
  console.error('❌ Erreur lors de la création des blocs bento:', error)
  process.exit(1)
} finally {
  db.close()
  console.log('\n✨ Migration terminée!')
}