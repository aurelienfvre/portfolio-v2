import { db, competences } from '~/db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allCompetences = await db
      .select()
      .from(competences)
      .orderBy(asc(competences.studentYearId), asc(competences.order), asc(competences.name))

    return {
      success: true,
      data: allCompetences
    }
  } catch (error) {
    console.error('Error fetching competences:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch competences'
    })
  }
})