import { db, socialLinks } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const newSocialLink = await db
      .insert(socialLinks)
      .values({
        name: body.name,
        title: body.title,
        url: body.url,
        icon: body.icon,
        order: body.order || 0,
        visible: body.visible !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .returning()

    return {
      success: true,
      data: newSocialLink[0]
    }
  } catch (error) {
    console.error('Error creating social link:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création du lien social'
    })
  }
})