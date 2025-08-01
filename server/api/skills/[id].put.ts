import { db, skills } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const skillId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!skillId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Skill ID is required'
      })
    }

    const updatedData = {
      ...body,
      updatedAt: new Date().toISOString()
    }

    const result = await db
      .update(skills)
      .set(updatedData)
      .where(eq(skills.id, parseInt(skillId)))
      .returning()

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Skill not found'
      })
    }

    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update skill'
    })
  }
})