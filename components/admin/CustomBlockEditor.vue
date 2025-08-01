<template>
  <div class="space-y-6">
    <!-- Experience Block Editor -->
    <div v-if="blockType === 'experience'">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-text-primary">Mes Expériences</h4>
        <button
          @click="addExperience"
          type="button"
          class="bg-accent text-white px-3 py-1 rounded-lg hover:bg-accent/90 transition-colors text-sm"
        >
          + Ajouter
        </button>
      </div>
      
      <div class="space-y-4" v-if="experienceData.length">
        <div
          v-for="(exp, index) in experienceData"
          :key="index"
          class="border border-border-primary rounded-xl p-4 space-y-3 bg-bg-secondary"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1 space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Poste *
                  </label>
                  <input
                    v-model="exp.position"
                    type="text"
                    placeholder="Ex: Développeur Frontend"
                    class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary"
                    style="direction: ltr; text-align: left;"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Entreprise *
                  </label>
                  <input
                    v-model="exp.company"
                    type="text"
                    placeholder="Ex: Mon Entreprise"
                    class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary"
                    style="direction: ltr; text-align: left;"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">
                  Période *
                </label>
                <input
                  v-model="exp.period"
                  type="text"
                  placeholder="Ex: 2023 - Présent"
                  class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary"
                  style="direction: ltr; text-align: left;"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">
                  Description
                </label>
                <textarea
                  v-model="exp.description"
                  rows="3"
                  placeholder="Décrivez vos missions et réalisations..."
                  class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary resize-vertical"
                  style="direction: ltr; text-align: left;"
                ></textarea>
              </div>
            </div>
            
            <button
              @click="removeExperience(index)"
              type="button"
              class="ml-3 text-red-500 hover:text-red-600 p-1"
              title="Supprimer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8 text-text-tertiary">
        <p>Aucune expérience ajoutée</p>
        <p class="text-sm">Cliquez sur "Ajouter" pour commencer</p>
      </div>
    </div>
    
    <!-- Gallery Block Editor -->
    <div v-else-if="blockType === 'gallery'">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-text-primary">Ma Galerie</h4>
        <button
          @click="addImage"
          type="button"
          class="bg-accent text-white px-3 py-1 rounded-lg hover:bg-accent/90 transition-colors text-sm"
        >
          + Ajouter Image
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="galleryData.length">
        <div
          v-for="(image, index) in galleryData"
          :key="index"
          class="border border-border-primary rounded-xl p-4 space-y-3 bg-bg-secondary"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1 space-y-3">
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">
                  URL de l'image *
                </label>
                <input
                  v-model="image.url"
                  type="url"
                  placeholder="https://exemple.com/image.jpg"
                  class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary"
                  style="direction: ltr; text-align: left;"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">
                  Texte alternatif
                </label>
                <input
                  v-model="image.alt"
                  type="text"
                  placeholder="Description de l'image"
                  class="w-full px-3 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-bg-primary text-text-primary"
                  style="direction: ltr; text-align: left;"
                />
              </div>
            </div>
            
            <button
              @click="removeImage(index)"
              type="button"
              class="ml-3 text-red-500 hover:text-red-600 p-1"
              title="Supprimer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8 text-text-tertiary">
        <p>Aucune image ajoutée</p>
        <p class="text-sm">Cliquez sur "Ajouter Image" pour commencer</p>
      </div>
    </div>
    
    <!-- Custom Text Block Editor -->
    <div v-else-if="blockType === 'custom-text'">
      <div class="mb-4">
        <h4 class="text-lg font-semibold text-text-primary mb-2">Contenu Personnalisé</h4>
        <p class="text-sm text-text-secondary">Utilisez l'éditeur ci-dessous pour formater votre texte</p>
      </div>
      
      <TipTapEditor
        v-model="customTextData"
        placeholder="Écrivez votre contenu personnalisé..."
        class="min-h-[200px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TipTapEditor from './TipTapEditor.vue'

const props = defineProps<{
  blockType: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Parse initial content
const initialContent = computed(() => {
  if (!props.modelValue) return null
  try {
    return JSON.parse(props.modelValue)
  } catch (e) {
    return null
  }
})

// Experience data
const experienceData = ref([])

// Gallery data  
const galleryData = ref([])

// Custom text data
const customTextData = ref('')

// Initialize data based on block type
watch(() => props.blockType, (newType) => {
  if (newType === 'experience') {
    experienceData.value = initialContent.value?.experiences || []
  } else if (newType === 'gallery') {
    galleryData.value = initialContent.value?.images || []
  } else if (newType === 'custom-text') {
    customTextData.value = initialContent.value?.html || ''
  }
}, { immediate: true })

// Experience methods
const addExperience = () => {
  experienceData.value.push({
    position: '',
    company: '',
    period: '',
    description: ''
  })
  updateContent()
}

const removeExperience = (index: number) => {
  experienceData.value.splice(index, 1)
  updateContent()
}

// Gallery methods
const addImage = () => {
  galleryData.value.push({
    url: '',
    alt: ''
  })
  updateContent()
}

const removeImage = (index: number) => {
  galleryData.value.splice(index, 1)
  updateContent()
}

// Update content and emit
const updateContent = () => {
  let content = ''
  
  if (props.blockType === 'experience') {
    content = JSON.stringify({
      experiences: experienceData.value
    })
  } else if (props.blockType === 'gallery') {
    content = JSON.stringify({
      images: galleryData.value
    })
  } else if (props.blockType === 'custom-text') {
    content = JSON.stringify({
      html: customTextData.value
    })
  }
  
  emit('update:modelValue', content)
}

// Watch for changes in data
watch(experienceData, updateContent, { deep: true })
watch(galleryData, updateContent, { deep: true })
watch(customTextData, updateContent)
</script>