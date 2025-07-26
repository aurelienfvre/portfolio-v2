<template>
  <BentoItem className="col-span-12 md:col-span-4 profile-photo">
    <div class="w-full aspect-square">
      <NuxtImg
          :src="profile?.profileImage || '/images/profile.jpg'"
          :alt="`${profile?.firstName || 'Aurélien'} ${profile?.lastName || 'Fevre'}`"
          class="w-full h-full object-cover"
          loading="eager"
          format="webp"
          width="800"
          height="800"
          :modifiers="{
          quality: 90
        }"
      />
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import BentoItem from '~/components/common/BentoItem.vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'

const { profile, fetchProfile } = usePortfolioDatabase()

// Fetch profile data on mount
onMounted(async () => {
  if (!profile.value) {
    await fetchProfile()
  }
})
</script>