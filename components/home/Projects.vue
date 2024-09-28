<template>
  <section id="projects" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center">Mes projets récents</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
            v-for="project in projects"
            :key="project.title"
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.technologies"
        >
          <template #footer>
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
              Voir le projet
            </a>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    title: "Application de gestion de tâches",
    description: "Une application web pour gérer efficacement ses tâches quotidiennes.",
    image: "/projects/task-app.jpg",
    technologies: ["Vue.js", "Vuex", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "Portfolio personnel",
    description: "Mon portfolio personnel créé avec Nuxt.js et Tailwind CSS.",
    image: "/projects/portfolio.jpg",
    technologies: ["Nuxt.js", "Tailwind CSS", "Netlify"],
    link: "#"
  },
  {
    title: "Site e-commerce",
    description: "Un site e-commerce moderne avec panier et paiement intégré.",
    image: "/projects/ecommerce.jpg",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    link: "#"
  }
]
</script>