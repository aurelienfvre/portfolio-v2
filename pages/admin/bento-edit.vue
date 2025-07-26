<template>
  <div class="min-h-screen bg-bg-primary">
    <!-- Header d'édition fixe -->
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        class="bg-bg-secondary/90 backdrop-blur-lg border border-border-primary rounded-2xl px-6 py-3 shadow-lg"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-semibold text-text-primary">
            Édition Portfolio Bento
          </h1>

          <div class="h-6 w-px bg-border-primary"></div>

          <div class="flex items-center gap-2">
            <button
              @click="openBentoModal()"
              class="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouveau Bloc
            </button>

            <button
              @click="saveAndReturn"
              class="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Valider
            </button>

            <NuxtLink
              to="/admin"
              class="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Annuler
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Portfolio Bento Grid Éditable avec Preview -->
    <div class="pt-24 pb-8">
      <div class="max-w-[1400px] mx-auto px-6">
        <!-- Éditeur principal -->
          <div class="relative">
            <div
              class="absolute -top-16 left-4 text-sm text-gray-600 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl z-20 border border-gray-200 shadow-md"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
                ></div>
                <span
                  >Éditeur Portfolio Bento -
                  {{ sortedBentoBlocks.length }} blocs</span
                >
              </div>
              <div class="text-xs text-gray-500 mt-1">
                Drag & drop, double-clic pour éditer
              </div>
            </div>
            <!-- Grille draggable avec vue-draggable-plus -->
            <VueDraggable
              v-model="bentoBlocks"
              ref="bentoContainer"
              group="bento-blocks"
              class="bento-grid grid grid-cols-12 gap-6 min-h-screen p-6 pt-40"
              ghost-class="bento-ghost"
              chosen-class="bento-chosen"
              drag-class="bento-drag"
              :animation="200"
              @change="onBentoChange"
              item-key="id"
            >
              <!-- Rendu des VRAIS composants du portfolio -->
              <div
                v-for="(block, index) in sortedBentoBlocks"
                :key="block.id"
                :class="`col-span-${block.colSpan} relative group cursor-move`"
                @dblclick="handleDoubleClick(block, $event)"
              >
                <!-- Composant réel du portfolio -->
                <component
                  :is="getComponent(block.component)"
                  class="h-full min-h-[200px] portfolio-block-editable"
                  v-bind="block.props || {}"
                />

                <!-- Overlay d'édition en hover -->
                <div
                  class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-2xl border-2 border-transparent group-hover:border-accent group-hover:border-dashed pointer-events-none"
                >
                  <div
                    class="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {{ block.title || block.component }}
                  </div>
                  <div
                    class="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-medium"
                  >
                    {{ block.colSpan }}/12
                  </div>
                </div>

                <!-- Actions flottantes -->
                <div
                  class="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1 z-20 pointer-events-auto"
                >
                  <!-- Édition rapide -->
                  <button
                    @click.stop="handleDoubleClick(block, $event)"
                    class="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Édition rapide"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>

                  <!-- Redimensionner -->
                  <button
                    @click.stop="openResizeModal(block)"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Redimensionner"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>

                  <!-- Supprimer -->
                  <button
                    @click.stop="deleteBlock(block.id)"
                    class="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Supprimer"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- État vide du portfolio -->
              <div
                v-if="sortedBentoBlocks.length === 0"
                class="col-span-12 flex items-center justify-center min-h-[60vh] border-2 border-dashed border-gray-300 rounded-3xl bg-gray-50/50"
              >
                <div class="text-center">
                  <svg
                    class="w-20 h-20 text-gray-400 mx-auto mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 class="text-2xl font-semibold text-gray-700 mb-3">
                    Portfolio vide
                  </h3>
                  <p class="text-gray-500 mb-6">
                    Créez votre premier bloc pour commencer
                  </p>
                  <button
                    @click="openBentoModal()"
                    class="bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
                  >
                    + Créer un bloc
                  </button>
                </div>
              </div>
              
              <!-- Custom Blocks Section -->
              <div
                v-for="(block, index) in customBlocks"
                :key="`custom-${block.id}`"
                :class="`col-span-${block.colSpan || 6} relative group cursor-move`"
                @dblclick="handleDoubleClick(block, $event)"
              >
                <!-- Composant CustomBlock -->
                <CustomBlock
                  :block="block"
                  class="h-full min-h-[200px] portfolio-block-editable"
                />

                <!-- Overlay d'édition en hover -->
                <div
                  class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-2xl border-2 border-transparent group-hover:border-accent group-hover:border-dashed pointer-events-none"
                ></div>

                <!-- Boutons d'édition -->
                <div
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 flex space-x-2 pointer-events-auto z-20"
                >
                  <!-- Éditer -->
                  <button
                    @click.stop="openBentoModal(block)"
                    class="bg-accent hover:bg-accent/90 text-bg-primary rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Éditer le bloc"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>

                  <!-- Redimensionner -->
                  <button
                    @click.stop="openResizeModal(block)"
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Redimensionner"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>

                  <!-- Supprimer -->
                  <button
                    @click.stop="deleteCustomBlock(block.id)"
                    class="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg hover:scale-105 transition-all"
                    title="Supprimer"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </VueDraggable>
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

    <!-- Profile Editor Modal -->
    <Teleport to="body">
      <div 
        v-if="showProfileEditor"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="closeContextualEditors"
      >
        <div 
          class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-2xl font-bold text-text-primary">Éditer le Profil</h3>
              <button 
                @click="closeContextualEditors" 
                class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="saveProfileData" class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-text-primary mb-3">
                    Prénom *
                  </label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                    style="direction: ltr; text-align: left;"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-text-primary mb-3">
                    Nom *
                  </label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                    style="direction: ltr; text-align: left;"
                  >
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Titre/Poste *
                </label>
                <input
                  v-model="profileForm.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                  style="direction: ltr; text-align: left;"
                  placeholder="ex: Développeur Front-end"
                >
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Description
                </label>
                <textarea
                  v-model="profileForm.description"
                  rows="3"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary resize-none"
                  style="direction: ltr; text-align: left;"
                  placeholder="Décrivez-vous en quelques mots..."
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  Email
                </label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                  style="direction: ltr; text-align: left;"
                  placeholder="votre@email.com"
                >
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-text-primary mb-3">
                  URL du CV
                </label>
                <input
                  v-model="profileForm.cvUrl"
                  type="url"
                  class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                  style="direction: ltr; text-align: left;"
                  placeholder="/files/CV-MonNom.pdf"
                >
              </div>
              
              <!-- Actions -->
              <div class="flex justify-end space-x-4 pt-6 border-t border-border-primary">
                <button
                  type="button"
                  @click="closeContextualEditors"
                  class="px-6 py-3 text-text-secondary border border-border-primary rounded-2xl hover:bg-bg-secondary hover:text-text-primary transition-all duration-200 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-accent text-bg-primary rounded-2xl hover:bg-accent/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Formation Editor Modal -->
    <Teleport to="body">
      <div 
        v-if="showFormationEditor"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="closeContextualEditors"
      >
        <div 
          class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-2xl font-bold text-text-primary">Éditer les Formations</h3>
              <button 
                @click="closeContextualEditors" 
                class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="space-y-6">
              <!-- Liste des formations existantes -->
              <div v-if="formations && formations.length > 0">
                <h4 class="text-lg font-semibold text-text-primary mb-4">Formations existantes</h4>
                <div class="space-y-3 max-h-60 overflow-y-auto">
                  <div 
                    v-for="formation in formations" 
                    :key="formation.id"
                    class="flex items-center justify-between p-3 bg-bg-secondary rounded-xl border border-border-primary"
                  >
                    <div class="flex-1">
                      <div class="font-medium text-text-primary">{{ formation.title }}</div>
                      <div class="text-sm text-text-secondary">{{ formation.institution }} ({{ formation.period }})</div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button
                        @click="editFormation(formation)"
                        class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        @click="deleteFormationItem(formation.id)"
                        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Formulaire d'ajout/édition -->
              <div>
                <h4 class="text-lg font-semibold text-text-primary mb-4">
                  {{ editingFormationId ? 'Modifier la formation' : 'Ajouter une formation' }}
                </h4>
                
                <form @submit.prevent="saveFormation" class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold text-text-primary mb-2">
                      Titre de la formation *
                    </label>
                    <input
                      v-model="formationForm.title"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                      style="direction: ltr; text-align: left;"
                      placeholder="ex: BUT MMI - 3e année"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-text-primary mb-2">
                      Institution *
                    </label>
                    <input
                      v-model="formationForm.institution"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                      style="direction: ltr; text-align: left;"
                      placeholder="ex: IUT de Troyes"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-text-primary mb-2">
                      Période *
                    </label>
                    <input
                      v-model="formationForm.period"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary"
                      style="direction: ltr; text-align: left;"
                      placeholder="ex: 2022-2025"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-semibold text-text-primary mb-2">
                      Description
                    </label>
                    <textarea
                      v-model="formationForm.description"
                      rows="2"
                      class="w-full px-4 py-3 border border-border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-secondary text-text-primary resize-none"
                      style="direction: ltr; text-align: left;"
                      placeholder="Description optionnelle..."
                    ></textarea>
                  </div>
                  
                  <div class="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      @click="editingFormationId = null; formationForm = { title: '', institution: '', period: '', description: '', order: formations.length }"
                      class="px-4 py-2 text-text-secondary border border-border-primary rounded-xl hover:bg-bg-secondary transition-colors"
                    >
                      {{ editingFormationId ? 'Annuler' : 'Reset' }}
                    </button>
                    <button
                      type="submit"
                      class="px-6 py-2 bg-accent text-bg-primary rounded-xl hover:bg-accent/90 transition-colors font-semibold"
                    >
                      {{ editingFormationId ? 'Modifier' : 'Ajouter' }}
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Actions de fermeture -->
              <div class="flex justify-end pt-6 border-t border-border-primary">
                <button
                  @click="closeContextualEditors()"
                  class="px-6 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-200 font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Stage Editor Modal -->
    <Teleport to="body">
      <div 
        v-if="showStageEditor"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="closeContextualEditors"
      >
        <div 
          class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-2xl font-bold text-text-primary">Éditer les Infos de Stage</h3>
              <button 
                @click="closeContextualEditors" 
                class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="text-center py-8">
              <p class="text-text-secondary">Les informations de stage sont stockées dans la base de données.</p>
              <p class="text-text-tertiary text-sm mt-2">Modifiez directement les données via les scripts ou l'interface admin.</p>
              <div class="mt-6">
                <button
                  @click="closeContextualEditors()"
                  class="px-6 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-200 font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Social Links Editor Modal -->
    <Teleport to="body">
      <div 
        v-if="showSocialLinksEditor"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="closeContextualEditors"
      >
        <div 
          class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-2xl font-bold text-text-primary">Éditer les Liens Sociaux</h3>
              <button 
                @click="closeContextualEditors" 
                class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="text-center py-8">
              <p class="text-text-secondary">Les liens sociaux sont stockés dans la base de données.</p>
              <p class="text-text-tertiary text-sm mt-2">Modifiez directement les données via les scripts ou l'interface admin.</p>
              <div class="mt-6">
                <button
                  @click="closeContextualEditors()"
                  class="px-6 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-200 font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

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
            <h4
              class="font-semibold text-text-primary text-lg flex items-center gap-2"
            >
              <svg
                class="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Édition directe
            </h4>
            <div
              class="text-xs text-text-tertiary mt-1 flex items-center gap-4"
            >
              <span>⌘ + Entrée pour sauvegarder</span>
              <span>Echap pour annuler</span>
            </div>
          </div>
          <button
            @click="closeWysiwygTooltip"
            class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Nom du bloc en cours d'édition -->
        <div
          class="mb-4 px-3 py-2 bg-bg-secondary rounded-xl border border-border-primary"
        >
          <div class="text-sm font-medium text-text-primary">
            {{ editingBlock?.title || "Bloc personnalisé" }}
          </div>
          <div class="text-xs text-text-tertiary">
            {{ editingBlock?.colSpan }}/12 colonnes
          </div>
        </div>

        <!-- Éditeur WYSIWYG -->
        <TipTapEditor
          v-model="editingContent"
          label="Contenu du bloc"
          placeholder="Tapez votre contenu ici..."
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
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
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
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { usePortfolioDatabase } from "~/composables/usePortfolioDatabase";
import BentoModal from "~/components/admin/BentoModal.vue";
import ResizeModal from "~/components/admin/ResizeModal.vue";
import TipTapEditor from "~/components/admin/TipTapEditor.vue";
import { VueDraggable } from "vue-draggable-plus";

