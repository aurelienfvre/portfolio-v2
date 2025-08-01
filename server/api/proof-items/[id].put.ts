import { db } from '~/db'
import { proofItems } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid item ID'
      })
    }
    
    const updateData: any = {}
    if (body.proofCategoryId !== undefined) updateData.proofCategoryId = body.proofCategoryId
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.mediaUrl !== undefined) updateData.mediaUrl = body.mediaUrl
    if (body.mediaType !== undefined) updateData.mediaType = body.mediaType
    if (body.originTag !== undefined) updateData.originTag = body.originTag
    if (body.sourceUrl !== undefined) updateData.sourceUrl = body.sourceUrl
    if (body.skills !== undefined) updateData.skills = body.skills ? JSON.stringify(body.skills) : null
    if (body.mediaUrls !== undefined) updateData.mediaUrls = body.mediaUrls ? JSON.stringify(body.mediaUrls) : null
    if (body.order !== undefined) updateData.order = body.order
    updateData.updatedAt = new Date().toISOString()
    
    const result = await db.update(proofItems)
      .set(updateData)
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
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating proof item:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update proof item'
    })
  }
})