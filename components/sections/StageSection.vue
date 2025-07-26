<template>
  <BentoItem id="about" className="col-span-12 md:col-span-6">
    <div class="p-8">
      <!-- Titre de la section -->
      <div class="flex items-center gap-3 mb-4">
        <Search class="w-5 h-5" />
        <h3 class="text-lg font-medium">Recherche d'Alternance</h3>
      </div>

      <!-- Informations du stage -->
      <div class="space-y-4" v-if="stage">
        <div>
          <p class="text-lg font-medium">
            {{ stage.duration }} à partir de {{ stage.startDate }}
          </p>
          <p class="text-gray-400">{{ stage.position }}</p>
        </div>

        <!-- Villes -->
        <div class="flex flex-wrap gap-2" v-if="stage.locations && stage.locations.length">
          <TechPill
              v-for="location in stage.locations"
              :key="location.name"
              :label="location.name"
              class="tech-pill-location"
          >
            <template #prefix v-if="location.isPrimary">
              <MapPin class="w-4 h-4" />
            </template>
          </TechPill>
        </div>
      </div>
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import { Search, MapPin } from 'lucide-vue-next'
import BentoItem from '~/components/common/BentoItem.vue'
import TechPill from '~/components/common/TechPill.vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'

const { stage, fetchStage } = usePortfolioDatabase()

// Fetch stage data on mount
onMounted(async () => {
  if (!stage.value) {
    await fetchStage()
  }
})
</script>

<style scoped>
.tech-pill-location {
  @apply inline-flex items-center gap-1.5;
}
</style>