import { db } from '~/db'
import { proofCategories } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid category ID'
      })
    }
    
    const result = await db.delete(proofCategories)
      .where(eq(proofCategories.id, id))
      .returning()
    
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Proof category not found'
      })
    }
    
    return {
      success: true,
      message: 'Proof category deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting proof category:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete proof category'
    })
  }
})