// Import portfolio sections
import ProfileSection from "~/components/sections/ProfileSection.vue";
import IntroSection from "~/components/sections/IntroSection.vue";
import StageSection from "~/components/sections/StageSection.vue";
import LinksSection from "~/components/sections/LinksSection.vue";
import FormationSection from "~/components/sections/FormationSection.vue";
import SkillsSection from "~/components/sections/SkillsSection.vue";
import ProjectsSection from "~/components/sections/ProjectsSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";
import CustomBlock from "~/components/sections/CustomBlock.vue";

// Portfolio data management
const {
  bentoBlocks,
  sortedBentoBlocks,
  addBentoBlock,
  updateBentoBlock,
  deleteBentoBlock,
  fetchBentoBlocks,
  profile,
  fetchProfile,
  updateProfile,
  formations,
  fetchFormations,
  addFormation,
  updateFormation,
  deleteFormation,
  stage,
  fetchStage,
  socialLinks,
  fetchSocialLinks,
  customBlocks,
  fetchCustomBlocks,
  addCustomBlock,
  updateCustomBlock,
  deleteCustomBlock,
} = usePortfolioDatabase();

// Modal states
const showBentoModal = ref(false);
const selectedBentoBlock = ref<any>(null);
const showResizeModal = ref(false);
const selectedBlock = ref<any>(null);

