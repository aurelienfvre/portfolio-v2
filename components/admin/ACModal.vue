<template>
  <div 
    class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
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
            {{ isEdit ? 'Modifier l\'AC' : 'Nouvel AC' }}
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
              Titre de l'AC *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
              placeholder="Ex: AC11.01 - Installer et configurer un poste de travail"
            >
          </div>

          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Description *
            </label>
            <textarea
              v-model="form.description"
              required
              rows="4"
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
              placeholder="Description détaillée de l'apprentissage critique..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Projet Associé
            </label>
            <input
              v-model="form.project"
              type="text"
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
              placeholder="Nom du projet ou contexte"
            >
          </div>

          <div v-if="!isEdit">
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Assigner à
            </label>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-text-secondary mb-2">Année</label>
                <select
                  v-model="form.yearIndex"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                >
                  <option v-for="(year, index) in availableYears" :key="index" :value="index">
                    {{ year.title }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-text-secondary mb-2">Compétence</label>
                <select
                  v-model="form.competenceIndex"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                >
                  <option v-for="(competence, index) in availableCompetences" :key="index" :value="index">
                    {{ competence.name }} ({{ competence.code }})
                  </option>
                </select>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  ac?: any
  indices?: { yearIndex: number, competenceIndex: number, acIndex: number }
  availableYears?: any[]
}>()

const emit = defineEmits<{
  close: []
  save: [acData: any, yearIndex: number, competenceIndex: number]
}>()

const isEdit = computed(() => !!props.ac?.title)

// Form data
const form = ref({
  title: '',
  description: '',
  project: '',
  yearIndex: 0,
  competenceIndex: 0
})

// Available competences based on selected year
const availableCompetences = computed(() => {
  if (props.availableYears && props.availableYears[form.value.yearIndex]) {
    return props.availableYears[form.value.yearIndex].skills || []
  }
  return []
})

// Initialize form with AC data if editing
watch(() => props.ac, (ac) => {
  if (ac && ac.title) {
    form.value = {
      title: ac.title || '',
      description: ac.description || '',
      project: ac.project || '',
      yearIndex: props.indices?.yearIndex || 0,
      competenceIndex: props.indices?.competenceIndex || 0
    }
  } else {
    // Reset form for new AC
    form.value = {
      title: '',
      description: '',
      project: '',
      yearIndex: props.indices?.yearIndex || 0,
      competenceIndex: props.indices?.competenceIndex || 0
    }
  }
}, { immediate: true })

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
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    project: form.value.project.trim()
  }
  
  emit('save', cleanedForm, form.value.yearIndex, form.value.competenceIndex)
}
</script>