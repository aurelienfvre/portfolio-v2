<template>
  <div>
    <!-- Mode Étudiant - Bento Grid par année -->
    <div class="student-bento">
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
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[0]?.title || '1ère année BUT MMI - Découverte des fondamentaux' }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Découverte des fondamentaux du multimédia et de l'internet avec l'acquisition des compétences de base
          </p>
        </div>
        
        <!-- Compétences AC en Bento Grid -->
        <div v-for="competence in getYearCompetences(1)" :key="competence.id" class="bento-item col-span-4 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-blue-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in getCompetenceAC(competence.id)" :key="ac.id" class="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
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
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[1]?.title || '2ème année BUT MMI - Approfondissement' }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Approfondissement des compétences avec premiers projets personnels et expérience professionnelle
          </p>
        </div>
        
        <!-- Compétences -->
        <div v-for="competence in getYearCompetences(2)" :key="competence.id" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-purple-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in getCompetenceAC(competence.id)" :key="ac.id" class="border-l-4 border-purple-200 dark:border-purple-800 pl-4">
              <h4 class="font-medium text-text-primary text-sm">{{ ac.title }}</h4>
              <p class="text-sm text-text-tertiary mt-1">{{ ac.description }}</p>
              <span v-if="ac.project" class="inline-block mt-2 text-xs text-purple-600 font-medium bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded">{{ ac.project }}</span>
            </div>
          </div>
        </div>

        <!-- Travaux personnels -->
        <div v-for="projet in studentYears[1]?.projects || []" :key="projet.title" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
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
        <div v-for="stage in studentYears[1]?.internships || []" :key="stage.title" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
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
          <h2 class="text-3xl font-bold text-center mb-4 text-text-primary">{{ studentYears[2]?.title || '3ème année BUT MMI - Spécialisation Développement Web' }}</h2>
          <p class="text-center text-text-tertiary max-w-3xl mx-auto">
            Spécialisation en développement web avec projets avancés et recherche d'alternance Master
          </p>
        </div>
        
        <!-- Compétences -->
        <div v-for="competence in getYearCompetences(3)" :key="competence.id" class="bento-item col-span-6 bg-bg-primary border border-border-primary rounded-3xl p-6">
          <h3 class="text-xl font-semibold mb-4 text-green-500">{{ competence.name }} ({{ competence.code }})</h3>
          <div class="space-y-4">
            <div v-for="ac in getCompetenceAC(competence.id)" :key="ac.id" class="border-l-4 border-green-200 dark:border-green-800 pl-4">
              <h4 class="font-medium text-text-primary text-sm">{{ ac.title }}</h4>
              <p class="text-sm text-text-tertiary mt-1">{{ ac.description }}</p>
              <span v-if="ac.project" class="inline-block mt-2 text-xs text-green-600 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">{{ ac.project }}</span>
            </div>
          </div>
        </div>

        <!-- Travaux personnels année 3 -->
        <div v-for="projet in studentYears[2]?.projects || []" :key="projet.title" class="bento-item col-span-4 bg-bg-primary border border-border-primary rounded-3xl p-6 overflow-hidden">
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
        <div v-for="stage in studentYears[2]?.internships || []" :key="stage.title" class="bento-item col-span-8 bg-bg-primary border border-border-primary rounded-3xl p-6">
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
import { onMounted } from 'vue'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'
import { studentYears } from '~/data/student-data'

// Data management BDD
const {
  studentYears: dbStudentYears,
  competences,
  apprentissagesCritiques,
  fetchStudentYears,
  fetchCompetences,
  fetchApprentissagesCritiques
} = usePortfolioDatabase()

// Récupérer les compétences pour une année donnée
const getYearCompetences = (yearNumber: number) => {
  const year = dbStudentYears.value?.find(y => y.year === yearNumber)
  if (!year) return []
  return competences.value?.filter(comp => comp.studentYearId === year.id) || []
}

// Récupérer les AC pour une compétence donnée
const getCompetenceAC = (competenceId: number) => {
  return apprentissagesCritiques.value?.filter(ac => ac.competenceId === competenceId) || []
}

// Initialize data
onMounted(async () => {
  await Promise.all([
    fetchStudentYears(),
    fetchCompetences(),
    fetchApprentissagesCritiques()
  ])
})

// SEO pour portfolio étudiant
useHead({
  title: 'Aurélien Fèvre - Portfolio Étudiant BUT MMI',
  meta: [
    { name: 'description', content: 'Portfolio étudiant BUT MMI - Parcours de 3 années avec compétences, projets académiques et apprentissages critiques.' },
    { name: 'keywords', content: 'portfolio étudiant, BUT MMI, apprentissages critiques, projets étudiants, compétences MMI' },
    { property: 'og:title', content: 'Aurélien Fèvre - Portfolio Étudiant BUT MMI' },
    { property: 'og:description', content: 'Portfolio étudiant BUT MMI - Parcours de 3 années avec compétences, projets académiques et apprentissages critiques.' }
  ]
})
</script>

<style scoped>
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