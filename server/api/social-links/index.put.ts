import { db, socialLinks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID est requis pour la mise à jour'
      })
    }

    if (!body.name || !body.url) {
      throw createError({
        statusCode: 400,
        statusMessage: 'name et url sont requis'
      })
    }

    const updatedLink = await db
      .update(socialLinks)
      .set({
        name: body.name,
        url: body.url,
        icon: body.icon || '',
        title: body.title || body.name,
        order: body.order || 0,
        visible: body.visible !== false,
        updatedAt: new Date().toISOString()
      })
      .where(eq(socialLinks.id, body.id))
      .returning()

    if (updatedLink.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Lien social non trouvé'
      })
    }

    return {
      success: true,
      data: updatedLink[0]
    }
  } catch (error) {
    console.error('Error updating social link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la mise à jour du lien social'
    })
  }
})