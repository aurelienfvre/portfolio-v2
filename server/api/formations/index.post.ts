import { db, formations } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body.title || !body.institution || !body.period) {
      throw createError({
        statusCode: 400,
        statusMessage: 'title, institution et period sont requis'
      })
    }

    const newFormation = await db
      .insert(formations)
      .values({
        title: body.title,
        institution: body.institution,
        period: body.period,
        description: body.description || null,
        order: body.order || 0,
        visible: body.visible !== undefined ? body.visible : true
      })
      .returning()

    return {
      success: true,
      data: newFormation[0]
    }
  } catch (error) {
    console.error('Error creating formation:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create formation'
    })
  }
})