<template>
  <div class="admin-dashboard min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
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

      <!-- Main Tabs Navigation -->
      <div class="mb-8">
        <div class="bg-bg-secondary p-2 rounded-2xl inline-flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-2',
              activeTab === tab.id
                ? 'bg-accent text-white shadow-lg'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
            ]"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Portfolio Pro -->
        <div v-if="activeTab === 'pro'" class="space-y-8">
          <!-- Sub-tabs pour Pro -->
          <div class="border-b border-border-primary">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in proTabs"
                :key="tab.id"
                @click="activeProTab = tab.id"
                :class="[
                  'py-3 px-1 border-b-2 font-medium text-sm transition-colors',
                  activeProTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-text-tertiary'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Gestion des Projets -->
          <div v-if="activeProTab === 'projects'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-semibold text-text-primary">Gestion des Projets</h2>
              <button
                @click="openProjectModal()"
                class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium"
              >
                + Nouveau Projet
              </button>
            </div>

            <div 
              ref="projectsContainer" 
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="project in projects"
                :key="project.id"
                :data-swapy-slot="project.id"
                :class="[
                  'bg-bg-primary border border-border-primary rounded-3xl shadow-sm overflow-hidden transition-all duration-200 relative hover:shadow-md group'
                ]"
              >
                <div
                  :data-swapy-item="project.id"
                  class="w-full h-full cursor-move border-2 border-transparent group-hover:border-dashed group-hover:border-accent transition-all"
                >
                  <img
                    v-if="project.image"
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-32 object-cover"
                  >
                  <div class="p-4">
                    <h3 class="font-semibold text-text-primary mb-2">{{ project.title }}</h3>
                    <p class="text-sm text-text-tertiary mb-3 line-clamp-2">{{ project.description }}</p>
                    <div class="flex space-x-2" @click.stop>
                      <button
                        @click="openProjectModal(project)"
                        class="px-3 py-1 bg-accent text-white text-sm rounded-lg hover:bg-accent/80 font-medium transition-colors"
                      >
                        Modifier
                      </button>
                      <button
                        @click="handleDeleteProject(project.id)"
                        class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 font-medium transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

          <!-- Gestion des Compétences -->
          <div v-if="activeProTab === 'skills'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-text-primary">Gestion des Compétences</h2>
            <button
              @click="openSkillModal()"
              class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
            >
              + Nouvelle Compétence
            </button>
          </div>

          <div class="space-y-8">
            <div v-for="(categorySkills, categoryName) in skillsByCategory" :key="categoryName" class="space-y-4">
              <h3 class="text-lg font-semibold text-text-primary border-l-4 border-accent pl-4">{{ categoryName }}</h3>
              <div 
                :ref="`skillsContainer-${categoryName}`"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div
                  v-for="skill in categorySkills"
                  :key="skill.name"
                  :data-swapy-slot="`${categoryName}-${skill.name}`"
                  class="bg-bg-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div 
                    :data-swapy-item="`${categoryName}-${skill.name}`"
                    class="w-full h-full cursor-move border-2 border-transparent group-hover:border-dashed group-hover:border-accent transition-all"
                  >
                    <div class="p-4">
                      <div class="flex items-center space-x-3 mb-3">
                        <img
                          v-if="skill.icon"
                          :src="skill.icon"
                          :alt="skill.name"
                          class="w-8 h-8"
                          :class="{ 'filter invert': skill.invert }"
                        >
                        <h4 class="font-semibold text-text-primary">{{ skill.name }}</h4>
                      </div>
                      <div class="flex space-x-2" @click.stop>
                        <button
                          @click="openSkillModal(skill)"
                          class="px-3 py-1 bg-accent text-white text-sm rounded-lg hover:bg-accent/80 font-medium transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          @click="handleDeleteSkill(skill.name)"
                          class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 font-medium transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <!-- Gestion Bento Grid -->
          <div v-if="activeProTab === 'bento'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-text-primary">Gestion Bento Grid</h2>
            <button
              @click="openBentoModal()"
              class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
            >
              + Nouveau Bloc Bento
            </button>
          </div>

          <div class="bg-bg-secondary border border-border-primary rounded-3xl shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-text-primary">Preview Bento Grid</h3>
            </div>
            <div 
              ref="bentoContainer" 
              class="grid grid-cols-12 gap-4 min-h-[400px]"
            >
              <div
                v-for="(block, index) in sortedBentoBlocks"
                :key="block.id"
                :data-swapy-slot="block.id"
                :class="`col-span-${block.colSpan} transition-all duration-200 relative group hover:scale-[1.02]`"
              >
                <div
                  :data-swapy-item="block.id"
                  class="w-full h-full"
                >
                  <div data-swapy-handle class="cursor-move p-2 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-b border-border-primary">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                  </div>
                  <!-- Render actual portfolio section components -->
                  <BentoItem class="h-full min-h-[120px]">
                    <component 
                      v-if="getComponentName(block.component)"
                      :is="getComponentName(block.component)"
                      class="w-full h-full p-4"
                    />
                    <div 
                      v-else
                      :class="`${block.backgroundColor || 'bg-blue-500'} rounded-xl p-4 flex items-center justify-center text-white font-medium h-full`"
                    >
                      <div class="text-center">
                        <div class="text-lg mb-1">{{ block.title }}</div>
                        <div class="text-sm opacity-80">{{ block.type }}</div>
                      </div>
                    </div>
                  </BentoItem>
                </div>
                
                <!-- Edit button -->
                <button 
                  @click="openBentoModal(block)"
                  class="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- Portfolio Étudiant -->
        <div v-if="activeTab === 'student'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-text-primary">Mode Étudiant - Gestion AC</h2>
            <button
              @click="editAC({})"
              class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
            >
              + Nouvel AC
            </button>
          </div>

          <div class="space-y-8">
            <div v-for="year in studentYears" :key="year.year" class="bg-bg-primary border border-border-primary rounded-3xl shadow-sm p-6">
              <h3 class="text-xl font-semibold mb-4 text-text-primary">{{ year.title }}</h3>
              
              <div class="space-y-4">
                <div v-for="competence in year.skills" :key="competence.code" class="border-l-4 border-accent pl-4">
                  <h4 class="font-medium text-text-primary">{{ competence.name }} ({{ competence.code }})</h4>
                  <div class="mt-2 space-y-2">
                    <div v-for="ac in competence.ac" :key="ac.title" class="text-sm bg-bg-secondary p-3 rounded-xl hover:bg-bg-tertiary transition-colors">
                      <div class="font-medium text-text-primary">{{ ac.title }}</div>
                      <div class="text-text-secondary mt-1">{{ ac.description }}</div>
                      <div v-if="ac.project" class="text-accent text-xs mt-1">{{ ac.project }}</div>
                      <div class="mt-2 space-x-2" @click.stop>
                        <button @click="editAC(ac)" class="px-2 py-1 bg-accent text-white text-xs rounded hover:bg-accent/80 font-medium transition-colors">Modifier</button>
                        <button @click="handleDeleteAC(ac)" class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 font-medium transition-colors">Supprimer</button>
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
      :existing-categories="Object.keys(skillsByCategory)"
      @close="closeSkillModal"
      @save="saveSkill"
    />

    <BentoModal
      v-if="showBentoModal"
      :block="selectedBentoBlock"
      @close="closeBentoModal"
      @save="saveBentoBlock"
    />

    <ACModal
      v-if="showACModal"
      :ac="selectedAC"
      :indices="selectedACIndices"
      :available-years="studentYears"
      @close="closeACModal"
      @save="saveAC"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'
