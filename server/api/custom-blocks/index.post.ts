import { db, customBlocks } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newBlock = await db
      .insert(customBlocks)
      .values({
        type: body.type,
        title: body.title,
        content: body.content || null,
        colSpan: body.colSpan || 6,
        order: body.order || 0,
        visible: body.visible !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .returning()

    return {
      success: true,
      data: newBlock[0]
    }
  } catch (error) {
    console.error('Error creating custom block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création du bloc personnalisé'
    })
  }
})