<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ isEdit ? 'Modifier le Bloc Bento' : 'Nouveau Bloc Bento' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Info -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre du Bloc *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: À propos, Projets..."
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de Bloc *
                </label>
                <select
                  v-model="form.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Text">Texte</option>
                  <option value="Image">Image</option>
                  <option value="Skills">Compétences</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Social">Réseaux Sociaux</option>
                  <option value="Timeline">Timeline</option>
                  <option value="Form">Formulaire</option>
                  <option value="Info">Information</option>
                  <option value="Custom">Personnalisé</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Taille du Bloc (colonnes) *
                </label>
                <select
                  v-model="form.colSpan"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="3">3 colonnes (1/4)</option>
                  <option value="4">4 colonnes (1/3)</option>
                  <option value="6">6 colonnes (1/2)</option>
                  <option value="8">8 colonnes (2/3)</option>
                  <option value="9">9 colonnes (3/4)</option>
                  <option value="12">12 colonnes (pleine largeur)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gradient de Fond
                </label>
                <select
                  v-model="form.gradient"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="from-blue-500 to-purple-600">Bleu vers Violet</option>
                  <option value="from-green-500 to-blue-500">Vert vers Bleu</option>
                  <option value="from-yellow-500 to-red-500">Jaune vers Rouge</option>
                  <option value="from-purple-500 to-pink-500">Violet vers Rose</option>
                  <option value="from-indigo-500 to-purple-500">Indigo vers Violet</option>
                  <option value="from-teal-500 to-green-500">Teal vers Vert</option>
                  <option value="from-orange-500 to-red-500">Orange vers Rouge</option>
                  <option value="from-pink-500 to-rose-500">Rose vers Rose</option>
                  <option value="from-gray-500 to-gray-700">Gris</option>
                </select>
              </div>
            </div>

            <!-- Content Configuration -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordre d'Affichage
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="1, 2, 3..."
                >
                <p class="text-xs text-gray-500 mt-1">Ordre d'affichage dans la grille</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Composant Vue (optionnel)
                </label>
                <input
                  v-model="form.component"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ex: ProfileSection, ProjectsSection..."
                >
                <p class="text-xs text-gray-500 mt-1">Nom du composant Vue à utiliser</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Configuration Mobile
                </label>
                <select
                  v-model="form.mobileColSpan"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="4">4 colonnes (pleine largeur mobile)</option>
                  <option value="2">2 colonnes (demi-largeur mobile)</option>
                </select>
              </div>

              <div class="flex items-center">
                <input
                  v-model="form.visible"
                  type="checkbox"
                  id="visible"
                  class="mr-2"
                >
                <label for="visible" class="text-sm text-gray-700 dark:text-gray-300">
                  Visible sur le portfolio
                </label>
              </div>
            </div>
          </div>

          <!-- Fields Configuration -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Configuration des Champs
            </label>
            <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4 space-y-3">
              <div
                v-for="(field, index) in form.fields"
                :key="index"
                class="flex space-x-2 items-center bg-gray-50 dark:bg-gray-700 p-3 rounded"
              >
                <select
                  v-model="field.type"
                  class="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                  <option value="text">Texte</option>
                  <option value="image">Image</option>
                  <option value="link">Lien</option>
                  <option value="list">Liste</option>
                  <option value="pills">Pastilles</option>
                  <option value="icon">Icône</option>
                </select>
                <input
                  v-model="field.label"
                  type="text"
                  placeholder="Label du champ"
                  class="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                <input
                  v-model="field.key"
                  type="text"
                  placeholder="clé"
                  class="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                >
                <button
                  type="button"
                  @click="removeField(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                @click="addField"
                class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un champ
              </button>
            </div>
          </div>

          <!-- Preview -->
          <div class="border border-gray-200 dark:border-gray-600 rounded-md p-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Aperçu
            </label>
            <div
              :class="`col-span-${form.colSpan} bg-gradient-to-r ${form.gradient} rounded-lg p-4 flex items-center justify-center text-white font-medium min-h-[100px]`"
            >
              <div class="text-center">
                <div class="text-lg mb-1">{{ form.title || 'Titre du bloc' }}</div>
                <div class="text-sm opacity-80">{{ form.type || 'Type' }}</div>
                <div class="text-xs opacity-60 mt-1">{{ form.colSpan }} colonnes</div>
              </div>
            </div>
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
              class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
  block?: any
}>()

const emit = defineEmits<{
  close: []
  save: [blockData: any]
}>()

const isEdit = computed(() => !!props.block)

// Form data
const form = ref({
  title: '',
  type: '',
  colSpan: 6,
  mobileColSpan: 4,
  gradient: 'from-blue-500 to-purple-600',
  order: 1,
  component: '',
  visible: true,
  fields: []
})

// Initialize form with block data if editing
watch(() => props.block, (block) => {
  if (block) {
    form.value = {
      title: block.title || '',
      type: block.type || '',
      colSpan: block.colSpan || 6,
      mobileColSpan: block.mobileColSpan || 4,
      gradient: block.gradient || 'from-blue-500 to-purple-600',
      order: block.order || 1,
      component: block.component || '',
      visible: block.visible !== false,
      fields: block.fields ? [...block.fields] : []
    }
  } else {
    // Reset form for new block
    form.value = {
      title: '',
      type: '',
      colSpan: 6,
      mobileColSpan: 4,
      gradient: 'from-blue-500 to-purple-600',
      order: 1,
      component: '',
      visible: true,
      fields: []
    }
  }
}, { immediate: true })

// Field management
const addField = () => {
  form.value.fields.push({ type: 'text', label: '', key: '' })
}

const removeField = (index: number) => {
  form.value.fields.splice(index, 1)
}

// Form submission
const handleSubmit = () => {
  const cleanedForm = {
    ...form.value,
    title: form.value.title.trim(),
    component: form.value.component.trim(),
    fields: form.value.fields.filter(field => field.label.trim() && field.key.trim())
  }
  
  emit('save', cleanedForm)
}
</script>