<template>
  <div :class="theme">
    <!-- Header fixe -->
    <Header />

    <!-- Contenu principal -->
    <main>
      <NuxtPage />
    </main>

  </div>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'
import Header from '~/components/layout/Header.vue'

const { theme } = useTheme()
</script>

<style>
/* Import de la police */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* Variables globales */
:root {
  --border-light: #e0e0e0;
  --border-dark: #1a2235;
  --bg-light: #ffffff;
  --bg-dark: #0f1320;
  --text-light: #2c2c2c;
  --text-dark: #ffffff;
}

/* Styles de thème */
.light {
  --bg-primary: var(--bg-light);
  --text-primary: var(--text-light);
  --border-primary: var(--border-light);
}

.dark {
  --bg-primary: var(--bg-dark);
  --text-primary: var(--text-dark);
  --border-primary: var(--border-dark);
}

/* Styles globaux */
body {
  font-family: 'Space Grotesk', sans-serif;
  @apply bg-bg-primary text-text-primary;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-bg-primary;
}

::-webkit-scrollbar-thumb {
  @apply bg-border-primary rounded;
}

/* Transitions globales */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Gestion du scroll smooth */
html {
  scroll-behavior: smooth;
}
</style>