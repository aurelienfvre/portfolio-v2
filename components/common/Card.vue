<template>
  <div
      class="relative border border-border-primary rounded-2xl overflow-hidden transition-all duration-300 group bg-bg-primary cursor-pointer h-full flex flex-col"
      @click="$emit('click')"
  >
    <!-- Image -->
    <div v-if="image" class="w-full h-64 overflow-hidden">
      <nuxt-img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover object-top"
          loading="lazy"
          preset="thumbnail"
          format="webp"
      />
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col flex-grow">
      <!-- Title -->
      <h3 v-if="title" class="text-xl font-semibold mb-2">
        {{ title }}
      </h3>

      <!-- Description -->
      <p
          v-if="description"
          class="text-gray-400 mb-4"
      >
        {{ description }}
      </p>

      <!-- Default slot -->
      <slot name="content"></slot>

      <!-- Technologies -->
      <div
          v-if="technologies?.length"
          class="flex flex-wrap gap-2 mb-4"
      >
        <span
            v-for="tech in technologies"
            :key="tech.name"
            class="tech-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border border-border-primary bg-bg-primary transition-colors"
        >
          <img
              v-if="tech.icon"
              :src="tech.icon"
              :alt="tech.name"
              class="w-4 h-4"
              :class="{ 'dark:invert': tech.invert }"
          />
          <span class="text-text-primary">{{ tech.name }}</span>
        </span>
      </div>

      <!-- Footer slot -->
      <slot name="footer"></slot>

      <!-- Links -->
      <div class="mt-auto pt-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <template v-if="links?.website">
            <a
                :href="links.website"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 bg-bg-primary border border-border-primary rounded-full hover:border-text-primary transition-colors"
                title="Voir le site"
                @click.stop
            >
              <Globe class="w-4 h-4" />
            </a>
          </template>
          <template v-else-if="links?.github && links.github.length > 0">
            <a
                :href="links.github[0]"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 bg-bg-primary border border-border-primary rounded-full hover:border-text-primary transition-colors"
                title="Voir le code"
                @click.stop
            >
              <Github class="w-4 h-4" />
            </a>
          </template>
        </div>

        <!-- Action slot pour le bouton voir plus -->
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe, Github } from 'lucide-vue-next'
import type { Technology } from '@/types/project'

interface Links {
  website?: string
  github?: string[]
}

defineProps<{
  title?: string
  description?: string
  image?: string
  technologies?: Technology[]
  links?: Links
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.tech-pill {
  @apply transition-all duration-200;
}

.tech-pill:hover {
  @apply border-text-primary;
}

:deep(.dark) {
  .tech-pill {
    @apply bg-[#1a2235] border-[#2a3245] text-gray-300;
  }

  .tech-pill:hover {
    @apply border-gray-300;
  }
}

:deep(.dark) img.dark\:invert {
  @apply invert;
}
</style>