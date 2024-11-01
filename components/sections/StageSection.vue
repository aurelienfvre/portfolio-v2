<template>
  <BentoItem id="about" className="col-span-12 md:col-span-6">
    <div class="p-8">
      <!-- Titre de la section -->
      <div class="flex items-center gap-3 mb-4">
        <Search class="w-5 h-5" />
        <h3 class="text-lg font-medium">Recherche de Stage</h3>
      </div>

      <!-- Informations du stage -->
      <div class="space-y-4">
        <div>
          <p class="text-lg font-medium">
            {{ stageInfo.duration }} à partir du {{ stageInfo.startDate }}
          </p>
          <p class="text-gray-400">{{ stageInfo.position }}</p>
        </div>

        <!-- Villes -->
        <div class="flex flex-wrap gap-2">
          <TechPill
              v-for="location in stageInfo.locations"
              :key="location"
              :label="location"
              class="flex items-center gap-1.5"
          >
            <template v-if="location === stageInfo.locations[0]">
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
import { stageInfo } from '@/data/stage'
import BentoItem from '~/components/common/BentoItem.vue'
import TechPill from '~/components/common/TechPill.vue'
</script>