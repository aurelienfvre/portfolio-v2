import { sqliteTable, text, integer, blob, real } from 'drizzle-orm/sqlite-core'

// Table Projects
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  technologies: text('technologies'), // JSON string
  detailedContent: text('detailed_content'),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  status: text('status').default('published'),
  tags: text('tags'), // JSON string
  featured: integer('featured', { mode: 'boolean' }).default(false),
  order: integer('order').default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Skills
export const skills = sqliteTable('skills', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(),
  level: integer('level').default(1), // 1-5
  icon: text('icon'),
  color: text('color'),
  description: text('description'),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table BentoBlocks pour le layout du portfolio
export const bentoBlocks = sqliteTable('bento_blocks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  type: text('type').notNull(),
  component: text('component').notNull(),
  colSpan: integer('col_span').default(6),
  backgroundColor: text('background_color'),
  content: text('content'),
  props: text('props'), // JSON string pour propriétés du composant
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table StudentYears pour le mode étudiant
export const studentYears = sqliteTable('student_years', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Competences pour le mode étudiant
export const competences = sqliteTable('competences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentYearId: integer('student_year_id').references(() => studentYears.id),
  name: text('name').notNull(),
  code: text('code').notNull(),
  color: text('color'),
  order: integer('order').default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table AC (Apprentissages Critiques) pour le mode étudiant
export const apprentissagesCritiques = sqliteTable('apprentissages_critiques', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  competenceId: integer('competence_id').references(() => competences.id),
  title: text('title').notNull(),
  description: text('description'),
  project: text('project'),
  status: text('status').default('pending'), // pending, in_progress, completed
  order: integer('order').default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Settings pour configurations générales
export const settings = sqliteTable('settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value'),
  type: text('type').default('string'), // string, number, boolean, json
  description: text('description'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Media pour gérer les images et fichiers
export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  path: text('path').notNull(),
  url: text('url').notNull(),
  alt: text('alt'),
  description: text('description'),
  tags: text('tags'), // JSON string
  createdAt: text('created_at').default('CURRENT_TIMESTAMP')
})

// Table Profile pour les données de profil
export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  profileImage: text('profile_image'),
  email: text('email'),
  cvUrl: text('cv_url'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Formation pour les formations
export const formations = sqliteTable('formations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  institution: text('institution').notNull(),
  period: text('period').notNull(),
  description: text('description'),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Stage pour les informations de stage
export const stage = sqliteTable('stage', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  duration: text('duration').notNull(),
  startDate: text('start_date').notNull(),
  position: text('position').notNull(),
  locations: text('locations'), // JSON string
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Table Social Links pour les liens sociaux
export const socialLinks = sqliteTable('social_links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  url: text('url').notNull(),
  icon: text('icon').notNull(),
  title: text('title').notNull(),
  order: integer('order').default(0),
  visible: integer('visible', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP')
})

// Types pour TypeScript
export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type Skill = typeof skills.$inferSelect
export type NewSkill = typeof skills.$inferInsert

export type BentoBlock = typeof bentoBlocks.$inferSelect
export type NewBentoBlock = typeof bentoBlocks.$inferInsert

export type StudentYear = typeof studentYears.$inferSelect
export type NewStudentYear = typeof studentYears.$inferInsert

export type Competence = typeof competences.$inferSelect
export type NewCompetence = typeof competences.$inferInsert

export type ApprentissageCritique = typeof apprentissagesCritiques.$inferSelect
export type NewApprentissageCritique = typeof apprentissagesCritiques.$inferInsert

export type Setting = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert

export type Profile = typeof profile.$inferSelect
export type NewProfile = typeof profile.$inferInsert

export type Formation = typeof formations.$inferSelect
export type NewFormation = typeof formations.$inferInsert

export type Stage = typeof stage.$inferSelect
export type NewStage = typeof stage.$inferInsert

export type SocialLink = typeof socialLinks.$inferSelect
export type NewSocialLink = typeof socialLinks.$inferInsert