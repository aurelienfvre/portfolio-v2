import { db, projects, NewProject } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Ensure required fields are present
    if (!body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title is required'
      })
    }

    if (!body.description) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Description is required'
      })
    }
    
    const newProject: NewProject = {
      id: body.id || `project-${Date.now()}`,
      title: body.title,
      description: body.description,
      image: body.image || null,
      technologies: typeof body.technologies === 'object' ? JSON.stringify(body.technologies) : (body.technologies || null),
      detailedContent: body.detailedContent || null,
      // Backward compatibility with old fields
      githubUrl: body.githubUrl || null,
      liveUrl: body.liveUrl || null,
      // New links structure
      links: body.links ? JSON.stringify(body.links) : null,
      status: body.status || 'published',
      tags: typeof body.tags === 'object' ? JSON.stringify(body.tags) : (body.tags || null),
      featured: body.featured || false,
      order: body.order || 0,
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