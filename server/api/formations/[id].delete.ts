import { db, formations } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') as string)

    const deletedFormation = await db
      .delete(formations)
      .where(eq(formations.id, id))
      .returning()

    if (deletedFormation.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Formation not found'
      })
    }

    return {
      success: true,
      data: deletedFormation[0]
    }
  } catch (error) {
    console.error('Error deleting formation:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete formation'
    })
  }
})