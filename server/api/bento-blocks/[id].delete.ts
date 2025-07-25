import { db, bentoBlocks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const blockId = getRouterParam(event, 'id')

    if (!blockId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Block ID is required'
      })
    }

    const result = await db
      .delete(bentoBlocks)
      .where(eq(bentoBlocks.id, parseInt(blockId)))
      .returning()

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bento block not found'
      })
    }

    return {
      success: true,
      message: 'Bento block deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting bento block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete bento block'
    })
  }
})