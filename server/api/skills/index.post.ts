import { db, skills, NewSkill } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const newSkill: NewSkill = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const result = await db.insert(skills).values(newSkill).returning()

    return {
      success: true,
      data: result[0]
    }
  } catch (error) {
    console.error('Error creating skill:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create skill'
    })
  }
})