<template>
  <div
      class="relative border border-border-primary rounded-2xl overflow-hidden transition-all duration-300 group bg-bg-primary"
  >
    <!-- Image -->
    <div v-if="image" class="w-full h-48 overflow-hidden">
      <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Title -->
      <h3
          v-if="title"
          class="text-xl font-semibold mb-2"
      >
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
    </div>

    <!-- Action slot -->
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Technology } from '@/types/project'

defineProps<{
  title?: string
  description?: string
  image?: string
  technologies?: Technology[]
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

/* Assurez-vous que les images qui doivent être inversées en mode sombre le sont */
:deep(.dark) img.dark\:invert {
  @apply invert;
}
</style>