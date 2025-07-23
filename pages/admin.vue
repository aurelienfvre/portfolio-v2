<template>
  <div class="admin-dashboard min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header Admin -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Back Office Portfolio</h1>
        <p class="text-gray-600 dark:text-gray-400">Gérez le contenu de votre portfolio en temps réel</p>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-8">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Gestion des Projets -->
        <div v-if="activeTab === 'projects'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Projets</h2>
            <button
              @click="openProjectModal()"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Nouveau Projet
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="project in projects"
              :key="project.id"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-32 object-cover"
              >
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ project.description }}</p>
                <div class="flex space-x-2">
                  <button
                    @click="openProjectModal(project)"
                    class="text-blue-600 text-sm hover:text-blue-800"
                  >
                    Modifier
                  </button>
                  <button
                    @click="handleDeleteProject(project.id)"
                    class="text-red-600 text-sm hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestion des Compétences -->
        <div v-if="activeTab === 'skills'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Gestion des Compétences</h2>
            <button
              @click="openSkillModal()"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              + Nouvelle Compétence
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="skill in skills"
              :key="skill.name"
              class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <div class="flex items-center space-x-3 mb-3">
                <img
                  v-if="skill.icon"
                  :src="skill.icon"
                  :alt="skill.name"
                  class="w-8 h-8"
                  :class="{ 'filter invert': skill.invert }"
                >
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ skill.name }}</h3>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="openSkillModal(skill)"
                  class="text-blue-600 text-sm hover:text-blue-800"
                >
                  Modifier
                </button>
                <button
                  @click="handleDeleteSkill(skill.name)"
                  class="text-red-600 text-sm hover:text-red-800"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Gestion Bento Grid -->
        <div v-if="activeTab === 'bento'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Gestion Bento Grid</h2>
            <button
              @click="openBentoModal()"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              + Nouveau Bloc Bento
            </button>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Preview Bento Grid</h3>
            <div class="grid grid-cols-12 gap-4 min-h-[400px]">
              <div
                v-for="(block, index) in bentoBlocks"
                :key="index"
                :class="`col-span-${block.colSpan} bg-gradient-to-r ${block.gradient} rounded-lg p-4 flex items-center justify-center text-white font-medium cursor-pointer hover:opacity-80 transition-opacity`"
                @click="openBentoModal(block)"
              >
                <div class="text-center">
                  <div class="text-lg mb-1">{{ block.title }}</div>
                  <div class="text-sm opacity-80">{{ block.type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mode Étudiant - AC Management -->
        <div v-if="activeTab === 'student'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Mode Étudiant - Gestion AC</h2>
            <button
              @click="editAC({})"
              class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Nouvel AC
            </button>
          </div>

          <div class="space-y-8">
            <div v-for="year in studentYears" :key="year.year" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{{ year.title }}</h3>
              
              <div class="space-y-4">
                <div v-for="competence in year.skills" :key="competence.code" class="border-l-4 border-blue-400 pl-4">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ competence.name }} ({{ competence.code }})</h4>
                  <div class="mt-2 space-y-2">
                    <div v-for="ac in competence.ac" :key="ac.title" class="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div class="font-medium text-gray-900 dark:text-white">{{ ac.title }}</div>
                      <div class="text-gray-600 dark:text-gray-400 mt-1">{{ ac.description }}</div>
                      <div v-if="ac.project" class="text-blue-600 text-xs mt-1">{{ ac.project }}</div>
                      <div class="mt-2 space-x-2">
                        <button @click="editAC(ac)" class="text-blue-600 text-xs hover:text-blue-800">Modifier</button>
                        <button @click="handleDeleteAC(ac)" class="text-red-600 text-xs hover:text-red-800">Supprimer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ProjectModal
      v-if="showProjectModal"
      :project="selectedProject"
      @close="closeProjectModal"
      @save="saveProject"
    />

    <SkillModal
      v-if="showSkillModal"
      :skill="selectedSkill"
      @close="closeSkillModal"
      @save="saveSkill"
    />

    <BentoModal
      v-if="showBentoModal"
      :block="selectedBentoBlock"
      @close="closeBentoModal"
      @save="saveBentoBlock"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'
import ProjectModal from '~/components/admin/ProjectModal.vue'
import SkillModal from '~/components/admin/SkillModal.vue'
import BentoModal from '~/components/admin/BentoModal.vue'

// Portfolio data management
const {
  projects,
  skills,
  studentYears,
  bentoBlocks,
  addProject,
  updateProject,
  deleteProject,
  addSkill,
  updateSkill,
  deleteSkill,
  addBentoBlock,
  updateBentoBlock,
  deleteBentoBlock,
  loadFromLocalStorage
} = usePortfolioData()

// Navigation tabs
const activeTab = ref('projects')
const tabs = [
  { id: 'projects', name: 'Projets' },
  { id: 'skills', name: 'Compétences' },
  { id: 'bento', name: 'Bento Grid' },
  { id: 'student', name: 'Mode Étudiant' }
]

// Modals state
const showProjectModal = ref(false)
const showSkillModal = ref(false)
const showBentoModal = ref(false)
const selectedProject = ref(null)
const selectedSkill = ref(null)
const selectedBentoBlock = ref(null)


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
    // Update existing project
    updateProject(selectedProject.value.id, projectData)
  } else {
    // Add new project
    addProject(projectData)
  }
  closeProjectModal()
}

const handleDeleteProject = (projectId: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
    deleteProject(projectId)
  }
}

// Skill Management
const openSkillModal = (skill = null) => {
  selectedSkill.value = skill
  showSkillModal.value = true
}

const closeSkillModal = () => {
  showSkillModal.value = false
  selectedSkill.value = null
}

const saveSkill = (skillData: any) => {
  if (selectedSkill.value) {
    // Update existing skill
    updateSkill(selectedSkill.value.name, skillData)
  } else {
    // Add new skill
    addSkill(skillData)
  }
  closeSkillModal()
}

const handleDeleteSkill = (skillName: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
    deleteSkill(skillName)
  }
}

// Bento Management
const openBentoModal = (block = null) => {
  selectedBentoBlock.value = block
  showBentoModal.value = true
}

const closeBentoModal = () => {
  showBentoModal.value = false
  selectedBentoBlock.value = null
}

const saveBentoBlock = (blockData: any) => {
  if (selectedBentoBlock.value) {
    // Update existing block
    updateBentoBlock(selectedBentoBlock.value.id, blockData)
  } else {
    // Add new block
    addBentoBlock(blockData)
  }
  closeBentoModal()
}

// Student AC Management
const editAC = (ac: any) => {
  // TODO: Implement AC edit modal
  console.log('Editing AC:', ac)
}

const handleDeleteAC = (ac: any) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet AC ?')) {
    // TODO: Find and delete AC from correct position
    console.log('Deleting AC:', ac)
  }
}

// Initialize data on mount
onMounted(() => {
  loadFromLocalStorage()
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tab-content {
  min-height: 600px;
}
</style>