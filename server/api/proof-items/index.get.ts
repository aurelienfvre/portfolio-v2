import { db } from '~/db'
import { proofItems, proofCategories, mainCompetences } from '~/db/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const proofCategoryId = query.proofCategoryId ? parseInt(query.proofCategoryId as string) : null
    
    let itemsQuery = db.select({
      id: proofItems.id,
      proofCategoryId: proofItems.proofCategoryId,
      title: proofItems.title,
      description: proofItems.description,
      mediaUrl: proofItems.mediaUrl,
      mediaType: proofItems.mediaType,
      originTag: proofItems.originTag,
      sourceUrl: proofItems.sourceUrl,
      order: proofItems.order,
      createdAt: proofItems.createdAt,
      updatedAt: proofItems.updatedAt,
      proofCategory: {
        id: proofCategories.id,
        title: proofCategories.title,
        slug: proofCategories.slug,
        mainCompetence: {
          id: mainCompetences.id,
          title: mainCompetences.title,
          slug: mainCompetences.slug
        }
      }
    })
    .from(proofItems)
    .leftJoin(proofCategories, eq(proofItems.proofCategoryId, proofCategories.id))
    .leftJoin(mainCompetences, eq(proofCategories.mainCompetenceId, mainCompetences.id))
    .orderBy(asc(proofItems.order))
    
    if (proofCategoryId) {
      itemsQuery = itemsQuery.where(eq(proofItems.proofCategoryId, proofCategoryId))
    }
    
    const items = await itemsQuery
    
    return {
      success: true,
      data: items
    }
  } catch (error) {
    console.error('Error fetching proof items:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch proof items'
    })
  }
})