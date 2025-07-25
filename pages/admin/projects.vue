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

const saveProject = (projectData: any) => {
  if (selectedProject.value) {
    updateProject(selectedProject.value.id, projectData)
  } else {
    addProject(projectData)
  }
  closeProjectModal()
}

const handleDeleteProject = (projectId: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    deleteProject(projectId)
  }
}

const updateProjectsOrder = async (newProjects: any[]) => {
  try {
    // Update projects order in parallel
    const updatePromises = newProjects.map(async (project, index) => {
      project.order = index + 1
      return updateProject(project.id, project)
    })
    
    await Promise.all(updatePromises)
    console.log('Projects order updated successfully')
  } catch (error) {
    console.error('Error updating projects order:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await fetchProjects()
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