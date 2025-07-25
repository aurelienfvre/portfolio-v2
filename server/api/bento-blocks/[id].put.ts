import { db, bentoBlocks } from '~/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const blockId = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!blockId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Block ID is required'
      })
    }

    const updatedData = {
      ...body,
      props: typeof body.props === 'object' ? JSON.stringify(body.props) : body.props,
      updatedAt: new Date().toISOString()
    }

    const result = await db
      .update(bentoBlocks)
      .set(updatedData)
      .where(eq(bentoBlocks.id, parseInt(blockId)))
      .returning()

    if (result.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Bento block not found'
      })
    }

    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error updating bento block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update bento block'
    })
  }
})