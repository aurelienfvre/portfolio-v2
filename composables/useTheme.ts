import { ref, watch } from 'vue'

const theme = ref<'light' | 'dark'>('light')

export function useTheme() {
    if (process.client) {
        // Synchroniser l'état initial avec la classe appliquée
        theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }

    watch(theme, (newTheme) => {
        if (process.client) {
            document.documentElement.className = newTheme
            document.body.className = newTheme
            localStorage.setItem('theme', newTheme)
        }
    })

    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return {
        theme,
        toggleTheme
    }
}