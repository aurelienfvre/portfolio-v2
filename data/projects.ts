import type { Project } from '@/types/project'

export const projects: Project[] = [
    {
        id: 'wintok',
        title: 'Wintok',
        description: 'SaaS collaboratif : Front-end et communication',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Symfony',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
                invert: true
            },
            {
                name: 'MySQL',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
            }
        ],
        videoUrl: '/path/to/wintok-demo.mp4',
        detailedContent: `
      <div class="space-y-4">
          <p>SaaS collaboratif développé pour optimiser la gestion des lives TikTok.</p>
          <h3 class="text-lg font-medium text-white">Fonctionnalités principales</h3>
          <ul class="list-disc pl-5 space-y-2">
              <li>Interface utilisateur intuitive</li>
              <li>Système de gestion en temps réel</li>
              <li>Analytics et statistiques</li>
          </ul>
      </div>`
    },
    {
        id: 'truchypluot',
        title: 'Truchy&Pluot',
        description: 'Site vitrine avec système de contact et devis',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'HTML',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
            },
            {
                name: 'CSS',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
            },
            {
                name: 'JavaScript',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            },
            {
                name: 'PHP',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
            }
        ],
        detailedContent: `Site vitrine professionnel avec système de contact et génération de devis`
    },
    {
        id: 'minecraft',
        title: 'Plugins Minecraft',
        description: 'Animations interactives en temps réel pour lives',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Java',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            }
        ],
        detailedContent: `Développement de plugins Minecraft pour créer des animations interactives en temps réel`
    },
    {
        id: 'edutask',
        title: 'EduTask',
        description: 'Calendrier de tâches pour étudiants MMI',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Symfony',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
                invert: true
            }
        ],
        detailedContent: `Application de gestion de tâches spécialement conçue pour les étudiants MMI`
    }
]