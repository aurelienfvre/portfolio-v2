<template>
  <div class="min-h-screen">
    <!-- Header fixe -->
    <Header />

    <!-- Contenu principal -->
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
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
  
  /* Couleurs secondaires et tertiaires */
  --bg-secondary-light: #f8f9fa;
  --bg-secondary-dark: #1a1f2e;
  --bg-tertiary-light: #e9ecef;
  --bg-tertiary-dark: #252a3a;
  --text-secondary-light: #6c757d;
  --text-secondary-dark: #adb5bd;
  --text-tertiary-light: #adb5bd;
  --text-tertiary-dark: #6c757d;
}

/* Styles globaux */
body {
  font-family: 'Space Grotesk', sans-serif;
}

/* Styles de thème */
:root.light {
  --bg-primary: var(--bg-light);
  --bg-secondary: var(--bg-secondary-light);
  --bg-tertiary: var(--bg-tertiary-light);
  --text-primary: var(--text-light);
  --text-secondary: var(--text-secondary-light);
  --text-tertiary: var(--text-tertiary-light);
  --border-primary: var(--border-light);
}

:root.light body {
  @apply bg-white text-[#2c2c2c];
}

:root.dark {
  --bg-primary: var(--bg-dark);
  --bg-secondary: var(--bg-secondary-dark);
  --bg-tertiary: var(--bg-tertiary-dark);
  --text-primary: var(--text-dark);
  --text-secondary: var(--text-secondary-dark);
  --text-tertiary: var(--text-tertiary-dark);
  --border-primary: var(--border-dark);
}

:root.dark body {
  @apply bg-[#0f1320] text-white;
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

/* Transitions de thème */
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Styles de base */
.bento-grid {
  @apply grid gap-6 max-w-[1400px] mx-auto px-6 pt-40 pb-6;
}

@media (max-width: 768px) {
  .bento-grid {
    @apply gap-4 pt-28;
  }
}
</style>