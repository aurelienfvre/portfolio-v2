<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Gestion des Projets (Simple)</h1>
          <p class="text-text-tertiary">Version simplifiée pour test</p>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/admin"
            class="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
          >
            Retour Admin
          </NuxtLink>
        </div>
      </div>

      <!-- Contenu simple -->
      <div class="bg-bg-secondary border border-border-primary rounded-3xl p-6">
        <h2 class="text-xl font-semibold text-text-primary mb-4">Projets chargés :</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="project in projects" 
            :key="project.id"
            class="bg-bg-primary border border-border-primary rounded-xl p-4"
          >
            <h3 class="font-semibold text-text-primary">{{ project.title }}</h3>
            <p class="text-text-tertiary text-sm">{{ project.description }}</p>
          </div>
        </div>
        <div v-if="projects.length === 0" class="text-text-tertiary">
          Aucun projet trouvé. Total projets dans data: {{ projects.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'

console.log('PAGE PROJECTS-SIMPLE CHARGÉE !')

// Portfolio data management
const {
  projects,
  loadFromLocalStorage
} = usePortfolioData()

console.log('Composable chargé, projects initial:', projects.value)

// Initialize data on mount
onMounted(() => {
  console.log('onMounted appelé')
  loadFromLocalStorage()
  console.log('Après loadFromLocalStorage, projects:', projects.value)
})

// SEO
useHead({
  title: 'Gestion des Projets Simple - Portfolio Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
}
</style>