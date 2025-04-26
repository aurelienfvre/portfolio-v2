<template>
  <BentoItem id="contact" className="col-span-12">
    <div class="p-8">
      <!-- Header de la section -->
      <div class="flex items-center gap-3 mb-8">
        <Mail class="w-5 h-5" />
        <h3 class="text-lg font-medium">Contact</h3>
      </div>

      <!-- Grille de contact -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Email -->
        <div
            class="bento-item p-6 hover:bg-text-primary hover:text-bg-primary transition-all group"
        >
          <a href="mailto:aurelien.fvre@gmail.com" class="block">
            <Mail class="w-6 h-6 mb-4" />
            <h4 class="font-medium mb-2">Email</h4>
            <p class="text-gray-400 group-hover:text-inherit">
              aurelien.fvre@gmail.com
            </p>
          </a>
        </div>

        <!-- Site web -->
        <div
            class="bento-item p-6 hover:bg-text-primary hover:text-bg-primary transition-all group"
        >

          <a href="https://aurelien-fevre.com"
          target="_blank"
          class="block"
          >
          <Globe class="w-6 h-6 mb-4" />
          <h4 class="font-medium mb-2">Site web</h4>
          <p class="text-gray-400 group-hover:text-inherit">
            aurelien-fevre.com
          </p>
          </a>
        </div>

        <!-- Localisation -->
        <div class="bento-item p-6">
          <MapPin class="w-6 h-6 mb-4" />
          <h4 class="font-medium mb-2">Localisation</h4>
          <p class="text-gray-400">Troyes, France</p>
        </div>
      </div>

      <!-- Réseaux sociaux -->
      <div class="mt-8 text-center">
        <p class="text-gray-400 mb-6">
          Retrouvez-moi aussi sur les réseaux sociaux
        </p>
        <div class="flex justify-center gap-4">
          <SocialLink
              v-for="link in socialLinks.filter(l => l.name === 'github' || l.name === 'linkedin')"
              :key="link.name"
              v-bind="link"
              class="hover:scale-110 transition-transform"
          />
        </div>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { Mail, Globe, MapPin } from 'lucide-vue-next'
import { socialLinks } from '@/data/social'
import BentoItem from '~/components/common/BentoItem.vue'
import SocialLink from '~/components/common/SocialLink.vue'
</script>

<style scoped>
.bento-item {
  @apply border border-border-primary rounded-2xl overflow-hidden;
}
</style>