import ProjectModal from '~/components/admin/ProjectModal.vue'
import SkillModal from '~/components/admin/SkillModal.vue'
import BentoModal from '~/components/admin/BentoModal.vue'
import ACModal from '~/components/admin/ACModal.vue'
import BentoItem from '~/components/common/BentoItem.vue'

// Import portfolio sections
import ProfileSection from '~/components/sections/ProfileSection.vue'
import IntroSection from '~/components/sections/IntroSection.vue'
import StageSection from '~/components/sections/StageSection.vue'
import LinksSection from '~/components/sections/LinksSection.vue'
import FormationSection from '~/components/sections/FormationSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

// Portfolio data management
const {
  projects,
  skills,
  studentYears,
  bentoBlocks,
  sortedBentoBlocks,
  skillsByCategory,
  addProject,
  updateProject,
  deleteProject,
  addSkill,
  updateSkill,
  deleteSkill,
  addBentoBlock,
  updateBentoBlock,
  deleteBentoBlock,
  addStudentAC,
  updateStudentAC,
  deleteStudentAC,
  loadFromLocalStorage
} = usePortfolioData()

// Navigation tabs
const activeTab = ref('pro')
const tabs = [
  { id: 'pro', name: 'Portfolio Pro', icon: '💼' },
  { id: 'student', name: 'Portfolio Étudiant', icon: '🎓' }
]

