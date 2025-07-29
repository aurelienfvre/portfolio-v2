<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/student"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            Portfolio Étudiant
          </NuxtLink>
          <svg class="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-text-primary font-medium">{{ competence?.title }}</span>
        </div>

        <!-- Bouton retour mode pro -->
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
    </nav>

    <!-- Content principal -->
    <div class="pt-24 pb-20 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Header de la compétence -->
        <div class="text-center mb-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-accent/20 rounded-3xl flex items-center justify-center">
            <svg 
              v-if="competence?.slug === 'developper'"
              class="w-12 h-12 text-accent" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <svg 
              v-else-if="competence?.slug === 'entreprendre'"
              class="w-12 h-12 text-accent" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            {{ competence?.title }}
          </h1>
          <p class="text-xl text-text-secondary max-w-3xl mx-auto">
            {{ competence?.subtitle }}
          </p>
        </div>

        <!-- Catégories de preuves -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/student/${competenceSlug}/${category.slug}`"
            class="group block bg-bg-secondary border-2 border-border-primary rounded-2xl p-6 hover:border-accent hover:bg-bg-tertiary transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="mb-4">
              <h3 class="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                {{ category.title }}
              </h3>
              <p class="text-text-tertiary text-sm leading-relaxed">
                {{ category.subtitle }}
              </p>
            </div>
            
            <!-- Compteur d'éléments de preuve -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm text-text-secondary">
                <span class="w-2 h-2 bg-accent rounded-full"></span>
                {{ getItemsCount(category.id) }} éléments de preuve
              </div>
              
              <!-- Flèche -->
              <svg class="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Message si aucune catégorie -->
        <div 
          v-if="categories.length === 0"
          class="text-center py-16"
        >
          <div class="w-16 h-16 mx-auto mb-4 bg-bg-secondary rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-text-primary mb-2">Aucune catégorie disponible</h3>
          <p class="text-text-tertiary">Cette compétence n'a pas encore de catégories de preuves.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import { usePortfolioMode } from '~/composables/usePortfolioMode'

// Route management
const route = useRoute()
const competenceSlug = computed(() => route.params.competence as string)

// Portfolio mode management
const { setMode } = usePortfolioMode()

// Data management
const {
  mainCompetences,
  proofCategories,
  proofItems,
  fetchMainCompetences,
  fetchProofCategories,
  fetchProofItems
} = usePortfolioDatabase()

// Computed properties
const competence = computed(() => {
  return mainCompetences.value?.find(comp => comp.slug === competenceSlug.value)
})

const categories = computed(() => {
  if (!competence.value) return []
  return proofCategories.value
    ?.filter(cat => cat.mainCompetenceId === competence.value.id)
    ?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []
})

// Helper functions
const getItemsCount = (categoryId: number) => {
  return proofItems.value?.filter(item => item.proofCategoryId === categoryId)?.length || 0
}

const switchToPro = async () => {
  setMode('pro')
  await navigateTo('/')
}

// 404 handling
onMounted(async () => {
  await Promise.all([
    fetchMainCompetences(),
    fetchProofCategories(),
    fetchProofItems()
  ])
  
  // Check if competence exists
  if (!competence.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Compétence "${competenceSlug.value}" non trouvée`
    })
  }
})

// SEO
useHead(() => ({
  title: `${competence.value?.title || 'Compétence'} - Portfolio Étudiant`,
  meta: [
    { name: 'description', content: `Explorez les preuves concrètes de ma compétence "${competence.value?.title}" à travers mon parcours BUT MMI.` },
    { name: 'robots', content: 'index, follow' }
  ]
}))
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Link styling */
a {
  text-decoration: none;
}

/* Hover effects */
.group:hover .transform {
  transform: translateY(-4px);
}
</style>