<template>
  <span
      class="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-border-primary rounded-full"
      :class="className"
  >
    <img
        v-if="icon"
        :src="icon"
        :alt="label"
        class="w-4 h-4"
        :class="{ 'dark:invert': invert }"
    />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  invert?: boolean
  className?: string
}>()
</script>