<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-text-primary">Gestion Bento Grid</h2>
      <div class="flex gap-3">
        <NuxtLink
          to="/admin/bento-edit"
          class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors font-medium shadow-lg flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Modifier Portfolio
        </NuxtLink>
        <button
          @click="$emit('openBentoModal')"
          class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
        >
          + Nouveau Bloc Bento
        </button>
      </div>
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
          v-for="block in sortedBentoBlocks"
          :key="block.id"
          :data-swapy-slot="block.id"
          :data-swapy-item="block.id"
          :class="`col-span-${block.colSpan} transition-all duration-200 relative group hover:scale-[1.02] w-full h-full`"
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
            @click="$emit('editBentoBlock', block)"
            class="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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

const props = defineProps<{
  sortedBentoBlocks: any[]
}>()

const emit = defineEmits<{
  openBentoModal: []
  editBentoBlock: [block: any]
  updateBentoBlocks: [blocks: any[]]
}>()

const bentoContainer = ref(null)
let swapyInstance: any = null

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

// Drag and Drop Management
const initializeSwapy = async () => {
  if (import.meta.client && bentoContainer.value && props.sortedBentoBlocks.length > 0) {
    try {
      const { createSwapy } = await import('swapy')
      
      swapyInstance = createSwapy(bentoContainer.value, {
        animation: 'dynamic'
      })
      
      swapyInstance.onSwap((event: any) => {
        console.log('Bento swap event:', event)
        // Update block orders based on new positions
        const slotItemMap = event.newSlotItemMap.asObject
        const newBlocks = [...props.sortedBentoBlocks]
        
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
        emit('updateBentoBlocks', newBlocks)
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

// Re-initialize when blocks change
const reinitializeSwapy = async () => {
  destroySwapy()
  await nextTick()
  initializeSwapy()
}

// Initialize on mount
onMounted(async () => {
  await nextTick()
  initializeSwapy()
})

// Cleanup on unmount
onUnmounted(() => {
  destroySwapy()
})

// Expose method to parent for re-initialization
const initialize = async () => {
  await reinitializeSwapy()
}

defineExpose({
  initialize
})
</script>