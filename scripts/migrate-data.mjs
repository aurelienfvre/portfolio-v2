import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, text, integer, real, blob } from 'drizzle-orm/sqlite-core'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../db/portfolio.db')

// Define schema inline for migration script
const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  technologies: text('technologies'),
  github: text('github'),
  live: text('live'),
  image: text('image'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  status: text('status', { enum: ['planning', 'in-progress', 'completed', 'on-hold'] }).default('planning'),
  order: integer('order').default(0),
  tags: text('tags'),
  category: text('category'),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  level: integer('level').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  icon: text('icon'),
  order: integer('order').default(0),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

const bentoBlocks = sqliteTable('bento_blocks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  component: text('component').notNull(),
  title: text('title'),
  colSpan: integer('col_span').notNull().default(6),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  props: text('props'),
  content: text('content'),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

const studentYears = sqliteTable('student_years', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

const competences = sqliteTable('competences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentYearId: integer('student_year_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  order: integer('order').default(0),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

const apprentissagesCritiques = sqliteTable('apprentissages_critiques', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  competenceId: integer('competence_id').notNull(),
  code: text('code').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['not-started', 'in-progress', 'acquired', 'validated'] }).default('not-started'),
  order: integer('order').default(0),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString())
})

// Create database connection
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
const db = drizzle(sqlite, { 
  schema: { 
    projects, 
    skills, 
    bentoBlocks, 
    studentYears, 
    competences, 
    apprentissagesCritiques 
  } 
})

// Sample data to populate database
const sampleProjects = [
  {
    id: 'project-1',
    title: 'Portfolio Personnel',
    description: 'Site portfolio développé avec Nuxt 3 et Vue.js',
    technologies: JSON.stringify(['Vue.js', 'Nuxt 3', 'TypeScript', 'Tailwind CSS']),
    github: 'https://github.com/username/portfolio',
    live: 'https://portfolio.example.com',
    image: '/projects/portfolio.jpg',
    featured: 1,
    status: 'completed',
    order: 1,
    tags: JSON.stringify(['Frontend', 'Fullstack']),
    category: 'Web Development'
  },
  {
    id: 'project-2',
    title: 'Application de Gestion',
    description: 'Application de gestion d\'entreprise avec tableau de bord',
    technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Express']),
    github: 'https://github.com/username/management-app',
    live: null,
    image: '/projects/management.jpg',
    featured: 0,
    status: 'in-progress',
    order: 2,
    tags: JSON.stringify(['Backend', 'Database']),
    category: 'Web Development'
  }
]

const sampleSkills = [
  {
    name: 'JavaScript',
    level: 90,
    category: 'Frontend',
    description: 'Langage de programmation principal pour le développement web',
    icon: '/icons/javascript.svg',
    order: 1
  },
  {
    name: 'Vue.js',
    level: 85,
    category: 'Frontend',
    description: 'Framework progressif pour la création d\'interfaces utilisateur',
    icon: '/icons/vue.svg',
    order: 2
  },
  {
    name: 'TypeScript',
    level: 80,
    category: 'Frontend',
    description: 'Superset typé de JavaScript',
    icon: '/icons/typescript.svg',
    order: 3
  },
  {
    name: 'Node.js',
    level: 75,
    category: 'Backend',
    description: 'Runtime JavaScript côté serveur',
    icon: '/icons/nodejs.svg',
    order: 4
  },
  {
    name: 'PostgreSQL',
    level: 70,
    category: 'Database',
    description: 'Système de gestion de base de données relationnelle',
    icon: '/icons/postgresql.svg',
    order: 5
  }
]

const sampleBentoBlocks = [
  {
    component: 'ProfileSection',
    title: 'Profil',
    colSpan: 4,
    order: 1,
    visible: 1,
    props: JSON.stringify({})
  },
  {
    component: 'IntroSection',
    title: 'Introduction',
    colSpan: 8,
    order: 2,
    visible: 1,
    props: JSON.stringify({})
  },
  {
    component: 'ProjectsSection',
    title: 'Projets',
    colSpan: 12,
    order: 3,
    visible: 1,
    props: JSON.stringify({})
  },
  {
    component: 'SkillsSection',
    title: 'Compétences',
    colSpan: 8,
    order: 4,
    visible: 1,
    props: JSON.stringify({})
  },
  {
    component: 'ContactSection',
    title: 'Contact',
    colSpan: 4,
    order: 5,
    visible: 1,
    props: JSON.stringify({})
  }
]

const sampleStudentYears = [
  {
    year: 1,
    title: 'BUT Informatique - Première année',
    description: 'Fondamentaux de l\'informatique et de la programmation',
    visible: 1
  },
  {
    year: 2,
    title: 'BUT Informatique - Deuxième année',
    description: 'Approfondissement et spécialisation',
    visible: 1
  },
  {
    year: 3,
    title: 'BUT Informatique - Troisième année',
    description: 'Professionnalisation et projets avancés',
    visible: 1
  }
]

async function populateDatabase() {
  try {
    console.log('Début de la migration des données...')

    // Insert projects
    console.log('Insertion des projets...')
    for (const project of sampleProjects) {
      try {
        await db.insert(projects).values(project)
      } catch (error) {
        console.log(`Projet ${project.title} déjà existant, ignoré`)
      }
    }

    // Insert skills
    console.log('Insertion des compétences...')
    for (const skill of sampleSkills) {
      try {
        await db.insert(skills).values(skill)
      } catch (error) {
        console.log(`Compétence ${skill.name} déjà existante, ignorée`)
      }
    }

    // Insert bento blocks
    console.log('Insertion des blocs bento...')
    for (const block of sampleBentoBlocks) {
      try {
        await db.insert(bentoBlocks).values(block)
      } catch (error) {
        console.log(`Bloc ${block.title} déjà existant, ignoré`)
      }
    }

    // Insert student years
    console.log('Insertion des années étudiantes...')
    for (const year of sampleStudentYears) {
      try {
        const result = await db.insert(studentYears).values(year).returning()
        
        if (result.length > 0) {
          const yearId = result[0].id
          
          // Add sample competences for each year
          const competenceList = [
            {
              studentYearId: yearId,
              name: `Compétence ${year.year}.1`,
              description: `Première compétence de l'année ${year.year}`,
              order: 1
            },
            {
              studentYearId: yearId,
              name: `Compétence ${year.year}.2`,
              description: `Deuxième compétence de l'année ${year.year}`,
              order: 2
            }
          ]

          for (const competence of competenceList) {
            const compResult = await db.insert(competences).values(competence).returning()
            
            if (compResult.length > 0) {
              const competenceId = compResult[0].id
              
              // Add sample ACs for each competence
              const acs = [
                {
                  competenceId,
                  code: `AC${year.year}${competence.order}01`,
                  title: `Premier AC de ${competence.name}`,
                  description: `Description du premier apprentissage critique`,
                  status: 'acquired',
                  order: 1
                },
                {
                  competenceId,
                  code: `AC${year.year}${competence.order}02`,
                  title: `Deuxième AC de ${competence.name}`,
                  description: `Description du deuxième apprentissage critique`,
                  status: 'in-progress',
                  order: 2
                }
              ]

              for (const ac of acs) {
                await db.insert(apprentissagesCritiques).values(ac)
              }
            }
          }
        }
      } catch (error) {
        console.log(`Année ${year.year} déjà existante, ignorée`)
      }
    }

    console.log('Migration des données terminée avec succès!')
    
  } catch (error) {
    console.error('Erreur lors de la migration:', error)
  } finally {
    sqlite.close()
  }
}

// Run the migration
populateDatabase()