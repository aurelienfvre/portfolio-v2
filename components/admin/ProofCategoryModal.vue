<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border-secondary">
        <h2 class="text-2xl font-bold text-text-primary">
          {{ category?.id ? 'Modifier' : 'Ajouter' }} une Catégorie de Preuve
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
        <!-- Compétence Principale -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Compétence Principale *
          </label>
          <select
            v-model="form.mainCompetenceId"
            required
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Sélectionner une compétence</option>
            <option
              v-for="comp in mainCompetences"
              :key="comp.id"
              :value="comp.id"
            >
              {{ comp.title }} - {{ comp.subtitle }}
            </option>
          </select>
        </div>

        <!-- Titre -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Titre de la Catégorie *
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="Ex: Maîtrise des Frameworks Front-End"
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
        </div>

        <!-- Sous-titre -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Sous-titre descriptif
          </label>
          <input
            v-model="form.subtitle"
            type="text"
            placeholder="Ex: De Vue.js à React, jusqu'à l'exploration de React Native"
            class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-medium text-text-primary mb-2">
            Slug URL *
          </label>
          <div class="relative">
            <input
              v-model="form.slug"
              type="text"
              required
              placeholder="frameworks-front-end"
              class="w-full px-4 py-3 border border-border-secondary rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
            <button
              type="button"
              @click="generateSlug"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-500 hover:text-blue-600 font-medium"
            >
              Auto-générer
            </button>
          </div>
          <p class="text-xs text-text-tertiary mt-1">
            URL finale : /developper/{{ form.slug || 'slug-auto' }}
          </p>
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
            :disabled="!form.title || !form.slug || !form.mainCompetenceId"
            class="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {{ category?.id ? 'Modifier' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface MainCompetence {
  id: number
  title: string
  subtitle: string
  slug: string
}

interface ProofCategory {
  id?: number
  mainCompetenceId: number
  title: string
  subtitle: string
  slug: string
  order: number
}

// Props
const props = defineProps<{
  category?: ProofCategory | { mainCompetenceId: number }
  mainCompetences: MainCompetence[]
}>()

// Emits
const emit = defineEmits<{
  close: []
  save: [category: ProofCategory]
}>()

// Form state
const form = ref({
  mainCompetenceId: 0,
  title: '',
  subtitle: '',
  slug: '',
  order: 0
})

// Populate form on mount or when category changes
const populateForm = () => {
  if (props.category) {
    if ('title' in props.category) {
      // Editing existing category
      form.value = {
        mainCompetenceId: props.category.mainCompetenceId,
        title: props.category.title,
        subtitle: props.category.subtitle || '',
        slug: props.category.slug,
        order: props.category.order || 0
      }
    } else if ('mainCompetenceId' in props.category) {
      // New category with pre-selected competence
      form.value = {
        mainCompetenceId: props.category.mainCompetenceId,
        title: '',
        subtitle: '',
        slug: '',
        order: 0
      }
    }
  }
}

onMounted(() => {
  populateForm()
})

watch(() => props.category, () => {
  populateForm()
}, { deep: true })

// Auto-generate slug from title
const generateSlug = () => {
  if (form.value.title) {
    form.value.slug = form.value.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Keep only letters, numbers, spaces, and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-') // Remove leading/trailing hyphens
  }
}

// Auto-generate slug when title changes
watch(() => form.value.title, () => {
  if (form.value.title && !form.value.slug) {
    generateSlug()
  }
})

// Handle form submission
const handleSubmit = () => {
  const categoryData: ProofCategory = {
    mainCompetenceId: form.value.mainCompetenceId,
    title: form.value.title,
    subtitle: form.value.subtitle,
    slug: form.value.slug,
    order: form.value.order
  }

  // Add ID if editing
  if (props.category && 'id' in props.category && props.category.id) {
    (categoryData as any).id = props.category.id
  }

  emit('save', categoryData)
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
select:focus {
  outline: none;
}

/* Button hover states */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
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
</style>