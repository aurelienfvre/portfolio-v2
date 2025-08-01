<template>
  <div class="min-h-screen bg-bg-primary relative">
    <!-- Bouton retour vers le mode pro -->
    <div class="absolute top-8 right-8 z-10">
      <button
        @click="switchToPro"
        class="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-primary rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Mode Pro
      </button>
    </div>

    <!-- Content principal -->
    <div class="flex items-center justify-center min-h-screen px-6">
      <div class="max-w-5xl w-full">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
            Portfolio Étudiant
          </h1>
          <p class="text-xl text-text-secondary max-w-2xl mx-auto">
            Explorez mes compétences à travers des preuves concrètes de mon parcours BUT MMI
          </p>
        </div>

        <!-- Choix des compétences principales -->
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <NuxtLink
            v-for="competence in mainCompetences"
            :key="competence.id"
            :to="`/student/${competence.slug}`"
            class="group block bg-bg-secondary border-2 border-border-primary rounded-3xl p-8 hover:border-accent hover:bg-bg-tertiary transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="text-center">
              <!-- Icône -->
              <div class="w-20 h-20 mx-auto mb-6 bg-accent/20 rounded-2xl flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <svg 
                  v-if="competence.slug === 'developper'"
                  class="w-10 h-10 text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <svg 
                  v-else-if="competence.slug === 'entreprendre'"
                  class="w-10 h-10 text-accent" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <!-- Titre -->
              <h2 class="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                {{ competence.title }}
              </h2>
              
              <!-- Subtitle -->
              <p class="text-text-tertiary mb-6 leading-relaxed">
                {{ competence.subtitle }}
              </p>
              
              <!-- Compteur des preuves -->
              <div class="flex items-center justify-center gap-2 text-sm text-text-secondary">
                <span class="w-2 h-2 bg-accent rounded-full"></span>
                {{ getCategoriesCount(competence.id) }} catégories de preuves
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Footer info -->
        <div class="text-center mt-16">
          <p class="text-text-tertiary text-sm">
            Cliquez sur une compétence pour explorer les preuves concrètes de ma progression
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import { usePortfolioMode } from '~/composables/usePortfolioMode'

// Portfolio mode management
const { setMode } = usePortfolioMode()

// Data management pour le système Compétence/Preuve
const {
  mainCompetences,
  proofCategories,
  fetchMainCompetences,
  fetchProofCategories
} = usePortfolioDatabase()

// Helper functions
const getCategoriesCount = (competenceId: number) => {
  return proofCategories.value?.filter(cat => cat.mainCompetenceId === competenceId)?.length || 0
}

const switchToPro = async () => {
  setMode('pro')
  await navigateTo('/')
}

// Initialize data
onMounted(async () => {
  await Promise.all([
    fetchMainCompetences(),
    fetchProofCategories()
  ])
})

// SEO
useHead({
  title: 'Portfolio Étudiant - Aurélien Fèvre',
  meta: [
    { name: 'description', content: 'Portfolio étudiant BUT MMI - Explorez mes compétences à travers des preuves concrètes.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Hover effects */
.group:hover .transform {
  transform: translateY(-8px);
}

/* Link styling */
a {
  text-decoration: none;
}
</style>