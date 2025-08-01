import type { PortfolioConfig } from '@/types/portfolio'

export const portfolioConfigs: Record<'pro' | 'student', PortfolioConfig> = {
  pro: {
    mode: 'pro',
    title: 'Aurélien Fèvre - Développeur Frontend',
    description: 'Développeur frontend spécialisé en Vue.js/Nuxt.js, créateur d\'expériences digitales innovantes et performantes.',
    navigation: [
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/#about' },
      { name: 'Projets', path: '/#projects' },
      { name: 'Contact', path: '/#contact' }
    ],
    seo: {
      title: 'Aurélien Fèvre - Développeur Frontend | Création d\'expériences web modernes',
      description: 'Développeur frontend spécialisé en Vue.js/Nuxt.js, créateur d\'expériences digitales innovantes et performantes. Portfolio professionnel avec projets web & SaaS.',
      keywords: 'développeur frontend, Vue.js, Nuxt.js, JavaScript, TypeScript, développement web, SaaS, Wintok, portfolio Aurélien Fèvre'
    }
  },
  student: {
    mode: 'student',
    title: 'Aurélien Fèvre - Étudiant BUT MMI',
    description: 'Étudiant en BUT MMI. Portfolio de compétences avec preuves concrètes de progression.',
    navigation: [], // Navigation gérée directement dans les pages étudiantes
    seo: {
      title: 'Aurélien Fèvre - Étudiant BUT MMI | Portfolio de Compétences',
      description: 'Étudiant en BUT MMI (3ème année). Explorez mes compétences à travers des preuves concrètes de ma progression.',
      keywords: 'portfolio étudiant, BUT MMI, compétences, développement web, Vue.js, Nuxt.js, Aurélien Fèvre'
    }
  }
}