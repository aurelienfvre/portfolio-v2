import { db, studentYears, competences, apprentissagesCritiques } from '~/db'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Récupérer toutes les années étudiantes avec leurs compétences et AC
    const years = await db
      .select()
      .from(studentYears)
      .where(eq(studentYears.visible, true))
      .orderBy(asc(studentYears.year))

    // Pour chaque année, récupérer les compétences et AC
    const yearsWithSkills = await Promise.all(
      years.map(async (year) => {
        const skills = await db
          .select()
          .from(competences)
          .where(eq(competences.studentYearId, year.id))
          .orderBy(asc(competences.order))

        const skillsWithAC = await Promise.all(
          skills.map(async (skill) => {
            const ac = await db
              .select()
              .from(apprentissagesCritiques)
              .where(eq(apprentissagesCritiques.competenceId, skill.id))
              .orderBy(asc(apprentissagesCritiques.order))

            return {
              ...skill,
              ac
            }
          })
        )

        return {
          ...year,
          skills: skillsWithAC
        }
      })
    )

    return {
      success: true,
      data: yearsWithSkills
    }
  } catch (error) {
    console.error('Error fetching student years:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch student years'
    })
  }
})