// WYSIWYG editor state
const showWysiwygTooltip = ref(false);
const editingBlock = ref<any>(null);
const editingContent = ref("");
const tooltipPosition = ref({ top: "0px", left: "0px" });

// Contextual editors state
const showProfileEditor = ref(false);
const showFormationEditor = ref(false);
const showStageEditor = ref(false);
const showSocialLinksEditor = ref(false);

// Form data for editing
const profileForm = ref({
  firstName: '',
  lastName: '',
  title: '',
  description: '',
  email: '',
  cvUrl: ''
});

const formationForm = ref({
  title: '',
  institution: '',
  period: '',
  description: '',
  order: 0
});

const editingFormationId = ref<number | null>(null);

// Drag and drop state (vue-draggable-plus)
const bentoContainer = ref(null);

// Modal management
const openBentoModal = (block = null) => {
  // If it's a custom block, convert it to the modal format
  if (block && block.type && !block.component) {
    selectedBentoBlock.value = {
      ...block,
      component: 'CustomBlock',
      type: 'CustomBlock',
      isCustomBlock: true
    };
  } else {
    selectedBentoBlock.value = block;
  }
  showBentoModal.value = true;
};

const closeBentoModal = () => {
  showBentoModal.value = false;
  selectedBentoBlock.value = null;
};

