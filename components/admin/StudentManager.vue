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
        
        <!-- Drag & Drop pour les cartes de compétences (niveau 1) -->
        <div 
          :ref="el => skillCardsContainers[yearIndex] = el"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div 
            v-for="(competence, competenceIndex) in year.skills" 
            :key="competence.code"
            :data-swapy-slot="`skill-${yearIndex}-${competenceIndex}`"
            class="min-h-[400px]"
          >
            <div 
              :data-swapy-item="`skill-${yearIndex}-${competence.code}`"
              class="bg-white border border-border-primary rounded-2xl shadow-sm p-4 min-h-[400px] w-full h-full hover:border-accent transition-all"
            >
              <!-- En-tête de la compétence -->
              <div class="mb-4 pb-3 border-b border-gray-200 pointer-events-none">
                <h4 class="font-semibold text-text-primary text-sm">{{ competence.name }}</h4>
                <p class="text-xs text-text-tertiary">({{ competence.code }})</p>
              </div>
              
              <!-- Zone de drop pour les AC avec Swapy (niveau 2) -->
              <div 
                :ref="el => acContainers[`${yearIndex}-${competenceIndex}`] = el"
                class="space-y-3 min-h-[300px]"
                @click.stop
              >
                <div 
                  v-for="(ac, acIndex) in competence.ac" 
                  :key="`${year.year}-${competence.code}-${acIndex}`"
                  :data-swapy-slot="`ac-${yearIndex}-${competenceIndex}-${acIndex}`"
                  class="min-h-[120px]"
                >
                  <div 
                    :data-swapy-item="`ac-${year.year}-${competence.code}-${ac.title}`"
                    class="bg-bg-primary border border-border-primary rounded-xl shadow-sm overflow-hidden hover:border-accent hover:shadow-md transition-all w-full h-full"
                  >
                    <div class="p-3">
                      <h5 class="font-medium text-text-primary mb-1 text-sm pointer-events-none">{{ ac.title }}</h5>
                      <p class="text-xs text-text-tertiary mb-2 line-clamp-2 pointer-events-none">{{ ac.description }}</p>
                      <div v-if="ac.project" class="text-accent text-xs mb-2 font-medium pointer-events-none">{{ ac.project }}</div>
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
                </div>
                
                <!-- Slot vide pour permettre le drop dans une compétence vide -->
                <div 
                  v-if="competence.ac.length === 0"
                  :data-swapy-slot="`ac-${yearIndex}-${competenceIndex}-empty`"
                  class="min-h-[120px]"
                >
                  <div 
                    :data-swapy-item="`ac-empty-${yearIndex}-${competenceIndex}`"
                    class="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-xl min-h-[120px] flex items-center justify-center w-full h-full"
                  >
                    Glissez un AC ici
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const props = defineProps<{
  studentYears: any[]
}>()

const emit = defineEmits<{
  openACModal: [ac: any]
  editAC: [ac: any]
  deleteAC: [ac: any]
  updateStudentYears: [years: any[]]
}>()

const skillCardsContainers = ref<(HTMLElement | null)[]>([])
const acContainers = ref<Record<string, HTMLElement>>({})
let globalSwapyInstance: any = null

const initializeKanbanSwapy = async () => {
  if (import.meta.client) {
    try {
      const { createSwapy } = await import('swapy')
      
      // Détruire l'instance existante
      destroySwapy()
      
      // Créer une seule instance Swapy globale pour tout l'espace de drag & drop
      const yearContainers = skillCardsContainers.value.filter(Boolean)
      if (yearContainers.length > 0) {
        // Utiliser le conteneur parent qui contient toutes les années
        const mainContainer = yearContainers[0]?.parentElement?.parentElement
        if (mainContainer) {
          globalSwapyInstance = createSwapy(mainContainer)
          
          globalSwapyInstance.onSwap((event: any) => {
            const { oldSlot, newSlot, item } = event.data
            
            // Gérer le drag & drop des cartes de compétences
            if (oldSlot.startsWith('skill-') && newSlot.startsWith('skill-')) {
              const oldParts = oldSlot.split('-')
              const newParts = newSlot.split('-')
              
              const oldYearIndex = parseInt(oldParts[1])
              const oldCompetenceIndex = parseInt(oldParts[2])
              const newYearIndex = parseInt(newParts[1])
              const newCompetenceIndex = parseInt(newParts[2])
              
              // Vérifier que c'est dans la même année
              if (oldYearIndex === newYearIndex) {
                const updatedYears = JSON.parse(JSON.stringify(props.studentYears))
                
                // Déplacer la compétence
                const competenceToMove = updatedYears[oldYearIndex].skills[oldCompetenceIndex]
                updatedYears[oldYearIndex].skills.splice(oldCompetenceIndex, 1)
                updatedYears[oldYearIndex].skills.splice(newCompetenceIndex, 0, competenceToMove)
                
                emit('updateStudentYears', updatedYears)
              }
            }
            
            // Gérer le drag & drop des AC
            else if (oldSlot.startsWith('ac-') && newSlot.startsWith('ac-')) {
              const oldSlotParts = oldSlot.split('-')
              const newSlotParts = newSlot.split('-')
              
              const oldYearIndex = parseInt(oldSlotParts[1])
              const oldCompetenceIndex = parseInt(oldSlotParts[2])
              const oldACIndex = parseInt(oldSlotParts[3])
              
              const newYearIndex = parseInt(newSlotParts[1])
              const newCompetenceIndex = parseInt(newSlotParts[2])
              let newACIndex = parseInt(newSlotParts[3])
              
              // Créer une copie des données pour manipulation
              const updatedYears = JSON.parse(JSON.stringify(props.studentYears))
              
              // Récupérer l'AC à déplacer
              const acToMove = updatedYears[oldYearIndex].skills[oldCompetenceIndex].ac[oldACIndex]
              
              // Supprimer l'AC de son ancienne position
              updatedYears[oldYearIndex].skills[oldCompetenceIndex].ac.splice(oldACIndex, 1)
              
              // L'insérer à sa nouvelle position
              if (newSlot.includes('empty')) {
                // Drop dans une compétence vide
                updatedYears[newYearIndex].skills[newCompetenceIndex].ac.push(acToMove)
              } else {
                // Ajuster l'index si on déplace dans la même compétence vers une position ultérieure
                if (oldYearIndex === newYearIndex && oldCompetenceIndex === newCompetenceIndex && oldACIndex < newACIndex) {
                  newACIndex -= 1
                }
                updatedYears[newYearIndex].skills[newCompetenceIndex].ac.splice(newACIndex, 0, acToMove)
              }
              
              emit('updateStudentYears', updatedYears)
            }
          })
        }
      }
    } catch (error) {
      console.error('Error initializing Global Swapy:', error)
    }
  }
}

const destroySwapy = () => {
  if (globalSwapyInstance) {
    globalSwapyInstance.destroy()
    globalSwapyInstance = null
  }
}

// Réinitialiser Swapy quand les données changent
watch(() => props.studentYears, () => {
  nextTick(() => {
    initializeKanbanSwapy()
  })
}, { deep: true })

onMounted(() => {
  nextTick(() => {
    initializeKanbanSwapy()
  })
})

onUnmounted(() => {
  destroySwapy()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Style pour les zones de drop */
[data-swapy-slot] {
  transition: all 0.2s ease;
}

[data-swapy-slot]:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

[data-swapy-slot].swapy-slot-over {
  border-color: #10b981;
  background-color: #ecfdf5;
}

/* Style pour les éléments en cours de drag */
[data-swapy-item].swapy-item-dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}
</style>
