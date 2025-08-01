import { db } from '~/db'
import { adminSessions } from '~/db/schema'
import { lt } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Supprimer toutes les sessions expirées
    const now = new Date().toISOString()
    const result = await db.delete(adminSessions)
      .where(lt(adminSessions.expiresAt, now))

    console.log(`🧹 Sessions expirées nettoyées: ${result.changes} sessions supprimées`)

    return {
      success: true,
      message: `${result.changes} sessions expirées supprimées`
    }
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du nettoyage des sessions'
    })
  }
})