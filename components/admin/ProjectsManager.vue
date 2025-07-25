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

    <VueDraggable
      :model-value="projects"
      @update:model-value="onProjectChange"
      group="projects"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag"
      :animation="200"
    >
      <div
        v-for="project in projects"
        :key="project.id"
        class="min-h-[200px]"
      >
        <div
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
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  projects: any[]
}>()

const emit = defineEmits<{
  openProjectModal: []
  editProject: [project: any]
  deleteProject: [projectId: string]
  updateProjects: [projects: any[]]
}>()

// Handler pour les changements de drag & drop
const onProjectChange = (newProjects: any[]) => {
  emit('updateProjects', newProjects)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Styles pour le drag & drop */
.ghost {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #6366f1;
}

.chosen {
  transform: rotate(5deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.drag {
  transform: rotate(5deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 999;
}
</style>