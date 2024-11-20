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
            :links="project.links"
            class="group relative"
            @click="openProject(project)"
        >
          <!-- Bouton "Voir plus" -->
          <template #action>
            <button
                class="project-button w-10 h-10 bg-bg-primary border border-border-primary rounded-full flex items-center justify-center transition-all duration-300"
                :class="[
                'hover:w-[130px] group-hover:w-[130px]',
                'overflow-hidden'
              ]"
                @click.stop="openProject(project)"
            >
              <div class="flex items-center justify-center w-full h-full relative">
                <span class="absolute opacity-0 transform -translate-x-10 group-hover:opacity-100 hover:opacity-100 group-hover:translate-x-[-20px] hover:translate-x-[-20px] transition-all duration-300 whitespace-nowrap">
                  Voir plus
                </span>
                <ArrowUpRight
                    class="w-4 h-4 absolute transform transition-all duration-300 group-hover:translate-x-[35px] hover:translate-x-[35px] group-hover:rotate-45 hover:rotate-45"
                />
              </div>
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
              class="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-primary border border-border-primary rounded-2xl relative"
          >
            <!-- Header Modal -->
            <div class="sticky top-0 z-10 bg-bg-primary border-b border-border-primary p-6">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-medium">{{ selectedProject.title }}</h2>
                <button
                    class="p-2 hover:bg-[#1a2235] rounded-full transition-colors"
                    @click="selectedProject = null"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <div class="p-8">
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

              <!-- Liens -->
              <div class="mt-8 flex gap-4 justify-end border-t border-border-primary pt-6">
                <template v-if="selectedProject.links">
                  <template v-if="selectedProject.links.website">
                    <a
                        :href="selectedProject.links.website"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary rounded-full hover:border-text-primary transition-colors"
                    >
                      <Globe class="w-4 h-4" />
                      <span>Voir le site</span>
                    </a>
                  </template>
                  <template v-if="selectedProject.links.github">
                    <template v-for="(repo, index) in selectedProject.links.github" :key="index">
                      <a
                          :href="repo"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex items-center gap-2 px-4 py-2 bg-bg-primary border border-border-primary rounded-full hover:border-text-primary transition-colors"
                      >
                        <Github class="w-4 h-4" />
                        <span>{{ selectedProject.links.github.length > 1 ? `Code ${index + 1}` : 'Code' }}</span>
                      </a>
                    </template>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </BentoItem>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Folder, ArrowUpRight, X, Globe, Github } from 'lucide-vue-next'
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

.project-button:hover,
.group:hover .project-button {
  @apply w-[130px];
}
</style>