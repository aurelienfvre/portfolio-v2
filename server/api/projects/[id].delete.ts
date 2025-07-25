import { db, projects } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const projectId = getRouterParam(event, 'id')

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    const result = await db
      .delete(projects)
      .where(eq(projects.id, projectId))
      .returning()

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found'
      })
    }

    return {
      success: true,
      message: 'Project deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete project'
    })
  }
})