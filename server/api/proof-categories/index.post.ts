import { db } from '~/db'
import { proofCategories } from '~/db/schema'
import type { NewProofCategory } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newCategory: NewProofCategory = {
      mainCompetenceId: body.mainCompetenceId,
      title: body.title,
      subtitle: body.subtitle,
      slug: body.slug,
      order: body.order || 0
    }
    
    const result = await db.insert(proofCategories).values(newCategory).returning()
    
    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating proof category:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create proof category'
    })
  }
})