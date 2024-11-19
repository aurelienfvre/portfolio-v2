<template>
  <span
      class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border-primary rounded-full transition-all"
  >
    <template v-if="hasDarkVersion">
      <img
          :src="isDark ? iconDark : iconLight"
          :alt="label"
          class="w-4 h-4 transition-all duration-200"
      />
    </template>
    <template v-else-if="icon">
      <img
          :src="icon"
          :alt="label"
          class="w-4 h-4 transition-all duration-200"
          :class="{
          'dark:filter dark:brightness-0 dark:invert': invert
        }"
      />
    </template>
    <slot name="prefix"></slot>
    {{ label }}
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const props = defineProps<{
  label: string
  icon?: string
  iconLight?: string
  iconDark?: string
  hasDarkVersion?: boolean
  invert?: boolean
  className?: string
}>()

const { theme } = useTheme()
const isDark = computed(() => theme.value === 'dark')
</script>

<style scoped>
span {
  @apply bg-bg-primary text-text-primary hover:border-text-primary;
}
</style>