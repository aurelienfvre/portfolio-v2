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
        
        <!-- Structure Kanban : une ligne avec toutes les compétences -->
        <div 
          :ref="el => kanbanContainers[yearIndex] = el"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div 
            v-for="competence in year.skills" 
            :key="competence.code"
            :data-swapy-slot="`${year.year}-${competence.code}`"
            class="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-4 min-h-[400px]"
          >
            <div 
              :data-swapy-item="`${year.year}-${competence.code}-container`"
              class="h-full"
            >
              <!-- En-tête de la compétence -->
              <div class="mb-4 pb-3 border-b border-gray-200">
                <h4 class="font-semibold text-text-primary text-sm">{{ competence.name }}</h4>
                <p class="text-xs text-text-tertiary">({{ competence.code }})</p>
              </div>
              
              <!-- Zone de drop pour les AC -->
              <div class="space-y-3">
                <div 
                  v-for="ac in competence.ac" 
                  :key="`${year.year}-${ac.title}`"
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
                
                <!-- Placeholder quand la compétence est vide -->
                <div 
                  v-if="competence.ac.length === 0"
                  class="text-center py-8 text-gray-400 text-sm"
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

const kanbanContainers = ref<(HTMLElement | null)[]>([])
let swapyInstance: any = null

const initializeKanbanSwapy = async () => {
  if (import.meta.client) {
    try {
      const { createSwapy } = await import('swapy')
      
      // Détruire l'instance existante
      destroySwapy()
      
      // Créer une seule instance Swapy pour tous les conteneurs
      const allContainers = kanbanContainers.value.filter(Boolean)
      if (allContainers.length > 0) {
        // Utiliser le premier conteneur comme conteneur principal
        const mainContainer = allContainers[0]?.parentElement
        if (mainContainer) {
          swapyInstance = createSwapy(mainContainer, {
            animation: 'dynamic'
          })
          
          swapyInstance.onSwap((event: any) => {
            const { oldSlot, newSlot, item } = event.data
            
            // Les slots sont maintenant des conteneurs de compétences
            // On ne fait rien car on ne veut pas déplacer les compétences entières
            console.log('Swap event:', { oldSlot, newSlot, item })
          })
        }
      }
    } catch (error) {
      console.error('Error initializing Kanban Swapy:', error)
    }
  }
}

const destroySwapy = () => {
  if (swapyInstance) {
    swapyInstance.destroy()
    swapyInstance = null
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
