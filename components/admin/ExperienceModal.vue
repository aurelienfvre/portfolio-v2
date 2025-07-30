<template>
  <div 
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="handleBackdropClick"
    @keydown.esc="$emit('close')"
  >
    <div 
      class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <div class="p-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-2xl font-bold text-text-primary">
            {{ isEdit ? 'Modifier les Expériences' : 'Créer un Bloc Expériences' }}
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
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Titre du bloc -->
          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Titre du bloc *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="Ex: Mes Expériences, Parcours Professionnel..."
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
            />
          </div>

          <!-- Taille du bloc -->
          <div>
            <label class="block text-sm font-semibold text-text-primary mb-3">
              Taille du bloc
            </label>
            <select
              v-model="form.colSpan"
              class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
            >
              <option value="4">Petit (4 colonnes)</option>
              <option value="6">Moyen (6 colonnes)</option>
              <option value="8">Grand (8 colonnes)</option>
              <option value="12">Pleine largeur (12 colonnes)</option>
            </select>
          </div>

          <!-- Liste des expériences -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-semibold text-text-primary">Expériences</h4>
              <button
                type="button"
                @click="addExperience"
                class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter une expérience
              </button>
            </div>

            <!-- Expériences existantes -->
            <div v-if="experiences.length > 0" class="space-y-4 max-h-96 overflow-y-auto">
              <div
                v-for="(exp, index) in experiences"
                :key="index"
                class="border border-border-primary rounded-2xl p-4 bg-bg-secondary"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-2">
                      Poste *
                    </label>
                    <input
                      v-model="exp.position"
                      type="text"
                      required
                      placeholder="Ex: Développeur Front-End"
                      class="w-full px-3 py-2 border border-border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-2">
                      Entreprise *
                    </label>
                    <input
                      v-model="exp.company"
                      type="text"
                      required
                      placeholder="Ex: Entreprise SAS"
                      class="w-full px-3 py-2 border border-border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                    />
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-2">
                      Période *
                    </label>
                    <input
                      v-model="exp.period"
                      type="text"
                      required
                      placeholder="Ex: 2023 - Présent"
                      class="w-full px-3 py-2 border border-border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                    />
                  </div>
                  <div class="flex items-end">
                    <button
                      type="button"
                      @click="removeExperience(index)"
                      class="w-full px-4 py-2 text-red-500 border border-red-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-2">
                    Description (optionnel)
                  </label>
                  <textarea
                    v-model="exp.description"
                    rows="3"
                    placeholder="Décrivez vos missions et réalisations..."
                    class="w-full px-3 py-2 border border-border-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Message si aucune expérience -->
            <div v-else class="text-center py-8 border-2 border-dashed border-border-secondary rounded-xl">
              <div class="text-text-tertiary mb-2">Aucune expérience ajoutée</div>
              <button
                type="button"
                @click="addExperience"
                class="text-accent hover:text-accent/80 font-medium"
              >
                Cliquez pour ajouter votre première expérience
              </button>
            </div>
          </div>

          <!-- Visibilité -->
          <div class="flex items-center">
            <input
              v-model="form.visible"
              type="checkbox"
              id="visible"
              class="mr-3"
            />
            <label for="visible" class="text-sm text-text-primary">
              Afficher ce bloc sur le portfolio
            </label>
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
  colSpan: 8,
  visible: true,
  order: 0
})

const experiences = ref([])

// Initialize form with block data if editing
watch(() => props.block, (block) => {
  if (block) {
    form.value = {
      title: block.title || '',
      colSpan: block.colSpan || 8,
      visible: block.visible !== undefined ? block.visible : true,
      order: block.order || 0
    }
    
    // Parse experiences from content
    try {
      const content = typeof block.content === 'string' ? JSON.parse(block.content) : block.content
      experiences.value = content?.experiences || []
    } catch (e) {
      console.error('Error parsing experience content:', e)
      experiences.value = []
    }
  } else {
    // Reset form for new block
    form.value = {
      title: 'Mes Expériences',
      colSpan: 8,
      visible: true,
      order: 0
    }
    experiences.value = []
  }
}, { immediate: true })

// Experience management
const addExperience = () => {
  experiences.value.push({
    position: '',
    company: '',
    period: '',
    description: ''
  })
}

const removeExperience = (index: number) => {
  experiences.value.splice(index, 1)
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
  const blockData = {
    ...form.value,
    type: 'experience',
    content: JSON.stringify({
      experiences: experiences.value.filter(exp => exp.position && exp.company && exp.period)
    })
  }
  
  emit('save', blockData)
}
</script>