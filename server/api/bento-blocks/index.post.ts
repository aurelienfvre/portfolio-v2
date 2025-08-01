import { db, bentoBlocks, NewBentoBlock } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newBlock: NewBentoBlock = {
      ...body,
      props: typeof body.props === 'object' ? JSON.stringify(body.props) : body.props,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const result = await db.insert(bentoBlocks).values(newBlock).returning()

    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating bento block:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create bento block'
    })
  }
})