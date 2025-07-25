import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const dbPath = join(__dirname, '..', 'db', 'portfolio.db')

console.log('🔄 Connexion à la base de données...')
const db = new Database(dbPath)

// Create the new tables first
console.log('📦 Création des nouvelles tables...')

// Profile table
db.exec(`
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  profile_image TEXT,
  email TEXT,
  cv_url TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

// Formations table  
db.exec(`
CREATE TABLE IF NOT EXISTS formations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  \`order\` INTEGER DEFAULT 0,
  visible INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

// Stage table
db.exec(`
CREATE TABLE IF NOT EXISTS stage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  duration TEXT NOT NULL,
  start_date TEXT NOT NULL,
  position TEXT NOT NULL,
  locations TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

// Social links table
db.exec(`
CREATE TABLE IF NOT EXISTS social_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  \`order\` INTEGER DEFAULT 0,
  visible INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

console.log('✅ Tables créées avec succès!')

// Profile data
console.log('👤 Migration des données de profil...')
const profileData = {
  firstName: 'Aurélien',
  lastName: 'Fevre',
  title: 'Développeur Front-end',
  description: 'Étudiant en 3e année de BUT MMI, passionné par le développement front-end et la création d\'expériences web innovantes.',
  profileImage: '/images/profile.jpg',
  email: 'aurelien.fvre@gmail.com',
  cvUrl: '/files/CV-AurelienFevre.pdf'
}

// Clear existing profile data
db.prepare('DELETE FROM profile').run()

const insertProfile = db.prepare(`
  INSERT INTO profile (first_name, last_name, title, description, profile_image, email, cv_url)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

insertProfile.run(
  profileData.firstName,
  profileData.lastName, 
  profileData.title,
  profileData.description,
  profileData.profileImage,
  profileData.email,
  profileData.cvUrl
)

console.log('✅ Données de profil migrées!')

// Formation data
console.log('🎓 Migration des données de formation...')
const formationsData = [
  {
    title: 'Mastère Lead Developer Front End',
    institution: 'ECV Lille',
    period: '2025-2027',
    order: 3
  },
  {
    title: 'BUT MMI - 3e année',
    institution: 'IUT de Troyes',
    period: '2022-2025',
    order: 1
  },
  {
    title: 'BUT Informatique',
    institution: "IUT d'Amiens",
    period: '2021-2022',
    order: 2
  }
]

// Clear existing formations
db.prepare('DELETE FROM formations').run()

const insertFormation = db.prepare(`
  INSERT INTO formations (title, institution, period, \`order\`)
  VALUES (?, ?, ?, ?)
`)

formationsData.forEach(formation => {
  insertFormation.run(
    formation.title,
    formation.institution,
    formation.period,
    formation.order
  )
})

console.log(`✅ ${formationsData.length} formations migrées!`)

// Stage data
console.log('💼 Migration des données de stage...')
const stageData = {
  duration: '2 ans',
  startDate: 'Septembre 2025',
  position: 'Développeur Front-end',
  locations: JSON.stringify([
    { name: 'Lille et ses alentours', isPrimary: true }
  ])
}

// Clear existing stage data
db.prepare('DELETE FROM stage').run()

const insertStage = db.prepare(`
  INSERT INTO stage (duration, start_date, position, locations)
  VALUES (?, ?, ?, ?)
`)

insertStage.run(
  stageData.duration,
  stageData.startDate,
  stageData.position,
  stageData.locations
)

console.log('✅ Données de stage migrées!')

// Social links data
console.log('🔗 Migration des liens sociaux...')
const socialLinksData = [
  {
    name: 'email',
    url: 'mailto:aurelien.fvre@gmail.com',
    icon: 'mail',
    title: 'Email',
    order: 0
  },
  {
    name: 'github',
    url: 'https://github.com/aurelienfvre',
    icon: 'github',
    title: 'GitHub',
    order: 1
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/aurelienfevre',
    icon: 'linkedin',
    title: 'LinkedIn',
    order: 2
  },
  {
    name: 'website',
    url: 'https://aurelien-fevre.com',
    icon: 'globe',
    title: 'Portfolio',
    order: 3
  }
]

// Clear existing social links
db.prepare('DELETE FROM social_links').run()

const insertSocialLink = db.prepare(`
  INSERT INTO social_links (name, url, icon, title, \`order\`)
  VALUES (?, ?, ?, ?, ?)
`)

socialLinksData.forEach(link => {
  insertSocialLink.run(
    link.name,
    link.url,
    link.icon,
    link.title,
    link.order
  )
})

console.log(`✅ ${socialLinksData.length} liens sociaux migrés!`)

// Verification
console.log('\n📊 Vérification des données migrées:')
const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get()
const formationsCount = db.prepare('SELECT COUNT(*) as count FROM formations').get()
const stageCount = db.prepare('SELECT COUNT(*) as count FROM stage').get()
const socialLinksCount = db.prepare('SELECT COUNT(*) as count FROM social_links').get()

console.log(`- Profil: ${profileCount.count} entrée`)
console.log(`- Formations: ${formationsCount.count} entrées`)
console.log(`- Stage: ${stageCount.count} entrée`)
console.log(`- Liens sociaux: ${socialLinksCount.count} entrées`)

db.close()
console.log('\n✨ Migration complète terminée!')