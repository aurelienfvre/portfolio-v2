import { db, customBlocks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') as string)
    const body = await readBody(event)

    const updatedBlock = await db
      .update(customBlocks)
      .set({
        type: body.type,
        title: body.title,
        content: body.content || null,
        colSpan: body.colSpan || 6,
        order: body.order || 0,
        visible: body.visible !== false,
        updatedAt: new Date().toISOString()
      })
      .where(eq(customBlocks.id, id))
      .returning()

    if (updatedBlock.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bloc personnalisé non trouvé'
      })
    }

    return {
      success: true,
      data: updatedBlock[0]
    }
  } catch (error) {
    console.error('Error updating custom block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour du bloc personnalisé'
    })
  }
})