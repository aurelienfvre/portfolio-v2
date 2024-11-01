<template>
  <header class="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[500px] px-5">
    <nav class="py-2 px-3 bg-bg-primary/80 backdrop-blur-md border border-border-primary rounded-full flex items-center">
      <!-- Navigation Links Container -->
      <div class="relative flex justify-between items-center flex-1" ref="menuRef">
        <!-- Navigation Items -->
        <NuxtLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="relative z-[2] px-4 py-2 text-sm whitespace-nowrap"
            :class="[
            activeSection === item.path
              ? 'text-bg-primary'
              : 'text-gray-600 hover:text-gray-900'
          ]"
            @click="handleClick(item.path, $event)"
        >
          {{ item.name }}
        </NuxtLink>

        <!-- Active Background -->
        <div
            ref="activeBackgroundRef"
            class="absolute h-[calc(100%-4px)] bg-text-primary border border-border-primary rounded-full transition-all duration-300"
            :style="{
            width: activeLinkWidth + 'px',
            left: activeLinkLeft + 'px',
            top: '2px'
          }"
        ></div>
      </div>

      <!-- Theme Toggle -->
      <button
          class="w-8 h-8 flex items-center justify-center rounded-full relative ml-2"
          @click="toggleTheme"
          aria-label="Toggle theme"
      >
        <Sun
            class="w-4 h-4 absolute transition-transform duration-300"
            :class="theme === 'dark' ? 'rotate-90 scale-0' : ''"
        />
        <Moon
            class="w-4 h-4 absolute transition-transform duration-300"
            :class="theme === 'light' ? '-rotate-90 scale-0' : ''"
        />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { navigation } from '@/data/navigation'
import { useTheme } from '~/composables/useTheme'

const menuRef = ref<HTMLElement | null>(null)
const activeBackgroundRef = ref<HTMLElement | null>(null)
const activeSection = ref('/')
const activeLinkWidth = ref(0)
const activeLinkLeft = ref(0)

const { theme, toggleTheme } = useTheme()

// Fonction pour détecter la section visible
const getVisibleSection = (): string => {
  const sections = navigation
      .map(item => item.path.replace('/#', ''))
      .filter(Boolean)

  // Si on est en haut de la page
  if (window.scrollY < 50) {
    return '/'
  }

  for (const section of sections) {
    const element = document.getElementById(section)
    if (!element) continue

    const rect = element.getBoundingClientRect()
    // Ajuster cette valeur selon vos besoins
    if (rect.top <= 150 && rect.bottom >= 150) {
      return '/#' + section
    }
  }

  return activeSection.value
}

const scrollToSection = (path: string) => {
  const sectionId = path.replace('/#', '')
  if (!sectionId) {
    // Si c'est l'accueil, remonter en haut
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    activeSection.value = '/'
    updateActiveLinkPosition()
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 100
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })

    activeSection.value = path
    updateActiveLinkPosition()
  }
}

const updateActiveLinkPosition = () => {
  if (!menuRef.value) return

  nextTick(() => {
    const activeLink = menuRef.value?.querySelector(`a[href="${activeSection.value}"]`) as HTMLElement
    if (!activeLink) return

    const menuRect = menuRef.value?.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    requestAnimationFrame(() => {
      activeLinkWidth.value = linkRect.width
      activeLinkLeft.value = linkRect.left - menuRect.left
    })
  })
}

const handleClick = (path: string, event: Event) => {
  event.preventDefault()
  scrollToSection(path)
}

const updateActiveSection = () => {
  const newSection = getVisibleSection()
  if (newSection !== activeSection.value) {
    activeSection.value = newSection
    updateActiveLinkPosition()
  }
}

// Initialisation immédiate au chargement
onMounted(() => {
  // Mettre à jour immédiatement la position active
  nextTick(() => {
    activeSection.value = getVisibleSection()
    updateActiveLinkPosition()
  })

  window.addEventListener('scroll', updateActiveSection)
  window.addEventListener('resize', updateActiveLinkPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('resize', updateActiveLinkPosition)
})

// Mettre à jour quand le thème change
watch(theme, updateActiveLinkPosition)
</script>

<style scoped>
nav {
  box-shadow: 0 0 0 1px rgba(var(--border-primary), 0.1),
  0 8px 20px -8px rgba(0, 0, 0, 0.1);
}

:deep(a) {
  @apply transition-colors;
}

/* Correction du hover en mode sombre */
:deep(.dark a:not(.text-bg-primary):hover) {
  @apply text-white;
}

@media (max-width: 400px) {
  .fixed {
    @apply px-2;
  }

  nav {
    @apply py-1 px-1.5;
  }

  :deep(a) {
    @apply px-2 py-1.5 text-xs;
  }

  button {
    @apply ml-1;
  }
}
</style>