<template>
  <div 
    class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    @click="handleBackdropClick"
  >
    <div 
      class="bg-bg-primary border border-border-primary rounded-3xl shadow-2xl max-w-md w-full"
      @click.stop
    >
      <div class="p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-text-primary">
            Redimensionner le Bloc
          </h3>
          <button 
            @click="$emit('close')" 
            class="text-text-tertiary hover:text-text-primary hover:bg-bg-secondary rounded-xl p-2 transition-all duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Current block preview -->
        <div class="mb-6">
          <div class="text-sm font-semibold text-text-primary mb-3">Bloc actuel :</div>
          <div class="text-text-secondary mb-4">{{ block?.title || 'Bloc sans titre' }}</div>
          
          <!-- Size selector -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-text-primary">
              Nouvelle taille (colonnes)
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="size in sizeOptions"
                :key="size.value"
                @click="selectedSize = size.value"
                class="p-3 border rounded-xl transition-all duration-200 flex flex-col items-center"
                :class="[
                  selectedSize === size.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border-primary hover:border-accent/50 text-text-primary'
                ]"
              >
                <!-- Visual representation -->
                <div class="flex mb-2">
                  <div
                    v-for="i in 12"
                    :key="i"
                    class="w-2 h-4 mx-0.5 rounded-sm"
                    :class="[
                      i <= size.value 
                        ? selectedSize === size.value 
                          ? 'bg-accent' 
                          : 'bg-text-tertiary'
                        : 'bg-bg-tertiary'
                    ]"
                  ></div>
                </div>
                <div class="text-xs font-medium">{{ size.label }}</div>
                <div class="text-xs text-text-tertiary">{{ size.description }}</div>
              </button>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div class="mb-6">
          <div class="text-sm font-semibold text-text-primary mb-3">Aperçu :</div>
          <div class="border border-border-primary rounded-xl p-4 bg-bg-secondary">
            <div class="grid grid-cols-12 gap-1">
              <div
                v-for="i in 12"
                :key="i"
                class="h-8 rounded"
                :class="[
                  i <= selectedSize
                    ? 'bg-accent/20 border border-accent/40'
                    : 'bg-bg-tertiary'
                ]"
              ></div>
            </div>
            <div class="text-center mt-3 text-sm text-text-secondary">
              {{ selectedSize }} colonnes sur 12 ({{ Math.round((selectedSize / 12) * 100) }}% de largeur)
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-text-secondary border border-border-primary rounded-xl hover:bg-bg-secondary hover:text-text-primary transition-all duration-200 font-medium"
          >
            Annuler
          </button>
          <button
            @click="handleSave"
            class="px-6 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  block?: any
}>()

const emit = defineEmits<{
  close: []
  save: [size: number]
}>()

const selectedSize = ref(props.block?.colSpan || 6)

const sizeOptions = [
  { value: 3, label: '3 col', description: '1/4 largeur' },
  { value: 4, label: '4 col', description: '1/3 largeur' },
  { value: 6, label: '6 col', description: '1/2 largeur' },
  { value: 8, label: '8 col', description: '2/3 largeur' },
  { value: 9, label: '9 col', description: '3/4 largeur' },
  { value: 12, label: '12 col', description: 'Pleine largeur' }
]

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const handleSave = () => {
  emit('save', selectedSize.value)
}
</script>