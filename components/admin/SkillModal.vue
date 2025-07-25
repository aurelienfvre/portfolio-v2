<template>
  <div 
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="handleBackdropClick"
    @keydown.esc="$emit('close')"
  >
    <div 
      class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-bold text-text-primary">
            {{ isEdit ? 'Modifier la Compétence' : 'Nouvelle Compétence' }}
          </h3>
          <button 
            @click="$emit('close')" 
            class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Nom de la Compétence *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
              placeholder="Ex: Vue.js, PHP, Design..."
            >
          </div>

          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Catégorie *
            </label>
            <div class="space-y-3">
              <select
                v-model="form.category"
                required
                class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                @change="handleCategoryChange"
              >
                <option value="">Sélectionner une catégorie</option>
                <option v-for="category in existingCategories" :key="category" :value="category">
                  {{ category }}
                </option>
                <option value="__new__">+ Créer une nouvelle catégorie</option>
              </select>
              
              <div v-if="showNewCategoryInput" class="flex space-x-2">
                <input
                  v-model="newCategoryName"
                  type="text"
                  placeholder="Nom de la nouvelle catégorie"
                  class="flex-1 px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  @keydown.enter="handleNewCategory"
                >
                <button
                  type="button"
                  @click="handleNewCategory"
                  class="px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-sm font-medium"
                >
                  Créer
                </button>
                <button
                  type="button"
                  @click="cancelNewCategory"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors text-sm font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              URL de l'Icône
            </label>
            <input
              v-model="form.icon"
              type="url"
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
              placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/..."
            >
            <p class="text-xs text-text-tertiary mt-2">
              Vous pouvez utiliser les icônes de 
              <a href="https://devicon.dev/" target="_blank" class="text-accent hover:text-accent/80 font-medium">devicon.dev</a>
            </p>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.invert"
              type="checkbox"
              id="invert"
              class="mr-2"
            >
            <label for="invert" class="text-sm text-text-primary">
              Inverser les couleurs (pour le mode sombre)
            </label>
          </div>

          <!-- Preview -->
          <div v-if="form.icon || form.name" class="border border-border-primary rounded-2xl p-6 bg-bg-secondary">
            <label class="block text-sm font-semibold text-text-primary mb-4">
              Aperçu
            </label>
            <div class="flex items-center space-x-4">
              <img
                v-if="form.icon"
                :src="form.icon"
                :alt="form.name"
                class="w-10 h-10"
                :class="{ 'filter invert': form.invert }"
              >
              <div v-else class="w-10 h-10 bg-bg-tertiary border border-border-primary rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-text-primary font-semibold text-lg">{{ form.name || 'Nom de la compétence' }}</span>
            </div>
          </div>

          <!-- Level (optional for future use) -->
          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Niveau (optionnel)
            </label>
            <select
              v-model="form.level"
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
            >
              <option value="">Non spécifié</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4 pt-8 border-t border-border-primary">
            <button
              type="button"
              @click="$emit('close')"
              class="px-6 py-3 text-text-secondary border border-border-primary rounded-2xl hover:bg-bg-secondary hover:text-text-primary transition-all duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-accent text-bg-primary rounded-2xl hover:bg-accent/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              {{ isEdit ? 'Modifier' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'

const props = defineProps<{
  skill?: any
  existingCategories?: string[]
}>()

const emit = defineEmits<{
  close: []
  save: [skillData: any]
}>()

const isEdit = computed(() => !!props.skill)

// Form data
const form = ref({
  name: '',
  category: '',
  icon: '',
  invert: false,
  level: ''
})

// New category functionality
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')
const existingCategories = computed(() => props.existingCategories || [])

// Initialize form with skill data if editing
watch(() => props.skill, (skill) => {
  if (skill) {
    form.value = {
      name: skill.name || '',
      category: skill.category || '',
      icon: skill.icon || '',
      invert: skill.invert || false,
      level: skill.level || ''
    }
  } else {
    // Reset form for new skill
    form.value = {
      name: '',
      category: '',
      icon: '',
      invert: false,
      level: ''
    }
  }
}, { immediate: true })

// Category management
const handleCategoryChange = () => {
  if (form.value.category === '__new__') {
    showNewCategoryInput.value = true
    form.value.category = ''
  } else {
    showNewCategoryInput.value = false
  }
}

const handleNewCategory = () => {
  if (newCategoryName.value.trim()) {
    form.value.category = newCategoryName.value.trim()
    showNewCategoryInput.value = false
    newCategoryName.value = ''
  }
}

const cancelNewCategory = () => {
  showNewCategoryInput.value = false
  newCategoryName.value = ''
  form.value.category = ''
}

// UX: Handle backdrop click
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

// UX: Handle ESC key
const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

// Add/remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})

// Form submission
const handleSubmit = () => {
  const cleanedForm = {
    ...form.value,
    name: form.value.name.trim(),
    category: form.value.category.trim(),
    icon: form.value.icon.trim(),
    level: typeof form.value.level === 'string' ? form.value.level.trim() : form.value.level
  }
  
  emit('save', cleanedForm)
}
</script>