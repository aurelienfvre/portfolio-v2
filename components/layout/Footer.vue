<template>
  <footer class="bg-[#1a2235] text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Copyright -->
        <div class="mb-4 md:mb-0">
          <p>&copy; {{ currentYear }} Aurélien Fèvre. Tous droits réservés.</p>
        </div>

        <!-- Liens sociaux -->
        <div class="flex space-x-4">
          <SocialLink
              v-for="link in socialLinks.filter(l => l.name !== 'email' && l.name !== 'website')"
              :key="link.name"
              v-bind="link"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { socialLinks } from '@/data/social'
import SocialLink from '~/components/common/SocialLink.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>