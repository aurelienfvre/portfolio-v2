import { db } from '~/db'
import { adminUsers, adminSessions } from '~/db/schema'
import { eq, and, gt } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const sessionId = getCookie(event, 'admin-session')

    if (!sessionId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Non authentifié'
      })
    }

    // Vérifier la session
    const sessions = await db.select({
      userId: adminSessions.userId,
      expiresAt: adminSessions.expiresAt,
      user: {
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name
      }
    })
    .from(adminSessions)
    .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
    .where(and(
      eq(adminSessions.id, sessionId),
      gt(adminSessions.expiresAt, new Date().toISOString())
    ))
    .limit(1)

    if (sessions.length === 0) {
      // Session expirée ou invalide - nettoyer tous les cookies possibles
      deleteCookie(event, 'admin-session', { path: '/' })
      deleteCookie(event, 'admin-session', { path: '/admin' })
      
      // Forcer l'expiration côté client aussi
      setCookie(event, 'admin-session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: -1,
        expires: new Date(0)
      })
      
      console.log('Session expirée, cookies nettoyés')
      
      throw createError({
        statusCode: 401,
        statusMessage: 'Session expirée'
      })
    }

    const session = sessions[0]

    return {
      success: true,
      user: session.user
    }
  } catch (error) {
    console.error('Error checking auth:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur d\'authentification'
    })
  }
})