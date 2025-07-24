<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Gestion des Compétences</h1>
          <p class="text-text-tertiary">Organisez vos compétences par catégorie</p>
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

      <!-- Skills Manager -->
      <SkillsManager
        :skillsByCategory="skillsByCategory"
        @openSkillModal="openSkillModal"
        @editSkill="openSkillModal"
        @deleteSkill="handleDeleteSkill"
      />
    </div>

    <!-- Skill Modal -->
    <SkillModal
      v-if="showSkillModal"
      :skill="selectedSkill"
      :existing-categories="Object.keys(skillsByCategory)"
      @close="closeSkillModal"
      @save="saveSkill"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'
import SkillsManager from '~/components/admin/SkillsManager.vue'
import SkillModal from '~/components/admin/SkillModal.vue'

// Portfolio data management
const {
  skillsByCategory,
  addSkill,
  updateSkill,
  deleteSkill,
  loadFromLocalStorage
} = usePortfolioData()

// Modal state
const showSkillModal = ref(false)
const selectedSkill = ref(null)

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
    updateSkill(selectedSkill.value.name, skillData)
  } else {
    addSkill(skillData)
  }
  closeSkillModal()
}

const handleDeleteSkill = (skillName: string) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
    deleteSkill(skillName)
  }
}

// Initialize data on mount
onMounted(() => {
  loadFromLocalStorage()
})

// SEO
useHead({
  title: 'Gestion des Compétences - Portfolio Admin',
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