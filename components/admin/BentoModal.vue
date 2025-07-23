<template>
  <div 
    class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    @click="handleBackdropClick"
    @keydown.esc="$emit('close')"
  >
    <div 
      class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-bold text-text-primary">
            {{ isEdit ? 'Modifier le Bloc Bento' : 'Nouveau Bloc Bento' }}
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
          <div class="space-y-6">
            <!-- Basic Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Titre du Bloc *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  placeholder="Ex: À propos, Projets..."
                >
              </div>

              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Type de Bloc *
                </label>
                <select
                  v-model="form.type"
                  required
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
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
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Taille du Bloc (colonnes) *
                </label>
                <select
                  v-model="form.colSpan"
                  required
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
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
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Couleur de Fond
                </label>
                <select
                  v-model="form.backgroundColor"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                >
                  <option value="bg-blue-500">Bleu</option>
                  <option value="bg-green-500">Vert</option>
                  <option value="bg-purple-500">Violet</option>
                  <option value="bg-red-500">Rouge</option>
                  <option value="bg-yellow-500">Jaune</option>
                  <option value="bg-indigo-500">Indigo</option>
                  <option value="bg-pink-500">Rose</option>
                  <option value="bg-teal-500">Teal</option>
                  <option value="bg-orange-500">Orange</option>
                  <option value="bg-gray-500">Gris</option>
                  <option value="bg-slate-700">Ardoise</option>
                  <option value="bg-emerald-500">Émeraude</option>
                </select>
              </div>
            </div>

            <!-- Content Configuration -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Ordre d'Affichage
                </label>
                <input
                  v-model.number="form.order"
                  type="number"
                  min="1"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  placeholder="1, 2, 3..."
                >
                <p class="text-xs text-text-tertiary mt-2">Ordre d'affichage dans la grille</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Composant Vue (optionnel)
                </label>
                <input
                  v-model="form.component"
                  type="text"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  placeholder="Ex: ProfileSection, ProjectsSection..."
                >
                <p class="text-xs text-text-tertiary mt-2">Nom du composant Vue à utiliser</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Configuration Mobile
                </label>
                <select
                  v-model="form.mobileColSpan"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
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
                <label for="visible" class="text-sm text-text-primary">
                  Visible sur le portfolio
                </label>
              </div>
            </div>
          </div>

          <!-- Fields Configuration -->
          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Configuration des Champs
            </label>
            <div class="border border-border-primary rounded-2xl p-6 space-y-4 bg-bg-secondary">
              <div
                v-for="(field, index) in form.fields"
                :key="index"
                class="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3 items-stretch lg:items-center bg-bg-tertiary p-4 rounded-xl"
              >
                <select
                  v-model="field.type"
                  class="flex-1 px-3 py-2 text-sm border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary"
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
                  class="flex-1 px-3 py-2 text-sm border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                >
                <input
                  v-model="field.key"
                  type="text"
                  placeholder="clé"
                  class="flex-1 px-3 py-2 text-sm border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                >
                <button
                  type="button"
                  @click="removeField(index)"
                  class="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl p-2 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                @click="addField"
                class="text-accent text-sm hover:text-accent/80 flex items-center font-medium"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un champ
              </button>
            </div>
          </div>

          <!-- Preview -->
          <div class="border border-border-primary rounded-2xl p-6 bg-bg-secondary">
            <label class="block text-sm font-semibold text-text-primary mb-4">
              Aperçu
            </label>
            <div
              :class="`col-span-${form.colSpan} ${form.backgroundColor} rounded-xl p-4 flex items-center justify-center text-white font-medium min-h-[100px]`"
            >
              <div class="text-center">
                <div class="text-lg mb-1">{{ form.title || 'Titre du bloc' }}</div>
                <div class="text-sm opacity-80">{{ form.type || 'Type' }}</div>
                <div class="text-xs opacity-60 mt-1">{{ form.colSpan }} colonnes</div>
              </div>
            </div>
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
  backgroundColor: 'bg-blue-500',
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
      backgroundColor: block.backgroundColor || block.gradient || 'bg-blue-500', // Support legacy gradient
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
      backgroundColor: 'bg-blue-500',
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

// UX: Handle backdrop click
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
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