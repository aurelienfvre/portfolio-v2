<template>

  <a :href="url"
  :title="title"
  :target="isExternal ? '_blank' : undefined"
  :rel="isExternal ? 'noopener noreferrer' : undefined"
  class="w-10 h-10 flex items-center justify-center rounded-xl border border-border-primary hover:bg-text-primary hover:text-bg-primary transition-colors"
  >
  <component
      :is="iconComponent"
      class="w-5 h-5"
      aria-hidden="true"
  />
  <span class="sr-only">{{ title }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  type LucideIcon
} from 'lucide-vue-next'

const props = defineProps<{
  name: string
  url: string
  title: string
}>()

const isExternal = computed(() => !props.url.startsWith('mailto:') && !props.url.startsWith('/'))

const iconComponent = computed<LucideIcon>(() => {
  switch (props.name) {
    case 'email':
      return Mail
    case 'github':
      return Github
    case 'linkedin':
      return Linkedin
    default:
      return Globe
  }
})
</script>