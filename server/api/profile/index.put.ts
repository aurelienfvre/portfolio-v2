import { db, profile } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Valider les données requises
    if (!body.firstName || !body.lastName || !body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'firstName, lastName et title sont requis'
      })
    }

    // Mettre à jour le profil (on suppose qu'il y a toujours un seul profil avec id=1)
    const updatedProfile = await db
      .update(profile)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        title: body.title,
        description: body.description || null,
        email: body.email || null,
        cvUrl: body.cvUrl || null,
        updatedAt: new Date().toISOString()
      })
      .where(eq(profile.id, 1))
      .returning()

    if (updatedProfile.length === 0) {
      // Si aucun profil n'existe, en créer un
      const newProfile = await db
        .insert(profile)
        .values({
          firstName: body.firstName,
          lastName: body.lastName,
          title: body.title,
          description: body.description || null,
          email: body.email || null,
          cvUrl: body.cvUrl || null
        })
        .returning()
      
      return {
        success: true,
        data: newProfile[0]
      }
    }

    return {
      success: true,
      data: updatedProfile[0]
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update profile'
    })
  }
})