<template>
  <div>
    <!-- Portfolio Professionnel - Grille Bento -->
    <div class="bento-grid">
      <!-- Rendu dynamique des blocs dans l'ordre correct -->
      <component
        v-for="block in sortedBentoBlocks"
        :key="block.id"
        :is="getComponent(block.component)"
        :colSpan="block.colSpan"
        v-show="block.visible"
      />
      
      <!-- Custom Blocks -->
      <CustomBlock
        v-for="block in customBlocks"
        :key="`custom-${block.id}`"
        :block="block"
        v-show="block.visible"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSection from '~/components/sections/ProfileSection.vue'
import IntroSection from '~/components/sections/IntroSection.vue'
import StageSection from '~/components/sections/StageSection.vue'
import LinksSection from '~/components/sections/LinksSection.vue'
import FormationSection from '~/components/sections/FormationSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import CustomBlock from '~/components/sections/CustomBlock.vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'

// Get data from database
const { 
  sortedBentoBlocks, 
  customBlocks, 
  fetchBentoBlocks, 
  fetchCustomBlocks 
} = usePortfolioDatabase()

// Component mapping
const componentMap = {
  ProfileSection,
  IntroSection,
  StageSection,
  LinksSection,
  FormationSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  CustomBlock
}

// Function to get component dynamically
const getComponent = (componentName: string) => {
  return componentMap[componentName as keyof typeof componentMap] || 'div'
}

// Load data on mount
onMounted(async () => {
  await Promise.all([
    fetchBentoBlocks(),
    fetchCustomBlocks()
  ])
})

// SEO
useHead({
  title: 'Aurélien Fèvre - Développeur Web Front-End',
  meta: [
    { name: 'description', content: 'Développeur web front-end spécialisé en Vue.js, Nuxt.js et interfaces modernes. Portfolio professionnel avec projets et compétences.' },
    { name: 'keywords', content: 'développeur web, Vue.js, Nuxt.js, portfolio professionnel, front-end developer' },
    { property: 'og:title', content: 'Aurélien Fèvre - Développeur Web Front-End' },
    { property: 'og:description', content: 'Développeur web front-end spécialisé en Vue.js, Nuxt.js et interfaces modernes.' }
  ]
})
</script>

<style scoped>
.bento-grid {
  @apply grid grid-cols-12 gap-6 max-w-[1400px] mx-auto px-6 pt-40 pb-6;
}

@media (max-width: 768px) {
  .bento-grid {
    @apply grid-cols-4 gap-4 pt-28;
  }

  /* Réorganisation des blocs en mobile */
  :deep(.profile-photo) {
    order: -1;
  }
}
</style>