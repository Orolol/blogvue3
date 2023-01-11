import { clientAPI } from "../backend";
import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { configType, postType, categoryType } from "../types/api";

export const useAuthStore = defineStore("user", () => {
  const currentLang = ref("fr");
  const currentCategory = ref<categoryType | null>(null);
});
