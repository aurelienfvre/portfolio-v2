import type { Project } from '@/types/project'

export const projects: Project[] = [
    {
        id: 'wintok',
        title: 'Wintok',
        description: 'SaaS innovant pour l\'automatisation des wins sur TikTok Gaming',
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
        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-medium mb-3">Présentation</h3>
                <p class="text-gray-400">
                    Wintok est une solution SaaS développée en collaboration avec Mathieu Robert, visant à révolutionner 
                    l'expérience des streamers gaming sur TikTok. Le projet propose un système automatisé de gestion des 
                    victoires en direct, enrichissant l'interaction avec leur communauté.
                </p>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Fonctionnalités clés</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Overlay personnalisable pour les lives TikTok</li>
                    <li>Intégration en temps réel avec les jeux (actuellement Minecraft, GTA en développement)</li>
                    <li>Système de requêtes automatisées depuis le jeu</li>
                    <li>Interface d'administration intuitive</li>
                    <li>Prochainement : Intégration de Stripe pour les paiements</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Mon rôle</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Design et développement complet du front-end</li>
                    <li>Conception et implémentation du système de communication jeux-overlay</li>
                    <li>Architecture initiale du système de mise à jour en temps réel</li>
                    <li>En cours : Mise en place d'un pipeline CI/CD pour le déploiement continu</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">État actuel</h3>
                <p class="text-gray-400">
                    Le projet est actuellement en phase de bêta test avec un groupe d'utilisateurs sélectionnés. 
                    Le développement se poursuit activement avec l'ajout de nouvelles fonctionnalités et 
                    l'optimisation des performances.
                </p>
            </div>
        </div>`,
        links: {
            website: 'https://wintok.fr'
        }
    },
    {
        id: 'cinevue',
        title: 'CinéVue',
        description: 'Application web fullstack de gestion de films et d\'acteurs',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Vue.js',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
            },
            {
                name: 'Symfony',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
                invert: true
            },
            {
                name: 'Docker',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
            },
            {
                name: 'MySQL',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
            }
        ],
        detailedContent: `
    <div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                CinéVue est une application web fullstack permettant de gérer et explorer une base de données 
                de films et d'acteurs. Développée dans le cadre d'un projet de développement front-end et back-end, 
                elle met en œuvre les meilleures pratiques de développement moderne.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Backend (Symfony)</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>API Platform pour la création d'API RESTful</li>
                <li>Système d'authentification avec JWT Token</li>
                <li>Intégration de GraphQL pour des requêtes flexibles</li>
                <li>Gestion des uploads avec VichUploader</li>
                <li>Tests unitaires et fonctionnels</li>
                <li>DataFixtures pour les données de test</li>
                <li>Validation des données avec Assert</li>
                <li>Sécurisation avec Assert Security</li>
                <li>Intégration de Snyk.io pour la sécurité</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Frontend (Vue.js)</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Interface utilisateur intuitive et responsive</li>
                <li>Système de recherche et de filtrage avancé</li>
                <li>Visualisation des relations films-acteurs</li>
                <li>Navigation par catégories de films</li>
                <li>Gestion des relations entre entités</li>
                <li>Système de tri et de filtrage côté client</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">DevOps & Qualité</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Conteneurisation avec Docker</li>
                <li>CI/CD pour l'automatisation des tests</li>
                <li>Tests avec Postman pour la validation des API</li>
                <li>Gestion des versions avec Git</li>
                <li>Documentation API avec Swagger/OpenAPI</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités clés</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Visualisation détaillée des films et acteurs</li>
                <li>Navigation par filmographie d'acteur</li>
                <li>Exploration du casting des films</li>
                <li>Catégorisation des films par genre</li>
                <li>Interface d'administration sécurisée</li>
                <li>Gestion complète des relations entre entités</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">État du projet</h3>
            <p class="text-gray-400">
                Le projet est actuellement en développement actif avec les fonctionnalités principales 
                implémentées. La partie back-end est bien avancée avec une API robuste et sécurisée, 
                tandis que le front-end continue d'être enrichi avec de nouvelles fonctionnalités 
                d'exploration et de visualisation.
            </p>
        </div>
    </div>`,
        links: {
            github: [
                'https://github.com/aurelienfvre/WR506D-MMI-AB',
                'https://github.com/aurelienfvre/r505'
            ]
        }
    },
    {
        id: 'portfolio',
        title: 'Portfolio Personnel',
        description: 'Portfolio moderne développé avec Nuxt 3 et Tailwind',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Vue.js',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
            },
            {
                name: 'Nuxt',
                icon: 'https://nuxt.com/assets/design-kit/icon-green.svg'
            },
            {
                name: 'Tailwind',
                icon: `data:image/svg+xml,${encodeURIComponent(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C8.8 4 6.8 5.66667 6 9C7.2 7.33333 8.6 6.70833 10.2 7.125C11.1129 7.3625 11.7653 8.05278 12.4876 8.8162C13.664 10.0602 15.0258 11.5 18 11.5C21.2 11.5 23.2 9.83333 24 6.5C22.8 8.16667 21.4 8.79167 19.8 8.375C18.8871 8.1375 18.2347 7.44722 17.5124 6.6838C16.336 5.43981 14.9742 4 12 4ZM6 11.5C2.8 11.5 0.8 13.1667 0 16.5C1.2 14.8333 2.6 14.2083 4.2 14.625C5.11289 14.863 5.76533 15.5528 6.48756 16.3162C7.664 17.5602 9.02578 19 12 19C15.2 19 17.2 17.3333 18 14C16.8 15.6667 15.4 16.2917 13.8 15.875C12.8871 15.6375 12.2347 14.9472 11.5124 14.1838C10.336 12.9398 8.97422 11.5 6 11.5Z" fill="#38BDF8"/></svg>`)}`
            },
            {
                name: 'TypeScript',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
            }
        ],
        detailedContent: `
        <div class="space-y-6">
            <div>
                <h3 class="text-xl font-medium mb-3">Présentation</h3>
                <p class="text-gray-400">
                    Portfolio personnel moderne et responsive, développé avec les dernières technologies web. 
                    Conçu avec une approche "mobile-first" et une attention particulière portée à l'expérience utilisateur 
                    et à l'accessibilité.
                </p>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Caractéristiques techniques</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Architecture basée sur Nuxt 3 pour des performances optimales</li>
                    <li>Utilisation de TypeScript pour un code robuste et maintenable</li>
                    <li>Styled avec Tailwind CSS pour un design moderne et responsive</li>
                    <li>Mode sombre/clair avec persistance des préférences</li>
                    <li>Animations fluides et transitions soignées</li>
                    <li>Composants réutilisables et architecture modulaire</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Fonctionnalités</h3>
                <ul class="list-disc pl-5 space-y-2 text-gray-400">
                    <li>Navigation fluide avec scroll automatique</li>
                    <li>Design adaptatif avec grille "Bento"</li>
                    <li>Affichage détaillé des projets en modal</li>
                    <li>Système de tags pour les technologies</li>
                    <li>Optimisation SEO et performances</li>
                </ul>
            </div>

            <div>
                <h3 class="text-xl font-medium mb-3">Approche</h3>
                <p class="text-gray-400">
                    Le portfolio a été conçu avec une approche centrée sur l'expérience utilisateur, 
                    en mettant l'accent sur la performance et l'accessibilité. Chaque composant a été 
                    développé de manière modulaire pour faciliter la maintenance et les futures évolutions.
                </p>
            </div>
        </div>`,
        links: {
            website: 'https://aurelien-fevre.com',
            github: ['https://github.com/aurelienfvre/portfolio-v2']
        }
    },
    {
        id: 'truchypluot',
        title: 'Truchy&Pluot',
        description: 'Site vitrine avec système de contact et devis pour une entreprise locale',
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
        detailedContent: `
    <div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                Projet réalisé durant un stage de 3 mois chez TRUCHY JEAN LUC à Bleigny-le-Carreau. 
                Développement d'un site vitrine professionnel intégrant des fonctionnalités avancées 
                de communication client-entreprise.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Responsabilités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Conception et développement des pages contact et devis</li>
                <li>Implémentation complète du système d'emails</li>
                <li>Design responsive et optimisation UX/UI</li>
                <li>Collaboration avec l'équipe de développement</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités développées</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Formulaire de contact interactif et validé</li>
                <li>Système de génération de devis automatisé</li>
                <li>Notifications email automatiques :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Confirmation de réception pour les clients</li>
                        <li>- Notifications détaillées pour l'entreprise</li>
                        <li>- Suivi des demandes de devis</li>
                    </ul>
                </li>
                <li>Interface responsive adaptée à tous les appareils</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Aspects techniques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Développement front-end avec HTML5, CSS3 et JavaScript</li>
                <li>Back-end en PHP pour la gestion des emails et des données</li>
                <li>Validation et sécurisation des formulaires</li>
                <li>Optimisation des performances et du référencement</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Méthodologie</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Participation active aux réunions de suivi</li>
                <li>Collaboration étroite avec l'équipe</li>
                <li>Tests et optimisations continus</li>
                <li>Documentation des fonctionnalités</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Résultats</h3>
            <p class="text-gray-400">
                Livraison d'un site professionnel fonctionnel permettant une meilleure communication 
                entre l'entreprise et ses clients, avec un système robuste de gestion des demandes 
                de contact et de devis.
            </p>
        </div>
    </div>`,
        links: {
            website: 'https://aurelien-fevre.com/truchy_pluot/'
        }
    },
    {
        id: 'minecraft-plugins',
        title: 'Plugins Minecraft Interactifs',
        description: 'Suite de plugins pour streams TikTok Gaming interactifs',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Java',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            }
        ],
        detailedContent: `
    <div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                Développement d'une suite de plugins Minecraft innovants conçus spécifiquement pour les lives TikTok Gaming.
                Ces plugins enrichissent l'expérience de streaming en ajoutant des mécaniques de jeu interactives et des
                effets visuels spectaculaires, le tout intégré avec la plateforme Wintok.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Système de Box personnalisable :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Création de cuves avec 3 tailles différentes</li>
                        <li>- Choix des blocs et motifs de remplissage</li>
                        <li>- Personnalisation des dégradés et couleurs</li>
                        <li>- Détection automatique du remplissage</li>
                    </ul>
                </li>
                <li>Mécaniques de jeu avancées :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Chronomètre automatique lors du remplissage</li>
                        <li>- Système de construction par étages</li>
                        <li>- Gestion dynamique des blocs (ajout/retrait)</li>
                        <li>- Détection de destruction de ligne</li>
                    </ul>
                </li>
                <li>Effets visuels spectaculaires :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Animation de PNJ par étages</li>
                        <li>- Particules de cœur pour les likes</li>
                        <li>- Trou noir avec effet d'aspiration et zigzag</li>
                        <li>- Reset avec animation d'éclairs ligne par ligne</li>
                        <li>- Animation de nuke avec projection de blocs</li>
                        <li>- TNT personnalisées avec effets uniques</li>
                    </ul>
                </li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Intégration avec Wintok</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Synchronisation automatique avec l'overlay Wintok</li>
                <li>Mise à jour en temps réel des victoires</li>
                <li>Interaction avec Stream2Earn pour les événements TikTok</li>
                <li>Système de récompenses automatisé</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Aspects Techniques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Développé en Java avec l'API Spigot/Bukkit</li>
                <li>Gestion efficace des événements Minecraft</li>
                <li>Optimisation des performances pour le streaming</li>
                <li>Architecture modulaire pour faciliter les extensions</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Développements futurs</h3>
            <p class="text-gray-400">
                En cours de développement d'un nouveau modpack plugin innovant pour TikTok Gaming, 
                apportant de nouvelles mécaniques de jeu et une expérience entièrement repensée.
                Cette nouvelle version intégrera des fonctionnalités encore plus poussées et une 
                meilleure interaction avec la communauté.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Impact</h3>
            <p class="text-gray-400">
                Ces plugins ont permis d'enrichir significativement l'expérience de streaming sur TikTok,
                en offrant des interactions uniques et des effets visuels captivants pour la communauté.
                L'intégration avec Wintok a permis d'automatiser complètement le suivi des performances
                et la gestion des récompenses.
            </p>
        </div>
    </div>`
    },
    {
        id: 'edutask',
        title: 'EduTask',
        description: 'Application de gestion de tâches pour étudiants MMI',
        image: '/api/placeholder/800/450',
        technologies: [
            {
                name: 'Symfony',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
                invert: true
            },
            {
                name: 'JavaScript',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            },
            {
                name: 'HTML',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
            },
            {
                name: 'CSS',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
            }
        ],
        detailedContent: `
    <div class="space-y-6">
        <div>
            <h3 class="text-xl font-medium mb-3">Présentation</h3>
            <p class="text-gray-400">
                EduTask est une application web collaborative conçue pour aider les étudiants MMI à suivre 
                leurs dates de rendu de travaux. Développée en équipe, elle met l'accent sur l'expérience 
                utilisateur et l'accessibilité tout en offrant des fonctionnalités avancées de gestion de tâches.
            </p>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Fonctionnalités principales</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Gestion des utilisateurs :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Système d'inscription et connexion</li>
                        <li>- Modification du profil utilisateur</li>
                        <li>- Gestion des sessions sécurisées</li>
                    </ul>
                </li>
                <li>Gestion des tâches :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Calendrier interactif des rendus</li>
                        <li>- Système de to-do list avancé</li>
                        <li>- Cartes de tâches personnalisables</li>
                        <li>- Fonctionnalité de rappels</li>
                    </ul>
                </li>
                <li>Interface utilisateur :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Mode sombre/clair</li>
                        <li>- Design responsive</li>
                        <li>- Modales de recherche et tri</li>
                        <li>- Navigation fluide sans rechargement</li>
                    </ul>
                </li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Aspects techniques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Backend (Symfony) :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- Architecture MVC</li>
                        <li>- Templates Twig</li>
                        <li>- Gestion de base de données</li>
                        <li>- Système d'authentification</li>
                    </ul>
                </li>
                <li>Frontend :
                    <ul class="ml-4 mt-2 space-y-1">
                        <li>- JavaScript pour l'interactivité</li>
                        <li>- CSS pour le styling responsif</li>
                        <li>- HTML sémantique</li>
                    </ul>
                </li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Standards et bonnes pratiques</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Conformité aux normes W3C</li>
                <li>Principes d'UX/UI appliqués</li>
                <li>Accessibilité optimisée</li>
                <li>Responsive design</li>
                <li>Code maintenable et documenté</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Contribution personnelle</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-400">
                <li>Développement full-stack (40 heures)</li>
                <li>Implémentation des fonctionnalités clés</li>
                <li>Conception de l'interface utilisateur</li>
                <li>Tests et optimisation des performances</li>
                <li>Collaboration avec l'équipe de développement</li>
            </ul>
        </div>

        <div>
            <h3 class="text-xl font-medium mb-3">Résultats</h3>
            <p class="text-gray-400">
                EduTask est devenue une solution efficace pour la gestion des tâches académiques, 
                offrant une expérience utilisateur optimale tout en respectant les standards web 
                et les principes d'accessibilité. Le projet a permis de renforcer mes compétences 
                en développement full-stack tout en créant un outil pratique pour la communauté étudiante.
            </p>
        </div>
    </div>`,
        links: {
            website: 'https://aurelien-fevre.com/edutask/',
            github: ['https://github.com/aurelienfvre/sae301']
        }
    }
]