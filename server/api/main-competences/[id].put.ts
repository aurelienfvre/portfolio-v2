import { db } from '~/db'
import { mainCompetences } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid competence ID'
      })
    }
    
    const updateData: any = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.subtitle !== undefined) updateData.subtitle = body.subtitle
    if (body.order !== undefined) updateData.order = body.order
    updateData.updatedAt = new Date().toISOString()
    
    const result = await db.update(mainCompetences)
      .set(updateData)
      .where(eq(mainCompetences.id, id))
      .returning()
    
    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Main competence not found'
      })
    }
    
    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating main competence:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update main competence'
    })
  }
})