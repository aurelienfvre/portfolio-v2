import { db, stage } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const stageData = await db
      .select()
      .from(stage)
      .limit(1)

    const result = stageData[0] || null
    if (result && result.locations) {
      result.locations = JSON.parse(result.locations)
    }

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Error fetching stage:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch stage'
    })
  }
})