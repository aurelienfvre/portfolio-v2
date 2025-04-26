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
          width: 1600,
          height: 900,
          quality: 85
        }
      },
      project: {
        modifiers: {
          format: 'webp',
          width: 1600,
          height: 900,
          quality: 90
        }
      }
    }
  },

  app: {
    head: {
      title: 'Aurélien Fèvre - Portfolio | Développeur Front-end',
      htmlAttrs: {
        lang: 'fr',
        class: 'light'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Portfolio d\'Aurélien Fèvre, développeur front-end spécialisé en création d\'interfaces web modernes, réactives et accessibles. Découvrez mes projets, compétences et expériences professionnelles.' },
        { name: 'author', content: 'Aurélien Fèvre' },
        { name: 'keywords', content: 'développeur front-end, portfolio, Aurélien Fèvre, développeur web, UI/UX, javascript, vue.js, nuxt.js, responsive design, web design, front-end development' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff', id: 'theme-color' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://aurelien-fevre.com/' },
        { property: 'og:title', content: 'Aurélien Fèvre - Portfolio | Développeur Front-end' },
        { property: 'og:description', content: 'Portfolio d\'Aurélien Fèvre, développeur front-end spécialisé en création d\'interfaces web modernes, réactives et accessibles. Découvrez mes projets, compétences et expériences professionnelles.' },
        { property: 'og:image', content: 'https://aurelien-fevre.com/images/profile.png' },
        { property: 'og:image:alt', content: 'Photo de profil d\'Aurélien Fèvre' },
        { property: 'og:site_name', content: 'Portfolio d\'Aurélien Fèvre' },
        { property: 'og:locale', content: 'fr_FR' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://aurelien-fevre.com/' },
        { name: 'twitter:title', content: 'Aurélien Fèvre - Portfolio | Développeur Front-end' },
        { name: 'twitter:description', content: 'Portfolio d\'Aurélien Fèvre, développeur front-end spécialisé en création d\'interfaces web modernes, réactives et accessibles. Découvrez mes projets, compétences et expériences professionnelles.' },
        { name: 'twitter:image', content: 'https://aurelien-fevre.com/images/profile.png' },
        { name: 'twitter:image:alt', content: 'Photo de profil d\'Aurélien Fèvre' },

        // Autres métadonnées importantes
        { name: 'application-name', content: 'Portfolio Aurélien Fèvre' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Portfolio Aurélien Fèvre' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://aurelien-fevre.com/' },
        { rel: 'alternate', hreflang: 'fr', href: 'https://aurelien-fevre.com/' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
          crossorigin: 'anonymous'
        }
      ],
      // Ajout de données structurées JSON-LD pour une meilleure compréhension par les moteurs de recherche
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Aurélien Fèvre',
            url: 'https://aurelien-fevre.com/',
            image: 'https://aurelien-fevre.com/images/profile.png',
            jobTitle: 'Développeur Front-end',
            description: 'Développeur front-end spécialisé en création d\'interfaces web modernes, réactives et accessibles.',
            sameAs: [
              // Ajoutez ici vos profils sociaux si disponibles
              'https://linkedin.com/in/aurelien-fevre',
              'https://github.com/aurelien-fevre',
            ]
          })
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
  },

  compatibilityDate: '2024-11-24'
})