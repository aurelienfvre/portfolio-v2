import { db, formations } from '~/db'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allFormations = await db
      .select()
      .from(formations)
      .where(eq(formations.visible, true))
      .orderBy(asc(formations.order))

    return {
      success: true,
      data: allFormations
    }
  } catch (error) {
    console.error('Error fetching formations:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch formations'
    })
  }
})