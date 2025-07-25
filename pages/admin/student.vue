<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Mode Étudiant</h1>
          <p class="text-text-tertiary">Gérez vos apprentissages critiques par année</p>
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

      <!-- Student Manager -->
      <StudentManager
        :studentYears="studentYears"
        @openACModal="editAC"
        @editAC="editAC"
        @deleteAC="handleDeleteAC"
        @updateStudentYears="handleUpdateStudentYears"
      />
    </div>

    <!-- AC Modal -->
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
import { ref, onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import StudentManager from '~/components/admin/StudentManager.vue'
import ACModal from '~/components/admin/ACModal.vue'

// Portfolio data management
const {
  studentYears,
  updateStudentAC,
  fetchStudentYears
} = usePortfolioDatabase()

// Modal state
const showACModal = ref(false)
const selectedAC = ref(null)
const selectedACIndices = ref({ yearIndex: -1, competenceIndex: -1, acIndex: -1 })

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

const saveAC = async (acData: any, yearIndex: number, competenceIndex: number) => {
  try {
    // For now, we'll focus on drag & drop updates which use updateStudentAC
    // Adding new ACs can be implemented later
    console.log('AC save functionality - to be implemented')
    closeACModal()
  } catch (error) {
    console.error('Error saving AC:', error)
  }
}

const handleDeleteAC = async (ac: any) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet AC ?')) {
    try {
      // AC deletion functionality - to be implemented
      console.log('AC delete functionality - to be implemented')
    } catch (error) {
      console.error('Error deleting AC:', error)
    }
  }
}

const handleUpdateStudentYears = async (updatedData: any) => {
  try {
    // Handle drag & drop updates for AC order
    if (updatedData.acUpdates && updatedData.yearId) {
      await updateStudentAC(updatedData.yearId, updatedData.acUpdates)
    }
  } catch (error) {
    console.error('Error updating student years:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await fetchStudentYears()
})

// SEO
useHead({
  title: 'Mode Étudiant - Portfolio Admin',
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