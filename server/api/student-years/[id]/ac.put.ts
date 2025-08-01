import { db, apprentissagesCritiques } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const yearId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!yearId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Year ID is required'
      })
    }

    // Mettre à jour l'ordre des AC après drag & drop
    const { acUpdates } = body

    if (!Array.isArray(acUpdates)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'AC updates must be an array'
      })
    }

    // Traiter les mises à jour en parallèle
    const updatePromises = acUpdates.map(async (update: any) => {
      return db
        .update(apprentissagesCritiques)
        .set({
          competenceId: update.competenceId,
          order: update.order,
          updatedAt: new Date().toISOString()
        })
        .where(eq(apprentissagesCritiques.id, update.id))
    })

    await Promise.all(updatePromises)

    return {
      success: true,
      message: 'AC updated successfully'
    }
  } catch (error) {
    console.error('Error updating AC:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update AC'
    })
  }
})