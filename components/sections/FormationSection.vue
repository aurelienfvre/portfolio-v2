<template>
  <BentoItem className="col-span-12 md:col-span-4">
    <div class="p-8">
      <!-- Header de la section -->
      <div class="flex items-center gap-3 mb-6">
        <GraduationCap class="w-5 h-5" />
        <h3 class="text-lg font-medium">Formation</h3>
      </div>

      <!-- Liste des formations -->
      <div class="space-y-6">
        <div
            v-for="formation in formations"
            :key="formation.title"
            class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-text-primary"
        >
          <p class="font-medium">{{ formation.title }}</p>
          <p class="text-gray-400">
            {{ formation.institution }}
            {{ formation.institution ? `(${formation.period})` : formation.period }}
          </p>
        </div>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next'
import { formations } from '@/data/formation'
import BentoItem from '~/components/common/BentoItem.vue'
</script>