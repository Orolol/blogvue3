<script setup lang="ts">
import { useAuthStore } from "@/stores/admin";
import LoginForm from "@/components/LoginForm.vue";
import AdminMain from "@/components/admin/AdminMain.vue";

const adminStore = useAuthStore();

const localApi = window.localStorage.getItem("blog-api");
if (localApi) {
  adminStore.token = localApi;
  adminStore.isAdmin = true;
}
</script>

<template lang="pug">
.adminContainer
    .login(v-if="!adminStore?.isAdmin")
        LoginForm
    .adminPage(v-else)
        AdminMain
        
</template>
