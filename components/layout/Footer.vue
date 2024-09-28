<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p>&copy; {{ new Date().getFullYear() }} Aurélien Fèvre. Tous droits réservés.</p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-primary transition-colors">
            <icon-github class="w-6 h-6" />
          </a>
          <a href="#" class="hover:text-primary transition-colors">
            <icon-linkedin class="w-6 h-6" />
          </a>
          <a href="#" class="hover:text-primary transition-colors">
            <icon-email class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Vous pouvez importer des icônes si nécessaire, par exemple depuis '@heroicons/vue'
</script>