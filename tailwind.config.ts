import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'text-primary': 'var(--text-primary)',
        'border-primary': 'var(--border-primary)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}