const saveBentoBlock = async (blockData: any) => {
  try {
    // Determine if this is a custom block
    const isCustomBlock = blockData.component === 'CustomBlock' || blockData.type === 'CustomBlock';
    
    if (selectedBentoBlock.value) {
      if (isCustomBlock) {
        // Update custom block
        await updateCustomBlock(selectedBentoBlock.value.id, {
          type: blockData.type || 'custom-text',
          title: blockData.title,
          content: blockData.content,
          colSpan: blockData.colSpan,
          order: blockData.order || 0,
          visible: blockData.visible !== false
        });
      } else {
        await updateBentoBlock(selectedBentoBlock.value.id, blockData);
      }
    } else {
      if (isCustomBlock) {
        // Create custom block
        await addCustomBlock({
          type: blockData.type || 'custom-text',
          title: blockData.title,
          content: blockData.content,
          colSpan: blockData.colSpan || 6,
          order: blockData.order || 0,
          visible: blockData.visible !== false
        });
      } else {
        // Ajouter la taille par défaut si pas spécifiée
        if (!blockData.colSpan && blockData.component) {
          blockData.colSpan = getDefaultColSpan(blockData.component)
        }
        await addBentoBlock(blockData);
      }
    }
    closeBentoModal();
  } catch (error) {
    console.error('Error saving bento block:', error);
  }
};

