<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Gestion des Projets</h1>
          <p class="text-text-tertiary">Gérez vos projets et leur ordre d'affichage</p>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/admin"
            class="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour Admin
          </NuxtLink>
        </div>
      </div>

      <!-- Projects Manager -->
      <ProjectsManager
        :projects="projects"
        @openProjectModal="openProjectModal"
        @editProject="openProjectModal"
        @deleteProject="handleDeleteProject"
        @updateProjects="updateProjectsOrder"
      />
    </div>

    <!-- Project Modal -->
    <ProjectModal
      v-if="showProjectModal"
      :project="selectedProject"
      @close="closeProjectModal"
      @save="saveProject"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import ProjectsManager from '~/components/admin/ProjectsManager.vue'
import ProjectModal from '~/components/admin/ProjectModal.vue'

// Portfolio data management
const {
  projects,
  addProject,
  updateProject,
  deleteProject,
  fetchProjects
} = usePortfolioDatabase()

// Get direct access to the reactive state for instant updates
const portfolioDatabase = usePortfolioDatabase()
const portfolioProjects = portfolioDatabase.projects

// Modal state
const showProjectModal = ref(false)
const selectedProject = ref(null)

// Project Management
const openProjectModal = (project = null) => {
  selectedProject.value = project
  showProjectModal.value = true
}

const closeProjectModal = () => {
  showProjectModal.value = false
  selectedProject.value = null
}

const saveProject = async (projectData: any) => {
  try {
    if (selectedProject.value) {
      await updateProject(selectedProject.value.id, projectData)
      // Update local state immediately for modification
      const projectIndex = portfolioProjects.value.findIndex(p => p.id === selectedProject.value.id)
      if (projectIndex !== -1) {
        portfolioProjects.value[projectIndex] = { ...projectData, id: selectedProject.value.id }
      }
      console.log('✅ Project updated and local state updated')
    } else {
      await addProject(projectData)
      // For new projects, fetch fresh data to get the ID
      await fetchProjects()
      console.log('✅ Project added and data refreshed')
    }
    closeProjectModal()
  } catch (error) {
    console.error('❌ Error saving project:', error)
  }
}

const handleDeleteProject = async (projectId: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    try {
      await deleteProject(projectId)
      // Update local state immediately
      portfolioProjects.value = portfolioProjects.value.filter(p => p.id !== projectId)
      console.log('✅ Project deleted and local state updated')
    } catch (error) {
      console.error('❌ Error deleting project:', error)
    }
  }
}

// Debounce timer for async saving
let saveProjectOrderTimeout: NodeJS.Timeout | null = null

const updateProjectsOrder = async (newProjects: any[]) => {
  try {
    console.log('🔄 Updating projects order:', newProjects.map(p => ({ id: p.id, title: p.title, newIndex: newProjects.indexOf(p) })))
    
    // 1. Mise à jour locale INSTANTANÉE pour l'affichage
    // Met à jour directement le state réactif du composable
    portfolioProjects.value = newProjects.map((project, index) => ({
      ...project,
      order: index + 1
    }))
    console.log('✨ Local state updated instantly for smooth UX')
    
    // 2. Mise à jour des objets individuels pour cohérence
    newProjects.forEach((project, index) => {
      const newOrder = index + 1
      console.log(`📝 Setting project "${project.title}" order from ${project.order} to ${newOrder}`)
      project.order = newOrder
    })
    
    // 3. Clear existing timeout
    if (saveProjectOrderTimeout) {
      clearTimeout(saveProjectOrderTimeout)
    }
    
    // 4. Sauvegarde BDD en arrière-plan (debounced)
    saveProjectOrderTimeout = setTimeout(async () => {
      try {
        const updatePromises = newProjects.map(async (project, index) => {
          const newOrder = index + 1
          console.log(`💾 Saving project "${project.title}" with order ${newOrder} to database`)
          return updateProject(project.id, { 
            ...project, 
            order: newOrder 
          })
        })
        
        await Promise.all(updatePromises)
        console.log('✅ Projects order saved to database successfully')
      } catch (error) {
        console.error('❌ Error saving projects order to database:', error)
        // En cas d'erreur, on pourrait recharger les données
        // await fetchProjects()
      }
    }, 1000) // Save to DB after 1 second of inactivity
    
  } catch (error) {
    console.error('❌ Error updating projects order:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await fetchProjects()
})

// Appliquer le middleware d'authentification
definePageMeta({
  middleware: 'admin-auth'
})

// SEO
useHead({
  title: 'Gestion des Projets - Portfolio Admin',
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