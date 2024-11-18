<template>
  <span
      class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border-primary rounded-full transition-all"
  >
    <template v-if="icon">
      <img
          :src="icon"
          :alt="label"
          class="w-4 h-4"
          :class="{ 'dark:invert': invert }"
      />
    </template>
    <slot name="prefix"></slot>
    {{ label }}
    <slot></slot>
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

<style scoped>
span {
  @apply bg-bg-primary text-text-primary hover:border-text-primary;
}

:deep(.dark) img[class*='dark:invert'] {
  filter: invert(1);
}
</style>