const proTabs = [
  { id: 'projects', name: 'Projets' },
  { id: 'skills', name: 'Compétences' },
  { id: 'bento', name: 'Bento Grid' }
]

const activeProTab = ref('projects')
const activeStudentTab = ref('ac')

// Modals state
const showProjectModal = ref(false)
const showSkillModal = ref(false)
const showBentoModal = ref(false)
const showACModal = ref(false)
const selectedProject = ref(null)
const selectedSkill = ref(null)
const selectedBentoBlock = ref(null)
const selectedAC = ref(null)
const selectedACIndices = ref({ yearIndex: -1, competenceIndex: -1, acIndex: -1 })

// Drag and drop state
const bentoContainer = ref(null)
const projectsContainer = ref(null)
let swapyInstance: any = null
let projectSwapyInstance: any = null
let skillsSwapyInstances: Record<string, any> = {}


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

// Helper function to find AC indices
const findACIndices = (targetAC: any) => {
  for (let yearIndex = 0; yearIndex < studentYears.value.length; yearIndex++) {
    const year = studentYears.value[yearIndex]
    for (let competenceIndex = 0; competenceIndex < year.skills.length; competenceIndex++) {
      const competence = year.skills[competenceIndex]
      for (let acIndex = 0; acIndex < competence.ac.length; acIndex++) {
        const ac = competence.ac[acIndex]
        if (ac.title === targetAC.title && ac.description === targetAC.description) {
          return { yearIndex, competenceIndex, acIndex }
        }
      }
    }
  }
  return { yearIndex: -1, competenceIndex: -1, acIndex: -1 }
}

// Student AC Management
const editAC = (ac: any = {}) => {
  selectedAC.value = ac
  if (ac.title) {
    // Editing existing AC
    selectedACIndices.value = findACIndices(ac)
  } else {
    // New AC - default to first year, first competence
    selectedACIndices.value = { yearIndex: 0, competenceIndex: 0, acIndex: -1 }
  }
  showACModal.value = true
}

const closeACModal = () => {
  showACModal.value = false
  selectedAC.value = null
  selectedACIndices.value = { yearIndex: -1, competenceIndex: -1, acIndex: -1 }
}

const saveAC = (acData: any, yearIndex: number, competenceIndex: number) => {
  const { acIndex } = selectedACIndices.value
  
  if (acIndex === -1) {
    // New AC - use indices from modal
    addStudentAC(yearIndex, competenceIndex, acData)
  } else {
    // Update existing AC - use stored indices
    updateStudentAC(selectedACIndices.value.yearIndex, selectedACIndices.value.competenceIndex, acIndex, acData)
  }
  closeACModal()
}

const handleDeleteAC = (ac: any) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet AC ?')) {
    const { yearIndex, competenceIndex, acIndex } = findACIndices(ac)
    if (acIndex !== -1) {
      deleteStudentAC(yearIndex, competenceIndex, acIndex)
    }
  }
}

