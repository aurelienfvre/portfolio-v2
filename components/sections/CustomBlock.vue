<template>
  <BentoItem :className="`col-span-12 md:col-span-${block.colSpan || 6}`">
    <div class="p-8">
      <!-- Experience Block -->
      <div v-if="block.type === 'experience'">
        <div class="flex items-center gap-3 mb-6">
          <Briefcase class="w-5 h-5" />
          <h3 class="text-lg font-medium">{{ block.title || 'Expériences' }}</h3>
        </div>
        
        <div class="space-y-6" v-if="experienceData && experienceData.length">
          <div
            v-for="exp in experienceData"
            :key="exp.id || exp.company"
            class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-accent"
          >
            <div class="font-medium text-text-primary">{{ exp.position }}</div>
            <div class="text-text-secondary">{{ exp.company }}</div>
            <div class="text-sm text-text-tertiary">{{ exp.period }}</div>
            <div v-if="exp.description" class="text-sm text-text-secondary mt-1">
              {{ exp.description }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Custom Text Block -->
      <div v-else-if="block.type === 'custom-text'">
        <h3 v-if="block.title" class="text-lg font-medium mb-4">{{ block.title }}</h3>
        <div v-if="textContent" v-html="textContent" class="prose prose-sm max-w-none text-text-primary"></div>
      </div>
      
      <!-- Gallery Block -->
      <div v-else-if="block.type === 'gallery'">
        <div class="flex items-center gap-3 mb-6">
          <Image class="w-5 h-5" />
          <h3 class="text-lg font-medium">{{ block.title || 'Galerie' }}</h3>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4" v-if="galleryImages && galleryImages.length">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="aspect-square bg-bg-secondary rounded-xl overflow-hidden"
          >
            <img
              :src="image.url"
              :alt="image.alt || `Image ${index + 1}`"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      
      <!-- Fallback pour types inconnus -->
      <div v-else>
        <h3 class="text-lg font-medium mb-4">{{ block.title }}</h3>
        <p class="text-text-secondary">Bloc personnalisé de type: {{ block.type }}</p>
        <pre v-if="block.content" class="text-xs text-text-tertiary mt-2 overflow-auto">{{ block.content }}</pre>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Briefcase, Image } from 'lucide-vue-next'
import BentoItem from '~/components/common/BentoItem.vue'

const props = defineProps<{
  block: {
    id: number
    type: string
    title: string
    content?: string
    colSpan?: number
    order?: number
    visible?: boolean
  }
}>()

// Parse le contenu JSON selon le type de bloc
const parsedContent = computed(() => {
  if (!props.block.content) return null
  try {
    return JSON.parse(props.block.content)
  } catch (e) {
    console.error('Erreur parsing contenu bloc custom:', e)
    return null
  }
})

// Données spécifiques aux expériences
const experienceData = computed(() => {
  if (props.block.type !== 'experience') return null
  return parsedContent.value?.experiences || []
})

// Contenu texte pour les blocs texte custom
const textContent = computed(() => {
  if (props.block.type !== 'custom-text') return null
  return parsedContent.value?.html || props.block.content
})

// Images pour les galeries
const galleryImages = computed(() => {
  if (props.block.type !== 'gallery') return null
  return parsedContent.value?.images || []
})
</script>

<style scoped>
:deep(.prose) {
  color: var(--text-primary);
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3) {
  color: var(--text-primary);
}

:deep(.prose p) {
  color: var(--text-secondary);
}

:deep(.prose a) {
  color: var(--accent);
}
</style>