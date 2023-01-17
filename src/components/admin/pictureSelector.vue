//Component wich will use the picture list in the store and will present them in a  select 
<template lang="pug">

v-select(
    :items="pictures"
    item-text="Name"
    item-value="Url"
    v-model="selectedPicture"
    label="Select Picture"
    outlined
    dense
    :rules="[v => !!v || 'Picture is required']"
    :error-messages="errorMessages"
    @change="updatePicture"
)
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "@/stores/admin";
import type { pictureType } from "@/types/api";

const store = useAdminStore();

const pictures = ref<pictureType[]>([]);
const selectedPicture = ref<pictureType | null>(null);

const fetchPictures = async () => {
    await store.fetchPics();
    pictures.value = store.pictures;
};

fetchPictures();

const updatePicture = (e: any) => {
    store.selectedPicture = selectedPicture.value;
};
</script>
<style lang="scss">
.v-select__selections {
    width: 100%;
}
</style>

</style>