// Drag and Drop Management
const initializeSwapy = async () => {
  if (process.client && bentoContainer.value) {
    try {
      const { createSwapy } = await import('swapy')
      
      swapyInstance = createSwapy(bentoContainer.value, {
        animation: 'dynamic'
      })
      
      swapyInstance.onSwap((event: any) => {
        console.log('Bento swap event:', event)
        // Update block orders based on new positions
        const slotItemMap = event.newSlotItemMap.asObject
        const newBlocks = [...bentoBlocks.value]
        
        // Map each slot to its new item
        Object.entries(slotItemMap).forEach(([slotId, itemData]: [string, any]) => {
          if (itemData) {
            const blockIndex = newBlocks.findIndex(block => block.id === parseInt(itemData.id))
            if (blockIndex !== -1) {
              const newOrder = Object.keys(slotItemMap).indexOf(slotId) + 1
              newBlocks[blockIndex].order = newOrder
            }
          }
        })
        
        // Sort blocks by new order and update
        newBlocks.sort((a, b) => (a.order || 0) - (b.order || 0))
        bentoBlocks.value = newBlocks
      })
    } catch (error) {
      console.error('Error initializing Bento Swapy:', error)
    }
  }
}

const destroySwapy = () => {
  if (swapyInstance) {
    swapyInstance.destroy()
    swapyInstance = null
  }
}

// Project Drag and Drop Management
const initializeProjectSwapy = async () => {
  if (process.client && projectsContainer.value) {
    try {
      const { createSwapy } = await import('swapy')
      
      projectSwapyInstance = createSwapy(projectsContainer.value, {
        animation: 'dynamic'
      })
      
      projectSwapyInstance.onSwap((event: any) => {
        console.log('Project swap event:', event)
        // Update project orders based on new positions
        const slotItemMap = event.newSlotItemMap.asObject
        const newProjects = [...projects.value]
        
        // Map each slot to its new item
        Object.entries(slotItemMap).forEach(([slotId, itemData]: [string, any]) => {
          if (itemData) {
            const projectIndex = newProjects.findIndex(project => project.id === itemData.id)
            if (projectIndex !== -1) {
              const newOrder = Object.keys(slotItemMap).indexOf(slotId) + 1
              newProjects[projectIndex].order = newOrder
            }
          }
        })
        
        // Sort projects by new order and update
        newProjects.sort((a, b) => (a.order || 0) - (b.order || 0))
        projects.value = newProjects
      })
    } catch (error) {
      console.error('Error initializing Project Swapy:', error)
    }
  }
}

const destroyProjectSwapy = () => {
  if (projectSwapyInstance) {
    projectSwapyInstance.destroy()
    projectSwapyInstance = null
  }
}

// Skills Drag and Drop Management
const initializeSkillsSwapy = async () => {
  if (process.client) {
    try {
      const { createSwapy } = await import('swapy')
      
      // Initialize Swapy for each skill category
      Object.keys(skillsByCategory.value).forEach(categoryName => {
        const container = document.querySelector(`[ref="skillsContainer-${categoryName}"]`)
        if (container) {
          const swapyInstance = createSwapy(container, {
            animation: 'dynamic'
          })
          
          swapyInstance.onSwap((event: any) => {
            console.log(`${categoryName} skills swap event:`, event)
            // Handle skills reordering within category
            const slotItemMap = event.newSlotItemMap.asObject
            // You can implement reordering logic here if needed
          })
          
          skillsSwapyInstances[categoryName] = swapyInstance
        }
      })
    } catch (error) {
      console.error('Error initializing Skills Swapy:', error)
    }
  }
}

const destroySkillsSwapy = () => {
  Object.values(skillsSwapyInstances).forEach(instance => {
    if (instance) {
      instance.destroy()
    }
  })
  skillsSwapyInstances = {}
}

// Map component names to actual components
const componentMap = {
  'ProfileSection': ProfileSection,
  'IntroSection': IntroSection,
  'StageSection': StageSection,
  'LinksSection': LinksSection,
  'FormationSection': FormationSection,
  'SkillsSection': SkillsSection,
  'ProjectsSection': ProjectsSection,
  'ContactSection': ContactSection
}

const getComponentName = (componentName: string) => {
  return componentMap[componentName as keyof typeof componentMap] || null
}

// Initialize data on mount
onMounted(async () => {
  loadFromLocalStorage()
  await nextTick()
  initializeSwapy()
  initializeProjectSwapy()
  initializeSkillsSwapy()
})

// Cleanup on unmount
onUnmounted(() => {
  destroySwapy()
  destroyProjectSwapy()
  destroySkillsSwapy()
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