export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  tailwindcss: {
    configPath: './tailwind.config.ts'
  },

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
      title: 'Aurélien Fèvre - Développeur Front-end | Recherche Alternance Master Lille',
      htmlAttrs: {
        lang: 'fr',
        class: 'light'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Étudiant développeur front-end (BUT MMI 3ème année) recherche une alternance à Lille pour Master en développement web. Compétent en Vue.js, Nuxt.js, JavaScript, et création d\'interfaces modernes.' },
        { name: 'author', content: 'Aurélien Fèvre' },
        { name: 'keywords', content: 'alternance développeur front-end Lille, développeur web junior Lille, contrat apprentissage développement web, master développement web Lille, BUT MMI, Vue.js, Nuxt.js, JavaScript, UI/UX, portfolio Aurélien Fèvre' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#ffffff', id: 'theme-color' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'format-detection', content: 'telephone=no' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://aurelien-fevre.com/' },
        { property: 'og:title', content: 'Aurélien Fèvre - Développeur Front-end | Recherche Alternance Master Lille' },
        { property: 'og:description', content: 'Étudiant développeur front-end (BUT MMI 3ème année) recherche une alternance à Lille pour Master en développement web. Compétent en Vue.js, Nuxt.js, JavaScript, et création d\'interfaces modernes.' },
        { property: 'og:image', content: 'https://aurelien-fevre.com/images/profile.png' },
        { property: 'og:image:alt', content: 'Photo de profil d\'Aurélien Fèvre' },
        { property: 'og:site_name', content: 'Portfolio d\'Aurélien Fèvre' },
        { property: 'og:locale', content: 'fr_FR' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://aurelien-fevre.com/' },
        { name: 'twitter:title', content: 'Aurélien Fèvre - Développeur Front-end | Recherche Alternance Master Lille' },
        { name: 'twitter:description', content: 'Étudiant développeur front-end (BUT MMI 3ème année) recherche une alternance à Lille pour Master en développement web. Compétent en Vue.js, Nuxt.js, JavaScript, et création d\'interfaces modernes.' },
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
            jobTitle: 'Développeur Front-end en recherche d\'alternance',
            description: 'Étudiant développeur front-end (BUT MMI) cherchant une alternance à Lille pour Master. Spécialisé en interfaces web modernes avec Vue.js/Nuxt.js.',
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

  compatibilityDate: '2024-11-24',

  // Hook pour initialiser la BDD au build et au démarrage
  hooks: {
    'build:before': async () => {
      console.log('🔧 Initialisation de la base de données avant le build...')
      try {
        const { initDatabase } = require('./scripts/init-db.cjs')
        await initDatabase()
        console.log('✅ Base de données initialisée avant le build')
      } catch (error) {
        console.error('❌ Erreur initialisation BDD au build:', error)
        // Ne pas faire échouer le build
      }
    },
    
    'listen': async () => {
      console.log('🔧 Initialisation de la base de données au démarrage du serveur...')
      try {
        const { initDatabase } = require('./scripts/init-db.cjs')
        await initDatabase()
        console.log('✅ Base de données initialisée au démarrage')
      } catch (error) {
        console.error('❌ Erreur initialisation BDD au démarrage:', error)
        // Ne pas faire échouer le serveur
      }
    }
  }
})