const openResizeModal = (block: any) => {
  selectedBlock.value = block;
  showResizeModal.value = true;
};

const closeResizeModal = () => {
  showResizeModal.value = false;
  selectedBlock.value = null;
};

const saveBlockSize = async (newSize: number) => {
  try {
    if (selectedBlock.value) {
      await updateBentoBlock(selectedBlock.value.id, {
        ...selectedBlock.value,
        colSpan: newSize,
      });
    }
    closeResizeModal();
  } catch (error) {
    console.error('Error saving block size:', error);
  }
};

const deleteBlock = async (blockId: number) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce bloc ?")) {
    try {
      await deleteBentoBlock(blockId);
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  }
};

// Double click handler for contextual editing
const handleDoubleClick = (block: any, event: MouseEvent) => {
  console.log('Double-clic sur:', block.component, block)
  
  // Redirection vers les bonnes pages d'admin pour certains composants
  if (block.component === 'SkillsSection') {
    navigateTo('/admin/skills')
    return
  }
  
  if (block.component === 'ProjectsSection') {
    navigateTo('/admin/projects')
    return
  }
  
  // Édition contextuelle pour les composants avec des données spécifiques
  if (['ProfileSection', 'IntroSection'].includes(block.component)) {
    openProfileEditor(block, event)
    return
  }
  
  if (block.component === 'FormationSection') {
    openFormationEditor(block, event)
    return
  }
  
  if (block.component === 'StageSection') {
    openStageEditor(block, event)
    return
  }
  
  if (block.component === 'LinksSection') {
    openSocialLinksEditor(block, event)
    return
  }
  
  // Pour les autres composants, utiliser l'éditeur WYSIWYG simple
  const editableComponents = ["ContactSection"];
  if (editableComponents.includes(block.component) || !block.component) {
    editingBlock.value = block;
    editingContent.value = block.content || block.title || "";

    // Position tooltip near click
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    tooltipPosition.value = {
      top: `${rect.top + window.scrollY - 50}px`,
      left: `${rect.left + window.scrollX}px`,
    };

    showWysiwygTooltip.value = true;
  } else {
    console.log('Composant non éditable:', block.component)
  }
};

// Contextual editors
const openProfileEditor = async (block: any, event: MouseEvent) => {
  editingBlock.value = block;
  
  // Charger les données du profil
  if (!profile.value) {
    await fetchProfile();
  }
  
  // Remplir le formulaire avec les données existantes
  if (profile.value) {
    profileForm.value = {
      firstName: profile.value.firstName || '',
      lastName: profile.value.lastName || '',
      title: profile.value.title || '',
      description: profile.value.description || '',
      email: profile.value.email || '',
      cvUrl: profile.value.cvUrl || ''
    };
  }
  
  showProfileEditor.value = true;
};

