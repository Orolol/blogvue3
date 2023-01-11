<template lang="pug">
.configContainer
  v-btn(@click="addPost") Add
  h3 Post List 
  postForm(v-for="post : postType  in store?.posts" :post="post")


</template>

<script setup lang="ts">
import { useAdminStore } from "@/stores/admin";
import type { contentPostType } from "@/types/api";
import type { postType } from "@/types/api";
import postForm from "./postForm.vue";

const store = useAdminStore();

store.fetchPosts();

const addPost = () => {
  const content: contentPostType = {
    Title: "New article",
    LanguageID: "fr",
    Abstract: "A little abstract",
    Content: "Write here ....",
  };

  const newPost: postType = { Category: "", Contents: [content] };

  store.posts.push(newPost);
};

const handleSubmit = async (e: SubmitEvent) => {
  e.preventDefault();
  store.config && (await store.setConfig(store.config));
};
</script>
