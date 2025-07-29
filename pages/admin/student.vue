<template>
  <div class="admin-page min-h-screen bg-bg-primary">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-text-primary mb-2">Système Compétence/Preuve</h1>
          <p class="text-text-tertiary">Gérez vos compétences principales et preuves (Focus 3ème année)</p>
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

      <!-- Compétences Principales -->
      <CompetenceProofManager
        :mainCompetences="mainCompetences"
        :proofCategories="proofCategories"
        :proofItems="proofItems"
        @openCategoryModal="editCategory"
        @editCategory="editCategory"
        @deleteCategory="handleDeleteCategory"
        @reorderCategories="handleReorderCategories"
        @openItemModal="editItem"
        @editItem="editItem"
        @deleteItem="handleDeleteItem"
        @reorderItems="handleReorderItems"
      />
    </div>

    <!-- Category Modal -->
    <ProofCategoryModal
      v-if="showCategoryModal"
      :category="selectedCategory"
      :mainCompetences="mainCompetences"
      @close="closeCategoryModal"
      @save="saveCategory"
    />

    <!-- Item Modal -->
    <ProofItemModal
      v-if="showItemModal"
      :item="selectedItem"
      :proofCategories="proofCategories"
      @close="closeItemModal"
      @save="saveItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import CompetenceProofManager from '~/components/admin/CompetenceProofManager.vue'
import ProofCategoryModal from '~/components/admin/ProofCategoryModal.vue'
import ProofItemModal from '~/components/admin/ProofItemModal.vue'

// Portfolio data management
const {
  mainCompetences,
  proofCategories,
  proofItems,
  fetchMainCompetences,
  fetchProofCategories,
  fetchProofItems,
  addProofCategory,
  updateProofCategory,
  deleteProofCategory,
  reorderProofCategories,
  addProofItem,
  updateProofItem,
  deleteProofItem,
  reorderProofItems
} = usePortfolioDatabase()

// Category Modal state
const showCategoryModal = ref(false)
const selectedCategory = ref(null)

// Item Modal state
const showItemModal = ref(false)
const selectedItem = ref(null)

// Category Management
const editCategory = (category: any = {}) => {
  selectedCategory.value = category
  showCategoryModal.value = true
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  selectedCategory.value = null
}

const saveCategory = async (categoryData: any) => {
  try {
    if (categoryData.id) {
      // Update existing category
      await updateProofCategory(categoryData.id, categoryData)
    } else {
      // Create new category
      await addProofCategory(categoryData)
    }
    closeCategoryModal()
  } catch (error) {
    console.error('Error saving category:', error)
  }
}

const handleDeleteCategory = async (category: any) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie de preuve ? Tous les éléments associés seront également supprimés.')) {
    try {
      await deleteProofCategory(category.id)
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }
}

const handleReorderCategories = async (reorderData: { id: number, order: number }[]) => {
  try {
    await reorderProofCategories(reorderData)
  } catch (error) {
    console.error('Error reordering categories:', error)
  }
}

// Item Management
const editItem = (item: any = {}) => {
  selectedItem.value = item
  showItemModal.value = true
}

const closeItemModal = () => {
  showItemModal.value = false
  selectedItem.value = null
}

const saveItem = async (itemData: any) => {
  try {
    if (itemData.id) {
      // Update existing item
      await updateProofItem(itemData.id, itemData)
    } else {
      // Create new item
      await addProofItem(itemData)
    }
    closeItemModal()
  } catch (error) {
    console.error('Error saving item:', error)
  }
}

const handleDeleteItem = async (item: any) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet élément de preuve ?')) {
    try {
      await deleteProofItem(item.id)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
}

const handleReorderItems = async (reorderData: { id: number, order: number }[]) => {
  try {
    await reorderProofItems(reorderData)
  } catch (error) {
    console.error('Error reordering items:', error)
  }
}

// Initialize data on mount
onMounted(async () => {
  await Promise.all([
    fetchMainCompetences(),
    fetchProofCategories(),
    fetchProofItems()
  ])
})

// SEO
useHead({
  title: 'Système Compétence/Preuve - Portfolio Admin',
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