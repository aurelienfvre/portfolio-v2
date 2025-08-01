import { db } from '~/db'
import { mainCompetences } from '~/db/schema'
import type { NewMainCompetence } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newCompetence: NewMainCompetence = {
      title: body.title,
      slug: body.slug,
      subtitle: body.subtitle,
      order: body.order || 0
    }
    
    const result = await db.insert(mainCompetences).values(newCompetence).returning()
    
    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating main competence:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create main competence'
    })
  }
})