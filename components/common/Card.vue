<template>
  <div class="group relative overflow-hidden">
    <!-- Image -->
    <div v-if="image" class="aspect-video relative overflow-hidden rounded-t-xl">
      <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 v-if="title" class="text-lg font-medium mb-2">{{ title }}</h3>
      <p v-if="description" class="text-gray-400 mb-4">{{ description }}</p>

      <!-- Default slot for custom content -->
      <slot></slot>

      <!-- Technologies -->
      <div v-if="technologies?.length" class="flex flex-wrap gap-2 mb-4">
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

    <!-- Action button -->
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import type { Technology } from '@/types/project'
import TechPill from './TechPill.vue'

defineProps<{
  title?: string
  description?: string
  image?: string
  technologies?: Technology[]
}>()
</script>