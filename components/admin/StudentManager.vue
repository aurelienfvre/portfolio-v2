<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-text-primary">Mode Étudiant - Gestion AC</h2>
      <button
        @click="$emit('openACModal', {})"
        class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
      >
        + Nouvel AC
      </button>
    </div>

    <div class="space-y-8">
      <div v-for="(year, yearIndex) in studentYears" :key="year.year" class="bg-bg-primary border border-border-primary rounded-3xl shadow-sm p-6">
        <h3 class="text-xl font-semibold mb-6 text-text-primary">{{ year.title }}</h3>
        
        <!-- Grille de compétences Kanban -->
        <VueDraggable
          v-model="year.skills"
          :group="`competence-group-${yearIndex}`"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          ghost-class="competence-ghost"
          chosen-class="competence-chosen"
          drag-class="competence-drag"
          :animation="200"
          @change="onCompetenceChange"
        >
          <div
            v-for="(competence, competenceIndex) in year.skills"
            :key="competence.code"
            class="h-fit"
          >
            <!-- Colonne de compétence -->
            <div class="bg-white border border-border-primary rounded-2xl shadow-sm p-4 cursor-move hover:border-accent transition-all">
              <!-- En-tête de la compétence -->
              <div class="mb-4 pb-3 border-b border-gray-200">
                <div>
                  <h4 class="font-semibold text-text-primary text-sm">{{ competence.name }}</h4>
                  <p class="text-xs text-text-tertiary">({{ competence.code }})</p>
                </div>
              </div>
              
              <!-- Liste draggable des AC -->
              <VueDraggable
                v-model="competence.ac"
                :group="`ac-group-${yearIndex}`"
                class="space-y-3"
                ghost-class="ghost"
                chosen-class="chosen"
                drag-class="drag"
                :animation="150"
                @change="onACChange"
              >
                <div
                  v-for="ac in competence.ac"
                  :key="ac.title"
                  class="bg-bg-primary border border-border-primary rounded-xl shadow-sm overflow-hidden cursor-move hover:border-accent hover:shadow-md transition-all"
                >
                  <div class="p-3">
                    <h5 class="font-medium text-text-primary mb-1 text-sm">{{ ac.title }}</h5>
                    <p class="text-xs text-text-tertiary mb-2 line-clamp-2">{{ ac.description }}</p>
                    <div v-if="ac.project" class="text-accent text-xs mb-2 font-medium">{{ ac.project }}</div>
                    <div class="flex space-x-1" @click.stop>
                      <button
                        @click="$emit('editAC', ac)"
                        class="px-2 py-1 bg-accent text-white text-xs rounded-md hover:bg-accent/80 font-medium"
                      >
                        Modifier
                      </button>
                      <button
                        @click="$emit('deleteAC', ac)"
                        class="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Template pour zone vide -->
                <template #footer>
                  <div 
                    v-if="competence.ac.length === 0"
                    class="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-xl min-h-[120px] flex items-center justify-center"
                  >
                    Glissez un AC ici
                  </div>
                </template>
              </VueDraggable>
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
  studentYears: any[]
}>()

const emit = defineEmits<{
  editAC: [ac: any]
  deleteAC: [ac: any]
  updateStudentYears: [years: any[]]
}>()

// Handler pour les changements de drag & drop des AC
const onACChange = () => {
  // Émettre les changements après le drag & drop des AC
  emit('updateStudentYears', [...props.studentYears])
}

// Handler pour les changements de drag & drop des compétences
const onCompetenceChange = () => {
  // Émettre les changements après le drag & drop des compétences
  emit('updateStudentYears', [...props.studentYears])
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Styles pour le drag & drop des AC */
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

/* Styles pour le drag & drop des compétences */
.competence-ghost {
  opacity: 0.3;
  background: #e0f2fe;
  border: 2px dashed #0ea5e9;
  transform: scale(0.95);
}

.competence-chosen {
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 15px 35px rgba(14, 165, 233, 0.2);
  border-color: #0ea5e9;
  z-index: 100;
}

.competence-drag {
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 15px 35px rgba(14, 165, 233, 0.2);
  z-index: 1000;
  border-color: #0ea5e9;
}
</style>