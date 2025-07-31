<template>
  <div class="competence-proof-manager h-full flex flex-col">
    <!-- Les 2 Compétences Principales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div
        v-for="competence in mainCompetences"
        :key="competence.id"
        class="competence-card bg-card-primary rounded-2xl border border-border-primary flex flex-col"
      >
        <!-- Header Compétence Principale (fixe) -->
        <div class="shrink-0 flex items-center justify-between p-6 pb-4">
          <div>
            <h2 class="text-2xl font-bold text-text-primary mb-1">
              {{ competence.title }}
            </h2>
            <p class="text-text-secondary text-sm">
              {{ competence.subtitle }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="$emit('editCategory', { mainCompetenceId: competence.id })"
              class="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors w-9 h-9 flex items-center justify-center"
              title="Ajouter une catégorie de preuve"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Catégories de Preuves pour cette compétence (scrollable) -->
        <div class="flex-1 px-6 pb-6 overflow-y-auto scrollbar-hide">
          <div class="space-y-4">
          <VueDraggable
            :model-value="getProofCategoriesForCompetence(competence.id)"
            @update:model-value="(newCategories) => onCategoriesChange(competence.id, newCategories)"
            :animation="100"
            ghost-class="ghost-item"
            chosen-class="chosen-item"
            drag-class="drag-item"
            class="space-y-4"
          >
            <div
              v-for="category in getProofCategoriesForCompetence(competence.id)"
              :key="category.id"
              :data-category-id="category.id"
              class="proof-category bg-bg-secondary rounded-xl p-4 border border-border-secondary"
            >
              <!-- Header Catégorie -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <input
                    v-model="category.title"
                    @input="debouncedSaveCategory(category, 'title', $event.target.value)"
                    class="text-lg font-semibold text-text-primary mb-1 w-full bg-transparent border-none outline-none focus:bg-white focus:shadow-sm focus:border focus:border-accent rounded px-1 -mx-1"
                    placeholder="Titre de la catégorie"
                  />
                  <input
                    v-model="category.subtitle"
                    @input="debouncedSaveCategory(category, 'subtitle', $event.target.value)"
                    class="text-sm text-text-tertiary w-full bg-transparent border-none outline-none focus:bg-white focus:shadow-sm focus:border focus:border-accent rounded px-1 -mx-1"
                    placeholder="Sous-titre..."
                  />
                </div>
                <div class="flex items-center gap-1 ml-4">
                  <button
                    @click="$emit('editItem', { proofCategoryId: category.id })"
                    class="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-md transition-colors w-7 h-7 flex items-center justify-center"
                    title="Ajouter un élément de preuve"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button
                    @click="$emit('editCategory', category)"
                    class="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-md transition-colors w-7 h-7 flex items-center justify-center"
                    title="Modifier la catégorie"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="$emit('deleteCategory', category)"
                    class="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors w-7 h-7 flex items-center justify-center"
                    title="Supprimer la catégorie"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Éléments de Preuve pour cette catégorie -->
              <div class="proof-items space-y-2">
                <VueDraggable
                  :model-value="getProofItemsForCategory(category.id)"
                  @update:model-value="(newItems) => onItemsChange(category.id, newItems)"
                  :animation="100"
                  ghost-class="ghost-item"
                  chosen-class="chosen-item"
                  drag-class="drag-item"
                  class="space-y-2"
                >
                  <div
                    v-for="item in getProofItemsForCategory(category.id)"
                    :key="item.id"
                    :data-item-id="item.id"
                    class="proof-item bg-white rounded-lg p-3 border-2 border-border-tertiary hover:border-accent transition-colors duration-200 cursor-move"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <span
                            :class="getOriginTagClass(item.originTag)"
                            class="px-2 py-1 text-xs font-medium rounded-full"
                          >
                            {{ item.originTag }}
                          </span>
                          <span class="text-xs text-text-tertiary">
                            {{ item.mediaType === 'video' ? '🎥' : '🖼️' }}
                          </span>
                        </div>
                        <input
                          v-model="item.title"
                          @input="debouncedSave(item, 'title', $event.target.value)"
                          class="font-medium text-text-primary text-sm mb-1 w-full bg-transparent border-none outline-none focus:bg-white focus:shadow-sm focus:border focus:border-accent rounded px-1 -mx-1"
                          placeholder="Titre de l'élément"
                        />
                        <textarea
                          v-model="item.description"
                          @input="debouncedSave(item, 'description', $event.target.value)"
                          class="text-xs text-text-tertiary w-full bg-transparent border-none outline-none focus:bg-white focus:shadow-sm focus:border focus:border-accent rounded px-1 -mx-1 resize-none"
                          rows="2"
                          placeholder="Description..."
                        ></textarea>
                        <input
                          v-model="item.sourceUrl"
                          @input="debouncedSave(item, 'sourceUrl', $event.target.value)"
                          class="text-xs text-text-tertiary w-full bg-transparent border-none outline-none focus:bg-white focus:shadow-sm focus:border focus:border-accent rounded px-1 -mx-1 mt-1"
                          placeholder="Lien source (optionnel)"
                          type="url"
                        />
                      </div>
                      <div class="flex items-center gap-1 ml-3">
                        <button
                          @click="$emit('editItem', item)"
                          class="p-1 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded transition-colors w-6 h-6 flex items-center justify-center"
                          title="Modifier l'élément"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          @click="$emit('deleteItem', item)"
                          class="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors w-6 h-6 flex items-center justify-center"
                          title="Supprimer l'élément"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </VueDraggable>

                <!-- Empty state pour les éléments -->
                <div
                  v-if="getProofItemsForCategory(category.id).length === 0"
                  class="text-center py-8 text-text-tertiary border-2 border-dashed border-border-tertiary rounded-lg"
                >
                  <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-sm">Aucun élément de preuve</p>
                  <button
                    @click="$emit('editItem', { proofCategoryId: category.id })"
                    class="text-xs text-blue-500 hover:text-blue-600 mt-1"
                  >
                    Ajouter un élément
                  </button>
                </div>
              </div>
            </div>
          </VueDraggable>

          <!-- Empty state pour les catégories -->
          <div
            v-if="getProofCategoriesForCompetence(competence.id).length === 0"
            class="text-center py-12 text-text-tertiary border-2 border-dashed border-border-secondary rounded-xl"
          >
            <svg class="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p class="text-lg font-medium mb-2">Aucune catégorie de preuve</p>
            <p class="text-sm mb-4">Commencez par ajouter une première catégorie</p>
            <button
              @click="$emit('editCategory', { mainCompetenceId: competence.id })"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter une catégorie
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

interface MainCompetence {
  id: number
  title: string
  subtitle: string
  slug: string
  order: number
}

interface ProofCategory {
  id: number
  mainCompetenceId: number
  title: string
  subtitle: string
  slug: string
  order: number
}

interface ProofItem {
  id: number
  proofCategoryId: number
  title: string
  description: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  originTag: string
  sourceUrl?: string
  order: number
}

// Props
const props = defineProps<{
  mainCompetences: MainCompetence[]
  proofCategories: ProofCategory[]
  proofItems: ProofItem[]
}>()

// Emits
const emit = defineEmits<{
  openCategoryModal: [category?: ProofCategory]
  editCategory: [category: ProofCategory | { mainCompetenceId: number }]
  deleteCategory: [category: ProofCategory]
  reorderCategories: [reorderData: { id: number, order: number }[]]
  openItemModal: [item?: ProofItem]
  editItem: [item: ProofItem | { proofCategoryId: number }]
  deleteItem: [item: ProofItem]
  reorderItems: [reorderData: { id: number, order: number }[]]
  updateCategory: [category: ProofCategory]
  updateItem: [item: ProofItem]
}>()

// Computed helpers
const getProofCategoriesForCompetence = (competenceId: number) => {
  return props.proofCategories
    .filter(cat => cat.mainCompetenceId === competenceId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

const getProofItemsForCategory = (categoryId: number) => {
  return props.proofItems
    .filter(item => item.proofCategoryId === categoryId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

const getOriginTagClass = (tag: string) => {
  const classes = {
    'STAGE': 'bg-blue-100 text-blue-800',
    'PERSONNEL': 'bg-green-100 text-green-800',
    'SCOLAIRE': 'bg-purple-100 text-purple-800',
    'INITIATIVE': 'bg-orange-100 text-orange-800'
  }
  return classes[tag as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// Drag & Drop handlers
const onCategoriesChange = (competenceId: number, newCategories: any[]) => {
  // Créer les données de réorganisation basées sur le nouvel ordre
  const reorderData = newCategories.map((category, index) => ({
    id: category.id,
    order: index
  }))
  
  emit('reorderCategories', reorderData)
}

const onItemsChange = (categoryId: number, newItems: any[]) => {
  // Créer les données de réorganisation basées sur le nouvel ordre
  const reorderData = newItems.map((item, index) => ({
    id: item.id,
    order: index
  }))
  
  emit('reorderItems', reorderData)
}

// Debounced save functions
let categoryTimeout: NodeJS.Timeout | null = null
let itemTimeout: NodeJS.Timeout | null = null

const debouncedSaveCategory = (category: ProofCategory, field: string, value: string) => {
  if (categoryTimeout) {
    clearTimeout(categoryTimeout)
  }
  
  categoryTimeout = setTimeout(() => {
    const updatedCategory = { ...category, [field]: value }
    emit('updateCategory', updatedCategory)
  }, 1000)
}

const debouncedSave = (item: ProofItem, field: string, value: string) => {
  if (itemTimeout) {
    clearTimeout(itemTimeout)
  }
  
  itemTimeout = setTimeout(() => {
    const updatedItem = { ...item, [field]: value }
    emit('updateItem', updatedItem)
  }, 1000)
}
</script>

<style scoped>
.ghost-item {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
}

.chosen-item {
  cursor: grabbing;
}

.drag-item {
  transform: rotate(2deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.competence-card {
  transition: all 0.2s ease;
}

.competence-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.proof-category {
  transition: all 0.2s ease;
}

.proof-item:hover {
  transform: translateX(4px);
}

/* Hide scrollbars but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}
</style>