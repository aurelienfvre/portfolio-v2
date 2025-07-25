import { db, apprentissagesCritiques } from '~/db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allAC = await db
      .select()
      .from(apprentissagesCritiques)
      .orderBy(asc(apprentissagesCritiques.competenceId), asc(apprentissagesCritiques.order), asc(apprentissagesCritiques.title))

    return {
      success: true,
      data: allAC
    }
  } catch (error) {
    console.error('Error fetching apprentissages critiques:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch apprentissages critiques'
    })
  }
})