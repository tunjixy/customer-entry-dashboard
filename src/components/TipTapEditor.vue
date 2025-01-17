<template>
  <div v-if="editor">
    <div class="flex flex-wrap items-center gap-2 mb-5">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="[editor.isActive('bold') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="[editor.isActive('italic') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="[editor.isActive('strike') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Strike
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="[editor.isActive('code') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Code
      </button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="[editor.isActive('paragraph') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="[editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="[editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="[editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="[editor.isActive('heading', { level: 4 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="[editor.isActive('heading', { level: 5 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="[editor.isActive('heading', { level: 6 }) ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        H6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="[editor.isActive('bulletList') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="[editor.isActive('orderedList') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm rounded-lg"
      >
        Ordered list
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="[editor.isActive('codeBlock') ? 'bg-primary text-white' : 'bg-grey']"
        class="px-2 py-1 text-sm prose rounded-lg"
      >
        Code block
      </button>
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
        class="px-2 py-1 text-sm rounded-lg bg-grey"
      >
        Undo
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        class="px-2 py-1 text-sm rounded-lg bg-grey"
      >
        Redo
      </button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

const modelValue = defineModel<string>()

const emit = defineEmits(['update:modelValue'])

const editor = ref<Editor | null>(null)

watch(modelValue, (value) => {
  if (!editor.value) return

  const isSame = editor.value.getHTML() === value
  if (!isSame) {
    editor.value.commands.setContent(value as string, false)
  }
})

// Initialize the editor on mount
onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({}),
      StarterKit,
    ],
    content: modelValue.value,
    onUpdate: () => {
      if (editor.value) {
        // Emit the updated content
        emit('update:modelValue', editor.value.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class: 'form-input-field min-h-[150px]',
      },
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style>
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: #132b01;
    border-radius: 0.4rem;
    color: #fff;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #000;
    border-radius: 0.5rem;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  hr {
    border: none;
    border-top: 1px solid #e7e7e7;
    margin: 2rem 0;
  }
}
</style>
