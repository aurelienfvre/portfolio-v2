<template>
  <div class="space-y-3">
    <label v-if="label" class="block text-sm font-semibold text-text-primary">
      {{ label }}
    </label>
    
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap gap-1 p-2 bg-bg-secondary border border-border-primary rounded-xl">
      <button
        type="button"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
        class="toolbar-btn"
        title="Annuler (Ctrl+Z)"
      >
        ↶
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
        class="toolbar-btn"
        title="Rétablir (Ctrl+Y)"
      >
        ↷
      </button>
      
      <div class="w-px h-6 bg-border-primary mx-1"></div>
      
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'active': editor.isActive('bold') }"
        class="toolbar-btn"
        title="Gras (Ctrl+B)"
      >
        <strong>B</strong>
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'active': editor.isActive('italic') }"
        class="toolbar-btn"
        title="Italique (Ctrl+I)"
      >
        <em>I</em>
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'active': editor.isActive('underline') }"
        class="toolbar-btn"
        title="Souligné (Ctrl+U)"
      >
        <u>U</u>
      </button>
      
      <div class="w-px h-6 bg-border-primary mx-1"></div>
      
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'active': editor.isActive('bulletList') }"
        class="toolbar-btn"
        title="Liste à puces"
      >
        •
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'active': editor.isActive('orderedList') }"
        class="toolbar-btn"
        title="Liste numérotée"
      >
        1.
      </button>
      
      <div class="w-px h-6 bg-border-primary mx-1"></div>
      
      <button
        type="button"
        @click="setHeading(2)"
        :class="{ 'active': editor.isActive('heading', { level: 2 }) }"
        class="toolbar-btn"
        title="Titre 2"
      >
        H2
      </button>
      
      <button
        type="button"
        @click="setHeading(3)"
        :class="{ 'active': editor.isActive('heading', { level: 3 }) }"
        class="toolbar-btn"
        title="Titre 3"
      >
        H3
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'active': editor.isActive('paragraph') }"
        class="toolbar-btn"
        title="Paragraphe"
      >
        P
      </button>
      
      <div class="w-px h-6 bg-border-primary mx-1"></div>
      
      <button
        type="button"
        @click="addLink"
        :class="{ 'active': editor.isActive('link') }"
        class="toolbar-btn"
        title="Ajouter un lien"
      >
        🔗
      </button>
      
      <button
        type="button"
        @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
        class="toolbar-btn"
        title="Effacer le formatage"
      >
        ×
      </button>
    </div>

    <!-- Editor -->
    <div
      ref="editorElement"
      class="min-h-[200px] p-4 border border-border-primary rounded-xl focus-within:ring-2 focus-within:ring-accent focus-within:border-accent bg-bg-primary text-text-primary prose prose-sm max-w-none"
    ></div>
    
    <!-- Character count -->
    <div class="text-xs text-text-tertiary text-right">
      {{ characterCount }} caractères
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorElement = ref<HTMLElement>()
const editor = ref<Editor>()

const characterCount = computed(() => {
  if (!editor.value) return 0
  return editor.value.state.doc.textContent.length
})

const setHeading = (level: number) => {
  editor.value?.chain().focus().toggleHeading({ level }).run()
}

const addLink = () => {
  const url = window.prompt('URL du lien:')
  if (url) {
    editor.value?.chain().focus().setLink({ href: url }).run()
  }
}

onMounted(() => {
  editor.value = new Editor({
    element: editorElement.value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent underline hover:text-accent/80'
        }
      }),
      Placeholder.configure({
        placeholder: props.placeholder || 'Commencez à écrire...'
      })
    ],
    content: props.modelValue,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[180px]',
        style: 'direction: ltr; text-align: left;'
      }
    },
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    },
    onCreate: ({ editor }) => {
      // Focus sur l'éditeur quand il est créé
      setTimeout(() => {
        editor.commands.focus()
      }, 100)
    }
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue || '', false)
  }
}, { immediate: true })
</script>

<style scoped>
.toolbar-btn {
  @apply px-2 py-1 rounded text-sm font-medium transition-colors;
  @apply text-text-secondary hover:bg-bg-tertiary hover:text-text-primary;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.toolbar-btn.active {
  @apply bg-accent text-bg-primary;
}

:deep(.ProseMirror) {
  outline: none;
  min-height: 180px;
  padding: 0;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: var(--text-tertiary);
  pointer-events: none;
  height: 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem 0;
  color: var(--text-primary);
}

:deep(.ProseMirror h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.75rem 0 0.5rem 0;
  color: var(--text-primary);
}

:deep(.ProseMirror p) {
  margin: 0.5rem 0;
  color: var(--text-primary);
}

:deep(.ProseMirror ul), :deep(.ProseMirror ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  color: var(--text-primary);
}

:deep(.ProseMirror strong) {
  font-weight: 600;
  color: var(--text-primary);
}

:deep(.ProseMirror em) {
  font-style: italic;
  color: var(--text-primary);
}

:deep(.ProseMirror u) {
  text-decoration: underline;
  color: var(--text-primary);
}

:deep(.ProseMirror a) {
  color: var(--accent);
  text-decoration: underline;
}

:deep(.ProseMirror a:hover) {
  opacity: 0.8;
}
</style>