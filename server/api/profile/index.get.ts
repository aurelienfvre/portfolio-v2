import { db, profile } from '~/db'

export default defineEventHandler(async (event) => {
  try {
    const profileData = await db
      .select()
      .from(profile)
      .limit(1)

    return {
      success: true,
      data: profileData[0] || null
    }
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch profile'
    })
  }
})