<template>
  <BentoItem className="col-span-12 md:col-span-4 profile-photo">
    <div class="w-full aspect-square bg-gray-100">
      <img
          src="/images/profile.jpg"
          alt="Aurélien Fevre"
          class="w-full h-full object-cover"
      />
    </div>
  </BentoItem>
</template>

<script setup lang="ts">
import BentoItem from '~/components/common/BentoItem.vue'
</script>