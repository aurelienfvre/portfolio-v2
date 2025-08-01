<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="$emit('close')"
  >
    <div 
      class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border-secondary sticky top-0 bg-white">
        <h2 class="text-2xl font-bold text-text-primary">
          {{ item?.id ? 'Modifier' : 'Ajouter' }} un Élément de Preuve
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Catégorie de Preuve -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Catégorie de Preuve *
          </label>
          <select
            v-model="form.proofCategoryId"
            required
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Sélectionner une catégorie</option>
            <option
              v-for="category in proofCategories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.mainCompetence?.title }} > {{ category.title }}
            </option>
          </select>
        </div>

        <!-- Titre -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Titre de l'Élément *
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Ex: [STAGE] Adaptation à l'écosystème React"
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
        </div>

        <!-- Origin Tag -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Type d'Origine *
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label
              v-for="tag in originTags"
              :key="tag.value"
              class="flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all"
              :class="form.originTag === tag.value 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-border-secondary hover:border-border-primary'"
            >
              <input
                v-model="form.originTag"
                type="radio"
                :value="tag.value"
                class="sr-only"
                required
              >
              <div class="text-center">
                <div class="text-lg mb-1">{{ tag.emoji }}</div>
                <div class="text-xs font-medium">{{ tag.label }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Description détaillée
          </label>
          <textarea
            v-model="form.description"
            rows="6"
            placeholder="Décrivez en détail cette preuve de compétence..."
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-y"
          ></textarea>
        </div>

        <!-- Source URL -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Lien Source (optionnel)
          </label>
          <input
            v-model="form.sourceUrl"
            type="url"
            placeholder="https://exemple.com/projet ou https://github.com/user/repo"
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
          <p class="text-xs text-text-tertiary mt-1">
            Ajoutez un lien vers le site web, dépôt GitHub, ou toute source liée à cette preuve
          </p>
        </div>

        <!-- Skills Selector -->
        <div>
          <SkillSelector
            v-model="form.skills"
            :available-skills="availableSkills"
          />
        </div>

        <!-- Médias -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <label class="block text-sm font-medium text-text-primary">
              Médias (Images/Vidéos)
            </label>
            <button
              type="button"
              @click="addMedia"
              class="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un média
            </button>
          </div>

          <!-- Liste des médias -->
          <div class="space-y-4">
            <!-- Media unique (backward compatibility) -->
            <div v-if="form.mediaUrls.length === 0" class="border border-border-secondary rounded-xl p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-text-primary">Média Principal</h4>
                <button
                  type="button"
                  @click="convertToMultiple"
                  class="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Passer en mode multiple
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Type de média -->
                <div>
                  <label class="block text-xs font-medium text-text-primary mb-2">Type</label>
                  <div class="flex gap-2">
                    <label class="flex items-center p-2 border rounded-lg cursor-pointer transition-all flex-1"
                      :class="form.mediaType === 'image' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-border-secondary hover:border-border-primary'"
                    >
                      <input
                        v-model="form.mediaType"
                        type="radio"
                        value="image"
                        class="sr-only"
                      >
                      <div class="text-center w-full">
                        <div class="text-sm mb-1">🖼️</div>
                        <div class="text-xs font-medium">Image</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 border rounded-lg cursor-pointer transition-all flex-1"
                      :class="form.mediaType === 'video' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-border-secondary hover:border-border-primary'"
                    >
                      <input
                        v-model="form.mediaType"
                        type="radio"
                        value="video"
                        class="sr-only"
                      >
                      <div class="text-center w-full">
                        <div class="text-sm mb-1">🎥</div>
                        <div class="text-xs font-medium">Vidéo</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Upload du média -->
                <div class="md:col-span-2">
                  <ImageUpload
                    v-model="form.mediaUrl"
                    :label="form.mediaType === 'video' ? 'Vidéo ou Image' : 'Image'"
                    :file-type="form.mediaType === 'video' ? 'any' : 'image'"
                    :max-size-m-b="form.mediaType === 'video' ? 45 : 20"
                  />
                </div>
              </div>
            </div>

            <!-- Médias multiples -->
            <div 
              v-for="(media, index) in form.mediaUrls" 
              :key="index"
              class="border border-border-secondary rounded-xl p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-text-primary">Média {{ index + 1 }}</h4>
                <button
                  type="button"
                  @click="removeMedia(index)"
                  class="text-red-500 hover:text-red-600 p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Type de média -->
                <div>
                  <label class="block text-xs font-medium text-text-primary mb-2">Type</label>
                  <div class="flex gap-2">
                    <label class="flex items-center p-2 border rounded-lg cursor-pointer transition-all flex-1"
                      :class="media.type === 'image' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-border-secondary hover:border-border-primary'"
                    >
                      <input
                        v-model="media.type"
                        type="radio"
                        value="image"
                        class="sr-only"
                      >
                      <div class="text-center w-full">
                        <div class="text-sm mb-1">🖼️</div>
                        <div class="text-xs font-medium">Image</div>
                      </div>
                    </label>
                    <label class="flex items-center p-2 border rounded-lg cursor-pointer transition-all flex-1"
                      :class="media.type === 'video' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-border-secondary hover:border-border-primary'"
                    >
                      <input
                        v-model="media.type"
                        type="radio"
                        value="video"
                        class="sr-only"
                      >
                      <div class="text-center w-full">
                        <div class="text-sm mb-1">🎥</div>
                        <div class="text-xs font-medium">Vidéo</div>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Upload du média -->
                <div class="md:col-span-2">
                  <ImageUpload
                    v-model="media.url"
                    :label="media.type === 'video' ? 'Vidéo ou Image' : 'Image'"
                    :file-type="media.type === 'video' ? 'any' : 'image'"
                    :max-size-m-b="media.type === 'video' ? 45 : 20"
                  />
                </div>
              </div>

              <!-- Caption -->
              <div class="mt-4">
                <label class="block text-xs font-medium text-text-primary mb-2">
                  Légende (optionnelle)
                </label>
                <input
                  v-model="media.caption"
                  type="text"
                  placeholder="Description de ce média..."
                  class="w-full px-3 py-2 border border-border-secondary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                >
              </div>
            </div>

            <!-- Message si aucun média -->
            <div 
              v-if="form.mediaUrls.length === 0 && !form.mediaUrl"
              class="text-center py-8 border-2 border-dashed border-border-secondary rounded-xl"
            >
              <svg class="w-12 h-12 mx-auto mb-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-text-tertiary mb-2">Aucun média ajouté</p>
              <button
                type="button"
                @click="addMedia"
                class="text-blue-500 hover:text-blue-600 font-medium text-sm"
              >
                Cliquez pour ajouter un média
              </button>
            </div>
          </div>
        </div>

        <!-- Ordre -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Ordre d'affichage
          </label>
          <input
            v-model.number="form.order"
            type="number"
            min="0"
            placeholder="0"
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
          <p class="text-xs text-text-tertiary mt-1">
            Plus le nombre est petit, plus l'élément apparaît en premier
          </p>
        </div>

        <!-- Preview -->
        <div v-if="form.title || form.description" class="bg-bg-secondary rounded-xl p-4">
          <h3 class="text-sm font-medium text-text-primary mb-3">Aperçu</h3>
          <div class="bg-white rounded-lg p-3 border border-border-tertiary">
            <div class="flex items-center gap-2 mb-2">
              <span
                v-if="form.originTag"
                :class="getOriginTagClass(form.originTag)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ form.originTag }}
              </span>
              <span class="text-xs text-text-tertiary">
                {{ form.mediaType === 'video' ? '🎥' : '🖼️' }}
              </span>
            </div>
            <h4 class="font-medium text-text-primary text-sm mb-1">
              {{ form.title || 'Titre de l\'élément' }}
            </h4>
            <p class="text-xs text-text-tertiary line-clamp-2">
              {{ form.description || 'Description de l\'élément' }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-border-secondary">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-xl transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="!form.title || !form.originTag || !form.proofCategoryId"
            class="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ item?.id ? 'Modifier' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import ImageUpload from './ImageUpload.vue'
import SkillSelector from './SkillSelector.vue'

interface ProofCategory {
  id: number
  title: string
  mainCompetence?: {
    id: number
    title: string
  }
}

interface Skill {
  name: string
  icon?: string
  type: 'tech' | 'soft'
  invert?: boolean
}

interface MediaItem {
  url: string
  type: 'image' | 'video'
  caption?: string
}

interface ProofItem {
  id?: number
  proofCategoryId: number
  title: string
  description: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  mediaUrls?: MediaItem[]
  originTag: string
  sourceUrl?: string
  skills?: Skill[]
  order: number
}

// Props
const props = defineProps<{
  item?: ProofItem | { proofCategoryId: number }
  proofCategories: ProofCategory[]
  availableSkills?: any[]
}>()

// Emits
const emit = defineEmits<{
  close: []
  save: [item: ProofItem]
}>()

// Origin tags
const originTags = [
  { value: 'STAGE', label: 'Stage', emoji: '🏢' },
  { value: 'PERSONNEL', label: 'Personnel', emoji: '🚀' },
  { value: 'SCOLAIRE', label: 'Scolaire', emoji: '🎓' },
  { value: 'INITIATIVE', label: 'Initiative', emoji: '💡' }
]

// Form state
const form = ref({
  proofCategoryId: 0,
  title: '',
  description: '',
  mediaUrl: '',
  mediaType: 'image' as 'image' | 'video',
  mediaUrls: [] as MediaItem[],
  originTag: '',
  sourceUrl: '',
  skills: [] as Skill[],
  order: 0
})

// Populate form on mount or when item changes
const populateForm = () => {
  if (props.item) {
    if ('title' in props.item) {
      // Editing existing item
      form.value = {
        proofCategoryId: props.item.proofCategoryId,
        title: props.item.title,
        description: props.item.description || '',
        mediaUrl: props.item.mediaUrl || '',
        mediaType: props.item.mediaType || 'image',
        mediaUrls: props.item.mediaUrls || [],
        originTag: props.item.originTag,
        sourceUrl: props.item.sourceUrl || '',
        skills: props.item.skills || [],
        order: props.item.order || 0
      }
    } else if ('proofCategoryId' in props.item) {
      // New item with pre-selected category
      form.value = {
        proofCategoryId: props.item.proofCategoryId,
        title: '',
        description: '',
        mediaUrl: '',
        mediaType: 'image',
        mediaUrls: [],
        originTag: '',
        sourceUrl: '',
        skills: [],
        order: 0
      }
    }
  }
}

onMounted(() => {
  populateForm()
})

watch(() => props.item, () => {
  populateForm()
}, { deep: true })

// Get origin tag styling
const getOriginTagClass = (tag: string) => {
  const classes = {
    'STAGE': 'bg-blue-100 text-blue-800',
    'PERSONNEL': 'bg-green-100 text-green-800',
    'SCOLAIRE': 'bg-purple-100 text-purple-800',
    'INITIATIVE': 'bg-orange-100 text-orange-800'
  }
  return classes[tag as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// Media management functions
const addMedia = () => {
  form.value.mediaUrls.push({
    url: '',
    type: 'image',
    caption: ''
  })
}

const removeMedia = (index: number) => {
  form.value.mediaUrls.splice(index, 1)
}

const convertToMultiple = () => {
  if (form.value.mediaUrl) {
    form.value.mediaUrls.push({
      url: form.value.mediaUrl,
      type: form.value.mediaType,
      caption: ''
    })
  }
  form.value.mediaUrl = ''
}

// Handle form submission
const handleSubmit = () => {
  const itemData: ProofItem = {
    proofCategoryId: form.value.proofCategoryId,
    title: form.value.title,
    description: form.value.description,
    mediaUrl: form.value.mediaUrl,
    mediaType: form.value.mediaType,
    mediaUrls: form.value.mediaUrls,
    originTag: form.value.originTag,
    sourceUrl: form.value.sourceUrl,
    skills: form.value.skills,
    order: form.value.order
  }

  // Add ID if editing
  if (props.item && 'id' in props.item && props.item.id) {
    (itemData as any).id = props.item.id
  }

  emit('save', itemData)
}

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Modal backdrop blur effect */
.fixed {
  backdrop-filter: blur(4px);
}

/* Form input focus states */
input:focus,
select:focus,
textarea:focus {
  outline: none;
}

/* Button hover states */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal animation */
.fixed > div {
  animation: modalSlideIn 0.2s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Radio button custom styling */
input[type="radio"]:checked + div {
  transform: scale(1.05);
}

/* Textarea resize */
textarea {
  min-height: 120px;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}
</style>