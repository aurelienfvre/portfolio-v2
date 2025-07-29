import { db } from '../db/index.ts'
import { mainCompetences, proofCategories, proofItems } from '../db/schema.ts'

// Données pour peupler les nouvelles tables
const competenceProofData = {
  mainCompetences: [
    {
      title: "Développer",
      slug: "developper", 
      subtitle: "Maîtrise technique et apprentissage continu",
      order: 0
    },
    {
      title: "Entreprendre",
      slug: "entreprendre",
      subtitle: "Initiative, stratégie et leadership",
      order: 1
    }
  ],
  
  proofCategories: [
    // Catégories pour "Développer"
    {
      mainCompetenceSlug: "developper",
      title: "Maîtrise des Frameworks Front-End",
      subtitle: "De Vue.js à React, jusqu'à l'exploration de React Native",
      slug: "frameworks-front-end",
      order: 0
    },
    {
      mainCompetenceSlug: "developper", 
      title: "Expertise Back-End & Full-Stack",
      subtitle: "Symfony, API Platform et architectures complexes",
      slug: "expertise-full-stack",
      order: 1
    },
    {
      mainCompetenceSlug: "developper",
      title: "Adaptabilité & Apprentissage Autonome", 
      subtitle: "Java, C#, auto-formation continue",
      slug: "adaptation-autonomie",
      order: 2
    },
    
    // Catégories pour "Entreprendre"
    {
      mainCompetenceSlug: "entreprendre",
      title: "Le Portfolio : Une Stratégie aux Résultats Exceptionnels",
      subtitle: "Design réfléchi, impact immédiat sur stage et alternance",
      slug: "portfolio-strategique", 
      order: 0
    },
    {
      mainCompetenceSlug: "entreprendre",
      title: "Wintok.fr : De l'Idée au Produit Concurrentiel",
      subtitle: "Solution innovante avec 100+ utilisateurs et reconnaissance marché",
      slug: "creation-wintok",
      order: 1
    },
    {
      mainCompetenceSlug: "entreprendre",
      title: "TikTok : Bâtir une Communauté et un Business", 
      subtitle: "24k abonnés, 2000€ de revenus, professionnalisation",
      slug: "communaute-business",
      order: 2
    },
    {
      mainCompetenceSlug: "entreprendre",
      title: "Collaboration et Leadership en Équipe",
      subtitle: "Workflow agile, leadership technique, vision stratégique", 
      slug: "collaboration-equipe",
      order: 3
    }
  ],
  
  proofItems: [
    // Items pour "Maîtrise des Frameworks Front-End"
    {
      categorySlug: "frameworks-front-end",
      title: "[STAGE] Adaptation à l'écosystème React",
      description: "Arrivé en stage avec une solide base sur Vue.js, le défi principal a été de devenir productif immédiatement sur un environnement entièrement basé sur React. J'ai rapidement appris et utilisé des outils comme Next.js et la librairie de composants MUI pour intégrer de nouvelles fonctionnalités. Cette expérience m'a prouvé ma grande capacité d'adaptation et m'a rendu polyvalent sur les deux frameworks front-end les plus populaires du marché.",
      mediaUrl: "/images/proof/react-stage.jpg",
      mediaType: "image",
      originTag: "STAGE",
      order: 0
    },
    {
      categorySlug: "frameworks-front-end", 
      title: "[PERSONNEL] Expertise Nuxt.js",
      description: "Pour mon portfolio professionnel, j'ai fait le choix stratégique de Nuxt.js pour ses performances et ses capacités de rendu côté serveur. J'ai implémenté un Bento Design complexe et moderne, ce qui m'a permis de pousser ma maîtrise de l'architecture de composants Vue/Nuxt et du CSS réactif avec Tailwind.",
      mediaUrl: "/images/proof/nuxt-portfolio.jpg",
      mediaType: "image", 
      originTag: "PERSONNEL",
      order: 1
    },
    {
      categorySlug: "frameworks-front-end",
      title: "[SCOLAIRE] Fondamentaux Vue.js",
      description: "Le projet Cinévue a été l'occasion de mettre en pratique mes connaissances académiques de Vue.js. J'ai développé une interface complète qui communique avec une API REST, en gérant l'état de l'application (state management), les requêtes asynchrones, et un système de recherche et de filtrage côté client.",
      mediaUrl: "/images/proof/cinevue-vuejs.jpg",
      mediaType: "image",
      originTag: "SCOLAIRE", 
      order: 2
    },
    {
      categorySlug: "frameworks-front-end",
      title: "[INITIATIVE] Exploration React Native",
      description: "Pour capitaliser sur mes nouvelles compétences en React, j'ai décidé d'explorer le développement mobile. J'ai commencé à développer une application de liste de courses en React Native, en utilisant Expo et le simulateur Xcode sur Mac pour créer une expérience utilisateur native et ajouter des animations.",
      mediaUrl: "/images/proof/react-native-app.jpg", 
      mediaType: "image",
      originTag: "INITIATIVE",
      order: 3
    },
    
    // Items pour "Expertise Back-End & Full-Stack"
    {
      categorySlug: "expertise-full-stack",
      title: "[SCOLAIRE] Symfony & Micro-services",
      description: "Sur le projet PdfPro, le défi était de créer une application web capable de gérer des tâches asynchrones. Avec Symfony, j'ai développé une application permettant de générer des PDF via le micro-service Gotenberg. J'ai aussi implémenté des commandes personnalisées, ce qui m'a donné une expertise concrète sur l'architecture back-end et la logique métier complexe (gestion d'abonnements, historique).",
      mediaUrl: "/images/proof/symfony-pdfpro.jpg",
      mediaType: "image",
      originTag: "SCOLAIRE",
      order: 0
    },
    {
      categorySlug: "expertise-full-stack",
      title: "[SCOLAIRE] API RESTful avec API Platform", 
      description: "Pour le projet Cinévue, j'ai conçu et développé l'API RESTful de A à Z avec API Platform. Cela incluait la mise en place d'un système d'authentification sécurisé par JWT Token, la validation des données avec Assert, et l'intégration d'une chaîne de CI/CD avec des tests unitaires pour garantir la robustesse de l'API.",
      mediaUrl: "/images/proof/api-platform-cinevue.jpg",
      mediaType: "image",
      originTag: "SCOLAIRE",
      order: 1
    },
    {
      categorySlug: "expertise-full-stack",
      title: "[PERSONNEL] Back-Office sur mesure",
      description: "Afin de rendre mon portfolio entièrement dynamique, je suis en train de développer un back-office personnalisé. Ce projet me permet de gérer moi-même le contenu (projets, compétences, etc.) sans avoir à toucher au code, ce qui est une étape cruciale vers la création d'une application web complète et maintenable.",
      mediaUrl: "/images/proof/back-office-portfolio.jpg",
      mediaType: "image", 
      originTag: "PERSONNEL",
      order: 2
    },
    
    // Items pour "Adaptabilité & Apprentissage Autonome"
    {
      categorySlug: "adaptation-autonomie",
      title: "[PERSONNEL] Apprentissage de Java pour Minecraft",
      description: "Pour rendre mes lives sur Wintok plus interactifs, je voulais créer des mini-jeux personnalisés. N'ayant aucune connaissance en Java, j'ai dû tout apprendre de zéro. En m'aidant de la documentation et de l'IA, j'ai structuré mon projet avec Maven et développé plusieurs plugins fonctionnels qui répondaient exactement à mon besoin.",
      mediaUrl: "/images/proof/java-minecraft.jpg",
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 0
    },
    {
      categorySlug: "adaptation-autonomie", 
      title: "[PERSONNEL] Apprentissage de C# pour GTA V",
      description: "Toujours pour Wintok, j'ai voulu connecter GTA V à mon service. Cela m'a obligé à apprendre le C# et à utiliser l'IDE Rider de JetBrains. J'ai développé un mod capable de communiquer avec une API externe, prouvant ma capacité à aborder n'importe quel langage lorsque le projet l'exige.",
      mediaUrl: "/images/proof/csharp-gtav.jpg",
      mediaType: "image",
      originTag: "PERSONNEL", 
      order: 1
    },
    {
      categorySlug: "adaptation-autonomie",
      title: "[STAGE] Auto-formation continue",
      description: "Pendant les moments plus calmes de mon stage, je n'ai pas cessé d'apprendre. J'ai utilisé des plateformes comme Coddy.tech, qui s'apparente à un \"Duolingo du code\", pour perfectionner mes bases en JavaScript. J'ai aussi développé un projet personnel \"Pokédex\" avec l'API Rick and Morty pour maîtriser les concepts avancés de React.",
      mediaUrl: "/images/proof/auto-formation.jpg",
      mediaType: "image",
      originTag: "STAGE",
      order: 2
    },
    
    // Items pour "Le Portfolio : Une Stratégie aux Résultats Exceptionnels"
    {
      categorySlug: "portfolio-strategique",
      title: "[LA STRATÉGIE] Un choix de design réfléchi", 
      description: "Pour ma refonte, je ne voulais pas juste un \"beau site\". J'ai fait une veille des tendances et j'ai délibérément choisi le Bento Design, un style très en vogue en 2024-2025, pour projeter une image moderne, structurée et me démarquer des portfolios classiques.",
      mediaUrl: "/images/proof/bento-design-strategy.jpg",
      mediaType: "image",
      originTag: "PERSONNEL", 
      order: 0
    },
    {
      categorySlug: "portfolio-strategique",
      title: "[RÉSULTAT #1] Le Stage",
      description: "L'impact a été immédiat et a dépassé mes espérances. Grâce à la qualité et au professionnalisme de mon nouveau portfolio, j'ai décroché mon stage chez Sinfin dès le mois de novembre, soit 4 mois avant le début, et ce, dès ma première candidature.",
      mediaUrl: "/images/proof/stage-sinfin.jpg", 
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 1
    },
    {
      categorySlug: "portfolio-strategique",
      title: "[RÉSULTAT #2] L'Alternance",
      description: "Ce succès s'est confirmé lors de ma recherche d'alternance pour mon Master en Lead Dev Front à l'ECV. Dans un marché très compétitif, mon portfolio m'a permis de sécuriser une place en seulement deux candidatures. C'est la preuve que l'investissement dans un projet personnel de qualité a un retour sur investissement direct.",
      mediaUrl: "/images/proof/alternance-ecv.jpg",
      mediaType: "image", 
      originTag: "PERSONNEL",
      order: 2
    },
    
    // Items pour "Wintok.fr : De l'Idée au Produit Concurrentiel"
    {
      categorySlug: "creation-wintok",
      title: "[LE BESOIN] Une solution à mon propre problème",
      description: "En tant que streamer sur TikTok, j'étais frustré par les outils existants : ils étaient payants, manquaient de fonctionnalités et n'avaient pas de site web dédié. J'ai réalisé qu'il y avait un vide sur le marché que je pouvais combler.",
      mediaUrl: "/images/proof/wintok-besoin.jpg",
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 0
    },
    {
      categorySlug: "creation-wintok",
      title: "[LA SOLUTION] Le développement d'une alternative", 
      description: "J'ai pris l'initiative de développer ma propre solution, Wintok.fr. Je me suis concentré sur la création d'une interface front-end simple et efficace pour offrir une meilleure expérience utilisateur que les services concurrents.",
      mediaUrl: "/images/proof/wintok-solution.jpg",
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 1
    },
    {
      categorySlug: "creation-wintok",
      title: "[LA VALIDATION] La reconnaissance par le marché",
      description: "Le projet a rapidement trouvé son public avec plus de 100 utilisateurs uniques. La plus grande validation de sa pertinence a été involontaire : un concurrent majeur a fini par copier le design et des fonctionnalités spécifiques de mon site, prouvant que mon idée était la bonne.",
      mediaUrl: "/images/proof/wintok-validation.jpg",
      mediaType: "image",
      originTag: "PERSONNEL", 
      order: 2
    },
    
    // Items pour "TikTok : Bâtir une Communauté et un Business"
    {
      categorySlug: "communaute-business",
      title: "[CROISSANCE] Construire et gérer une audience",
      description: "Mon activité sur TikTok est une étude de cas en community management. En comprenant l'algorithme et en créant du contenu engageant, j'ai fait passer ma communauté de 10k à 24k abonnés en moins de 6 mois, générant plus d'un million de vues.",
      mediaUrl: "/images/proof/tiktok-croissance.jpg",
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 0
    },
    {
      categorySlug: "communaute-business",
      title: "[MONÉTISATION] Transformer une audience en revenus",
      description: "J'ai réussi à monétiser cette audience, générant plus de 2000€ de revenus directement via les fonctionnalités de la plateforme. Cela m'a appris les bases de l'économie des créateurs et de la valorisation du contenu.",
      mediaUrl: "/images/proof/tiktok-monetisation.jpg", 
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 1
    },
    {
      categorySlug: "communaute-business",
      title: "[PROFESSIONNALISATION] Structurer mon activité",
      description: "Pour gérer ces revenus et professionnaliser ma démarche, j'ai créé mon statut d'auto-entrepreneur (Steve Agency) et j'ai rejoint une agence officielle TikTok, ce qui m'a donné accès à des outils et des connaissances plus avancés sur l'écosystème.",
      mediaUrl: "/images/proof/tiktok-professionnalisation.jpg",
      mediaType: "image",
      originTag: "PERSONNEL",
      order: 2
    },
    
    // Items pour "Collaboration et Leadership en Équipe"
    {
      categorySlug: "collaboration-equipe", 
      title: "[EN STAGE] Intégration à un workflow professionnel",
      description: "Mon stage m'a immergé dans un environnement agile. L'utilisation quotidienne de Git, la création de branches par fonctionnalité et la participation active aux pull requests pour la revue de code ont été des éléments clés de ma collaboration avec l'équipe.",
      mediaUrl: "/images/proof/workflow-agile.jpg",
      mediaType: "image",
      originTag: "STAGE",
      order: 0
    },
    {
      categorySlug: "collaboration-equipe",
      title: "[EN PROJET SCOLAIRE] Leadership technique", 
      description: "Sur le projet de jeu d'arcade en groupe, Pocket Leaf, j'ai naturellement endossé le rôle de développeur principal. J'ai organisé les tâches de développement, de l'intégration des assets graphiques à l'implémentation de la logique de jeu, assurant la cohésion technique du projet.",
      mediaUrl: "/images/proof/pocket-leaf-leadership.jpg",
      mediaType: "image",
      originTag: "SCOLAIRE",
      order: 1
    },
    {
      categorySlug: "collaboration-equipe",
      title: "[EN PROJET SCOLAIRE] Vision stratégique",
      description: "Lors du \"Jeu des Entreprises\", j'ai participé à la prise de décisions stratégiques en équipe, notamment sur la gestion du budget et les appels d'offres. Pour le projet d'entreprise fictive, j'ai défini les fonctionnalités clés, liant les besoins du marché à des solutions techniques réalisables.",
      mediaUrl: "/images/proof/vision-strategique.jpg",
      mediaType: "image", 
      originTag: "SCOLAIRE",
      order: 2
    }
  ]
}

