import { clientAPI } from "../backend";
import { ref } from "vue";
import { defineStore } from "pinia";

import type { configType, postType, categoryType } from "../types/api";

export const useUserStore = defineStore("user", () => {
  const config = ref<configType | null>(null);
  const posts = ref<postType[]>([]);
  const currentLang = ref("fr");
  const currentCategory = ref<categoryType | null>(null);

  const fetchConfig = async () => {
    const result = await clientAPI.getApi("config/");
    config.value = result;
  };

  const fetchPosts = async () => {
    const result = await clientAPI.getApi("posts/");
    posts.value = result;
    console.log("AA", result);
  };

  return {
    config,
    posts,
    fetchConfig,
    fetchPosts,
    currentLang,
    currentCategory,
  };
});
