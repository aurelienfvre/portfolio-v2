import { db, socialLinks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const id = parseInt(query.id as string)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID est requis'
      })
    }

    const deletedLink = await db
      .delete(socialLinks)
      .where(eq(socialLinks.id, id))
      .returning()

    if (deletedLink.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Lien social non trouvé'
      })
    }

    return {
      success: true,
      data: deletedLink[0]
    }
  } catch (error) {
    console.error('Error deleting social link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la suppression du lien social'
    })
  }
})