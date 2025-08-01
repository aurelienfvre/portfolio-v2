import type { StudentYear } from '@/types/portfolio'

export const studentYears: StudentYear[] = [
  {
    year: 1,
    title: "1ère année BUT MMI - Découverte des fondamentaux",
    skills: [
      {
        name: "Comprendre",
        code: "C1",
        ac: [
          {
            title: "AC11.01 - Analyser la stratégie de communication",
            description: "Analyser la stratégie de communication ou de marketing d'un acteur, d'une organisation à partir d'un corpus documentaire",
            project: "Projet Communication - Analyse de la stratégie Coca-Cola"
          },
          {
            title: "AC11.02 - Identifier les cibles",
            description: "Identifier les cibles (critères socio-économiques, démographiques, géographiques, culturels...)",
            project: "Étude de marché - Application mobile de livraison"
          }
        ]
      },
      {
        name: "Concevoir",
        code: "C2",
        ac: [
          {
            title: "AC12.01 - Concevoir un produit ou service",
            description: "Concevoir un produit ou un service de communication numérique en tenant compte de l'expérience utilisateur",
            project: "Maquettage d'une application de covoiturage étudiant"
          },
          {
            title: "AC12.02 - Respecter une charte graphique",
            description: "Respecter une charte graphique donnée ou en créer une nouvelle",
            project: "Refonte visuelle du site web de l'IUT"
          }
        ]
      },
      {
        name: "Exprimer",
        code: "C3",
        ac: [
          {
            title: "AC13.01 - Développer des pages web",
            description: "Développer des pages et sites web statiques et adaptatifs avec HTML5/CSS3",
            project: "Site vitrine HTML/CSS - Portfolio personnel v1"
          },
          {
            title: "AC13.02 - Intégrer des médias",
            description: "Intégrer des médias en respectant les standards du web",
            project: "Galerie photo interactive avec JavaScript"
          }
        ]
      },
      {
        name: "Développer",
        code: "C4",
        ac: [
          {
            title: "AC14.01 - Programmer avec un langage client",
            description: "Programmer avec un langage de programmation côté client",
            project: "Jeu du snake en JavaScript vanilla"
          },
          {
            title: "AC14.02 - Utiliser une base de données",
            description: "Mettre en œuvre une base de données à partir d'un cahier des charges client",
            project: "Base de données MySQL - Gestion de bibliothèque"
          }
        ]
      },
      {
        name: "Entreprendre",
        code: "C5",
        ac: [
          {
            title: "AC15.01 - Gérer un projet",
            description: "Gérer un projet avec une méthode d'amélioration continue",
            project: "Organisation d'un événement étudiant - Nuit de l'info"
          },
          {
            title: "AC15.02 - Travailler en équipe",
            description: "Définir une stratégie de communication et de collaboration en équipe",
            project: "Projet collaboratif - Site web associatif"
          }
        ]
      }
    ]
  },
  {
    year: 2,
    title: "2ème année BUT MMI - Approfondissement",
    skills: [
      {
        name: "Comprendre",
        code: "C1",
        ac: [
          {
            title: "AC21.01 - Analyser un secteur",
            description: "Analyser un secteur, une organisation, ses parties prenantes et ses publics",
            project: "Analyse du marché du streaming gaming français"
          },
          {
            title: "AC21.02 - Auditer un site web",
            description: "Auditer un site web, une marque ou un service, en termes d'usage et d'utilisabilité",
            project: "Audit UX/UI du site de l'université"
          }
        ]
      },
      {
        name: "Concevoir",
        code: "C2",
        ac: [
          {
            title: "AC22.01 - Concevoir l'UX et l'UI",
            description: "Co-concevoir une réponse stratégique en tenant compte de l'expérience utilisateur, des enjeux économiques et écologiques",
            project: "Refonte UX/UI d'une application mobile de transport"
          },
          {
            title: "AC22.02 - Créer une identité visuelle",
            description: "Créer, composer et retoucher des visuels, des images et des vidéos",
            project: "Identité visuelle complète pour une startup locale"
          }
        ]
      },
      {
        name: "Exprimer",
        code: "C3",
        ac: [
          {
            title: "AC23.01 - Développer côté client",
            description: "Développer la partie front-end d'une application web ou mobile",
            project: "Application web avec Vue.js - Gestionnaire de tâches"
          },
          {
            title: "AC23.02 - Développer côté serveur",
            description: "Développer la partie back-end d'une application web ou mobile",
            project: "API REST avec Symfony - Gestion d'événements"
          }
        ]
      }
    ],
    projects: [
      {
        title: "EduTask - Gestionnaire de tâches étudiants",
        description: "Application web collaborative pour le suivi des projets étudiants avec système d'authentification et interface responsive",
        image: "/images/Thumbnail_edutask.png",
        technologies: ["Symfony", "JavaScript", "HTML5", "CSS3", "MySQL"]
      },
      {
        title: "Portfolio Personnel v2",
        description: "Refonte complète du portfolio avec Nuxt.js, design moderne et architecture Bento Grid",
        image: "/images/Thumbnail_portfolio.png",
        technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"]
      }
    ],
    internships: [
      {
        title: "Développeur Web Frontend",
        company: "Truchy & Pluot",
        description: "Développement de fonctionnalités web, système de contact et devis automatisé, collaboration avec l'équipe de développement",
        image: "/images/Thumbnail_truchy.png",
        duration: "3 mois - Été 2023"
      }
    ]
  },
  {
    year: 3,
    title: "3ème année BUT MMI - Spécialisation Développement Web",
    skills: [
      {
        name: "Comprendre",
        code: "C1",
        ac: [
          {
            title: "AC31.01 - Piloter un produit numérique",
            description: "Piloter un produit, un service ou une stratégie numérique",
            project: "Product Owner sur le projet Wintok SaaS"
          },
          {
            title: "AC31.02 - Analyser les performances",
            description: "Analyser les performances d'un produit ou d'un service numérique",
            project: "Analytics et optimisation de performances - CinéVue"
          }
        ]
      },
      {
        name: "Concevoir",
        code: "C2",
        ac: [
          {
            title: "AC32.01 - Concevoir un écosystème numérique",
            description: "Concevoir un écosystème numérique",
            project: "Architecture système Wintok - Intégration multi-plateformes"
          },
          {
            title: "AC32.02 - Concevoir des interactions complexes",
            description: "Concevoir des interactions riches ou des mécanismes d'intelligence artificielle",
            project: "Système de recommandation intelligent pour CinéVue"
          }
        ]
      },
      {
        name: "Exprimer",
        code: "C3",
        ac: [
          {
            title: "AC33.01 - Développer des applications complexes",
            description: "Développer des applications web ou mobiles, y compris de façon avancée",
            project: "Wintok SaaS - Plateforme complète avec overlay temps réel"
          },
          {
            title: "AC33.02 - Déployer une application",
            description: "Déployer, personnaliser et maintenir un système informatique opérationnel",
            project: "Pipeline CI/CD pour Wintok avec Docker et GitHub Actions"
          }
        ]
      },
      {
        name: "Développer",
        code: "C4",
        ac: [
          {
            title: "AC34.01 - Programmer de façon avancée",
            description: "Programmer et développer des dispositifs interactifs sophistiqués",
            project: "Plugins Minecraft interactifs pour TikTok Gaming"
          },
          {
            title: "AC34.02 - Concevoir une base de données complexe",
            description: "Concevoir, développer et exploiter des données complexes",
            project: "Architecture de données Wintok - MySQL avec optimisation"
          }
        ]
      },
      {
        name: "Entreprendre",
        code: "C5",
        ac: [
          {
            title: "AC35.01 - Piloter un projet",
            description: "Piloter un produit, un service, une équipe avec des méthodes d'amélioration continue",
            project: "Direction technique du projet Wintok en binôme"
          },
          {
            title: "AC35.02 - Développer une activité économique",
            description: "Développer une présence en ligne et animer une communauté",
            project: "Stratégie de lancement et croissance de Wintok"
          }
        ]
      }
    ],
    projects: [
      {
        title: "Wintok SaaS",
        description: "Plateforme SaaS complète pour l'automatisation des wins sur TikTok Gaming avec overlay temps réel et intégration multi-jeux",
        image: "/images/Thumbnail_wintok.png",
        technologies: ["Symfony", "Vue.js", "MySQL", "WebSockets", "Docker"]
      },
      {
        title: "CinéVue - Base de données Films",
        description: "Application fullstack de gestion de films et acteurs avec API GraphQL, authentification JWT et interface Vue.js",
        image: "/images/Thumbnail_cinevue.png",
        technologies: ["Vue.js", "Symfony", "GraphQL", "API Platform", "Docker"]
      },
      {
        title: "Plugins Minecraft Interactifs",
        description: "Suite de plugins Java pour streams TikTok avec effets visuels, mécaniques de jeu avancées et synchronisation temps réel",
        image: "/images/Thumbnail_plugin.png",
        technologies: ["Java", "Spigot API", "WebSockets"]
      }
    ],
    internships: [
      {
        title: "Recherche Alternance Master",
        company: "En cours de recherche",
        description: "Recherche active d'une alternance de 2 ans pour Master en Développement Web, spécialisation Frontend/Fullstack avec Vue.js/Nuxt.js",
        duration: "2024-2026"
      }
    ]
  }
]