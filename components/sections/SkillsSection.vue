<template>
  <BentoItem className="col-span-12 md:col-span-8">
    <div class="p-8">
      <!-- Header de la section -->
      <div class="flex items-center gap-3 mb-6">
        <Code2 class="w-5 h-5" />
        <h3 class="text-lg font-medium">Compétences</h3>
      </div>

      <!-- Grille des compétences -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="category in skills" :key="category.name">
          <!-- Titre de la catégorie -->
          <h4 class="text-sm font-medium mb-4">{{ category.name }}</h4>

          <!-- Liste des compétences -->
          <div class="flex flex-wrap gap-2">
            <TechPill
                v-for="skill in category.items"
                :key="skill.name"
                :label="skill.name"
                :icon="skill.icon"
                :invert="skill.invert"
            />
          </div>
        </div>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { Code2 } from 'lucide-vue-next'
import { skills } from '@/data/skills'
import BentoItem from '~/components/common/BentoItem.vue'
import TechPill from '~/components/common/TechPill.vue'
</script>

<style scoped>
/* Optionnel: Animation subtile au hover des skills */
.tech-pill {
  @apply transition-all duration-200;
}
</style>