import { db, customBlocks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') as string)

    const deletedBlock = await db
      .delete(customBlocks)
      .where(eq(customBlocks.id, id))
      .returning()

    if (deletedBlock.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bloc personnalisé non trouvé'
      })
    }

    return {
      success: true,
      data: deletedBlock[0]
    }
  } catch (error) {
    console.error('Error deleting custom block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression du bloc personnalisé'
    })
  }
})