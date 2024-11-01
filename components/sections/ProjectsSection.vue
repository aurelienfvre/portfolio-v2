<template>
  <BentoItem id="projects" className="col-span-12">
    <div class="p-8">
      <!-- Header de la section -->
      <div class="flex items-center gap-3 mb-8">
        <Folder class="w-5 h-5" />
        <h3 class="text-lg font-medium">Projets</h3>
      </div>

      <!-- Grille des projets -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
            v-for="project in projects"
            :key="project.id"
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :technologies="project.technologies"
            class="bento-item"
        >
          <!-- Bouton "Voir plus" -->
          <template #action>
            <button
                class="project-button absolute bottom-5 right-5 p-2 bg-bg-primary border border-border-primary rounded-full flex items-center gap-2 group hover:gap-3 transition-all"
                @click="openProject(project)"
            >
              <span class="w-0 overflow-hidden whitespace-nowrap group-hover:w-[70px] transition-all">
                Voir plus
              </span>
              <ArrowUpRight
                  class="w-4 h-4 transition-transform group-hover:rotate-45"
              />
            </button>
          </template>
        </Card>
      </div>
    </div>

    <!-- Modal de projet -->
    <Teleport to="body">
      <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <div
            v-if="selectedProject"
            class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            @click.self="selectedProject = null"
        >
          <div
              class="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-primary border border-border-primary rounded-2xl"
          >
            <div class="p-8">
              <!-- Header Modal -->
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-medium">{{ selectedProject.title }}</h2>
                <button
                    class="p-2 hover:bg-[#1a2235] rounded-full transition-colors"
                    @click="selectedProject = null"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>

              <!-- Contenu Modal -->
              <div class="aspect-video mb-6 rounded-xl overflow-hidden bg-[#1a2235]">
                <video
                    v-if="selectedProject.videoUrl"
                    controls
                    class="w-full h-full object-cover"
                >
                  <source :src="selectedProject.videoUrl" type="video/mp4">
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <img
                    v-else
                    :src="selectedProject.image"
                    :alt="selectedProject.title"
                    class="w-full h-full object-cover"
                />
              </div>

              <!-- Description détaillée -->
              <div
                  class="text-gray-400"
                  v-html="selectedProject.detailedContent"
              ></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </BentoItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Folder, ArrowUpRight, X } from 'lucide-vue-next'
import { projects } from '@/data/projects'
import type { Project } from '@/types/project'
import BentoItem from '~/components/common/BentoItem.vue'
import Card from '~/components/common/Card.vue'

const selectedProject = ref<Project | null>(null)

const openProject = (project: Project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

watch(selectedProject, (newValue) => {
  if (!newValue) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.project-button {
  @apply transition-all duration-300;
}
</style>