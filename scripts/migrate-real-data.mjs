import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../db/portfolio.db')

// Define schema inline for migration script
const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  technologies: text('technologies'),
  detailedContent: text('detailed_content'),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  status: text('status').default('published'),
  tags: text('tags'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  order: integer('order').default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(),
  level: integer('level').default(1),
  icon: text('icon'),
  color: text('color'),
  description: text('description'),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Create database connection
const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
const db = drizzle(sqlite, { schema: { projects, skills } })

// Real project data from data/projects.ts
const realProjects = [
  {
    id: 'wintok',
    title: 'Wintok',
    description: 'SaaS innovant pour l\'automatisation des wins sur TikTok Gaming',
    image: '/images/Thumbnail_wintok.png',
    technologies: JSON.stringify(['Symfony', 'MySQL']),
    detailedContent: `<div class="space-y-6">
            <div>
                <h3 class="text-xl font-medium mb-3">Présentation</h3>
                <p class="text-gray-400">
                    Wintok est une solution SaaS développée en collaboration avec Mathieu Robert, visant à révolutionner 
                    l'expérience des streamers gaming sur TikTok. Le projet propose un système automatisé de gestion des 
                    victoires en direct, enrichissant l'interaction avec leur communauté.
                </p>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Fonctionnalités clés</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Overlay personnalisable pour les lives TikTok</li>
                    <li>Intégration en temps réel avec les jeux (actuellement Minecraft, GTA en développement)</li>
                    <li>Système de requêtes automatisées depuis le jeu</li>
                    <li>Interface d'administration intuitive</li>
                    <li>Prochainement : Intégration de Stripe pour les paiements</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Mon rôle</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Design et développement complet du front-end</li>
                    <li>Conception et implémentation du système de communication jeux-overlay</li>
                    <li>Architecture initiale du système de mise à jour en temps réel</li>
                    <li>En cours : Mise en place d'un pipeline CI/CD pour le déploiement continu</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">État actuel</h3>
                <p class="text-gray-400">
                    Le projet est actuellement en phase de bêta test avec un groupe d'utilisateurs sélectionnés. 
                    Le développement se poursuit activement avec l'ajout de nouvelles fonctionnalités et 
                    l'optimisation des performances.
                </p>
            </div>
        </div>`,
    liveUrl: 'https://wintok.fr',
    githubUrl: null,
    status: 'published',
    tags: JSON.stringify(['SaaS', 'Gaming', 'TikTok']),
    featured: 1,
    order: 1
  },
  {
    id: 'cinevue',
    title: 'CinéVue',
    description: 'Application web fullstack de gestion de films et d\'acteurs',
    image: '/images/Thumbnail_cinevue.png',
    technologies: JSON.stringify(['Vue.js', 'Symfony', 'Docker', 'MySQL']),
    detailedContent: `<div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                CinéVue est une application web fullstack permettant de gérer et explorer une base de données 
                de films et d'acteurs. Développée dans le cadre d'un projet de développement front-end et back-end, 
                elle met en œuvre les meilleures pratiques de développement moderne.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Backend (Symfony)</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>API Platform pour la création d'API RESTful</li>
                <li>Système d'authentification avec JWT Token</li>
                <li>Intégration de GraphQL pour des requêtes flexibles</li>
                <li>Gestion des uploads avec VichUploader</li>
                <li>Tests unitaires et fonctionnels</li>
                <li>DataFixtures pour les données de test</li>
                <li>Validation des données avec Assert</li>
                <li>Sécurisation avec Assert Security</li>
                <li>Intégration de Snyk.io pour la sécurité</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Frontend (Vue.js)</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Interface utilisateur intuitive et responsive</li>
                <li>Système de recherche et de filtrage avancé</li>
                <li>Visualisation des relations films-acteurs</li>
                <li>Navigation par catégories de films</li>
                <li>Gestion des relations entre entités</li>
                <li>Système de tri et de filtrage côté client</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">DevOps & Qualité</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Conteneurisation avec Docker</li>
                <li>CI/CD pour l'automatisation des tests</li>
                <li>Tests avec Postman pour la validation des API</li>
                <li>Gestion des versions avec Git</li>
                <li>Documentation API avec Swagger/OpenAPI</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités clés</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Visualisation détaillée des films et acteurs</li>
                <li>Navigation par filmographie d'acteur</li>
                <li>Exploration du casting des films</li>
                <li>Catégorisation des films par genre</li>
                <li>Interface d'administration sécurisée</li>
                <li>Gestion complète des relations entre entités</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">État du projet</h3>
            <p class="text-gray-400">
                Le projet est actuellement en développement actif avec les fonctionnalités principales 
                implémentées. La partie back-end est bien avancée avec une API robuste et sécurisée, 
                tandis que le front-end continue d'être enrichi avec de nouvelles fonctionnalités 
                d'exploration et de visualisation.
            </p>
        </div>
    </div>`,
    githubUrl: 'https://github.com/aurelienfvre/WR506D-MMI-AB',
    liveUrl: null,
    status: 'published',
    tags: JSON.stringify(['Fullstack', 'API', 'Docker']),
    featured: 1,
    order: 2
  },
  {
    id: 'portfolio',
    title: 'Portfolio Personnel',
    description: 'Portfolio moderne développé avec Nuxt 3 et Tailwind',
    image: '/images/Thumbnail_portfolio.png',
    technologies: JSON.stringify(['Vue.js', 'Nuxt', 'Tailwind', 'TypeScript']),
    detailedContent: `<div class="space-y-6">
            <div>
                <h3 class="text-xl font-medium mb-3">Présentation</h3>
                <p class="text-gray-400">
                    Portfolio personnel moderne et responsive, développé avec les dernières technologies web. 
                    Conçu avec une approche "mobile-first" et une attention particulière portée à l'expérience utilisateur 
                    et à l'accessibilité.
                </p>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Caractéristiques techniques</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Architecture basée sur Nuxt 3 pour des performances optimales</li>
                    <li>Utilisation de TypeScript pour un code robuste et maintenable</li>
                    <li>Styled avec Tailwind CSS pour un design moderne et responsive</li>
                    <li>Mode sombre/clair avec persistance des préférences</li>
                    <li>Animations fluides et transitions soignées</li>
                    <li>Composants réutilisables et architecture modulaire</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Fonctionnalités</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Navigation fluide avec scroll automatique</li>
                    <li>Design adaptatif avec grille "Bento"</li>
                    <li>Affichage détaillé des projets en modal</li>
                    <li>Système de tags pour les technologies</li>
                    <li>Optimisation SEO et performances</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Approche</h3>
                <p class="text-gray-400">
                    Le portfolio a été conçu avec une approche centrée sur l'expérience utilisateur, 
                    en mettant l'accent sur la performance et l'accessibilité. Chaque composant a été 
                    développé de manière modulaire pour faciliter la maintenance et les futures évolutions.
                </p>
            </div>
        </div>`,
    liveUrl: 'https://aurelien-fevre.com',
    githubUrl: 'https://github.com/aurelienfvre/portfolio-v2',
    status: 'published',
    tags: JSON.stringify(['Portfolio', 'Frontend']),
    featured: 1,
    order: 3
  },
  {
    id: 'truchypluot',
    title: 'Truchy&Pluot',
    description: 'Site vitrine avec système de contact et devis pour une entreprise locale',
    image: '/images/Thumbnail_truchy.png',
    technologies: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'PHP']),
    detailedContent: `<div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                Projet réalisé durant un stage de 3 mois chez TRUCHY JEAN LUC à Bleigny-le-Carreau. 
                Développement d'un site vitrine professionnel intégrant des fonctionnalités avancées 
                de communication client-entreprise.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Responsabilités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Conception et développement des pages contact et devis</li>
                <li>Implémentation complète du système d'emails</li>
                <li>Design responsive et optimisation UX/UI</li>
                <li>Collaboration avec l'équipe de développement</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités développées</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Formulaire de contact interactif et validé</li>
                <li>Système de génération de devis automatisé</li>
                <li>Notifications email automatiques</li>
                <li>Interface responsive adaptée à tous les appareils</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Aspects techniques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Développement front-end avec HTML5, CSS3 et JavaScript</li>
                <li>Back-end en PHP pour la gestion des emails et des données</li>
                <li>Validation et sécurisation des formulaires</li>
                <li>Optimisation des performances et du référencement</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Résultats</h3>
            <p class="text-gray-400">
                Livraison d'un site professionnel fonctionnel permettant une meilleure communication 
                entre l'entreprise et ses clients, avec un système robuste de gestion des demandes 
                de contact et de devis.
            </p>
        </div>
    </div>`,
    liveUrl: 'https://aurelien-fevre.com/truchy_pluot/',
    githubUrl: null,
    status: 'published',
    tags: JSON.stringify(['Site vitrine', 'Stage']),
    featured: 0,
    order: 4
  },
  {
    id: 'minecraft-plugins',
    title: 'Plugins Minecraft Interactifs',
    description: 'Suite de plugins pour streams TikTok Gaming interactifs',
    image: '/images/Thumbnail_plugin.png',
    technologies: JSON.stringify(['Java']),
    detailedContent: `<div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                Développement d'une suite de plugins Minecraft innovants conçus spécifiquement pour les lives TikTok Gaming.
                Ces plugins enrichissent l'expérience de streaming en ajoutant des mécaniques de jeu interactives et des
                effets visuels spectaculaires, le tout intégré avec la plateforme Wintok.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Système de Box personnalisable</li>
                <li>Mécaniques de jeu avancées</li>
                <li>Effets visuels spectaculaires</li>
                <li>Animation de PNJ par étages</li>
                <li>Particules de cœur pour les likes</li>
                <li>Trou noir avec effet d'aspiration et zigzag</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Intégration avec Wintok</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Synchronisation automatique avec l'overlay Wintok</li>
                <li>Mise à jour en temps réel des victoires</li>
                <li>Interaction avec Stream2Earn pour les événements TikTok</li>
                <li>Système de récompenses automatisé</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Impact</h3>
            <p class="text-gray-400">
                Ces plugins ont permis d'enrichir significativement l'expérience de streaming sur TikTok,
                en offrant des interactions uniques et des effets visuels captivants pour la communauté.
                L'intégration avec Wintok a permis d'automatiser complètement le suivi des performances
                et la gestion des récompenses.
            </p>
        </div>
    </div>`,
    githubUrl: null,
    liveUrl: null,
    status: 'published',
    tags: JSON.stringify(['Java', 'Gaming', 'Minecraft']),
    featured: 0,
    order: 5
  },
  {
    id: 'edutask',
    title: 'EduTask',
    description: 'Application de gestion de tâches pour étudiants MMI',
    image: '/images/Thumbnail_edutask.png',
    technologies: JSON.stringify(['Symfony', 'JavaScript', 'HTML', 'CSS']),
    detailedContent: `<div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                EduTask est une application web collaborative conçue pour aider les étudiants MMI à suivre 
                leurs dates de rendu de travaux. Développée en équipe, elle met l'accent sur l'expérience 
                utilisateur et l'accessibilité tout en offrant des fonctionnalités avancées de gestion de tâches.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Gestion des utilisateurs</li>
                <li>Calendrier interactif des rendus</li>
                <li>Système de to-do list avancé</li>
                <li>Cartes de tâches personnalisables</li>
                <li>Mode sombre/clair</li>
                <li>Design responsive</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Aspects techniques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Backend (Symfony)</li>
                <li>Frontend (JavaScript, CSS, HTML)</li>
                <li>Architecture MVC</li>
                <li>Templates Twig</li>
                <li>Gestion de base de données</li>
                <li>Système d'authentification</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Résultats</h3>
            <p class="text-gray-400">
                EduTask est devenue une solution efficace pour la gestion des tâches académiques, 
                offrant une expérience utilisateur optimale tout en respectant les standards web 
                et les principes d'accessibilité.
            </p>
        </div>
    </div>`,
    liveUrl: 'https://aurelien-fevre.com/edutask/',
    githubUrl: 'https://github.com/aurelienfvre/sae301',
    status: 'published',
    tags: JSON.stringify(['Symfony', 'Équipe']),
    featured: 0,
    order: 6
  }
]

