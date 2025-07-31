<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/student"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            Portfolio Étudiant
          </NuxtLink>
          <svg class="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <NuxtLink 
            :to="`/student/${competenceSlug}`"
            class="text-text-secondary hover:text-text-primary transition-colors"
          >
            {{ competence?.title }}
          </NuxtLink>
          <svg class="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-text-primary font-medium">{{ category?.title }}</span>
        </div>

        <!-- Bouton retour mode pro -->
        <button
          @click="switchToPro"
          class="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border-primary rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Mode Pro
        </button>
      </div>
    </nav>

    <!-- Content principal -->
    <div class="pt-24 pb-20">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header de la catégorie -->
        <div class="mb-12">
          <h1 class="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            {{ category?.title }}
          </h1>
          <p class="text-lg text-text-secondary max-w-3xl">
            {{ category?.subtitle }}
          </p>
        </div>

        <!-- Layout principal -->
        <div class="grid lg:grid-cols-5 gap-8 min-h-[600px]">
          <!-- Liste des éléments de preuve (gauche) -->
          <div class="lg:col-span-2 space-y-4">
            <h2 class="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Éléments de Preuve
            </h2>
            
            <div class="space-y-3">
              <button
                v-for="item in items"
                :key="item.id"
                @click="selectItem(item)"
                :class="[
                  'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                  selectedItem?.id === item.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border-primary bg-bg-secondary hover:border-border-secondary hover:bg-bg-tertiary'
                ]"
              >
                <div class="flex items-start gap-3">
                  <!-- Origin tag -->
                  <span 
                    :class="getOriginTagClass(item.originTag)"
                    class="px-2 py-1 text-xs font-medium rounded-full shrink-0"
                  >
                    {{ item.originTag }}
                  </span>
                  
                  <!-- Media type icon -->
                  <span class="text-sm shrink-0 mt-1">
                    {{ item.mediaType === 'video' ? '🎥' : '🖼️' }}
                  </span>
                </div>
                
                <h3 class="font-semibold text-text-primary mt-2 mb-1">
                  {{ item.title }}
                </h3>
                
                <p class="text-sm text-text-tertiary line-clamp-2 leading-relaxed">
                  {{ item.description }}
                </p>
              </button>
            </div>

            <!-- Message si aucun élément -->
            <div 
              v-if="items.length === 0"
              class="text-center py-12 border-2 border-dashed border-border-secondary rounded-xl"
            >
              <svg class="w-12 h-12 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="text-lg font-semibold text-text-primary mb-2">Aucun élément de preuve</h3>
              <p class="text-text-tertiary">Cette catégorie n'a pas encore d'éléments de preuve.</p>
            </div>
          </div>

          <!-- Affichage du média (droite) -->
          <div class="lg:col-span-3">
            <div class="sticky top-28">
              <!-- Prévisualisation du média -->
              <div class="bg-bg-secondary border border-border-primary rounded-2xl overflow-hidden mb-6 min-h-[400px] flex items-center justify-center">
                <!-- Image -->
                <img 
                  v-if="selectedItem?.mediaType === 'image' && selectedItem?.mediaUrl"
                  :src="selectedItem.mediaUrl"
                  :alt="selectedItem.title"
                  class="w-full h-full object-cover"
                  @error="onMediaError"
                />
                
                <!-- Vidéo -->
                <div 
                  v-else-if="selectedItem?.mediaType === 'video' && selectedItem?.mediaUrl"
                  class="w-full h-full flex items-center justify-center"
                >
                  <!-- YouTube/Vimeo Embed -->
                  <iframe
                    v-if="isYouTubeOrVimeo(selectedItem.mediaUrl)"
                    :src="getEmbedUrl(selectedItem.mediaUrl)"
                    class="w-full h-full min-h-[400px]"
                    frameborder="0"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                  <!-- Regular Video File -->
                  <video
                    v-else
                    :src="selectedItem.mediaUrl"
                    controls
                    class="w-full h-full"
                    @error="onMediaError"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>

                <!-- Placeholder si aucun média sélectionné -->
                <div 
                  v-else
                  class="text-center p-8"
                >
                  <div class="w-20 h-20 mx-auto mb-4 bg-bg-primary rounded-2xl flex items-center justify-center">
                    <svg class="w-10 h-10 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-text-primary mb-2">Sélectionnez un élément</h3>
                  <p class="text-text-tertiary">Cliquez sur un élément de preuve à gauche pour voir le média associé</p>
                </div>
              </div>

              <!-- Détails de l'élément sélectionné -->
              <div 
                v-if="selectedItem"
                class="bg-bg-secondary border border-border-primary rounded-2xl p-6"
              >
                <div class="flex items-start gap-3 mb-4">
                  <span 
                    :class="getOriginTagClass(selectedItem.originTag)"
                    class="px-3 py-1 text-sm font-medium rounded-full"
                  >
                    {{ selectedItem.originTag }}
                  </span>
                  <span class="text-sm text-text-secondary">
                    {{ selectedItem.mediaType === 'video' ? '🎥 Vidéo' : '🖼️ Image' }}
                  </span>
                </div>
                
                <h3 class="text-xl font-bold text-text-primary mb-3">
                  {{ selectedItem.title }}
                </h3>
                
                <div class="prose prose-sm max-w-none text-text-secondary">
                  <p class="leading-relaxed whitespace-pre-line">{{ selectedItem.description }}</p>
                </div>
                
                <!-- Source Link -->
                <div 
                  v-if="selectedItem.sourceUrl"
                  class="mt-4 pt-4 border-t border-border-secondary"
                >
                  <a 
                    :href="selectedItem.sourceUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Voir la source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import { usePortfolioMode } from '~/composables/usePortfolioMode'

