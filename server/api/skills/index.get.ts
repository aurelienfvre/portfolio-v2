import { db, skills } from '~/db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allSkills = await db
      .select()
      .from(skills)
      .orderBy(asc(skills.order), asc(skills.category), asc(skills.name))

    return {
      success: true,
      data: allSkills
    }
  } catch (error) {
    console.error('Error fetching skills:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch skills'
    })
  }
})