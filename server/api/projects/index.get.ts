import { db, projects } from '~/db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allProjects = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.order), asc(projects.createdAt))

    // Parse JSON fields and handle links migration
    const parsedProjects = allProjects.map(project => ({
      ...project,
      technologies: project.technologies ? JSON.parse(project.technologies) : [],
      tags: project.tags ? JSON.parse(project.tags) : [],
      // Handle links field - if new links exist, use them, otherwise fallback to old fields
      links: project.links ? JSON.parse(project.links) : {
        website: project.liveUrl || undefined,
        github: project.githubUrl ? [project.githubUrl] : []
      }
    }))

    return {
      success: true,
      data: parsedProjects
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects'
    })
  }
})