// Route management
const route = useRoute()
const competenceSlug = computed(() => route.params.competence as string)
const categorySlug = computed(() => route.params.category as string)

// Portfolio mode management
const { setMode } = usePortfolioMode()

// Data management
const {
  mainCompetences,
  proofCategories,
  proofItems,
  fetchMainCompetences,
  fetchProofCategories,
  fetchProofItems
} = usePortfolioDatabase()

// Selected item state
const selectedItem = ref(null)

// Computed properties
const competence = computed(() => {
  return mainCompetences.value?.find(comp => comp.slug === competenceSlug.value)
})

const category = computed(() => {
  return proofCategories.value?.find(cat => 
    cat.slug === categorySlug.value && 
    cat.mainCompetenceId === competence.value?.id
  )
})

const items = computed(() => {
  if (!category.value) return []
  return proofItems.value
    ?.filter(item => item.proofCategoryId === category.value.id)
    ?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []
})

// Helper functions
const getOriginTagClass = (tag: string) => {
  const classes = {
    'STAGE': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'PERSONNEL': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'SCOLAIRE': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'INITIATIVE': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  }
  return classes[tag as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const selectItem = (item) => {
  selectedItem.value = item
}

const switchToPro = async () => {
  setMode('pro')
  await navigateTo('/')
}

const onMediaError = () => {
  console.warn('Erreur de chargement du média:', selectedItem.value?.mediaUrl)
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

// Auto-select first item when items change
watch(items, (newItems) => {
  if (newItems.length > 0 && !selectedItem.value) {
    selectedItem.value = newItems[0]
  }
}, { immediate: true })

// 404 handling
onMounted(async () => {
  await Promise.all([
    fetchMainCompetences(),
    fetchProofCategories(),
    fetchProofItems()
  ])
  
  // Check if competence and category exist
  if (!competence.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Compétence "${competenceSlug.value}" non trouvée`
    })
  }
  
  if (!category.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Catégorie "${categorySlug.value}" non trouvée dans la compétence "${competence.value.title}"`
    })
  }
})

// SEO
useHead(() => ({
  title: `${category.value?.title || 'Catégorie'} - ${competence.value?.title || 'Compétence'} - Portfolio Étudiant`,
  meta: [
    { name: 'description', content: `Découvrez les preuves concrètes de "${category.value?.title}" dans ma compétence "${competence.value?.title}".` },
    { name: 'robots', content: 'index, follow' }
  ]
}))
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.3s ease;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Link styling */
a {
  text-decoration: none;
}

/* Prose styles for description */
.prose p {
  margin-bottom: 1rem;
}

.prose p:last-child {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .sticky {
    position: static;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .lg\\:col-span-2 {
    order: 2;
  }
  
  .lg\\:col-span-3 {
    order: 1;
  }
}
</style>