<template>
  <div>
    <!-- Mode Professionnel - Grille Bento actuelle -->
    <div v-if="isPro" class="bento-grid">
      <!-- Section Photo de profil -->
      <ProfileSection />

      <!-- Section Introduction -->
      <IntroSection />

      <!-- Section Stage -->
      <StageSection />

      <!-- Section Liens -->
      <LinksSection />

      <!-- Section Formation -->
      <FormationSection />

      <!-- Section Compétences -->
      <SkillsSection />

      <!-- Section Projets -->
      <ProjectsSection />

      <!-- Section Contact -->
      <ContactSection />
    </div>

    <!-- Mode Étudiant - Bento Grid par année -->
    <div v-else class="student-bento">
      <!-- Header étudiant -->
      <section id="intro" class="bento-intro">
        <div class="bento-item col-span-12 bg-bg-primary border border-border-primary rounded-3xl p-8 text-center min-h-[60vh] flex items-center justify-center">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
              Aurélien Fèvre
            </h1>
            <p class="text-xl md:text-2xl text-text-secondary mb-8">
              Étudiant BUT MMI - Développement Web
            </p>
            <p class="text-lg text-text-tertiary mb-12">
              Parcours de 3 années en BUT Métiers du Multimédia et de l'Internet
            </p>
            
            <!-- Navigation vers les années -->
            <div class="flex flex-wrap gap-4 justify-center">
              <a 
                v-for="year in [1, 2, 3]" 
                :key="year"
                :href="`#year${year}`"
                class="px-6 py-3 bg-accent rounded-xl text-bg-primary hover:bg-accent/90 transition-colors font-medium"
              >
                {{ year }}{{ year === 1 ? 'ère' : 'ème' }} année
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Année 1 -->
      <section id="year1" class="bento-year">
        <div class="bento-item col-span-12 bg-bg-primary border border-border-primary rounded-3xl p-6 mb-6">
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[0].title }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Découverte des fondamentaux du multimédia et de l'internet avec l'acquisition des compétences de base
          </p>
        </div>
        
        <!-- Compétences AC en Bento Grid -->
        <div v-for="competence in studentYears[0].skills" :key="competence.code" class="bento-item col-span-4 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-blue-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in competence.ac" :key="ac.title" class="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
              <h4 class="font-medium text-text-primary text-sm">{{ ac.title }}</h4>
              <p class="text-sm text-text-tertiary mt-1">{{ ac.description }}</p>
              <span v-if="ac.project" class="inline-block mt-2 text-xs text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{{ ac.project }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Année 2 -->
      <section id="year2" class="bento-year">
        <div class="bento-item col-span-12 bg-bg-primary border border-border-primary rounded-3xl p-6 mb-6">
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[1].title }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Approfondissement des compétences avec premiers projets personnels et expérience professionnelle
          </p>
        </div>
        
        <!-- Compétences -->
        <div v-for="competence in studentYears[1].skills" :key="competence.code" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-purple-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in competence.ac" :key="ac.title" class="border-l-4 border-purple-200 dark:border-purple-800 pl-4">
              <h4 class="font-medium text-text-primary text-sm">{{ ac.title }}</h4>
              <p class="text-sm text-text-tertiary mt-1">{{ ac.description }}</p>
              <span v-if="ac.project" class="inline-block mt-2 text-xs text-purple-600 font-medium bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">{{ ac.project }}</span>
            </div>
          </div>
        </div>

        <!-- Travaux personnels -->
        <div v-for="projet in studentYears[1].projects" :key="projet.title" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <img v-if="projet.image" :src="projet.image" :alt="projet.title" class="w-full h-40 object-cover rounded-xl mb-4">
            <h4 class="text-xl font-semibold mb-3 text-text-primary">{{ projet.title }}</h4>
            <p class="text-text-tertiary mb-4 flex-grow">{{ projet.description }}</p>
            <div v-if="projet.technologies" class="flex flex-wrap gap-2">
              <span v-for="tech in projet.technologies" :key="tech" class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stages -->
        <div v-for="stage in studentYears[1].internships" :key="stage.title" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <img v-if="stage.image" :src="stage.image" :alt="stage.title" class="w-full h-40 object-cover rounded-xl mb-4">
            <h4 class="text-xl font-semibold mb-2 text-text-primary">{{ stage.title }}</h4>
            <p class="text-purple-500 font-medium mb-2">{{ stage.company }}</p>
            <p class="text-sm text-text-tertiary mb-3">{{ stage.duration }}</p>
            <p class="text-text-tertiary flex-grow">{{ stage.description }}</p>
          </div>
        </div>
      </section>

      <!-- Année 3 -->
      <section id="year3" class="bento-year">
        <div class="bento-item col-span-12 bg-bg-primary border border-border-primary rounded-3xl p-6 mb-6">
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[2].title }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Spécialisation en développement web avec projets avancés et recherche d'alternance Master
          </p>
        </div>
        
        <!-- Compétences -->
        <div v-for="competence in studentYears[2].skills" :key="competence.code" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-green-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in competence.ac" :key="ac.title" class="border-l-4 border-green-200 dark:border-green-800 pl-4">
              <h4 class="font-medium text-text-primary text-sm">{{ ac.title }}</h4>
              <p class="text-sm text-text-tertiary mt-1">{{ ac.description }}</p>
              <span v-if="ac.project" class="inline-block mt-2 text-xs text-green-600 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">{{ ac.project }}</span>
            </div>
          </div>
        </div>

        <!-- Travaux personnels année 3 -->
        <div v-for="projet in studentYears[2].projects" :key="projet.title" class="bento-item col-span-4 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
          <div class="flex flex-col h-full">
            <img v-if="projet.image" :src="projet.image" :alt="projet.title" class="w-full h-32 object-cover rounded-xl mb-4">
            <h4 class="text-lg font-semibold mb-3 text-text-primary">{{ projet.title }}</h4>
            <p class="text-text-tertiary mb-4 flex-grow text-sm">{{ projet.description }}</p>
            <div v-if="projet.technologies" class="flex flex-wrap gap-1">
              <span v-for="tech in projet.technologies" :key="tech" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stages année 3 -->
        <div v-for="stage in studentYears[2].internships" :key="stage.title" class="bento-item col-span-8 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <div class="flex flex-col h-full">
            <h4 class="text-xl font-semibold mb-2 text-text-primary">{{ stage.title }}</h4>
            <p class="text-green-500 font-medium mb-2">{{ stage.company }}</p>
            <p class="text-sm text-text-tertiary mb-3">{{ stage.duration }}</p>
            <p class="text-text-tertiary flex-grow">{{ stage.description }}</p>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="bento-contact">
        <div class="bento-item col-span-12 bg-bg-primary border border-border-primary rounded-3xl p-8 text-center">
          <h2 class="text-3xl font-bold mb-8 text-text-primary">Contact</h2>
          <p class="text-lg text-text-tertiary mb-8">
            Intéressé par mon profil ? N'hésitez pas à me contacter !
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="mailto:aurelien.fevre@exemple.com" class="px-6 py-3 bg-accent rounded-xl text-bg-primary hover:bg-accent/90 transition-colors font-medium">
              Email
            </a>
            <a href="/cv.pdf" target="_blank" class="px-6 py-3 bg-green-500 rounded-xl text-white hover:bg-green-600 transition-colors font-medium">
              Télécharger CV
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePortfolioMode } from '~/composables/usePortfolioMode'
import { portfolioConfigs } from '~/data/portfolio-config'
import { studentYears } from '~/data/student-data'
import ProfileSection from '~/components/sections/ProfileSection.vue'
import IntroSection from '~/components/sections/IntroSection.vue'
import StageSection from '~/components/sections/StageSection.vue'
import LinksSection from '~/components/sections/LinksSection.vue'
import FormationSection from '~/components/sections/FormationSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

