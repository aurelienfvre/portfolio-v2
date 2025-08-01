import { db } from '~/db'
import { proofItems } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid item ID'
      })
    }
    
    const result = await db.delete(proofItems)
      .where(eq(proofItems.id, id))
      .returning()
    
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Proof item not found'
      })
    }
    
    return {
      success: true,
      message: 'Proof item deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting proof item:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete proof item'
    })
  }
})