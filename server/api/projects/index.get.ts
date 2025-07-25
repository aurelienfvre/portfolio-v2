import { db, projects } from '~/db'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.order), desc(projects.createdAt))

    return {
      success: true,
      data: allProjects
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})