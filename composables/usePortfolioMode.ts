import { ref, computed, readonly } from 'vue'

export type PortfolioMode = 'pro' | 'student'

const portfolioMode = ref<PortfolioMode>('pro')

export const usePortfolioMode = () => {
  const setMode = (mode: PortfolioMode) => {
    portfolioMode.value = mode
    // Sauvegarde dans localStorage
    if (process.client) {
      localStorage.setItem('portfolio-mode', mode)
    }
  }

  const initMode = () => {
    if (process.client) {
      const saved = localStorage.getItem('portfolio-mode') as PortfolioMode
      if (saved && ['pro', 'student'].includes(saved)) {
        portfolioMode.value = saved
      }
    }
  }

  const isPro = computed(() => portfolioMode.value === 'pro')
  const isStudent = computed(() => portfolioMode.value === 'student')

  return {
    portfolioMode: readonly(portfolioMode),
    setMode,
    initMode,
    isPro,
    isStudent
  }
}