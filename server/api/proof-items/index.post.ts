import { db } from '~/db'
import { proofItems } from '~/db/schema'
import type { NewProofItem } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newItem: NewProofItem = {
      proofCategoryId: body.proofCategoryId,
      title: body.title,
      description: body.description,
      mediaUrl: body.mediaUrl,
      mediaType: body.mediaType || 'image',
      originTag: body.originTag,
      order: body.order || 0
    }
    
    const result = await db.insert(proofItems).values(newItem).returning()
    
    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating proof item:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create proof item'
    })
  }
})