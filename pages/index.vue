<template>
  <div>
    <Header />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import Hero from '~/components/home/Hero.vue'
import About from '~/components/home/About.vue'
import Skills from '~/components/home/Skills.vue'
import Projects from '~/components/home/Projects.vue'
</script>