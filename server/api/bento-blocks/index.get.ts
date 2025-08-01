import { db, bentoBlocks } from '~/db'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allBlocks = await db
      .select()
      .from(bentoBlocks)
      .where(eq(bentoBlocks.visible, true))
      .orderBy(asc(bentoBlocks.order))

    return {
      success: true,
      data: allBlocks
    }
  } catch (error) {
    console.error('Error fetching bento blocks:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch bento blocks'
    })
  }
})