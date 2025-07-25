<template>
  <div>
    <!-- Portfolio Professionnel - Grille Bento -->
    <div class="bento-grid">
      <!-- Section Photo de profil -->
      <ProfileSection />

      <!-- Section Introduction -->
      <IntroSection />

      <!-- Section Stage -->
      <StageSection />

      <!-- Section Liens -->
      <LinksSection />

      <!-- Section Formation -->
      <FormationSection />

      <!-- Section Compétences -->
      <SkillsSection />

      <!-- Section Projets -->
      <ProjectsSection />

      <!-- Section Contact -->
      <ContactSection />
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