async function populateData() {
  try {
    console.log('🚀 Démarrage du peuplement des tables Compétence/Preuve...')
    
    // 1. Insérer les compétences principales
    console.log('📝 Insertion des compétences principales...')
    const insertedCompetences = await db.insert(mainCompetences)
      .values(competenceProofData.mainCompetences)
      .returning()
    
    console.log(`✅ ${insertedCompetences.length} compétences principales créées`)
    
    // 2. Créer un mapping slug -> id pour les compétences
    const competenceMap = new Map()
    insertedCompetences.forEach(comp => {
      competenceMap.set(comp.slug, comp.id)
    })
    
    // 3. Insérer les catégories de preuves
    console.log('📝 Insertion des catégories de preuves...')
    const categoriesToInsert = competenceProofData.proofCategories.map(cat => ({
      mainCompetenceId: competenceMap.get(cat.mainCompetenceSlug),
      title: cat.title,
      subtitle: cat.subtitle,
      slug: cat.slug,
      order: cat.order
    }))
    
    const insertedCategories = await db.insert(proofCategories)
      .values(categoriesToInsert)
      .returning()
    
    console.log(`✅ ${insertedCategories.length} catégories de preuves créées`)
    
    // 4. Créer un mapping slug -> id pour les catégories
    const categoryMap = new Map()
    insertedCategories.forEach(cat => {
      categoryMap.set(cat.slug, cat.id)
    })
    
    // 5. Insérer les éléments de preuve
    console.log('📝 Insertion des éléments de preuve...')
    const itemsToInsert = competenceProofData.proofItems.map(item => ({
      proofCategoryId: categoryMap.get(item.categorySlug),
      title: item.title,
      description: item.description,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
      originTag: item.originTag,
      order: item.order
    }))
    
    const insertedItems = await db.insert(proofItems)
      .values(itemsToInsert)
      .returning()
    
    console.log(`✅ ${insertedItems.length} éléments de preuve créés`)
    
    console.log('🎉 Peuplement terminé avec succès !')
    console.log('\nRésumé:')
    console.log(`- ${insertedCompetences.length} compétences principales`)
    console.log(`- ${insertedCategories.length} catégories de preuves`) 
    console.log(`- ${insertedItems.length} éléments de preuve`)
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error)
    throw error
  }
}

// Exécuter le script
populateData()
  .then(() => {
    console.log('✨ Script terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Échec du script:', error)
    process.exit(1)
  })