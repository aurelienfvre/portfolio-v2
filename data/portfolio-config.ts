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
    description: 'Étudiant en BUT MMI recherchant une alternance en développement web. Parcours de 3 années avec compétences, projets et stages.',
    navigation: [
      { name: 'Accueil', path: '/' },
      { name: '1ère année', path: '/#year1' },
      { name: '2ème année', path: '/#year2' },
      { name: '3ème année', path: '/#year3' },
      { name: 'Contact', path: '/#contact' }
    ],
    seo: {
      title: 'Aurélien Fèvre - Étudiant BUT MMI | Recherche Alternance Développement Web',
      description: 'Étudiant en BUT MMI (3ème année) recherche alternance en développement web. Compétences en Vue.js, projets étudiants et professionnels.',
      keywords: 'alternance développeur web, BUT MMI, étudiant développement, Vue.js, Nuxt.js, portfolio étudiant, Aurélien Fèvre'
    }
  }
}