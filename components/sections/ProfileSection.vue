<template>
  <BentoItem className="col-span-12 md:col-span-4 profile-photo">
    <div class="w-full aspect-square">
      <NuxtImg
          src="/images/profile.jpg"
          alt="Aurélien Fevre"
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
</script>