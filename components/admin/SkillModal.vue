<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ isEdit ? 'Modifier la Compétence' : 'Nouvelle Compétence' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom de la Compétence *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: Vue.js, PHP, Design..."
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catégorie *
            </label>
            <select
              v-model="form.category"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Technologies">Technologies</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Outils">Outils</option>
              <option value="Frameworks">Frameworks</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL de l'Icône
            </label>
            <input
              v-model="form.icon"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/..."
            >
            <p class="text-xs text-gray-500 mt-1">
              Vous pouvez utiliser les icônes de 
              <a href="https://devicon.dev/" target="_blank" class="text-blue-600 hover:text-blue-800">devicon.dev</a>
            </p>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.invert"
              type="checkbox"
              id="invert"
              class="mr-2"
            >
            <label for="invert" class="text-sm text-gray-700 dark:text-gray-300">
              Inverser les couleurs (pour le mode sombre)
            </label>
          </div>

          <!-- Preview -->
          <div v-if="form.icon || form.name" class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aperçu
            </label>
            <div class="flex items-center space-x-3">
              <img
                v-if="form.icon"
                :src="form.icon"
                :alt="form.name"
                class="w-8 h-8"
                :class="{ 'filter invert': form.invert }"
              >
              <div v-else class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-gray-900 dark:text-white font-medium">{{ form.name || 'Nom de la compétence' }}</span>
            </div>
          </div>

          <!-- Level (optional for future use) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Niveau (optionnel)
            </label>
            <select
              v-model="form.level"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Non spécifié</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  skill?: any
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

// Form submission
const handleSubmit = () => {
  const cleanedForm = {
    ...form.value,
    name: form.value.name.trim(),
    category: form.value.category.trim(),
    icon: form.value.icon.trim(),
    level: form.value.level.trim()
  }
  
  emit('save', cleanedForm)
}
</script>