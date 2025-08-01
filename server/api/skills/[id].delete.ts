import { db, skills } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const skillId = getRouterParam(event, 'id')

    if (!skillId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Skill ID is required'
      })
    }

    const result = await db
      .delete(skills)
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
      message: 'Skill deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete skill'
    })
  }
})