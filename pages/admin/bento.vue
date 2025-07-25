<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Gestion Bento Grid</h1>
          <p class="text-text-tertiary">Personnalisez la grille de votre portfolio professionnel</p>
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

      <!-- Bento Manager -->
      <BentoManager
        :sortedBentoBlocks="sortedBentoBlocks"
        @openBentoModal="openBentoModal"
        @editBentoBlock="openBentoModal"
        @updateBentoBlocks="updateBentoBlocksOrder"
      />
    </div>

    <!-- Bento Modal -->
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
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import BentoManager from '~/components/admin/BentoManager.vue'
import BentoModal from '~/components/admin/BentoModal.vue'

// Portfolio data management
const {
  bentoBlocks,
  sortedBentoBlocks,
  addBentoBlock,
  updateBentoBlock,
  fetchBentoBlocks
} = usePortfolioDatabase()

// Modal state
const showBentoModal = ref(false)
const selectedBentoBlock = ref(null)

// Bento Management
const openBentoModal = (block = null) => {
  selectedBentoBlock.value = block
  showBentoModal.value = true
}

const closeBentoModal = () => {
  showBentoModal.value = false
  selectedBentoBlock.value = null
}

const saveBentoBlock = async (blockData: any) => {
  try {
    if (selectedBentoBlock.value) {
      await updateBentoBlock(selectedBentoBlock.value.id, blockData)
    } else {
      await addBentoBlock(blockData)
    }
    closeBentoModal()
  } catch (error) {
    console.error('Error saving bento block:', error)
  }
}

const updateBentoBlocksOrder = async (newBlocks: any[]) => {
  try {
    // Update blocks order
    for (const [index, block] of newBlocks.entries()) {
      block.order = index + 1
      await updateBentoBlock(block.id, block)
    }
  } catch (error) {
    console.error('Error updating bento blocks order:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await fetchBentoBlocks()
})

// SEO
useHead({
  title: 'Gestion Bento Grid - Portfolio Admin',
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