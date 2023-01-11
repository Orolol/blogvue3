<template lang="pug">
.configContainer
  v-table
    thead
      tr
        th Cateogry Name 
        th Action
    tbody 
      tr(v-for="cat in store?.categories")
        td {{cat.Name}}
        td 
          v-btn Delete
      tr
        td
          v-text-field(v-model="newCat.Name")
        td
          v-btn(@click="handleCreate") Create 
          


</template>

<script setup lang="ts">
import { useAdminStore } from "@/stores/admin";
import type { categoryType } from "@/types/api";

const store = useAdminStore();
store.fetchCats();

let newCat: categoryType = {
  Name: "",
  Trads: [{ LanguageID: "fr", Name: "" }],
};

const handleCreate = async (e: SubmitEvent) => {
  e.preventDefault();
  console.log(newCat);
  await store.addCategory(newCat);
  newCat = {
    Name: "",
    Trads: [{ LanguageID: "fr", Name: "" }],
  };
  store.fetchCats();
};
</script>