// Real skills data from data/skills.ts
const realSkills = [
  { name: 'Vue.js', category: 'Technologies', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', order: 1 },
  { name: 'Pinia', category: 'Technologies', level: 4, icon: 'https://pinia.vuejs.org/logo.svg', order: 2 },
  { name: 'Nuxt', category: 'Technologies', level: 4, icon: 'https://nuxt.com/assets/design-kit/icon-green.svg', order: 3 },
  { name: 'React', category: 'Technologies', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order: 4 },
  { name: 'Next', category: 'Technologies', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', order: 5 },
  { name: 'Symfony', category: 'Technologies', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg', order: 6 },
  { name: 'Docker', category: 'Technologies', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', order: 7 },
  { name: 'Tailwind', category: 'Technologies', level: 5, icon: 'data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C8.8 4 6.8 5.66667 6 9C7.2 7.33333 8.6 6.70833 10.2 7.125C11.1129 7.3625 11.7653 8.05278 12.4876 8.8162C13.664 10.0602 15.0258 11.5 18 11.5C21.2 11.5 23.2 9.83333 24 6.5C22.8 8.16667 21.4 8.79167 19.8 8.375C18.8871 8.1375 18.2347 7.44722 17.5124 6.6838C16.336 5.43981 14.9742 4 12 4ZM6 11.5C2.8 11.5 0.8 13.1667 0 16.5C1.2 14.8333 2.6 14.2083 4.2 14.625C5.11289 14.863 5.76533 15.5528 6.48756 16.3162C7.664 17.5602 9.02578 19 12 19C15.2 19 17.2 17.3333 18 14C16.8 15.6667 15.4 16.2917 13.8 15.875C12.8871 15.6375 12.2347 14.9472 11.5124 14.1838C10.336 12.9398 8.97422 11.5 6 11.5Z" fill="#38BDF8"/></svg>', order: 8 },
  { name: 'Material UI', category: 'Technologies', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg', order: 9 },
  { name: 'Communication', category: 'Soft Skills', level: 5, order: 10 },
  { name: 'Créativité', category: 'Soft Skills', level: 5, order: 11 },
  { name: 'Autonomie', category: 'Soft Skills', level: 5, order: 12 },
  { name: 'Adaptabilité', category: 'Soft Skills', level: 5, order: 13 },
  { name: 'Gestion de projet', category: 'Soft Skills', level: 4, order: 14 },
  { name: "Travail d'équipe", category: 'Soft Skills', level: 5, order: 15 }
]

async function migrateRealData() {
  try {
    console.log('Début de la migration des vraies données du portfolio...')

    // Clear existing sample data
    console.log('Suppression des données d\'exemple...')
    await db.delete(projects)
    await db.delete(skills)

    // Insert real projects
    console.log('Insertion des vrais projets...')
    for (const project of realProjects) {
      await db.insert(projects).values({
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      console.log(`✅ Projet "${project.title}" inséré`)
    }

    // Insert real skills
    console.log('Insertion des vraies compétences...')
    for (const skill of realSkills) {
      await db.insert(skills).values({
        ...skill,
        visible: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      console.log(`✅ Compétence "${skill.name}" insérée`)
    }

    console.log(`\n🎉 Migration terminée avec succès !`)
    console.log(`📦 ${realProjects.length} projets migrés`)
    console.log(`🛠️ ${realSkills.length} compétences migrées`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  } finally {
    sqlite.close()
  }
}

// Run the migration
migrateRealData()