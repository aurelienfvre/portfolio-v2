<template>
  <div
      :class="[
      'bento-item',
      'border border-border-primary rounded-2xl overflow-hidden h-full',
      className
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>

<style scoped>
.bento-item {
  background: var(--bg-primary);
}
</style>