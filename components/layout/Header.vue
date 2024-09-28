<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-primary">AF</NuxtLink>
      <ul class="flex space-x-4">
        <li v-for="item in navItems" :key="item.name">
          <NuxtLink :to="item.path" class="text-gray-600 hover:text-primary transition-colors">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/#about' },
  { name: 'Compétences', path: '/#skills' },
  { name: 'Projets', path: '/#projects' },
  { name: 'Contact', path: '/#contact' }
]
</script>