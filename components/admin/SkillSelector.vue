<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-text-primary">
      Compétences / Technologies
    </label>
    
    <!-- Skills sélectionnées -->
    <div v-if="selectedSkills.length > 0" class="space-y-3">
      <h4 class="text-sm font-medium text-text-secondary">Sélectionnées :</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(skill, index) in selectedSkills"
          :key="index"
          @click="removeSkill(index)"
          class="inline-flex items-center gap-2 px-3 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/80 transition-colors"
        >
          <img 
            v-if="skill.icon" 
            :src="skill.icon" 
            :alt="skill.name"
            class="w-4 h-4"
            :class="{ 'filter invert': skill.invert }"
          />
          <span>{{ skill.name }}</span>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Sélecteur de skills existantes -->
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-text-secondary">Ajouter depuis les compétences existantes :</h4>
      <div v-if="availableSkills.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-border-secondary rounded-lg p-3">
        <button
          v-for="skill in availableSkills"
          :key="skill.id"
          @click="addExistingSkill(skill)"
          class="flex items-center gap-2 p-2 text-left rounded-lg hover:bg-bg-secondary transition-colors text-sm"
        >
          <img 
            v-if="skill.icon" 
            :src="skill.icon" 
            :alt="skill.name"
            class="w-4 h-4"
            :class="{ 'filter invert': skill.invert }"
          />
          <span class="truncate text-text-primary">{{ skill.name }}</span>
        </button>
      </div>
      <p v-else class="text-sm text-text-tertiary">Aucune compétence disponible</p>
    </div>

    <!-- Ajouter une skill personnalisée -->
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-text-secondary">Ou ajouter une compétence personnalisée :</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          v-model="newSkill.name"
          type="text"
          placeholder="Nom de la compétence"
          class="px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
        >
        <input
          v-model="newSkill.icon"
          type="url"
          placeholder="URL de l'icône (optionnel)"
          class="px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary placeholder-text-tertiary"
        >
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="newSkill.type" 
          class="px-3 py-2 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary"
        >
          <option value="tech">Technique</option>
          <option value="soft">Soft Skill</option>
        </select>
        <button
          type="button"
          @click="addCustomSkill"
          :disabled="!newSkill.name"
          class="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Skill {
  id?: number
  name: string
  icon?: string
  type: 'tech' | 'soft'
  invert?: boolean
}

const props = defineProps<{
  modelValue: Skill[]
  availableSkills?: Skill[]
}>()

const emit = defineEmits<{
  'update:modelValue': [skills: Skill[]]
}>()

// État local
const selectedSkills = ref<Skill[]>([...props.modelValue])
const newSkill = ref<Skill>({
  name: '',
  icon: '',
  type: 'tech'
})

// Skills disponibles (filtrées pour exclure les déjà sélectionnées)
const availableSkills = computed(() => {
  if (!props.availableSkills) return []
  return props.availableSkills.filter(skill => 
    !selectedSkills.value.some(selected => selected.name === skill.name)
  )
})

// Ajouter une skill existante
const addExistingSkill = (skill: Skill) => {
  selectedSkills.value.push({
    name: skill.name,
    icon: skill.icon,
    type: skill.category === 'Soft Skills' ? 'soft' : 'tech',
    invert: skill.invert
  })
  emit('update:modelValue', selectedSkills.value)
}

// Ajouter une skill personnalisée
const addCustomSkill = () => {
  if (!newSkill.value.name) return
  
  selectedSkills.value.push({
    name: newSkill.value.name,
    icon: newSkill.value.icon || undefined,
    type: newSkill.value.type
  })
  
  // Reset form
  newSkill.value = {
    name: '',
    icon: '',
    type: 'tech'
  }
  
  emit('update:modelValue', selectedSkills.value)
}

// Supprimer une skill
const removeSkill = (index: number) => {
  selectedSkills.value.splice(index, 1)
  emit('update:modelValue', selectedSkills.value)
}

// Watcher pour synchroniser avec le parent
watch(() => props.modelValue, (newValue) => {
  selectedSkills.value = [...newValue]
}, { deep: true })
</script>