import { db, skills } from '~/db'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const allSkills = await db
      .select()
      .from(skills)
      .orderBy(asc(skills.order), asc(skills.name))

    // Sort by custom category order (Technologies first, then Soft Skills)
    const categoryOrder = { 'Technologies': 0, 'Soft Skills': 1 }
    allSkills.sort((a, b) => {
      const categoryA = categoryOrder[a.category] ?? 999
      const categoryB = categoryOrder[b.category] ?? 999
      
      if (categoryA !== categoryB) {
        return categoryA - categoryB
      }
      
      // Si même catégorie, trier par order puis name
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0)
      }
      
      return a.name.localeCompare(b.name)
    })

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