<template>
  <BentoItem className="col-span-12 md:col-span-6">
    <div class="p-8">
      <!-- Titre de la section -->
      <div class="flex items-center gap-3 mb-4">
        <Link2 class="w-5 h-5" />
        <h3 class="text-lg font-medium">Liens</h3>
      </div>

      <!-- Liens sociaux -->
      <div class="social-links flex gap-3">
        <SocialLink
            v-for="link in socialLinks"
            :key="link.name"
            :name="link.name"
            :url="link.url"
            :title="link.title"
        />
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { Link2 } from 'lucide-vue-next'
import { socialLinks } from '@/data/social'
import BentoItem from '~/components/common/BentoItem.vue'
import SocialLink from '~/components/common/SocialLink.vue'
</script>

<style scoped>
.social-links {
  /* Prévenir le débordement sur mobile */
  @apply flex-wrap;
}
</style>