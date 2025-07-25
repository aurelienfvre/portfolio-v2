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
            {{ isEdit ? 'Modifier le Projet' : 'Nouveau Projet' }}
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
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Info -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Titre du Projet *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  placeholder="Nom du projet"
                >
              </div>

              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  ID du Projet *
                </label>
                <input
                  v-model="form.id"
                  type="text"
                  required
                  :disabled="isEdit"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  placeholder="id-du-projet"
                >
              </div>

              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Description Courte *
                </label>
                <textarea
                  v-model="form.description"
                  required
                  rows="3"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                  placeholder="Description courte pour la carte"
                ></textarea>
              </div>

              <ImageUpload
                v-model="form.image"
                label="Image de Couverture"
                :show-existing-images="true"
                :existing-images="getAllProjectImages()"
              />
            </div>

            <!-- Technologies -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Technologies
                </label>
                
                <!-- Skills selector -->
                <div class="mb-4 p-4 bg-bg-tertiary rounded-xl">
                  <h4 class="text-sm font-medium text-text-primary mb-3">Sélectionner depuis les compétences</h4>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      v-for="skill in availableSkills"
                      :key="skill.name"
                      type="button"
                      @click="addTechnologyFromSkill(skill)"
                      :disabled="form.technologies.some(tech => tech.name === skill.name)"
                      class="flex items-center gap-2 p-2 text-left text-sm bg-bg-primary border border-border-primary rounded-lg hover:border-accent hover:bg-accent/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <img 
                        v-if="skill.icon" 
                        :src="skill.icon" 
                        :alt="skill.name"
                        class="w-4 h-4"
                        :class="{ 'filter invert': skill.invert }"
                      />
                      <span class="truncate text-text-primary">{{ skill.name }}</span>
                    </button>
                  </div>
                </div>
                
                <!-- Manual technologies -->
                <div class="space-y-3">
                  <div
                    v-for="(tech, index) in form.technologies"
                    :key="index"
                    class="bg-bg-tertiary p-4 rounded-xl space-y-3"
                  >
                    <div class="flex items-center space-x-2">
                      <img 
                        v-if="tech.icon" 
                        :src="tech.icon" 
                        :alt="tech.name"
                        class="w-6 h-6"
                        :class="{ 'filter invert': tech.invert }"
                      />
                      <input
                        v-model="tech.name"
                        type="text"
                        placeholder="Nom de la technologie"
                        class="flex-1 px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                      >
                      <button
                        type="button"
                        @click="removeTechnology(index)"
                        class="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl p-2 transition-all duration-200 shrink-0"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <input
                      v-model="tech.icon"
                      type="url"
                      placeholder="URL de l'icône"
                      class="w-full px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                    >
                    <label class="flex items-center">
                      <input
                        v-model="tech.invert"
                        type="checkbox"
                        class="mr-2"
                      >
                      <span class="text-sm text-text-tertiary">Inverser les couleurs (mode sombre)</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    @click="addTechnology"
                    class="text-accent text-sm hover:text-accent/80 flex items-center font-medium"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter une technologie manuellement
                  </button>
                </div>
              </div>

              <!-- Links -->
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Liens
                </label>
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-text-secondary mb-2">Site Web</label>
                    <input
                      v-model="form.links.website"
                      type="url"
                      class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary placeholder-text-tertiary transition-all duration-200"
                      placeholder="https://exemple.com"
                    >
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-text-secondary mb-2">GitHub</label>
                    <div class="space-y-2">
                      <div
                        v-for="(githubUrl, index) in form.links.github"
                        :key="index"
                        class="flex space-x-2"
                      >
                        <input
                          v-model="form.links.github[index]"
                          type="url"
                          class="flex-1 px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
                          placeholder="https://github.com/user/repo"
                        >
                        <button
                          type="button"
                          @click="removeGithubLink(index)"
                          class="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl p-2 transition-all duration-200 shrink-0"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        @click="addGithubLink"
                        class="text-accent text-sm hover:text-accent/80 flex items-center font-medium"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Ajouter un lien GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detailed Content -->
          <div>
            <WysiwygEditor
              v-model="form.detailedContent"
              label="Contenu Détaillé"
            />
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
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import ImageUpload from './ImageUpload.vue'
import WysiwygEditor from './WysiwygEditor.vue'

const props = defineProps<{
  project?: any
}>()

const emit = defineEmits<{
  close: []
  save: [projectData: any]
}>()

// Get skills data for technology suggestions
const { skills, skillsByCategory, fetchSkills } = usePortfolioDatabase()

// Flatten skills for technology selection
const availableSkills = computed(() => {
  return skills.value.filter(skill => skill.category === 'Technologies').map(skill => ({
    ...skill,
    category: skill.category
  }))
})

const isEdit = computed(() => !!props.project)

// Form data
const form = ref({
  id: '',
  title: '',
  description: '',
  image: '',
  technologies: [],
  links: {
    website: '',
    github: []
  },
  detailedContent: ''
})

// Initialize form with project data if editing
watch(() => props.project, (project) => {
  if (project) {
    form.value = {
      id: project.id || '',
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      technologies: project.technologies ? [...project.technologies] : [],
      links: {
        website: project.links?.website || '',
        github: project.links?.github ? [...project.links.github] : []
      },
      detailedContent: project.detailedContent || ''
    }
  } else {
    // Reset form for new project
    form.value = {
      id: '',
      title: '',
      description: '',
      image: '',
      technologies: [],
      links: {
        website: '',
        github: []
      },
      detailedContent: ''
    }
  }
}, { immediate: true })

// Technology management
const addTechnology = () => {
  form.value.technologies.push({ name: '', icon: '', invert: false })
}

const addTechnologyFromSkill = (skill: any) => {
  // Vérifier si la technologie n'est pas déjà ajoutée
  const exists = form.value.technologies.some(tech => tech.name === skill.name)
  if (!exists) {
    form.value.technologies.push({
      name: skill.name,
      icon: skill.icon || '',
      invert: skill.invert || false
    })
  }
}

const removeTechnology = (index: number) => {
  form.value.technologies.splice(index, 1)
}

// GitHub links management
const addGithubLink = () => {
  form.value.links.github.push('')
}

const removeGithubLink = (index: number) => {
  form.value.links.github.splice(index, 1)
}

// Get all existing project images for selection
const getAllProjectImages = () => {
  // This would typically come from props or a composable
  // For now, return empty array - this will be populated later
  return []
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
onMounted(async () => {
  document.addEventListener('keydown', handleEscKey)
  // Load skills data for technology suggestions
  await fetchSkills()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
})

// Form submission
const handleSubmit = () => {
  // Clean up empty values
  const cleanedForm = {
    ...form.value,
    technologies: form.value.technologies.filter(tech => tech.name.trim()),
    links: {
      website: form.value.links.website.trim(),
      github: form.value.links.github.filter(url => url.trim())
    }
  }
  
  emit('save', cleanedForm)
}
</script>