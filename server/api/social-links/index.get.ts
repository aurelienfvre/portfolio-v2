import { db, socialLinks } from '~/db'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allSocialLinks = await db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.visible, true))
      .orderBy(asc(socialLinks.order))

    return {
      success: true,
      data: allSocialLinks
    }
  } catch (error) {
    console.error('Error fetching social links:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch social links'
    })
  }
})