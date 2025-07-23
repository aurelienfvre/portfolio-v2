<template>
  <div class="space-y-3">
    <label class="block text-sm font-semibold text-text-primary">
      {{ label }}
    </label>
    
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-2 bg-bg-secondary border border-border-primary rounded-xl">
      <button
        type="button"
        v-for="tool in tools"
        :key="tool.command"
        @click="execCommand(tool.command, tool.value)"
        :class="[
          'px-2 py-1 rounded text-sm font-medium transition-colors',
          isActive(tool.command) 
            ? 'bg-accent text-bg-primary' 
            : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
        ]"
        :title="tool.title"
      >
        <span v-if="tool.icon" v-html="tool.icon"></span>
        <span v-else>{{ tool.label }}</span>
      </button>
    </div>

    <!-- Editor -->
    <div
      ref="editor"
      contenteditable="true"
      @input="handleInput"
      @paste="handlePaste"
      class="min-h-[200px] p-4 border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-bg-primary text-text-primary"
      :class="{ 'empty': isEmpty }"
      v-html="modelValue"
    ></div>
    
    <!-- Character count -->
    <div class="text-xs text-text-tertiary text-right">
      {{ characterCount }} caractères
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = ref<HTMLElement>()

const tools = [
  { command: 'bold', label: 'G', title: 'Gras', icon: '<strong>B</strong>' },
  { command: 'italic', label: 'I', title: 'Italique', icon: '<em>I</em>' },
  { command: 'underline', label: 'U', title: 'Souligné', icon: '<u>U</u>' },
  { command: 'insertUnorderedList', label: '•', title: 'Liste à puces' },
  { command: 'insertOrderedList', label: '1.', title: 'Liste numérotée' },
  { command: 'createLink', label: 'Lien', title: 'Insérer un lien' },
  { command: 'formatBlock', value: 'h2', label: 'H2', title: 'Titre 2' },
  { command: 'formatBlock', value: 'h3', label: 'H3', title: 'Titre 3' },
  { command: 'formatBlock', value: 'p', label: 'P', title: 'Paragraphe' },
  { command: 'removeFormat', label: '×', title: 'Supprimer le formatage' }
]

const characterCount = computed(() => {
  if (!editor.value) return 0
  return editor.value.textContent?.length || 0
})

const isEmpty = computed(() => {
  return !props.modelValue || props.modelValue.trim() === ''
})

const execCommand = (command: string, value?: string) => {
  if (command === 'createLink') {
    const url = prompt('Entrez l\'URL du lien:')
    if (url) {
      document.execCommand(command, false, url)
    }
  } else {
    document.execCommand(command, false, value)
  }
  
  // Focus back to editor
  editor.value?.focus()
  
  // Update model
  nextTick(() => {
    if (editor.value) {
      emit('update:modelValue', editor.value.innerHTML)
    }
  })
}

const isActive = (command: string) => {
  try {
    return document.queryCommandState(command)
  } catch {
    return false
  }
}

const handleInput = () => {
  if (editor.value) {
    emit('update:modelValue', editor.value.innerHTML)
  }
}

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  
  // Get plain text from clipboard
  const text = e.clipboardData?.getData('text/plain') || ''
  
  // Insert as plain text
  document.execCommand('insertText', false, text)
  
  // Update model
  nextTick(() => {
    if (editor.value) {
      emit('update:modelValue', editor.value.innerHTML)
    }
  })
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.innerHTML !== newValue) {
    editor.value.innerHTML = newValue || ''
  }
})

onMounted(() => {
  if (editor.value && props.modelValue) {
    editor.value.innerHTML = props.modelValue
  }
})
</script>

<style scoped>
.empty::before {
  content: 'Commencez à taper votre contenu...';
  color: var(--text-tertiary);
  font-style: italic;
}

:deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
}

:deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.75rem 0 0.5rem 0;
}

:deep(p) {
  margin: 0.5rem 0;
}

:deep(ul), :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

:deep(a) {
  color: var(--accent);
  text-decoration: underline;
}

:deep(strong) {
  font-weight: 600;
}
</style>