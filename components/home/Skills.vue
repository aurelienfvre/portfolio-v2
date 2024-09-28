<template>
  <section id="skills" class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center">Mes compétences</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="skill in skills" :key="skill.name" :title="skill.name">
          <template #content>
            <ul class="space-y-2">
              <li v-for="item in skill.items" :key="item" class="flex items-center">
                <icon-check class="w-5 h-5 text-green-500 mr-2" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  {
    name: 'Front-end',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Nuxt.js', 'Tailwind CSS']
  },
  {
    name: 'Design',
    items: ['UI/UX Design', 'Figma', 'Adobe XD', 'Responsive Design']
  },
  {
    name: 'Outils',
    items: ['Git', 'npm', 'Webpack', 'VS Code', 'Terminal']
  }
]
</script>