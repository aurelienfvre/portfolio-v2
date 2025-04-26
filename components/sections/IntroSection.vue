<template>
  <BentoItem id="accueil" className="col-span-12 md:col-span-8">
    <div class="p-8 pt-20">
      <!-- En-tête -->
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Aurélien Fevre</h1>
      <h2 class="text-xl md:text-2xl mb-6">Développeur Front-end</h2>

      <!-- Description -->
      <p class="text-gray-400 max-w-2xl mb-6">
        Étudiant en 3ème année de BUT MMI, passionné par le développement
        front-end et la création d'expériences web innovantes.
      </p>

      <!-- Actions -->
      <div class="flex flex-wrap gap-4">
        <a
            href="mailto:aurelien.fvre@gmail.com"
            class="tech-pill inline-flex items-center gap-1.5 hover:bg-text-primary hover:text-bg-primary transition-colors"
        >
          <Mail class="w-4 h-4" />
          <span>Me contacter</span>
        </a>

        <a
            href="/files/CV-AurelienFevre.pdf"
            download
            class="tech-pill inline-flex items-center gap-1.5 hover:bg-text-primary hover:text-bg-primary transition-colors"
        >
          <FileDown class="w-4 h-4" />
          <span>Télécharger mon CV</span>
        </a>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { Mail, FileDown } from 'lucide-vue-next'
import BentoItem from '~/components/common/BentoItem.vue'
</script>

<style scoped>
.tech-pill {
  @apply px-4 py-2 border border-border-primary rounded-full text-sm;
}
</style>