import { db, customBlocks } from '~/db'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const blocks = await db
      .select()
      .from(customBlocks)
      .orderBy(desc(customBlocks.order), desc(customBlocks.createdAt))

    return {
      success: true,
      data: blocks
    }
  } catch (error) {
    console.error('Error fetching custom blocks:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des blocs personnalisés'
    })
  }
})