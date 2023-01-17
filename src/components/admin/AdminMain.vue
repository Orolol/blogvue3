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

.postTab(v-if="tab === 3")
    picturesFrom


</template>
<script lang="ts" setup>
import { ref } from "vue";
import configForm from "./configForm.vue";
import categoriesForm from "./categoriesForm.vue";
import postList from "./postList.vue";
import picturesFrom from "./picturesForm.vue";

const tab = ref(0);
</script>
