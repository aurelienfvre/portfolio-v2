import { db, formations } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') as string)
    const body = await readBody(event)
    
    if (!body.title || !body.institution || !body.period) {
      throw createError({
        statusCode: 400,
        statusMessage: 'title, institution et period sont requis'
      })
    }

    const updatedFormation = await db
      .update(formations)
      .set({
        title: body.title,
        institution: body.institution,
        period: body.period,
        description: body.description || null,
        order: body.order || 0,
        visible: body.visible !== undefined ? body.visible : true,
        updatedAt: new Date().toISOString()
      })
      .where(eq(formations.id, id))
      .returning()

    if (updatedFormation.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Formation not found'
      })
    }

    return {
      success: true,
      data: updatedFormation[0]
    }
  } catch (error) {
    console.error('Error updating formation:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update formation'
    })
  }
})