<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Header d'édition fixe -->
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div class="bg-bg-secondary/90 backdrop-blur-lg border border-border-primary rounded-2xl px-6 py-3 shadow-lg">
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-semibold text-text-primary">Édition Portfolio Bento</h1>
          
          <div class="h-6 w-px bg-border-primary"></div>
          
          <div class="flex items-center gap-2">
            <button
              @click="openBentoModal()"
              class="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nouveau Bloc
            </button>
            
            <button
              @click="saveAndReturn"
              class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Valider
            </button>
            
            <NuxtLink 
              to="/admin"
              class="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Annuler
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Bento Grid Éditable avec Preview -->
    <div class="pt-24 pb-8">
      <div class="flex gap-8 max-w-[120rem] mx-auto px-4">
        <!-- Éditeur principal -->
        <div class="flex-1 bento-grid-editable">
        <div class="relative">
          <div class="absolute -top-16 left-4 text-sm text-gray-600 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl z-20 border border-gray-200 shadow-md">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Éditeur Portfolio Bento - {{ sortedBentoBlocks.length }} blocs</span>
            </div>
            <div class="text-xs text-gray-500 mt-1">Drag & drop, double-clic pour éditer</div>
          </div>
          <div 
            ref="bentoContainer"
            class="grid grid-cols-12 gap-6 min-h-screen p-6 border-2 border-dashed border-orange-300 rounded-3xl bg-gradient-to-br from-orange-50/20 to-blue-50/10 relative"
            style="contain: layout style paint; box-shadow: inset 0 0 30px rgba(249, 115, 22, 0.1);"
          >
          <!-- Blocs bento éditables -->
          <div
            v-for="(block, index) in sortedBentoBlocks"
            :key="block.id"
            :data-swapy-slot="`slot-${index}`"
            :class="`col-span-${block.colSpan} transition-all duration-200 relative group`"
          >
            <div
              :data-swapy-item="block.id.toString()"
              class="w-full h-full cursor-move border-2 border-transparent hover:border-dashed hover:border-accent transition-all rounded-2xl overflow-hidden"
              @dblclick="handleDoubleClick(block, $event)"
            >
              <!-- Card de base pour les blocs -->
              <div class="bg-bg-primary border border-border-primary rounded-2xl shadow-sm h-full min-h-[200px] relative overflow-hidden group-hover:shadow-md transition-shadow">
                <!-- Contenu du bloc éditable -->
                <div class="w-full h-full p-6 relative">
                  <!-- Header du bloc -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-3 h-3 rounded-full"
                        :style="{ backgroundColor: getBlockColor(block.component) }"
                      ></div>
                      <h3 class="font-semibold text-text-primary">{{ block.title }}</h3>
                    </div>
                    <div class="text-xs text-text-tertiary bg-bg-secondary px-2 py-1 rounded-full">
                      {{ block.colSpan }}/12
                    </div>
                  </div>
                  
                  <!-- Contenu éditable -->
                  <div class="text-text-secondary">
                    <div v-if="block.component === 'ProfileSection'" class="space-y-2">
                      <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <div class="text-center">
                        <div class="font-medium">{{ block.content || 'Photo de profil' }}</div>
                        <div class="text-sm text-text-tertiary">Double-clic pour éditer</div>
                      </div>
                    </div>
                    
                    <div v-else-if="block.component === 'IntroSection'" class="space-y-3">
                      <div class="font-semibold text-lg">{{ block.content || 'Aurélien Fèvre' }}</div>
                      <div class="text-text-tertiary">Développeur Front-end</div>
                      <div class="text-sm">{{ block.description || 'Double-clic pour éditer la description' }}</div>
                    </div>
                    
                    <div v-else-if="block.component === 'ProjectsSection'" class="space-y-2">
                      <div class="font-medium">{{ block.content || 'Mes Projets' }}</div>
                      <div class="grid grid-cols-2 gap-2">
                        <div v-for="i in 4" :key="i" class="bg-gray-100 rounded-lg h-8"></div>
                      </div>
                    </div>
                    
                    <div v-else-if="block.component === 'SkillsSection'" class="space-y-2">
                      <div class="font-medium">{{ block.content || 'Compétences' }}</div>
                      <div class="flex flex-wrap gap-1">
                        <div v-for="i in 6" :key="i" class="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                          Skill {{ i }}
                        </div>
                      </div>
                    </div>
                    
                    <div v-else-if="block.component === 'ContactSection'" class="space-y-2">
                      <div class="font-medium">{{ block.content || 'Contact' }}</div>
                      <div class="space-y-1 text-sm">
                        <div>📧 contact@email.com</div>
                        <div>📱 +33 6 XX XX XX XX</div>
                        <div>🔗 LinkedIn</div>
                      </div>
                    </div>
                    
                    <!-- Autres composants -->
                    <div v-else class="space-y-2">
                      <div class="font-medium">{{ block.title }}</div>
                      <div class="text-sm text-text-tertiary">
                        {{ block.content || 'Double-cliquez pour éditer le contenu' }}
                      </div>
                      <div class="text-xs text-text-tertiary">
                        Composant: {{ block.component || 'Personnalisé' }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Indicateur d'édition -->
                  <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      Double-clic
                    </div>
                  </div>
                </div>

                <!-- Overlay d'édition -->
                <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                  <div class="bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                      Double-clic pour éditer
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"/>
                      </svg>
                      Drag pour déplacer
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Actions du bloc -->
            <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2 z-10">
              <!-- Taille actuelle indicator -->
              <div class="bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
                {{ block.colSpan }}/12
              </div>
              
              <!-- Actions buttons -->
              <div class="flex gap-1">
                <!-- Édition rapide -->
                <button 
                  @click="handleDoubleClick(block, $event)"
                  class="bg-green-500/90 hover:bg-green-500 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  title="Édition rapide (Double-clic)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                
                <!-- Redimensionner -->
                <button 
                  @click="openResizeModal(block)"
                  class="bg-blue-500/90 hover:bg-blue-500 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  title="Redimensionner le bloc"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                  </svg>
                </button>
                
                <!-- Éditer propriétés -->
                <button 
                  @click="openBentoModal(block)"
                  class="bg-purple-500/90 hover:bg-purple-500 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  title="Éditer les propriétés avancées"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
                
                <!-- Supprimer -->
                <button 
                  @click="deleteBlock(block.id)"
                  class="bg-red-500/90 hover:bg-red-500 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                  title="Supprimer le bloc"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- État vide -->
          <div 
            v-if="sortedBentoBlocks.length === 0"
            class="col-span-12 flex items-center justify-center min-h-[60vh] border-2 border-dashed border-border-primary rounded-2xl"
          >
            <div class="text-center">
              <svg class="w-20 h-20 text-text-tertiary mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              <h3 class="text-2xl font-semibold text-text-primary mb-3">Portfolio vide</h3>
              <p class="text-text-tertiary mb-6">Commencez par créer votre premier bloc</p>
              <button
                @click="openBentoModal()"
                class="bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors font-medium"
              >
                + Créer un bloc
              </button>
            </div>
          </div>
          </div>
        </div>
        
        <!-- Preview temps réel -->
        <div class="w-80 flex-shrink-0">
          <div class="sticky top-24">
            <div class="bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
              <!-- Header preview -->
              <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <h3 class="font-semibold">Preview Temps Réel</h3>
                </div>
                <p class="text-blue-100 text-sm mt-1">Aperçu du portfolio</p>
              </div>
              
              <!-- Preview content -->
              <div class="p-4 bg-gray-50 max-h-[70vh] overflow-y-auto">
                <div class="grid grid-cols-6 gap-2 text-xs">
                  <div
                    v-for="block in sortedBentoBlocks"
                    :key="block.id"
                    :class="`col-span-${Math.ceil(block.colSpan / 2)} min-h-[40px] rounded-lg flex items-center justify-center text-white font-medium text-[10px] p-2 transition-all duration-200`"
                    :style="{ backgroundColor: getBlockColor(block.component) }"
                  >
                    <div class="text-center">
                      <div class="font-bold">{{ block.title }}</div>
                      <div class="opacity-75">{{ block.colSpan }}/12</div>
                    </div>
                  </div>
                </div>
                
                <!-- Stats preview -->
                <div class="mt-4 p-3 bg-white rounded-xl border border-gray-200">
                  <div class="text-xs text-gray-600 space-y-1">
                    <div class="flex justify-between">
                      <span>Total blocs:</span>
                      <span class="font-medium">{{ sortedBentoBlocks.length }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Colonnes utilisées:</span>
                      <span class="font-medium">{{ totalColumns }}/12</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Dernière modif:</span>
                      <span class="font-medium">{{ lastUpdateTime }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <BentoModal
      v-if="showBentoModal"
      :block="selectedBentoBlock"
      @close="closeBentoModal"
      @save="saveBentoBlock"
    />

    <ResizeModal
      v-if="showResizeModal"
      :block="selectedBlock"
      @close="closeResizeModal"
      @save="saveBlockSize"
    />

    <!-- WYSIWYG Editor Tooltip (Style Notion) -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="showWysiwygTooltip"
        ref="wysiwygTooltip"
        class="fixed z-[100] bg-bg-primary border border-border-primary rounded-2xl shadow-2xl p-6 max-w-lg w-[500px] backdrop-blur-md"
        :style="tooltipPosition"
      >
        <!-- Header avec titre et raccourcis -->
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h4 class="font-semibold text-text-primary text-lg flex items-center gap-2">
              <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              Édition directe
            </h4>
            <div class="text-xs text-text-tertiary mt-1 flex items-center gap-4">
              <span>⌘ + Entrée pour sauvegarder</span>
              <span>Echap pour annuler</span>
            </div>
          </div>
          <button
            @click="closeWysiwygTooltip"
            class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Nom du bloc en cours d'édition -->
        <div class="mb-4 px-3 py-2 bg-bg-secondary rounded-xl border border-border-primary">
          <div class="text-sm font-medium text-text-primary">{{ editingBlock?.title || 'Bloc personnalisé' }}</div>
          <div class="text-xs text-text-tertiary">{{ editingBlock?.colSpan }}/12 colonnes</div>
        </div>
        
        <!-- Éditeur WYSIWYG -->
        <WysiwygEditor
          v-model="editingContent"
          label="Contenu du bloc"
          class="min-h-[250px]"
        />
        
        <!-- Actions avec design moderne -->
        <div class="mt-6 flex justify-between items-center">
          <div class="text-xs text-text-tertiary">
            {{ editingContent.length }} caractères
          </div>
          <div class="flex gap-3">
            <button
              @click="closeWysiwygTooltip"
              class="px-4 py-2 text-text-secondary border border-border-primary rounded-xl hover:bg-bg-secondary hover:text-text-primary transition-all duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              @click="saveWysiwygContent"
              class="px-6 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { usePortfolioData } from '~/composables/usePortfolioData'
import BentoModal from '~/components/admin/BentoModal.vue'
import ResizeModal from '~/components/admin/ResizeModal.vue'
import WysiwygEditor from '~/components/admin/WysiwygEditor.vue'

// Import portfolio sections
import ProfileSection from '~/components/sections/ProfileSection.vue'
import IntroSection from '~/components/sections/IntroSection.vue'
import StageSection from '~/components/sections/StageSection.vue'
import LinksSection from '~/components/sections/LinksSection.vue'
import FormationSection from '~/components/sections/FormationSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import ProjectsSection from '~/components/sections/ProjectsSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'

// Portfolio data management
const {
  bentoBlocks,
  sortedBentoBlocks,
  addBentoBlock,
  updateBentoBlock,
  deleteBentoBlock,
  loadFromLocalStorage
} = usePortfolioData()

// Modal states
const showBentoModal = ref(false)
const selectedBentoBlock = ref<any>(null)
const showResizeModal = ref(false)
const selectedBlock = ref<any>(null)

// WYSIWYG editor state
const showWysiwygTooltip = ref(false)
const editingBlock = ref<any>(null)
const editingContent = ref('')
const tooltipPosition = ref({ top: '0px', left: '0px' })

// Drag and drop state
const bentoContainer = ref(null)
let swapyInstance: any = null

// Modal management
const openBentoModal = (block = null) => {
  selectedBentoBlock.value = block
  showBentoModal.value = true
}

const closeBentoModal = () => {
  showBentoModal.value = false
  selectedBentoBlock.value = null
}

const saveBentoBlock = (blockData: any) => {
  if (selectedBentoBlock.value) {
    updateBentoBlock(selectedBentoBlock.value.id, blockData)
  } else {
    addBentoBlock(blockData)
  }
  closeBentoModal()
  reinitializeSwapy()
}

const openResizeModal = (block: any) => {
  selectedBlock.value = block
  showResizeModal.value = true
}

const closeResizeModal = () => {
  showResizeModal.value = false
  selectedBlock.value = null
}

const saveBlockSize = (newSize: number) => {
  if (selectedBlock.value) {
    updateBentoBlock(selectedBlock.value.id, { ...selectedBlock.value, colSpan: newSize })
  }
  closeResizeModal()
}

const deleteBlock = (blockId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
    deleteBentoBlock(blockId)
    reinitializeSwapy()
  }
}

// Double click handler for WYSIWYG editing
const handleDoubleClick = (block: any, event: MouseEvent) => {
  const textComponents = ['IntroSection', 'ProfileSection', 'ContactSection']
  
  if (textComponents.includes(block.component) || !block.component) {
    editingBlock.value = block
    editingContent.value = block.content || block.title || ''
    
    // Position tooltip near click
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    tooltipPosition.value = {
      top: `${rect.top + window.scrollY - 50}px`,
      left: `${rect.left + window.scrollX}px`
    }
    
    showWysiwygTooltip.value = true
  }
}

const closeWysiwygTooltip = () => {
  showWysiwygTooltip.value = false
  editingBlock.value = null
  editingContent.value = ''
}


const saveWysiwygContent = () => {
  if (editingBlock.value) {
    const updatedBlock = {
      ...editingBlock.value,
      content: editingContent.value,
      title: !editingBlock.value.component ? editingContent.value : editingBlock.value.title
    }
    
    updateBentoBlock(editingBlock.value.id, updatedBlock)
  }
  
  closeWysiwygTooltip()
}

// Save and return to admin
const saveAndReturn = () => {
  // Data is already saved in localStorage through composable
  navigateTo('/admin')
}


// Drag and Drop Management - simple pattern like Projects
const initializeSwapy = async () => {
  if (import.meta.client && bentoContainer.value && sortedBentoBlocks.value.length > 0) {
    try {
      const { createSwapy } = await import('swapy')
      
      swapyInstance = createSwapy(bentoContainer.value)
      
      swapyInstance.onSwap((event: any) => {
        const newOrder = event.newSlotItemMap.asArray
        
        // Créer le nouveau tableau dans l'ordre des slots
        const reorderedBlocks = newOrder.map((slot: any, index: number) => {
          const block = sortedBentoBlocks.value.find(b => b.id.toString() === slot.item)
          return {
            ...block,
            order: index + 1
          }
        })
        
        // Mettre à jour les blocs
        bentoBlocks.value = reorderedBlocks
      })
    } catch (error) {
      console.error('Error initializing Bento Swapy:', error)
    }
  }
}

const destroySwapy = () => {
  if (swapyInstance) {
    swapyInstance.destroy()
    swapyInstance = null
  }
}

const reinitializeSwapy = async () => {
  destroySwapy()
  await nextTick()
  initializeSwapy()
}


// Map component names to actual components
const componentMap = {
  'ProfileSection': ProfileSection,
  'IntroSection': IntroSection,
  'StageSection': StageSection,
  'LinksSection': LinksSection,
  'FormationSection': FormationSection,
  'SkillsSection': SkillsSection,
  'ProjectsSection': ProjectsSection,
  'ContactSection': ContactSection
}


// Preview functions
const getBlockColor = (component: string) => {
  const colors: Record<string, string> = {
    'ProfileSection': '#3b82f6',      // blue
    'IntroSection': '#10b981',        // green
    'StageSection': '#f59e0b',        // yellow
    'LinksSection': '#8b5cf6',        // purple
    'FormationSection': '#6366f1',    // indigo
    'SkillsSection': '#06b6d4',       // cyan
    'ProjectsSection': '#f97316',     // orange
    'ContactSection': '#ec4899'       // pink
  }
  return colors[component] || '#6b7280' // gray fallback
}

const totalColumns = computed(() => {
  return sortedBentoBlocks.value.reduce((total, block) => total + block.colSpan, 0)
})

const lastUpdateTime = computed(() => {
  return new Date().toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
})

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  // Close WYSIWYG editor with Escape
  if (event.key === 'Escape' && showWysiwygTooltip.value) {
    closeWysiwygTooltip()
    event.preventDefault()
  }
  
  // Save WYSIWYG content with Ctrl/Cmd + Enter
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && showWysiwygTooltip.value) {
    saveWysiwygContent()
    event.preventDefault()
  }
  
  // Close modals with Escape
  if (event.key === 'Escape') {
    if (showBentoModal.value) {
      closeBentoModal()
      event.preventDefault()
    }
    if (showResizeModal.value) {
      closeResizeModal()
      event.preventDefault()
    }
  }
}

// Initialize data on mount
onMounted(async () => {
  loadFromLocalStorage()
  await nextTick()
  initializeSwapy()
  
  // Add keyboard event listeners
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup on unmount
onUnmounted(() => {
  destroySwapy()
  document.removeEventListener('keydown', handleKeydown)
})

// SEO
useHead({
  title: 'Édition Portfolio Bento - Admin',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.bento-grid-editable {
  min-height: calc(100vh - 6rem);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(var(--text-tertiary), 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--text-tertiary), 0.5);
}
</style>