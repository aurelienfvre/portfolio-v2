<template>
  <div class="media-swiper-container relative">
    <!-- Media Display -->
    <div class="media-container bg-bg-secondary border border-border-primary rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center relative">
      <!-- Single Media (backward compatibility) -->
      <template v-if="!mediaUrls || mediaUrls.length === 0">
        <!-- Image -->
        <img 
          v-if="mediaType === 'image' && mediaUrl"
          :src="mediaUrl"
          :alt="title"
          class="w-full h-full object-cover"
          @error="onMediaError"
        />
        
        <!-- Vidéo -->
        <div 
          v-else-if="mediaType === 'video' && mediaUrl"
          class="w-full h-full flex items-center justify-center"
        >
          <!-- YouTube/Vimeo Embed -->
          <iframe
            v-if="isYouTubeOrVimeo(mediaUrl)"
            :src="getEmbedUrl(mediaUrl)"
            class="w-full h-full min-h-[400px]"
            frameborder="0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <!-- Regular Video File -->
          <video
            v-else
            :src="mediaUrl"
            controls
            class="w-full h-full"
            @error="onMediaError"
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>

        <!-- Placeholder si aucun média -->
        <div 
          v-else
          class="text-center p-8"
        >
          <div class="w-20 h-20 mx-auto mb-4 bg-bg-primary rounded-2xl flex items-center justify-center">
            <svg class="w-10 h-10 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Aucun média</h3>
          <p class="text-text-tertiary">Aucun média associé à cet élément</p>
        </div>
      </template>

      <!-- Multiple Media with Swiper -->
      <template v-else-if="mediaUrls.length > 0">
        <!-- Current Media -->
        <div class="w-full h-full relative">
          <!-- Image -->
          <img 
            v-if="currentMedia.type === 'image'"
            :src="currentMedia.url"
            :alt="currentMedia.caption || title"
            class="w-full h-full object-cover"
            @error="onMediaError"
          />
          
          <!-- Vidéo -->
          <div 
            v-else-if="currentMedia.type === 'video'"
            class="w-full h-full flex items-center justify-center"
          >
            <!-- YouTube/Vimeo Embed -->
            <iframe
              v-if="isYouTubeOrVimeo(currentMedia.url)"
              :src="getEmbedUrl(currentMedia.url)"
              class="w-full h-full min-h-[400px]"
              frameborder="0"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            <!-- Regular Video File -->
            <video
              v-else
              :src="currentMedia.url"
              controls
              class="w-full h-full"
              @error="onMediaError"
            >
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>

          <!-- Navigation Arrows (si plus d'un média) -->
          <template v-if="mediaUrls.length > 1">
            <!-- Previous Button -->
            <button
              @click="previousMedia"
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              :disabled="currentIndex === 0"
              :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Next Button -->
            <button
              @click="nextMedia"
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
              :disabled="currentIndex === mediaUrls.length - 1"
              :class="{ 'opacity-50 cursor-not-allowed': currentIndex === mediaUrls.length - 1 }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Media Counter -->
            <div class="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
              {{ currentIndex + 1 }} / {{ mediaUrls.length }}
            </div>
          </template>

          <!-- Media Caption -->
          <div 
            v-if="currentMedia.caption"
            class="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm max-w-md z-10"
          >
            {{ currentMedia.caption }}
          </div>
        </div>
      </template>
    </div>

    <!-- Thumbnails (si plus d'un média) -->
    <div 
      v-if="mediaUrls && mediaUrls.length > 1"
      class="flex gap-2 mt-4 overflow-x-auto pb-2"
    >
      <button
        v-for="(media, index) in mediaUrls"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors',
          currentIndex === index 
            ? 'border-accent' 
            : 'border-border-secondary hover:border-border-primary'
        ]"
      >
        <!-- Thumbnail Image -->
        <img 
          v-if="media.type === 'image'"
          :src="media.url"
          :alt="media.caption || `Media ${index + 1}`"
          class="w-full h-full object-cover"
        />
        
        <!-- Video Thumbnail -->
        <div 
          v-else
          class="w-full h-full bg-bg-tertiary flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h6m-3-3v6" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface MediaItem {
  url: string
  type: 'image' | 'video'
  caption?: string
}

interface Props {
  // Single media (backward compatibility)
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  
  // Multiple media
  mediaUrls?: MediaItem[]
  
  // Common props
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  mediaType: 'image',
  mediaUrls: () => []
})

// Current media index for swiper
const currentIndex = ref(0)

// Current media computed
const currentMedia = computed(() => {
  if (!props.mediaUrls || props.mediaUrls.length === 0) {
    return { url: props.mediaUrl || '', type: props.mediaType || 'image' }
  }
  return props.mediaUrls[currentIndex.value] || props.mediaUrls[0]
})

// Navigation methods
const nextMedia = () => {
  if (props.mediaUrls && currentIndex.value < props.mediaUrls.length - 1) {
    currentIndex.value++
  }
}

const previousMedia = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Helper functions for video handling
const isYouTubeOrVimeo = (url: string) => {
  if (!url) return false
  const lowerUrl = url.toLowerCase()
  return lowerUrl.includes('youtube.com') || 
         lowerUrl.includes('youtu.be') || 
         lowerUrl.includes('vimeo.com')
}

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

const onMediaError = () => {
  console.warn('Erreur de chargement du média:', currentMedia.value?.url)
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.mediaUrls || props.mediaUrls.length <= 1) return
  
  if (event.key === 'ArrowLeft') {
    previousMedia()
  } else if (event.key === 'ArrowRight') {
    nextMedia()
  }
}

// Add keyboard listeners when component is mounted
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Smooth transitions */
.media-container {
  transition: all 0.3s ease;
}

/* Hide scrollbar but keep functionality */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgb(var(--color-border-secondary));
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(var(--color-border-primary));
}
</style>