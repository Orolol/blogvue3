<template lang="pug">

.adminMainContainer
    v-tabs(v-model="tab") 
        v-tab Config
        v-tab Posts
        v-tab Pages
        v-tab Pictures

.configTab(v-if="tab === 0")
    configForm
    categoriesForm
.postTab(v-if="tab === 1")
    postList


</template>
<script lang="ts" setup>
import { ref } from "vue";
import configForm from "./configForm.vue";
import categoriesForm from "./categoriesForm.vue";
import postList from "./postList.vue";

const tab = ref(0);
</script>
