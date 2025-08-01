<template>
  <div class="mb-8 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-text-primary mb-2">{{ title }}</h1>
      <p v-if="subtitle" class="text-text-tertiary">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-3">
      <!-- Logout Button -->
      <button
        @click="handleLogout"
        :disabled="isLoggingOut"
        class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
      >
        <svg v-if="isLoggingOut" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        {{ isLoggingOut ? 'Déconnexion...' : 'Déconnexion' }}
      </button>

      <!-- Back to Portfolio -->
      <NuxtLink 
        to="/"
        class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour au Portfolio
      </NuxtLink>

      <!-- Custom actions slot -->
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  subtitle?: string
}

defineProps<Props>()

// Auth state
const isLoggingOut = ref(false)

// Logout handler
const handleLogout = async () => {
  if (isLoggingOut.value) return
  
  isLoggingOut.value = true
  
  try {
    // Appeler l'API de déconnexion
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    
    console.log('Déconnexion API réussie')
  } catch (error) {
    console.error('Logout error:', error)
  }
  
  // Force clear any potential client-side storage
  if (process.client) {
    // Vider le localStorage et sessionStorage au cas où
    localStorage.clear()
    sessionStorage.clear()
    
    // Forcer la suppression de tous les cookies liés à l'admin
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;'
    
    console.log('Storage et cookies nettoyés côté client')
  }
  
  // Force redirect avec reload pour vider complètement l'état
  if (process.client) {
    window.location.href = '/admin/login'
  } else {
    await navigateTo('/admin/login')
  }
  
  isLoggingOut.value = false
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>