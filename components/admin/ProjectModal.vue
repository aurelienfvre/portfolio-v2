<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ isEdit ? 'Modifier le Projet' : 'Nouveau Projet' }}
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
                  Titre du Projet *
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Nom du projet"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ID du Projet *
                </label>
                <input
                  v-model="form.id"
                  type="text"
                  required
                  :disabled="isEdit"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                  placeholder="id-du-projet"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description Courte *
                </label>
                <textarea
                  v-model="form.description"
                  required
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Description courte pour la carte"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image de Couverture
                </label>
                <input
                  v-model="form.image"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="/images/project.png"
                >
                <div v-if="form.image" class="mt-2">
                  <img :src="form.image" :alt="form.title" class="w-full h-32 object-cover rounded-md">
                </div>
              </div>
            </div>

            <!-- Technologies -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technologies
                </label>
                <div class="space-y-3">
                  <div
                    v-for="(tech, index) in form.technologies"
                    :key="index"
                    class="flex space-x-2"
                  >
                    <input
                      v-model="tech.name"
                      type="text"
                      placeholder="Nom de la technologie"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                    <input
                      v-model="tech.icon"
                      type="url"
                      placeholder="URL de l'icône"
                      class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                    <label class="flex items-center">
                      <input
                        v-model="tech.invert"
                        type="checkbox"
                        class="mr-1"
                      >
                      <span class="text-xs text-gray-600 dark:text-gray-400">Inverser</span>
                    </label>
                    <button
                      type="button"
                      @click="removeTechnology(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addTechnology"
                    class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter une technologie
                  </button>
                </div>
              </div>

              <!-- Links -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Liens
                </label>
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">Site Web</label>
                    <input
                      v-model="form.links.website"
                      type="url"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://exemple.com"
                    >
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400 mb-1">GitHub</label>
                    <div class="space-y-2">
                      <div
                        v-for="(githubUrl, index) in form.links.github"
                        :key="index"
                        class="flex space-x-2"
                      >
                        <input
                          v-model="form.links.github[index]"
                          type="url"
                          class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="https://github.com/user/repo"
                        >
                        <button
                          type="button"
                          @click="removeGithubLink(index)"
                          class="text-red-600 hover:text-red-800"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <button
                        type="button"
                        @click="addGithubLink"
                        class="text-blue-600 text-sm hover:text-blue-800 flex items-center"
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
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenu Détaillé (HTML)
            </label>
            <textarea
              v-model="form.detailedContent"
              rows="10"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              placeholder="<div>Contenu HTML détaillé...</div>"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Vous pouvez utiliser du HTML pour formater le contenu détaillé</p>
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
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
  project?: any
}>()

const emit = defineEmits<{
  close: []
  save: [projectData: any]
}>()

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