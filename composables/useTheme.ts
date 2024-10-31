import { ref, watch } from 'vue'

const theme = ref<'light' | 'dark'>('light')

export function useTheme() {
    // Initialize theme on client side only
    if (process.client) {
        // Check local storage
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark' || savedTheme === 'light') {
            theme.value = savedTheme
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            theme.value = prefersDark ? 'dark' : 'light'
        }

        // Apply theme class immediately
        document.documentElement.classList.toggle('dark', theme.value === 'dark')
    }

    // Watch for changes
    watch(theme, (newTheme) => {
        if (process.client) {
            document.documentElement.classList.toggle('dark', newTheme === 'dark')
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