const openFormationEditor = async (block: any, event: MouseEvent) => {
  editingBlock.value = block;
  editingFormationId.value = null;
  
  // Charger les formations si nécessaire
  if (!formations.value || formations.value.length === 0) {
    await fetchFormations();
  }
  
  // Reset form
  formationForm.value = {
    title: '',
    institution: '',
    period: '',
    description: '',
    order: formations.value.length
  };
  
  showFormationEditor.value = true;
};

const openStageEditor = (block: any, event: MouseEvent) => {
  editingBlock.value = block;
  showStageEditor.value = true;
};

const openSocialLinksEditor = (block: any, event: MouseEvent) => {
  editingBlock.value = block;
  showSocialLinksEditor.value = true;
};

const saveProfileData = async () => {
  try {
    await updateProfile(profileForm.value);
    closeContextualEditors();
    console.log('Profil mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du profil:', error);
  }
};

const saveFormation = async () => {
  try {
    if (editingFormationId.value) {
      await updateFormation(editingFormationId.value, formationForm.value);
    } else {
      await addFormation(formationForm.value);
    }
    closeContextualEditors();
    console.log('Formation sauvegardée avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la formation:', error);
  }
};

const editFormation = (formation: any) => {
  editingFormationId.value = formation.id;
  formationForm.value = {
    title: formation.title,
    institution: formation.institution,
    period: formation.period,
    description: formation.description || '',
    order: formation.order
  };
};

const deleteFormationItem = async (formationId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
    try {
      await deleteFormation(formationId);
      console.log('Formation supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
    }
  }
};

const closeContextualEditors = () => {
  showProfileEditor.value = false;
  showFormationEditor.value = false;
  showStageEditor.value = false;
  showSocialLinksEditor.value = false;
  editingBlock.value = null;
};

const closeWysiwygTooltip = () => {
  showWysiwygTooltip.value = false;
  editingBlock.value = null;
  editingContent.value = "";
};

const saveWysiwygContent = async () => {
  try {
    if (editingBlock.value) {
      const updatedBlock = {
        ...editingBlock.value,
        content: editingContent.value,
        title: !editingBlock.value.component
          ? editingContent.value
          : editingBlock.value.title,
      };

      await updateBentoBlock(editingBlock.value.id, updatedBlock);
    }

    closeWysiwygTooltip();
  } catch (error) {
    console.error('Error saving WYSIWYG content:', error);
  }
};

// Save and return to admin
const saveAndReturn = () => {
  // Data is already saved in database through composable
  navigateTo("/admin");
};

// Drag and Drop Management avec vue-draggable-plus
const onBentoChange = () => {
  // Sauvegarder automatiquement après le drag & drop
  // Les blocs sont déjà mis à jour dans bentoBlocks par v-model
  console.log('Drag & drop terminé, ordre sauvegardé:', bentoBlocks.value)
};

// Map component names to actual components
const componentMap = {
  ProfileSection: ProfileSection,
  IntroSection: IntroSection,
  StageSection: StageSection,
  LinksSection: LinksSection,
  FormationSection: FormationSection,
  SkillsSection: SkillsSection,
  ProjectsSection: ProjectsSection,
  ContactSection: ContactSection,
  CustomBlock: CustomBlock,
};

// Function to get component dynamically
const getComponent = (componentName: string) => {
  return componentMap[componentName as keyof typeof componentMap] || "div";
};

// Tailles par défaut du vrai portfolio
const getDefaultColSpan = (componentName: string): number => {
  const defaultSizes: Record<string, number> = {
    'ProfileSection': 4,       // col-span-12 md:col-span-4
    'IntroSection': 8,         // col-span-12 md:col-span-8 
    'StageSection': 6,         // col-span-12 md:col-span-6
    'LinksSection': 6,         // col-span-12 md:col-span-6
    'FormationSection': 4,     // col-span-12 md:col-span-4
    'SkillsSection': 8,        // col-span-12 md:col-span-8
    'ProjectsSection': 12,     // col-span-12
    'ContactSection': 12,      // col-span-12
    'CustomBlock': 6           // col-span-12 md:col-span-6 par défaut
  }
  return defaultSizes[componentName] || 6
};

