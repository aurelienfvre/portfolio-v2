<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-text-primary">Gestion des Projets</h2>
      <button
        @click="$emit('openProjectModal')"
        class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium"
      >
        + Nouveau Projet
      </button>
    </div>

    <div 
      ref="projectsContainer" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        :data-swapy-slot="`slot-${index}`"
        class="min-h-[200px]"
      >
        <div
          :data-swapy-item="project.id"
          class="bg-bg-primary border border-border-primary rounded-3xl shadow-sm overflow-hidden relative group cursor-move hover:border-accent w-full h-full"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="w-full h-32 object-cover pointer-events-none select-none"
          >
          <div class="p-4">
            <h3 class="font-semibold text-text-primary mb-2">{{ project.title }}</h3>
            <p class="text-sm text-text-tertiary mb-3 line-clamp-2">{{ project.description }}</p>
            <div class="flex space-x-2" @click.stop>
              <button
                @click="$emit('editProject', project)"
                class="px-3 py-1 bg-accent text-white text-sm rounded-lg hover:bg-accent/80 font-medium"
              >
                Modifier
              </button>
              <button
                @click="$emit('deleteProject', project.id)"
                class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps<{
  projects: any[]
}>()

const emit = defineEmits<{
  openProjectModal: []
  editProject: [project: any]
  deleteProject: [projectId: string]
  updateProjects: [projects: any[]]
}>()

const projectsContainer = ref(null)
let swapyInstance: any = null

// Initialize Swapy
const initializeSwapy = async () => {
  if (import.meta.client && projectsContainer.value && props.projects.length > 0) {
    try {
      const { createSwapy } = await import('swapy')
      
      swapyInstance = createSwapy(projectsContainer.value)
      
      swapyInstance.onSwap((event: any) => {
        const newOrder = event.newSlotItemMap.asArray
        
        // Créer le nouveau tableau dans l'ordre des slots
        const reorderedProjects = newOrder.map((slot: any, index: number) => {
          const project = props.projects.find(p => p.id === slot.item)
          return {
            ...project,
            order: index + 1
          }
        })
        
        emit('updateProjects', reorderedProjects)
      })
    } catch (error) {
      console.error('Error initializing Swapy:', error)
    }
  }
}

const destroySwapy = () => {
  if (swapyInstance) {
    swapyInstance.destroy()
    swapyInstance = null
  }
}

onMounted(() => {
  nextTick(() => {
    initializeSwapy()
  })
})

onUnmounted(() => {
  destroySwapy()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>