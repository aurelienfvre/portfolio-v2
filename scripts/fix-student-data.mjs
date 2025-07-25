import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { studentYears, competences, apprentissagesCritiques } from '../db/schema.ts'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../db/portfolio.db')

console.log('🔧 Fixing student data (BUT MMI instead of BUT Informatique)...')

try {
  const sqlite = new Database(dbPath)
  const db = drizzle(sqlite)

  // Données correctes pour BUT MMI
  const correctStudentYears = [
    {
      year: 1,
      title: "1ère année BUT MMI - Découverte des fondamentaux",
      description: "Année de découverte des compétences MMI : communication, web, audiovisuel",
      order: 1,
      visible: true
    },
    {
      year: 2,
      title: "2ème année BUT MMI - Approfondissement",
      description: "Approfondissement des compétences et première spécialisation",
      order: 2,
      visible: true
    },
    {
      year: 3,
      title: "3ème année BUT MMI - Spécialisation Développement Web",
      description: "Spécialisation en développement web et interfaces utilisateur",
      order: 3,
      visible: true
    }
  ]

  // Supprimer les anciennes données
  await db.delete(apprentissagesCritiques)
  await db.delete(competences) 
  await db.delete(studentYears)
  console.log('✅ Anciennes données supprimées')

  // Insérer les nouvelles données d'années
  for (const year of correctStudentYears) {
    await db.insert(studentYears).values(year)
  }
  console.log('✅ Nouvelles années BUT MMI créées')

  // Récupérer les IDs des années créées
  const createdYears = await db.select().from(studentYears).orderBy(studentYears.year)
  
  // Ajouter des compétences MMI pour chaque année
  const mmiCompetences = [
    // 1ère année
    { studentYearId: createdYears[0].id, name: "Comprendre", code: "C1", color: "#3B82F6", order: 1 },
    { studentYearId: createdYears[0].id, name: "Concevoir", code: "C2", color: "#10B981", order: 2 },
    { studentYearId: createdYears[0].id, name: "Exprimer", code: "C3", color: "#F59E0B", order: 3 },
    { studentYearId: createdYears[0].id, name: "Développer", code: "C4", color: "#EF4444", order: 4 },
    { studentYearId: createdYears[0].id, name: "Entreprendre", code: "C5", color: "#8B5CF6", order: 5 },
    
    // 2ème année
    { studentYearId: createdYears[1].id, name: "Comprendre", code: "C1", color: "#3B82F6", order: 1 },
    { studentYearId: createdYears[1].id, name: "Concevoir", code: "C2", color: "#10B981", order: 2 },
    { studentYearId: createdYears[1].id, name: "Exprimer", code: "C3", color: "#F59E0B", order: 3 },
    { studentYearId: createdYears[1].id, name: "Développer", code: "C4", color: "#EF4444", order: 4 },
    { studentYearId: createdYears[1].id, name: "Entreprendre", code: "C5", color: "#8B5CF6", order: 5 },
    
    // 3ème année
    { studentYearId: createdYears[2].id, name: "Comprendre", code: "C1", color: "#3B82F6", order: 1 },
    { studentYearId: createdYears[2].id, name: "Concevoir", code: "C2", color: "#10B981", order: 2 },
    { studentYearId: createdYears[2].id, name: "Exprimer", code: "C3", color: "#F59E0B", order: 3 },
    { studentYearId: createdYears[2].id, name: "Développer", code: "C4", color: "#EF4444", order: 4 },
    { studentYearId: createdYears[2].id, name: "Entreprendre", code: "C5", color: "#8B5CF6", order: 5 }
  ]

  for (const competence of mmiCompetences) {
    await db.insert(competences).values(competence)
  }
  console.log('✅ Compétences MMI créées')

  // Récupérer les compétences créées
  const createdCompetences = await db.select().from(competences).orderBy(competences.id)
  
  // Ajouter quelques AC d'exemple
  const sampleAC = [
    {
      competenceId: createdCompetences[0].id, // Comprendre - 1ère année
      title: "AC11.01 - Analyser la stratégie de communication",
      description: "Analyser la stratégie de communication d'un acteur à partir d'un corpus documentaire",
      project: "Analyse stratégie Coca-Cola",
      status: "completed",
      order: 1
    },
    {
      competenceId: createdCompetences[3].id, // Développer - 1ère année  
      title: "AC14.01 - Coder un site web adaptatif",
      description: "Coder un site web adaptatif avec HTML/CSS",
      project: "Site portfolio personnel",
      status: "completed",
      order: 1
    },
    {
      competenceId: createdCompetences[8].id, // Développer - 2ème année
      title: "AC24.01 - Développer avec un framework",
      description: "Développer une application avec un framework côté client",
      project: "Application Vue.js",
      status: "in_progress",
      order: 1
    }
  ]

  for (const ac of sampleAC) {
    await db.insert(apprentissagesCritiques).values(ac)
  }
  console.log('✅ Apprentissages Critiques d\'exemple créés')

  sqlite.close()
  console.log('🎉 Données étudiant BUT MMI corrigées avec succès!')

} catch (error) {
  console.error('❌ Erreur:', error)
  process.exit(1)
}