// Preview functions
const getBlockColor = (component: string) => {
  const colors: Record<string, string> = {
    ProfileSection: "#3b82f6", // blue
    IntroSection: "#10b981", // green
    StageSection: "#f59e0b", // yellow
    LinksSection: "#8b5cf6", // purple
    FormationSection: "#6366f1", // indigo
    SkillsSection: "#06b6d4", // cyan
    ProjectsSection: "#f97316", // orange
    ContactSection: "#ec4899", // pink
  };
  return colors[component] || "#6b7280"; // gray fallback
};

// Combine regular bento blocks and custom blocks
const allSortedBlocks = computed(() => {
  const regulars = sortedBentoBlocks.value.map(block => ({
    ...block,
    isCustomBlock: false
  }));
  
  const customs = customBlocks.value.map(block => ({
    ...block,
    component: 'CustomBlock',
    isCustomBlock: true,
    // Convert custom block format to bento block format
    backgroundColor: 'bg-slate-700' // Default for custom blocks
  }));
  
  return [...regulars, ...customs].sort((a, b) => (a.order || 0) - (b.order || 0));
});

const totalColumns = computed(() => {
  const bentoTotal = sortedBentoBlocks.value.reduce(
    (total, block) => total + block.colSpan,
    0
  );
  const customTotal = customBlocks.value.reduce(
    (total, block) => total + (block.colSpan || 6),
    0
  );
  return bentoTotal + customTotal;
});

const lastUpdateTime = computed(() => {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
});

// Keyboard shortcuts
const handleKeydown = (event: KeyboardEvent) => {
  // Close WYSIWYG editor with Escape
  if (event.key === "Escape" && showWysiwygTooltip.value) {
    closeWysiwygTooltip();
    event.preventDefault();
  }

  // Save WYSIWYG content with Ctrl/Cmd + Enter
  if (
    (event.ctrlKey || event.metaKey) &&
    event.key === "Enter" &&
    showWysiwygTooltip.value
  ) {
    saveWysiwygContent();
    event.preventDefault();
  }

  // Close modals with Escape
  if (event.key === "Escape") {
    if (showBentoModal.value) {
      closeBentoModal();
      event.preventDefault();
    }
    if (showResizeModal.value) {
      closeResizeModal();
      event.preventDefault();
    }
  }
};

// Initialize data on mount
onMounted(async () => {
  await fetchBentoBlocks();
  
  // Précharger les données pour l'édition contextuelle
  await Promise.all([
    fetchProfile(),
    fetchFormations(),
    fetchStage(),
    fetchSocialLinks()
  ]);

  // Add keyboard event listeners
  document.addEventListener("keydown", handleKeydown);
});

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

// SEO
useHead({
  title: "Édition Portfolio Bento - Admin",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>

<style scoped>
/* Portfolio bento grid EXACTEMENT comme le vrai */
.bento-grid {
  @apply grid grid-cols-12 gap-6 max-w-[1400px] mx-auto px-6 pt-40 pb-6;
}

.portfolio-block-editable {
  @apply transition-all duration-200;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  overflow: hidden;
  height: 100%;
}

/* Styles drag & drop vue-draggable-plus */
.bento-ghost {
  opacity: 0.3;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px dashed #f59e0b;
  transform: scale(0.95);
  border-radius: 1.5rem;
}

.bento-chosen {
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 15px 35px rgba(245, 158, 11, 0.3);
  border: 2px solid #f59e0b;
  z-index: 100;
}

.bento-drag {
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 15px 35px rgba(245, 158, 11, 0.3);
  z-index: 1000;
  border: 2px solid #f59e0b;
}

/* Responsive comme le vrai portfolio */
@media (max-width: 768px) {
  .bento-grid {
    @apply grid-cols-4 gap-4 pt-28;
  }
  
  .col-span-12,
  .col-span-8,
  .col-span-6,
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  
  /* Réorganisation des blocs en mobile */
  :deep(.profile-photo) {
    order: -1;
  }
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
