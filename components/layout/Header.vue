<template>
  <header class="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full px-5" :class="isPro ? 'max-w-[600px]' : 'max-w-[750px]'">
    <nav class="py-2 px-3 bg-bg-primary/80 backdrop-blur-md border border-border-primary rounded-full flex items-center">
      <!-- Portfolio Mode Selector -->
      <div class="relative mr-3">
        <button
          @click="toggleModeDropdown"
          class="flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border border-border-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="[
            theme === 'dark'
              ? 'text-gray-300 hover:text-gray-100'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          <span class="w-2 h-2 rounded-full" :class="isPro ? 'bg-blue-500' : 'bg-purple-500'"></span>
          {{ isPro ? 'Pro' : 'Étudiant' }}
          <ChevronDown class="w-3 h-3 transition-transform" :class="{ 'rotate-180': showModeDropdown }" />
        </button>
        
        <!-- Dropdown -->
        <div
          v-if="showModeDropdown"
          class="absolute top-full left-0 mt-2 bg-bg-primary border border-border-primary rounded-lg shadow-lg py-2 min-w-[120px] z-10"
        >
          <button
            @click="switchToMode('pro')"
            class="w-full px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            :class="[
              isPro 
                ? 'text-blue-600 font-medium' 
                : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            ]"
          >
            <span class="w-2 h-2 rounded-full bg-blue-500"></span>
            Professionnel
          </button>
          <button
            @click="switchToMode('student')"
            class="w-full px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            :class="[
              isStudent 
                ? 'text-purple-600 font-medium' 
                : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            ]"
          >
            <span class="w-2 h-2 rounded-full bg-purple-500"></span>
            Étudiant
          </button>
        </div>
      </div>

      <div class="relative flex justify-between items-center flex-1" ref="menuRef">
        <NuxtLink
            v-for="item in currentNavigation"
            :key="item.path"
            :to="item.path"
            class="relative z-[2] px-4 py-2 text-sm whitespace-nowrap transition-colors"
            :class="[
            activeSection === item.path
              ? 'text-bg-primary'
              : theme === 'dark'
                ? 'text-gray-400 hover:text-gray-100'
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
import { ref, onMounted, watch, onBeforeUnmount, computed, nextTick } from 'vue' // Added nextTick import
import { Sun, Moon, ChevronDown } from 'lucide-vue-next'
import { navigation } from '@/data/navigation'
import { useTheme } from '~/composables/useTheme'
import { usePortfolioMode } from '~/composables/usePortfolioMode'
import { portfolioConfigs } from '~/data/portfolio-config'

// --- Utility Function ---
// Simple debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
// --- End Utility Function ---


const menuRef = ref<HTMLElement | null>(null)
const activeBackgroundRef = ref<HTMLElement | null>(null)
const activeSection = ref('/')
const activeLinkWidth = ref(81.98) // Valeur initiale plus grande
const activeLinkLeft = ref(0)
const isInitialized = ref(false)
const hasScrolled = ref(false)
const isNavigating = ref(false) // Flag pour empêcher les conflits pendant navigation

const { theme, toggleTheme } = useTheme()
const { portfolioMode, setMode, isPro, isStudent, initMode } = usePortfolioMode()
const initialTheme = ref(process.client ? localStorage.getItem('theme') || 'light' : 'light')

// Portfolio mode management
const showModeDropdown = ref(false)
const currentNavigation = computed(() => {
  return portfolioConfigs[portfolioMode.value].navigation
})

const toggleModeDropdown = () => {
  showModeDropdown.value = !showModeDropdown.value
}

const switchToMode = async (mode: 'pro' | 'student') => {
  setMode(mode)
  showModeDropdown.value = false
  
  // Juste recharger la page actuelle avec le nouveau mode
  // Pas besoin de naviguer, l'index se charge du rendu selon le mode
}

// Close dropdown when clicking outside
const closeDropdownOnClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    showModeDropdown.value = false
  }
}
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
  
  // Sections à vérifier selon le mode
  let sectionsToCheck: Array<{id: string, path: string}> = []
  
  if (isStudent.value) {
    sectionsToCheck = [
      { id: 'contact', path: '/#contact' },
      { id: 'year3', path: '/#year3' },
      { id: 'year2', path: '/#year2' },
      { id: 'year1', path: '/#year1' },
      { id: 'intro', path: '/' }
    ]
  } else {
    // Mode pro - utiliser la navigation existante
    sectionsToCheck = currentNavigation.value
      .map(item => ({
        id: item.path.replace('/#', '') || '',
        path: item.path
      }))
      .filter(item => item.id !== '') // Exclure les éléments sans ID
      .reverse()
  }
      
  for (const { id, path } of sectionsToCheck) {
    const element = document.getElementById(id)
    if (!element) continue
    const rect = element.getBoundingClientRect()
    if (rect.top <= windowHeight * 0.5) {
      return path
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
  
  // Marquer qu'on est en train de naviguer
  isNavigating.value = true
  activeSection.value = path
  updateActiveLinkPosition(path)
  scrollToSection(path)
  
  // Arrêter la navigation après l'animation de scroll
  setTimeout(() => {
    isNavigating.value = false
  }, 1000) // Temps suffisant pour le smooth scroll
}

// Original handlers
const _handleScroll = () => {
  // Ignorer la détection de scroll si on est en train de naviguer manuellement
  if (isNavigating.value) return
  
  hasScrolled.value = true
  const newSection = getVisibleSection()
  if (newSection !== activeSection.value) {
    activeSection.value = newSection
    // Use nextTick to ensure DOM updates before measuring
    nextTick(() => {
        updateActiveLinkPosition()
    });
  }
}

const _handleResize = () => {
  // Use nextTick to ensure DOM updates before measuring
  nextTick(() => {
      updateActiveLinkPosition()
  });
}

// Debounced handlers - Réduire le debounce pour une animation plus réactive
const handleScroll = debounce(_handleScroll, 20) // Debounce scroll by 20ms pour plus de réactivité
const handleResize = debounce(_handleResize, 50) // Debounce resize by 50ms


onMounted(() => {
  // Set initial theme from localStorage
  if (process.client) {
    initialTheme.value = localStorage.getItem('theme') || 'light'
  }
  
  // Initialize portfolio mode
  initMode()
  
  // Mesurer et positionner immédiatement
  nextTick(() => {
    updateActiveLinkPosition()
    // Activer les transitions après le positionnement initial
    setTimeout(() => {
      isInitialized.value = true
    }, 100) // Keep the timeout to avoid initial transition
  })

  // Use debounced handlers
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  window.addEventListener('click', closeDropdownOnClickOutside)
})

onBeforeUnmount(() => {
  // Remove debounced handlers
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('click', closeDropdownOnClickOutside)
})

watch(theme, (newTheme) => {
  initialTheme.value = newTheme
  // Use nextTick here as well for consistency
  nextTick(updateActiveLinkPosition)
})

// Watch portfolio mode changes to update navigation
watch(portfolioMode, () => {
  // Reset to home section when mode changes
  activeSection.value = '/'
  hasScrolled.value = false
  isNavigating.value = false // Reset navigation flag
  
  // Update navigation position after mode change
  nextTick(() => {
    updateActiveLinkPosition('/')
  })
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


.active-background {
  transition: none;
}

.active-background.transition-all {
  /* Specify properties for potentially smoother transition */
  transition-property: width, left;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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