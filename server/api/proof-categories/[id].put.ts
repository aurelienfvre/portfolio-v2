import { db } from '~/db'
import { proofCategories } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid category ID'
      })
    }
    
    const updateData: any = {}
    if (body.mainCompetenceId !== undefined) updateData.mainCompetenceId = body.mainCompetenceId
    if (body.title !== undefined) updateData.title = body.title
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.order !== undefined) updateData.order = body.order
    updateData.updatedAt = new Date().toISOString()
    
    const result = await db.update(proofCategories)
      .set(updateData)
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
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating proof category:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update proof category'
    })
  }
})