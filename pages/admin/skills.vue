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
        @updateSkills="updateSkillsOrder"
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
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import SkillsManager from '~/components/admin/SkillsManager.vue'
import SkillModal from '~/components/admin/SkillModal.vue'

// Portfolio data management
const {
  skillsByCategory,
  addSkill,
  updateSkill,
  deleteSkill,
  fetchSkills
} = usePortfolioDatabase()

// Get direct access to the reactive state for instant updates
const portfolioDatabase = usePortfolioDatabase()
const portfolioSkills = portfolioDatabase.skills

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

const saveSkill = async (skillData: any) => {
  try {
    if (selectedSkill.value) {
      await updateSkill(selectedSkill.value.id, skillData)
      // Update local state immediately for modification
      const skillIndex = portfolioSkills.value.findIndex(s => s.id === selectedSkill.value.id)
      if (skillIndex !== -1) {
        portfolioSkills.value[skillIndex] = { ...skillData, id: selectedSkill.value.id }
      }
      console.log('✅ Skill updated and local state updated')
    } else {
      const result = await addSkill(skillData)
      // For new skills, fetch fresh data to get the ID
      await fetchSkills()
      console.log('✅ Skill added and data refreshed')
    }
    closeSkillModal()
  } catch (error) {
    console.error('❌ Error saving skill:', error)
  }
}

const handleDeleteSkill = async (skillId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
    try {
      await deleteSkill(skillId)
      // Update local state immediately
      portfolioSkills.value = portfolioSkills.value.filter(s => s.id !== skillId)
      console.log('✅ Skill deleted and local state updated')
    } catch (error) {
      console.error('❌ Error deleting skill:', error)
    }
  }
}

// Debounce timer for async saving
let saveOrderTimeout: NodeJS.Timeout | null = null

const updateSkillsOrder = async (updatedSkillsByCategory: Record<string, any[]>) => {
  try {
    console.log('🔄 Updating skills order:', updatedSkillsByCategory)
    
    // 1. Mise à jour locale INSTANTANÉE pour l'affichage
    // Flatten all skills and update the reactive state immediately
    const allSkills = Object.values(updatedSkillsByCategory).flat()
    portfolioSkills.value = allSkills.map((skill, globalIndex) => {
      // Find the skill's position within its category
      const categorySkills = updatedSkillsByCategory[skill.category] || []
      const categoryIndex = categorySkills.findIndex(s => s.id === skill.id)
      const newOrder = categoryIndex + 1
      
      return {
        ...skill,
        order: newOrder
      }
    })
    console.log('✨ Local skills state updated instantly for smooth UX')
    
    // 2. Mise à jour des objets individuels pour cohérence
    Object.entries(updatedSkillsByCategory).forEach(([category, skillList]) => {
      skillList.forEach((skill, index) => {
        const newOrder = index + 1
        console.log(`📝 Setting skill "${skill.name}" (${category}) order from ${skill.order} to ${newOrder}`)
        skill.order = newOrder
      })
    })
    
    // 3. Clear existing timeout
    if (saveOrderTimeout) {
      clearTimeout(saveOrderTimeout)
    }
    
    // 4. Sauvegarde BDD en arrière-plan (debounced)
    saveOrderTimeout = setTimeout(async () => {
      try {
        const updatePromises: Promise<any>[] = []
        
        // Update order for each category separately
        Object.entries(updatedSkillsByCategory).forEach(([category, skillList]) => {
          skillList.forEach((skill, index) => {
            const newOrder = index + 1
            console.log(`💾 Saving skill "${skill.name}" (${category}) with order ${newOrder} to database`)
            updatePromises.push(updateSkill(skill.id, { 
              ...skill, 
              order: newOrder 
            }))
          })
        })
        
        if (updatePromises.length > 0) {
          await Promise.all(updatePromises)
          console.log('✅ Skills order saved to database successfully')
        }
      } catch (error) {
        console.error('❌ Error saving skills order to database:', error)
        // En cas d'erreur, on pourrait recharger les données
        // await fetchSkills()
      }
    }, 1000) // Save to DB after 1 second of inactivity
    
  } catch (error) {
    console.error('❌ Error updating skills order:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await fetchSkills()
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