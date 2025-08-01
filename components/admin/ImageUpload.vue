<template>
  <div class="space-y-4">
    <label class="block text-sm font-semibold text-text-primary mb-3">
      {{ label }}
    </label>

    <!-- Current Media Preview -->
    <div v-if="modelValue" class="relative inline-block">
      <!-- Video Preview -->
      <div v-if="isVideoUrl" class="w-full max-w-xs">
        <!-- YouTube/Vimeo Embed -->
        <iframe
          v-if="modelValue.includes('youtube.com') || modelValue.includes('youtu.be') || modelValue.includes('vimeo.com')"
          :src="getEmbedUrl(modelValue)"
          class="w-full h-32 rounded-xl border border-border-primary"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <!-- Regular Video File -->
        <video
          v-else
          :src="modelValue"
          class="w-full max-w-xs h-32 object-cover rounded-xl border border-border-primary"
          controls
          preload="metadata"
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>
      <!-- Image Preview -->
      <img
        v-else
        :src="modelValue"
        :alt="label"
        class="w-full max-w-xs h-32 object-cover rounded-xl border border-border-primary"
      />
      <button
        type="button"
        @click="$emit('update:modelValue', '')"
        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Upload Methods -->
    <div class="space-y-3">
      <!-- Drag & Drop Zone -->
      <div
        @drop="handleDrop"
        @dragover.prevent
        @dragenter.prevent
        @click="triggerFileInput"
        :class="[
          'border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer',
          isDragging
            ? 'border-accent bg-accent/10'
            : 'border-border-primary hover:border-accent hover:bg-bg-secondary',
        ]"
        @dragenter="isDragging = true"
        @dragleave="isDragging = false"
      >
        <div class="flex flex-col items-center space-y-2">
          <svg
            class="w-8 h-8 text-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p class="text-sm text-text-secondary">
            {{ dragDropText }}
          </p>
          <p class="text-xs text-text-tertiary">
            Formats supportés: {{ supportedFormats }}
          </p>
        </div>
        <input
          ref="fileInput"
          type="file"
          :accept="acceptedTypes"
          @change="handleFileSelect"
          class="hidden"
        />
      </div>

      <!-- URL Input -->
      <div class="flex space-x-2">
        <input
          v-model="urlInput"
          type="text"
          :placeholder="placeholderText"
          class="flex-1 px-4 py-3 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary"
        />
        <button
          type="button"
          @click="useUrl"
          :disabled="!urlInput"
          class="px-4 py-2 bg-accent text-bg-primary rounded-xl hover:bg-accent/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
        >
          Utiliser
        </button>
      </div>

      <!-- Existing Images Gallery -->
      <div v-if="showExistingImages && existingImages.length > 0">
        <button
          type="button"
          @click="showGallery = !showGallery"
          class="flex items-center space-x-2 text-sm text-accent hover:text-accent/80 font-medium"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{{
            showGallery ? "Masquer" : "Choisir parmi les images existantes"
          }}</span>
        </button>

        <div
          v-if="showGallery"
          class="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-40 overflow-y-auto"
        >
          <div
            v-for="image in existingImages"
            :key="image"
            @click="selectExistingImage(image)"
            class="relative cursor-pointer group"
          >
            <img
              :src="image"
              :alt="'Image existante'"
              class="w-full h-16 object-cover rounded-lg border-2 border-transparent group-hover:border-accent transition-colors"
            />
            <div
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  label: string;
  showExistingImages?: boolean;
  existingImages?: string[];
  fileType?: 'image' | 'video' | 'any';
  maxSizeMB?: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isDragging = ref(false);
const urlInput = ref("");
const showGallery = ref(false);
const fileInput = ref<HTMLInputElement>();

// Computed properties based on fileType
const acceptedTypes = computed(() => {
  switch (props.fileType) {
    case 'image':
      return 'image/*'
    case 'video':
      return 'video/*'
    case 'any':
    default:
      return 'image/*,video/*'
  }
})

const supportedFormats = computed(() => {
  switch (props.fileType) {
    case 'image':
      return 'JPG, PNG, GIF, WebP'
    case 'video':
      return 'MP4, MOV, AVI, WebM'
    case 'any':
    default:
      return 'JPG, PNG, GIF, WebP, MP4, MOV'
  }
})

const placeholderText = computed(() => {
  switch (props.fileType) {
    case 'image':
      return 'Ou collez une URL d\'image'
    case 'video':
      return 'Ou collez un lien YouTube/Vimeo ou URL vidéo'
    case 'any':
    default:
      return 'Ou collez une URL d\'image/vidéo ou lien YouTube'
  }
})

const dragDropText = computed(() => {
  switch (props.fileType) {
    case 'image':
      return 'Glissez-déposez une image ici ou cliquez pour choisir'
    case 'video':
      return 'Glissez-déposez une vidéo ici ou cliquez pour choisir'
    case 'any':
    default:
      return 'Glissez-déposez un fichier ici ou cliquez pour choisir'
  }
})

const maxFileSize = computed(() => {
  return (props.maxSizeMB || 45) * 1024 * 1024 // Default 45MB for videos
})

// Helper to detect if URL is a video
const isVideoUrl = computed(() => {
  if (!props.modelValue) return false
  
  const url = props.modelValue.toLowerCase()
  
  // Check for video file extensions
  const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv']
  const hasVideoExtension = videoExtensions.some(ext => url.includes(ext))
  
  // Check for video hosting platforms
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be')
  const isVimeo = url.includes('vimeo.com')
  const isDailymotion = url.includes('dailymotion.com')
  
  return hasVideoExtension || isYouTube || isVimeo || isDailymotion
})

// Helper to get YouTube embed URL
const getEmbedUrl = (url: string) => {
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1].split('?')[0]
    return `https://player.vimeo.com/video/${videoId}`
  }
  return url
}

// Trigger file input when clicking on drag zone
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle drag and drop
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
};

// Handle file selection
const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
};

// Process file
const handleFile = async (file: File) => {
  // Validate file type based on fileType prop
  const isValidType = (() => {
    switch (props.fileType) {
      case 'image':
        return file.type.startsWith('image/')
      case 'video':
        return file.type.startsWith('video/')
      case 'any':
      default:
        return file.type.startsWith('image/') || file.type.startsWith('video/')
    }
  })()

  if (!isValidType) {
    const expectedType = props.fileType === 'image' ? 'image' : 
                        props.fileType === 'video' ? 'vidéo' : 'image ou vidéo'
    alert(`Veuillez sélectionner un fichier ${expectedType}`)
    return
  }

  // Validate file size
  if (file.size > maxFileSize.value) {
    alert(`La taille du fichier ne doit pas dépasser ${props.maxSizeMB || 45}MB`)
    return
  }

  try {
    // Create FormData for upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Determine upload type based on file type
    const uploadType = file.type.startsWith('video/') ? 'videos' : 'images'
    formData.append('type', uploadType);
    
    // Upload file to server
    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.success) {
      emit("update:modelValue", response.url);
    } else {
      throw new Error((response as any).error || 'Erreur lors de l\'upload');
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert(error instanceof Error ? error.message : 'Erreur lors de l\'upload du fichier');
  }
};

// Use URL input
const useUrl = () => {
  if (urlInput.value) {
    emit("update:modelValue", urlInput.value);
    urlInput.value = "";
  }
};

// Select existing image
const selectExistingImage = (imageUrl: string) => {
  emit("update:modelValue", imageUrl);
  showGallery.value = false;
};
</script>
