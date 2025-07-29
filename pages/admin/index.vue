<template>
  <div class="admin-dashboard min-h-screen bg-bg-primary flex items-center justify-center">
    <div class="max-w-5xl mx-auto px-4 py-8 w-full">
      <!-- Header Admin -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Back Office Portfolio</h1>
          <p class="text-text-tertiary">Gérez le contenu de votre portfolio en temps réel</p>
        </div>
        <NuxtLink 
          to="/"
          class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au Portfolio
        </NuxtLink>
      </div>

      <!-- Dashboard Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Portfolio Pro -->
        <div class="bg-bg-secondary border border-border-primary rounded-3xl p-6 hover:shadow-lg transition-all duration-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mr-4">
              <span class="text-2xl">💼</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-text-primary">Portfolio Pro</h3>
              <p class="text-text-tertiary text-sm">Gestion mode professionnel</p>
            </div>
          </div>
          <div class="space-y-3">
            <NuxtLink
              to="/admin/projects"
              class="block w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-xl hover:bg-bg-tertiary transition-colors text-text-primary font-medium"
            >
              <div class="flex items-center justify-between">
                <span>Projets</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </NuxtLink>
            <NuxtLink
              to="/admin/skills"
              class="block w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-xl hover:bg-bg-tertiary transition-colors text-text-primary font-medium"
            >
              <div class="flex items-center justify-between">
                <span>Compétences</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Portfolio Étudiant -->
        <div class="bg-bg-secondary border border-border-primary rounded-3xl p-6 hover:shadow-lg transition-all duration-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mr-4">
              <span class="text-2xl">🎓</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-text-primary">Portfolio Étudiant</h3>
              <p class="text-text-tertiary text-sm">Gestion mode étudiant</p>
            </div>
          </div>
          <div class="space-y-3">
            <NuxtLink
              to="/admin/student"
              class="block w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-xl hover:bg-bg-tertiary transition-colors text-text-primary font-medium"
            >
              <div class="flex items-center justify-between">
                <span>Compétences & Preuves</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Édition Avancée -->
        <div class="bg-bg-secondary border border-border-primary rounded-3xl p-6 hover:shadow-lg transition-all duration-200">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mr-4">
              <span class="text-2xl">🎨</span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-text-primary">Édition Avancée</h3>
              <p class="text-text-tertiary text-sm">Outils d'édition spécialisés</p>
            </div>
          </div>
          <div class="space-y-3">
            <NuxtLink
              to="/admin/bento-edit"
              class="block w-full px-4 py-3 bg-bg-primary border border-border-primary rounded-xl hover:bg-bg-tertiary transition-colors text-text-primary font-medium"
            >
              <div class="flex items-center justify-between">
                <span>Éditeur Bento</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-bg-secondary border border-border-primary rounded-2xl p-4">
          <div class="text-2xl font-bold text-text-primary">{{ projects.length }}</div>
          <div class="text-text-tertiary text-sm">Projets</div>
        </div>
        <div class="bg-bg-secondary border border-border-primary rounded-2xl p-4">
          <div class="text-2xl font-bold text-text-primary">{{ Object.keys(skillsByCategory).length }}</div>
          <div class="text-text-tertiary text-sm">Catégories de compétences</div>
        </div>
        <div class="bg-bg-secondary border border-border-primary rounded-2xl p-4">
          <div class="text-2xl font-bold text-text-primary">{{ sortedBentoBlocks.length }}</div>
          <div class="text-text-tertiary text-sm">Blocs Bento</div>
        </div>
        <div class="bg-bg-secondary border border-border-primary rounded-2xl p-4">
          <div class="text-2xl font-bold text-text-primary">{{ totalProofItems }}</div>
          <div class="text-text-tertiary text-sm">Éléments de Preuve</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'

// Portfolio data management
const {
  projects,
  skills,
  sortedBentoBlocks,
  skillsByCategory,
  fetchProjects,
  fetchSkills,
  fetchBentoBlocks,
  fetchStudentYears,
  proofItems,
  fetchProofItems
} = usePortfolioDatabase()

// Calculate total proof items
const totalProofItems = computed(() => {
  return proofItems.value?.length || 0
})

// Initialize data on mount
onMounted(async () => {
  await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchBentoBlocks(),
    fetchStudentYears(),
    fetchProofItems()
  ])
})

// SEO for admin page
useHead({
  title: 'Back Office - Portfolio Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
}
</style>