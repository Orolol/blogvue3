import { clientAPI } from "../backend";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { configType, postType, categoryType } from "../types/api";

export const useAuthStore = defineStore("auth", () => {
  const isAdmin = ref(false);
  const token = ref("");
  const setToken = (tok: string) => {
    token.value = tok;
    window.localStorage.setItem("blog-api", tok);
  };
  const getToken = async (login: string, password: string): Promise<string> => {
    try {
      const result = await clientAPI.postApi("Login", {
        username: login,
        password,
      });

      setToken(result.token);
      isAdmin.value = true;
      return "";
    } catch (e) {
      console.log(e);
      return "Auth error";
    }
  };
  return { getToken, isAdmin, token, setToken };
});

export const useAdminStore = defineStore("admin", () => {
  // CONFING #######
  const config = ref<configType | null>(null);
  const getConfig = async () => {
    const result = await clientAPI.getApi("config");
    config.value = result;
  };
  const setConfig = async (params: configType) => {
    await clientAPI.postApi("admin/sconfig", params, true);
  };

  // POSTS #######
  const posts = ref<Array<postType>>([]);
  const fetchPosts = async () => {
    const result = await clientAPI.postApi("admin/aposts", null, true);
    posts.value = result;
  };
  const savePost = async (params: postType) => {
    await clientAPI.postApi("admin/post", params, true);
  };

  // CATEGORY #######
  const categories = ref<Array<categoryType>>([]);
  const fetchCats = async () => {
    const result = await clientAPI.getApi("cats/");
    categories.value = result;
  };
  const addCategory = async (params: categoryType) => {
    await clientAPI.postApi("admin/cat", params, true);
  };

  const deleteCategory = async (params: categoryType) => {
    await clientAPI.postApi("admin/dcat", params, true);
  };

  return {
    config,
    getConfig,
    setConfig,
    posts,
    fetchPosts,
    categories,
    fetchCats,
    deleteCategory,
    addCategory,
    savePost,
  };
});
