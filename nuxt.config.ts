export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  image: {
    dir: 'public/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 1600,    // Beaucoup plus grand
          height: 960,    // Proportion maintenue
          quality: 100    // Qualité maximale
        }
      },
      project: {
        modifiers: {
          format: 'webp',
          width: 1920,
          height: 1080,
          quality: 100
        }
      }
    }
  },
  app: {
    head: {
      title: 'Aurélien Fèvre - Portfolio',
      htmlAttrs: {
        lang: 'fr',
        class: 'light'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Portfolio d\'Aurélien Fèvre, développeur front-end' },
        { name: 'theme-color', content: '#ffffff', id: 'theme-color' },
        { name: 'color-scheme', content: 'light dark' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
          crossorigin: 'anonymous'
        }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  experimental: {
    payloadExtraction: false
  }
})