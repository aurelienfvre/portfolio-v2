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
        <TechPill
            v-for="tech in technologies"
            :key="tech.name"
            :label="tech.name"
            :icon="tech.icon"
            :invert="tech.invert"
        />
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
import TechPill from '~/components/common/TechPill.vue'

defineProps<{
  title?: string
  description?: string
  image?: string
  technologies?: Technology[]
}>()
</script>

<style scoped>
:deep(.dark) img.dark\:invert {
  @apply invert;
}
</style>