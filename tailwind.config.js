import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
  "./app.vue",
  ],
  theme: {
  extend: {
  fontFamily: {
  sans: ['Inter', 'sans-serif'],
},
  colors: {
  'primary': '#000000', // Vous pouvez ajuster cette couleur selon votre préférence
  'secondary': '#ffffff',
},
},
},
  plugins: [],
}