// Gestion du mode portfolio
const { portfolioMode, isPro, isStudent, initMode } = usePortfolioMode()

// Initialize mode on mount
onMounted(() => {
  initMode()
})

// Configuration SEO dynamique selon le mode
const config = computed(() => portfolioConfigs[portfolioMode.value])

useHead({
  title: computed(() => config.value.seo.title),
  meta: [
    { name: 'description', content: computed(() => config.value.seo.description) },
    { name: 'keywords', content: computed(() => config.value.seo.keywords) }
  ]
})
</script>

<style scoped>
.bento-grid {
  @apply grid grid-cols-12 gap-6 max-w-[1400px] mx-auto px-6 pt-40 pb-6;
}

@media (max-width: 768px) {
  .bento-grid {
    @apply grid-cols-4 gap-4 pt-28;
  }

  /* Réorganisation des blocs en mobile */
  :deep(.profile-photo) {
    order: -1;
  }
}

/* Mode Étudiant - Bento Grid */
.student-bento {
  @apply min-h-screen;
}

.bento-intro,
.bento-year,
.bento-contact {
  @apply grid grid-cols-12 gap-6 max-w-[1400px] mx-auto px-6 py-6;
}

.bento-intro {
  @apply pt-40;
}

.bento-year {
  @apply py-12;
}

.bento-contact {
  @apply pb-12;
}

.bento-item {
  @apply relative;
}

/* Responsive pour mode étudiant */
@media (max-width: 768px) {
  .bento-intro,
  .bento-year,
  .bento-contact {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    padding-top: 7rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .bento-intro {
    padding-top: 8rem;
  }
  
  .student-bento .col-span-12,
  .student-bento .col-span-8,
  .student-bento .col-span-6,
  .student-bento .col-span-4 {
    grid-column: span 4 / span 4;
  }
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Animation au scroll */
section {
  @apply scroll-mt-20;
}
</style>