<template>
  <div class="bento-editor min-h-screen bg-bg-primary relative">
    <!-- Floating Header -->
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div class="bg-bg-secondary/90 backdrop-blur-lg border border-border-primary rounded-2xl px-6 py-3 shadow-lg">
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/admin"
            class="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour Admin
          </NuxtLink>
          
          <div class="h-6 w-px bg-border-primary"></div>
          
          <h1 class="text-lg font-semibold text-text-primary">Mode Édition Bento</h1>
          
          <div class="h-6 w-px bg-border-primary"></div>
          
          <NuxtLink 
            to="/"
            class="flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Voir Portfolio
          </NuxtLink>
          
          <button
            @click="openBentoModal()"
            class="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau Bloc
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="pt-24 pb-8 px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Bento Grid Live Preview -->
        <div 
          ref="bentoContainer" 
          class="grid grid-cols-12 gap-6 min-h-[80vh]"
        >
          <div
            v-for="(block, index) in sortedBentoBlocks"
            :key="block.id"
            :data-swapy-slot="block.id"
            :class="`col-span-${block.colSpan} transition-all duration-200 relative group`"
          >
            <div
              :data-swapy-item="block.id"
              class="w-full h-full cursor-move border-2 border-transparent hover:border-dashed hover:border-accent transition-all rounded-2xl overflow-hidden"
              @dblclick="handleDoubleClick(block, $event)"
            >
              <!-- Render actual portfolio section components -->
              <BentoItem class="h-full min-h-[120px] relative">
                <component 
                  v-if="getComponentName(block.component)"
                  :is="getComponentName(block.component)"
                  class="w-full h-full"
                  :class="{ 'pointer-events-none': !editingBlock || editingBlock.id !== block.id }"
                />
                <div 
                  v-else
                  :class="`${block.backgroundColor || 'bg-blue-500'} rounded-xl flex items-center justify-center text-white font-medium h-full`"
                >
                  <div class="text-center p-4">
                    <div class="text-lg mb-1">{{ block.title }}</div>
                    <div class="text-sm opacity-80">{{ block.type }}</div>
                    <div class="text-xs opacity-60 mt-2">Double-clic pour éditer</div>
                  </div>
                </div>
                
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl flex items-center justify-center">
                  <div class="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    Double-clic pour éditer
                  </div>
                </div>
              </BentoItem>
            </div>
            
            <!-- Block Actions -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button 
                @click="openBentoModal(block)"
                class="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors"
                title="Éditer les propriétés"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
              
              <button 
                @click="deleteBlock(block.id)"
                class="bg-red-500/80 hover:bg-red-500 text-white rounded-full p-2 transition-colors"
                title="Supprimer le bloc"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Empty State -->
          <div 
            v-if="sortedBentoBlocks.length === 0"
            class="col-span-12 flex items-center justify-center min-h-[400px] border-2 border-dashed border-border-primary rounded-2xl"
          >
            <div class="text-center">
              <svg class="w-16 h-16 text-text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              <h3 class="text-xl font-semibold text-text-primary mb-2">Aucun bloc bento</h3>
              <p class="text-text-tertiary mb-4">Commencez par créer votre premier bloc</p>
              <button
                @click="openBentoModal()"
                class="bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors font-medium"
              >
                + Créer un bloc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- WYSIWYG Editor Tooltip -->
    <div
      v-if="showWysiwygTooltip"
      ref="wysiwygTooltip"
      class="fixed z-[100] bg-white dark:bg-gray-800 border border-border-primary rounded-xl shadow-2xl p-4 max-w-md"
      :style="tooltipPosition"
    >
      <div class="mb-3 flex items-center justify-between">
        <h4 class="font-semibold text-text-primary">Édition directe</h4>
        <button
          @click="closeWysiwygTooltip"
          class="text-text-tertiary hover:text-text-primary transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <TipTapEditor
        v-model="editingContent"
        placeholder="Éditer le contenu..."
        class="min-h-[200px]"
      />
      
      <div class="mt-3 flex justify-end gap-2">
        <button
          @click="closeWysiwygTooltip"
          class="px-3 py-1 text-text-tertiary hover:text-text-primary transition-colors text-sm"
        >
          Annuler
        </button>
        <button
          @click="saveWysiwygContent"
          class="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
        >
          Enregistrer
        </button>
      </div>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'
import BentoModal from '~/components/admin/BentoModal.vue'
import TipTapEditor from '~/components/admin/TipTapEditor.vue'
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
  bentoBlocks,
  sortedBentoBlocks,
  addBentoBlock,
  updateBentoBlock,
  deleteBentoBlock,
  loadFromLocalStorage
} = usePortfolioData()

// Bento modal state
const showBentoModal = ref(false)
const selectedBentoBlock = ref(null)

// WYSIWYG editor state
const showWysiwygTooltip = ref(false)
const editingBlock = ref(null)
const editingContent = ref('')
const tooltipPosition = ref({ top: '0px', left: '0px' })
const wysiwygTooltip = ref(null)

// Drag and drop state
const bentoContainer = ref(null)
let swapyInstance: any = null

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
  
  // Reinitialize Swapy after adding/updating blocks
  nextTick(() => {
    destroySwapy()
    initializeSwapy()
  })
}

const deleteBlock = (blockId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
    deleteBentoBlock(blockId)
    
    // Reinitialize Swapy after deleting block
    nextTick(() => {
      destroySwapy()
      initializeSwapy()
    })
  }
}

// Double click handler for WYSIWYG editing
const handleDoubleClick = (block: any, event: MouseEvent) => {
  // Only show WYSIWYG for text-based components or custom blocks
  const textComponents = ['IntroSection', 'ProfileSection', 'ContactSection']
  
  if (textComponents.includes(block.component) || !block.component) {
    editingBlock.value = block
    editingContent.value = block.content || block.title || ''
    
    // Position tooltip near click
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    tooltipPosition.value = {
      top: `${rect.top + window.scrollY - 50}px`,
      left: `${rect.left + window.scrollX}px`
    }
    
    showWysiwygTooltip.value = true
  }
}

const closeWysiwygTooltip = () => {
  showWysiwygTooltip.value = false
  editingBlock.value = null
  editingContent.value = ''
}

// Content is now handled by v-model on TipTapEditor

const saveWysiwygContent = () => {
  if (editingBlock.value) {
    const updatedBlock = {
      ...editingBlock.value,
      content: editingContent.value,
      // Update title if it's a custom block
      title: !editingBlock.value.component ? editingContent.value : editingBlock.value.title
    }
    
    updateBentoBlock(editingBlock.value.id, updatedBlock)
  }
  
  closeWysiwygTooltip()
}

// Drag and Drop Management
const initializeSwapy = async () => {
  if (process.client && bentoContainer.value && sortedBentoBlocks.value.length > 0) {
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
})

// Cleanup on unmount
onUnmounted(() => {
  destroySwapy()
})

// SEO for admin page
useHead({
  title: 'Éditeur Bento - Portfolio Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
/* Custom scrollbar for tooltip */
.wysiwyg-tooltip::-webkit-scrollbar {
  width: 6px;
}

.wysiwyg-tooltip::-webkit-scrollbar-track {
  background: transparent;
}

.wysiwyg-tooltip::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
}

.wysiwyg-tooltip::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.3);
}
</style>