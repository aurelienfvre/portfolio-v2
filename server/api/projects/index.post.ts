import { db, projects, NewProject } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newProject: NewProject = {
      ...body,
      id: body.id || `project-${Date.now()}`,
      technologies: typeof body.technologies === 'object' ? JSON.stringify(body.technologies) : body.technologies,
      tags: typeof body.tags === 'object' ? JSON.stringify(body.tags) : body.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const result = await db.insert(projects).values(newProject).returning()

    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating project:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create project'
    })
  }
})