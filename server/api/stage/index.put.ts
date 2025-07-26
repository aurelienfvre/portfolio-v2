import { db, stage } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    if (!body.duration || !body.startDate || !body.position) {
      throw createError({
        statusCode: 400,
        statusMessage: 'duration, startDate et position sont requis'
      })
    }

    // Mettre à jour le stage (on suppose qu'il y a toujours un seul stage avec id=1)
    const updatedStage = await db
      .update(stage)
      .set({
        duration: body.duration,
        startDate: body.startDate,
        position: body.position,
        locations: typeof body.locations === 'string' ? body.locations : JSON.stringify(body.locations || []),
        updatedAt: new Date().toISOString()
      })
      .where(eq(stage.id, 1))
      .returning()

    if (updatedStage.length === 0) {
      // Si aucun stage n'existe, en créer un
      const newStage = await db
        .insert(stage)
        .values({
          duration: body.duration,
          startDate: body.startDate,
          position: body.position,
          locations: typeof body.locations === 'string' ? body.locations : JSON.stringify(body.locations || [])
        })
        .returning()
      
      return {
        success: true,
        data: newStage[0]
      }
    }

    return {
      success: true,
      data: updatedStage[0]
    }
  } catch (error) {
    console.error('Error updating stage:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update stage'
    })
  }
})