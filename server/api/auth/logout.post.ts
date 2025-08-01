import { db } from '~/db'
import { adminSessions } from '~/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const sessionId = getCookie(event, 'admin-session')

    if (sessionId) {
      // Supprimer la session de la base de données
      await db.delete(adminSessions)
        .where(eq(adminSessions.id, sessionId))
      console.log('Session supprimée de la BDD:', sessionId)
    }

    // Supprimer le cookie avec tous les paramètres possibles
    deleteCookie(event, 'admin-session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/admin'
    })

    // Supprimer aussi avec le path par défaut au cas où
    deleteCookie(event, 'admin-session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    // Forcer l'expiration du cookie côté client
    setCookie(event, 'admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/admin',
      maxAge: -1, // Expire immédiatement
      expires: new Date(0) // Date dans le passé
    })

    setCookie(event, 'admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: -1, // Expire immédiatement
      expires: new Date(0) // Date dans le passé
    })

    console.log('Cookies supprimés lors de la déconnexion')

    return {
      success: true,
      message: 'Déconnexion réussie'
    }
  } catch (error) {
    console.error('Error during logout:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la déconnexion'
    })
  }
})