<template>
  <div class="space-y-4">
    <label class="block text-sm font-semibold text-text-primary mb-3">
      {{ label }}
    </label>
    
    <!-- Current file info -->
    <div v-if="currentFile" class="mb-4 p-3 bg-bg-tertiary rounded-xl border border-border-primary">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div class="text-sm font-medium text-text-primary">{{ getFileName(currentFile) }}</div>
            <div class="text-xs text-text-tertiary">Fichier actuel</div>
          </div>
        </div>
        <button
          @click="removeCurrentFile"
          class="text-red-500 hover:text-red-600 p-1 rounded transition-colors"
          title="Supprimer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Upload zone -->
    <div
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @click="triggerFileInput"
      class="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200"
      :class="[
        isDragging 
          ? 'border-accent bg-accent/5 scale-105' 
          : 'border-border-primary hover:border-accent hover:bg-accent/5',
        isUploading ? 'pointer-events-none opacity-50' : ''
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".pdf"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <div v-if="!isUploading" class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <div>
          <p class="text-lg font-medium text-text-primary mb-2">
            Glissez votre CV ici ou cliquez pour parcourir
          </p>
          <p class="text-sm text-text-tertiary">
            Seuls les fichiers PDF sont acceptés (max {{ maxSizeMB }}MB)
          </p>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-text-primary">
          Upload en cours...
        </p>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-xl">
      <p class="text-sm text-red-600">{{ errorMessage }}</p>
    </div>

    <!-- Manual URL input as fallback -->
    <div class="pt-4 border-t border-border-primary">
      <label class="block text-sm font-medium text-text-secondary mb-2">
        Ou saisissez une URL
      </label>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary"
        placeholder="https://exemple.com/mon-cv.pdf ou /uploads/cv/mon-cv.pdf"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  maxSizeMB?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// State
const isDragging = ref(false)
const isUploading = ref(false)
const errorMessage = ref('')
const fileInput = ref<HTMLInputElement>()

// Props with defaults
const maxSizeMB = computed(() => props.maxSizeMB || 5)
const label = computed(() => props.label || 'Fichier PDF')

// Current file info
const currentFile = computed(() => {
  return props.modelValue && props.modelValue.trim() ? props.modelValue : null
})

// File name extraction
const getFileName = (url: string) => {
  if (!url) return ''
  const parts = url.split('/')
  return parts[parts.length - 1] || 'Fichier PDF'
}

// Remove current file
const removeCurrentFile = () => {
  emit('update:modelValue', '')
}

// Drag and drop handlers
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  // Only set to false if we're leaving the drop zone completely
  if (e.relatedTarget && !(e.currentTarget as Element).contains(e.relatedTarget as Node)) {
    isDragging.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

// File input handler
const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

// File processing
const handleFile = async (file: File) => {
  errorMessage.value = ''
  
  // Validate file type
  if (file.type !== 'application/pdf') {
    errorMessage.value = 'Seuls les fichiers PDF sont acceptés.'
    return
  }
  
  // Validate file size
  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > maxSizeMB.value) {
    errorMessage.value = `La taille du fichier ne doit pas dépasser ${maxSizeMB.value}MB.`
    return
  }
  
  try {
    isUploading.value = true
    
    // Create FormData for upload
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'cv')
    
    // Upload file to server
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      emit('update:modelValue', response.url)
    } else {
      throw new Error((response as any).error || 'Erreur lors de l\'upload')
    }
    
  } catch (error) {
    console.error('Upload error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Erreur lors de l\'upload du fichier'
  } finally {
    isUploading.value = false
  }
}
</script>