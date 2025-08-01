import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { eq } from 'drizzle-orm'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../db/portfolio.db')

// Define schema
const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  technologies: text('technologies'),
  detailed_content: text('detailed_content'),
  github_url: text('github_url'),
  live_url: text('live_url'),
  status: text('status').default('published'),
  tags: text('tags'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  order: integer('order').default(0),
  created_at: text('created_at').default('CURRENT_TIMESTAMP'),
  updated_at: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Create database connection
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
const db = drizzle(sqlite, { schema: { projects } })

// Original technologies data with icons and properties
const technologyMapping = {
  'Symfony': {
    name: 'Symfony',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
    invert: true
  },
  'MySQL': {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  'Vue.js': {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
  },
  'Docker': {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  'Nuxt': {
    name: 'Nuxt',
    icon: 'https://nuxt.com/assets/design-kit/icon-green.svg'
  },
  'Tailwind': {
    name: 'Tailwind',
    icon: `data:image/svg+xml,${encodeURIComponent(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C8.8 4 6.8 5.66667 6 9C7.2 7.33333 8.6 6.70833 10.2 7.125C11.1129 7.3625 11.7653 8.05278 12.4876 8.8162C13.664 10.0602 15.0258 11.5 18 11.5C21.2 11.5 23.2 9.83333 24 6.5C22.8 8.16667 21.4 8.79167 19.8 8.375C18.8871 8.1375 18.2347 7.44722 17.5124 6.6838C16.336 5.43981 14.9742 4 12 4ZM6 11.5C2.8 11.5 0.8 13.1667 0 16.5C1.2 14.8333 2.6 14.2083 4.2 14.625C5.11289 14.863 5.76533 15.5528 6.48756 16.3162C7.664 17.5602 9.02578 19 12 19C15.2 19 17.2 17.3333 18 14C16.8 15.6667 15.4 16.2917 13.8 15.875C12.8871 15.6375 12.2347 14.9472 11.5124 14.1838C10.336 12.9398 8.97422 11.5 6 11.5Z" fill="#38BDF8"/></svg>`)}`
  },
  'TypeScript': {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  'HTML': {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  'CSS': {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  'JavaScript': {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  'PHP': {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  },
  'Java': {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  }
}

async function fixProjectData() {
  try {
    console.log('Correction des données des projets...')

    // Get all projects
    const allProjects = await db.select().from(projects)
    
    for (const project of allProjects) {
      console.log(`\nCorrecting project: ${project.title}`)
      
      let updated = false
      const updates = {}
      
      // Fix technologies format
      if (project.technologies) {
        try {
          const techArray = JSON.parse(project.technologies)
          if (Array.isArray(techArray) && techArray.length > 0) {
            // Check if it's the old format (array of strings)
            if (typeof techArray[0] === 'string') {
              const newTechFormat = techArray.map(techName => {
                return technologyMapping[techName] || {
                  name: techName,
                  icon: '',
                  invert: false
                }
              })
              updates.technologies = JSON.stringify(newTechFormat)
              console.log(`  ✅ Fixed technologies: ${techArray.join(', ')}`)
              updated = true
            }
          }
        } catch (error) {
          console.log(`  ❌ Error parsing technologies for ${project.title}:`, error)
        }
      }
      
      // Update project if needed
      if (updated) {
        await db.update(projects)
          .set({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .where(eq(projects.id, project.id))
        
        console.log(`  ✅ Updated project ${project.title}`)
      } else {
        console.log(`  ℹ️  No changes needed for ${project.title}`)
      }
    }
    
    console.log('\n🎉 Correction des données terminée!')
    
  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error)
  } finally {
    sqlite.close()
  }
}

// Run the fix
fixProjectData()