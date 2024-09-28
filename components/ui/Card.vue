<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
    <div v-if="image" class="w-full h-48 overflow-hidden">
      <img :src="image" :alt="title" class="w-full h-full object-cover" />
    </div>
    <div class="p-6">
      <h3 v-if="title" class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p v-if="description" class="text-gray-600 mb-4">{{ description }}</p>
      <slot name="content"></slot>
      <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mb-4">
        <span v-for="tag in tags" :key="tag" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
          {{ tag }}
        </span>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})
</script>