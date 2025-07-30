<template>
  <div class="space-y-4">
    <label class="block text-sm font-semibold text-text-primary mb-3">
      {{ label }}
    </label>

    <!-- Current Image Preview -->
    <div v-if="modelValue" class="relative inline-block">
      <img
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
            Glissez-déposez une image ici ou cliquez pour choisir
          </p>
          <p class="text-xs text-text-tertiary">
            Formats supportés: JPG, PNG, GIF, WebP
          </p>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleFileSelect"
          class="hidden"
        />
      </div>

      <!-- URL Input -->
      <div class="flex space-x-2">
        <input
          v-model="urlInput"
          type="text"
          placeholder="Ou collez une URL d'image"
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
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isDragging = ref(false);
const urlInput = ref("");
const showGallery = ref(false);
const fileInput = ref<HTMLInputElement>();

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
  if (!file.type.startsWith("image/")) {
    alert("Veuillez sélectionner un fichier image");
    return;
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    alert("La taille du fichier ne doit pas dépasser 10MB");
    return;
  }

  try {
    // Create FormData for upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'images');
    
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
