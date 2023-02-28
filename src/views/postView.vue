<template lang="pug">
.postLayout

</template>

<script setup lang="ts">
// TODO : retrieve post from API with the title from URL

import { clientAPI } from "@/backend";
import type { postType } from "@/types/api";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const post = ref<postType | null>(null);
const title = ref<string | null>(null);

const route = useRoute();

onMounted(() => {
  title.value = route.params.title as string;
  console.log(title.value);
  console.log(route.params);
  fetchPost();
});

const fetchPost = async () => {
  const data: postType = await clientAPI.getApi(`post/${title.value}`);
  post.value = data;
  console.log(data);
};
</script>
