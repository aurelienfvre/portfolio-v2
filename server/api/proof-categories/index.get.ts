import { db } from '~/db'
import { proofCategories, mainCompetences } from '~/db/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const mainCompetenceId = query.mainCompetenceId ? parseInt(query.mainCompetenceId as string) : null
    
    let categoriesQuery = db.select({
      id: proofCategories.id,
      mainCompetenceId: proofCategories.mainCompetenceId,
      title: proofCategories.title,
      subtitle: proofCategories.subtitle,
      slug: proofCategories.slug,
      order: proofCategories.order,
      createdAt: proofCategories.createdAt,
      updatedAt: proofCategories.updatedAt,
      mainCompetence: {
        id: mainCompetences.id,
        title: mainCompetences.title,
        slug: mainCompetences.slug
      }
    })
    .from(proofCategories)
    .leftJoin(mainCompetences, eq(proofCategories.mainCompetenceId, mainCompetences.id))
    .orderBy(asc(proofCategories.order))
    
    if (mainCompetenceId) {
      categoriesQuery = categoriesQuery.where(eq(proofCategories.mainCompetenceId, mainCompetenceId))
    }
    
    const categories = await categoriesQuery
    
    return {
      success: true,
      data: categories
    }
  } catch (error) {
    console.error('Error fetching proof categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch proof categories'
    })
  }
})