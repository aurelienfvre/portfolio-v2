export default defineNuxtRouteMiddleware(async (to) => {
  // Exclure la page de login
  if (to.path === '/admin/login') {
    return
  }

  try {
    // Vérifier l'authentification côté serveur
    const response = await $fetch('/api/auth/me', {
      method: 'GET'
    })

    if (!response?.success) {
      console.log('Auth check failed:', response)
      // Force redirect avec remplacement d'historique
      return navigateTo('/admin/login', { replace: true })
    }
  } catch (error) {
    // Si erreur (non authentifié, session expirée, etc.)
    console.log('Auth error:', error)
    
    // Nettoyer côté client si possible
    if (process.client) {
      localStorage.clear()
      sessionStorage.clear()
      document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      console.log('Client storage cleared in middleware')
    }
    
    // Force redirect avec remplacement d'historique
    return navigateTo('/admin/login', { replace: true })
  }
})