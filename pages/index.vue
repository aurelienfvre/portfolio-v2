<template>
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