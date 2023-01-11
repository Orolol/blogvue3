<template lang="pug">
.postForm
  v-form(@submit='handleSubmit')
    .thumbPost(@click="showMore = !showMore")
      span.title {{formPost.Contents[0]?.Title}}
      span Views : {{formPost.Views}}
      span Unique : {{formPost.UniqueViews}}
    .extended(v-if="showMore")
      v-text-field(label="Title" hide-details="auto" v-model='formPost.Contents[0].Title' @blur="handleSubmit")
      v-text-field(label="Abstract" hide-details="auto" v-model='formPost.Contents[0].Abstract' @blur="handleSubmit")
      v-select(label="Category"  v-model='formPost.Category' :items="cats" @blur="handleSubmit")
      tiptapEditor(v-model='formPost.Contents[0].Content')

</template>

<script setup lang="ts">
import type { postType } from "@/types/api";
import { computed, ref } from "vue";
import tiptapEditor from "@/components/editor/tiptapEditor.vue";
import { useAdminStore } from "@/stores/admin";

const store = useAdminStore();
let showMore = ref(false);

const cats = store.categories.map((cat) => cat.Name);

const props = defineProps<{
  post: postType;
}>();

const formToCreate = ref<postType>(props.post);

const formPost = computed({
  get: (): postType => formToCreate.value,
  set: (newP: postType) => {
    formToCreate.value = newP;
  },
});

const handleSubmit = async (e: SubmitEvent) => {
  console.log(e);
  e && e.preventDefault();
  console.log(formPost.value);
  store.savePost(formPost.value);
};
</script>
<style lang="scss">
.thumbPost {
  background-color: rgb(68, 68, 68);
  margin: 5px;
  padding: 5px;
  display: flex;
  gap: 20px;
  cursor: pointer;
  border-radius: 8px;

  .title {
    width: 350px;
  }
}
</style>
