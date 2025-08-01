import { db } from '~/db'
import { proofCategories } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!Array.isArray(body) || body.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid reorder data'
      })
    }
    
    // Update order for each category
    const updatePromises = body.map(async (item: { id: number, order: number }) => {
      if (!item.id || item.order === undefined) {
        throw new Error('Missing id or order in reorder data')
      }
      
      return db.update(proofCategories)
        .set({ 
          order: item.order,
          updatedAt: new Date().toISOString()
        })
        .where(eq(proofCategories.id, item.id))
        .returning()
    })
    
    const results = await Promise.all(updatePromises)
    const updatedCategories = results.flat()
    
    return {
      success: true,
      data: updatedCategories,
      message: `Successfully reordered ${updatedCategories.length} proof categories`
    }
  } catch (error) {
    console.error('Error reordering proof categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to reorder proof categories'
    })
  }
})