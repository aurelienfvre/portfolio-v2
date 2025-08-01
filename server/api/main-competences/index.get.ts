import { db } from '~/db'
import { mainCompetences } from '~/db/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const competences = await db.select().from(mainCompetences).orderBy(asc(mainCompetences.order))
    
    return {
      success: true,
      data: competences
    }
  } catch (error) {
    console.error('Error fetching main competences:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch main competences'
    })
  }
})