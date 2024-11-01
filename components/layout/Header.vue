<template>
  <header class="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[500px] px-5">
    <nav class="py-2 px-3 bg-bg-primary/80 backdrop-blur-md border border-border-primary rounded-full flex items-center">
      <div class="relative flex justify-between items-center flex-1" ref="menuRef">
        <NuxtLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="relative z-[2] px-4 py-2 text-sm whitespace-nowrap transition-colors"
            :class="[
            activeSection === item.path
              ? 'text-bg-primary'
              : theme === 'dark'
                ? 'text-gray-400 dark:hover:text-gray-100'
                : 'text-gray-600 hover:text-gray-900'
          ]"
            @click="handleClick(item.path, $event)"
        >
          {{ item.name }}
        </NuxtLink>

        <!-- Active Background -->
        <div
            ref="activeBackgroundRef"
            class="active-background absolute h-[calc(100%-4px)] bg-text-primary border border-border-primary rounded-full"
            :class="{ 'transition-all duration-300': isInitialized }"
            :style="activeBackgroundStyle"
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
            :class="{ 'rotate-90 scale-0': initialTheme === 'dark' || theme === 'dark' }"
        />
        <Moon
            class="w-4 h-4 absolute transition-transform duration-300"
            :class="{ '-rotate-90 scale-0': initialTheme === 'light' && theme === 'light' }"
        />
      </button>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { navigation } from '@/data/navigation'
import { useTheme } from '~/composables/useTheme'

const menuRef = ref<HTMLElement | null>(null)
const activeBackgroundRef = ref<HTMLElement | null>(null)
const activeSection = ref('/')
const activeLinkWidth = ref(81.98) // Valeur initiale plus grande
const activeLinkLeft = ref(0)
const isInitialized = ref(false)
const hasScrolled = ref(false)

const { theme, toggleTheme } = useTheme()
const initialTheme = ref(process.client ? localStorage.getItem('theme') || 'light' : 'light')

const activeBackgroundStyle = computed(() => ({
  width: `${activeLinkWidth.value}px`,
  left: `${activeLinkLeft.value}px`,
  top: '2px'
}))

const getVisibleSection = (): string => {
  if (!hasScrolled.value || window.scrollY < 50) {
    return '/'
  }

  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  // Si on est proche du bas de la page
  if (scrollTop + windowHeight >= documentHeight - 100) {
    return '/#contact'
  }

  const sections = navigation
      .map(item => item.path.replace('/#', ''))
      .filter(Boolean)

  for (const section of sections.reverse()) {
    const element = document.getElementById(section)
    if (!element) continue

    const rect = element.getBoundingClientRect()
    if (rect.top <= windowHeight * 0.5) {
      return '/#' + section
    }
  }

  return '/'
}

const updateActiveLinkPosition = (path = activeSection.value) => {
  if (!menuRef.value) return

  const activeLink = menuRef.value.querySelector(`a[href="${path}"]`) as HTMLElement
  if (!activeLink) return

  const menuRect = menuRef.value.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()

  activeLinkWidth.value = linkRect.width
  activeLinkLeft.value = linkRect.left - menuRect.left
}

const scrollToSection = (path: string) => {
  const sectionId = path.replace('/#', '')
  if (!sectionId) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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
  }
}

const handleClick = (path: string, event: Event) => {
  event.preventDefault()
  activeSection.value = path
  updateActiveLinkPosition(path)
  scrollToSection(path)
}

const handleScroll = () => {
  hasScrolled.value = true
  const newSection = getVisibleSection()
  if (newSection !== activeSection.value) {
    activeSection.value = newSection
    updateActiveLinkPosition()
  }
}

const handleResize = () => {
  updateActiveLinkPosition()
}

onMounted(() => {
  // Set initial theme from localStorage
  if (process.client) {
    initialTheme.value = localStorage.getItem('theme') || 'light'
  }

  // Mesurer et positionner immédiatement
  nextTick(() => {
    updateActiveLinkPosition()
    // Activer les transitions après le positionnement initial
    setTimeout(() => {
      isInitialized.value = true
    }, 100)
  })

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})

watch(theme, (newTheme) => {
  initialTheme.value = newTheme
  nextTick(updateActiveLinkPosition)
})
</script>

<style scoped>
nav {
  box-shadow: 0 0 0 1px rgba(var(--border-primary), 0.1),
  0 8px 20px -8px rgba(0, 0, 0, 0.1);
}

:deep(a) {
  @apply transition-colors duration-200;
}

:deep(a:not(.text-bg-primary)) {
  @apply text-gray-400 dark:hover:text-gray-100 hover:text-gray-900;
}

.active-background {
  transition: none;
}

.active-background.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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