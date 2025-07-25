<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-text-primary">
        Gestion des Compétences
      </h2>
      <button
        @click="$emit('openSkillModal')"
        class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
      >
        + Nouvelle Compétence
      </button>
    </div>

    <div class="space-y-8">
      <div
        v-for="(skills, categoryName) in skillsByCategory"
        :key="categoryName"
        class="space-y-4"
      >
        <h3
          class="text-lg font-semibold text-text-primary border-l-4 border-accent pl-4"
        >
          {{ categoryName }}
        </h3>
        <VueDraggable
          :model-value="skills"
          @update:model-value="(newSkills) => onSkillChange(categoryName, newSkills)"
          :group="`skills-${categoryName}`"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          ghost-class="ghost"
          chosen-class="chosen"
          drag-class="drag"
          :animation="200"
        >
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="min-h-[120px]"
          >
            <div
              class="bg-bg-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden relative group cursor-move hover:border-accent w-full h-full"
            >
              <div class="p-3">
                <div
                  class="flex items-center space-x-2 mb-2 pointer-events-none"
                >
                  <img
                    v-if="skill.icon"
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6"
                    :class="{ 'filter invert': skill.invert }"
                  />
                  <h4 class="font-medium text-text-primary text-sm">
                    {{ skill.name }}
                  </h4>
                </div>
                <div class="flex space-x-1" @click.stop>
                  <button
                    @click="$emit('editSkill', skill)"
                    class="px-2 py-1 bg-accent text-white text-xs rounded-md hover:bg-accent/80 font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    @click="$emit('deleteSkill', skill.name)"
                    class="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  skillsByCategory: Record<string, any[]>
}>()

const emit = defineEmits<{
  openSkillModal: []
  editSkill: [skill: any]
  deleteSkill: [skillName: string]
  updateSkills: [skills: Record<string, any[]>]
}>()

// Handler pour les changements de drag & drop
const onSkillChange = (categoryName: string, newSkills: any[]) => {
  const updatedSkillsByCategory = {
    ...props.skillsByCategory,
    [categoryName]: newSkills
  }
  emit('updateSkills', updatedSkillsByCategory)
}
</script>

<style scoped>
/* Styles pour le drag & drop */
.ghost {
  opacity: 0.5;
  background: #f3f4f6;
  border: 2px dashed #6366f1;
}

.chosen {
  transform: rotate(5deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.drag {
  transform: rotate(5deg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 999;
}
</style>

