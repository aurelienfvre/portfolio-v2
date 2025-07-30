import { db, projects } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const projectId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!projectId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project ID is required'
      })
    }

    const updatedData = {
      ...body,
      technologies: typeof body.technologies === 'object' ? JSON.stringify(body.technologies) : body.technologies,
      tags: typeof body.tags === 'object' ? JSON.stringify(body.tags) : body.tags,
      links: body.links ? JSON.stringify(body.links) : body.links,
      updatedAt: new Date().toISOString()
    }

    const result = await db
      .update(projects)
      .set(updatedData)
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
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update project'
    })
  }
})