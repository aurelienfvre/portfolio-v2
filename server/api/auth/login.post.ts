import { db } from '~/db'
import { adminUsers, adminSessions } from '~/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email et mot de passe requis'
      })
    }

    // Rechercher l'utilisateur
    const users = await db.select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1)

    if (users.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })
    }

    const user = users[0]

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Identifiants invalides'
      })
    }

    // Créer une session
    const sessionId = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
    
    await db.insert(adminSessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt: expiresAt.toISOString()
    })

    // Définir le cookie de session (httpOnly, secure)
    setCookie(event, 'admin-session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24h en secondes
      path: '/' // Path racine pour être accessible partout
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error) {
    console.error('Error during login:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la connexion'
    })
  }
})