<template>
  <floating-menu
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    v-if="editor"
    class="floatingMenuEditor"
  >
    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      <H1Icon></H1Icon>
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      <H2Icon></H2Icon>
    </button>
    <button
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      Bullet List
    </button>
  </floating-menu>
  <bubble-menu
    class="bubbleMenuEditor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    v-if="editor"
  >
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <BoldIcon></BoldIcon>
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <ItalicIcon></ItalicIcon>
    </button>
  </bubble-menu>
  <editor-content :editor="editor" />
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/vue-3";

import H1Icontest from "@/assets/icons/h-1.svg?raw";
import H1Icon from "@/assets/icons/h-1.svg";
import H2Icon from "@/assets/icons/h-2.svg";
import H3Icon from "@/assets/icons/h-3.svg";
import ItalicIcon from "@/assets/icons/italic.svg";
import BoldIcon from "@/assets/icons/bold.svg";
import UnderIcon from "@/assets/icons/underlin.svg";

export default {
  components: {
    EditorContent,
    FloatingMenu,
    BubbleMenu,
    H1Icon,
    H2Icon,
    H1Icontest,
    ItalicIcon,
    BoldIcon,
    UnderIcon,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value;
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());
        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  ul,
  ol {
    padding: 0 1rem;
  }

  background-color: beige;
  color: black;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;
}

.floatingMenuEditor,
.bubbleMenuEditor {
  button {
    background-color: bisque;
    border: 1px solid black;
    border-radius: 4px;
    margin: 2px;
    padding: 2px;
    height: 30px;
  }
  & > .is-active {
    background-color: lightblue;
  }
}
</style>
