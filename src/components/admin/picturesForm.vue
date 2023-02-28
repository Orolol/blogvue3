//Component to upload picutres, visualize them and delete them
<template lang="pug">
.picturesContainer
  .picturesList
    .picture(v-for="picture in pictures" :key="picture.id")
      .pictureHeader
        h4 {{picture.Name}}
      .pictureImage
        img(:src=" 'http://localhost:3010/' + picture.Url")
      .pictureDelete
        v-btn(@click="deletePicture(picture.id)") Delete
  .picturesUpload
    v-file-input(label="Upload Picture" v-model="file" @change="uploadPicture" accept="image/*")
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "@/stores/admin";
import type { pictureType } from "@/types/api";

const store = useAdminStore();

const pictures = ref<pictureType[]>([]);
const file = ref<File>();

const fetchPictures = async () => {
  await store.fetchPics();
  pictures.value = store.pictures;
};

fetchPictures();

const uploadPicture = async (e: any) => {
  console.log(e);
  await store.uploadPicture(e.target.files[0]);
  fetchPictures();
};

const deletePicture = async (name: string) => {
  await store.deletePicture(name);
  fetchPictures();
};
</script>

<style lang="scss">
.picturesContainer {
  gap: 20px;
  margin: 20px;

  .picturesList {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .picture {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .pictureHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 200px;
      }

      .pictureImage {
        img {
          max-width: 200px;
        }
      }

      .pictureDelete {
        v-btn {
          color: white;
          background-color: rgb(68, 68, 68);
        }
      }
    }
  }

  .picturesUpload {
    v-file-input {
      width: 200px;
    }
  }
}
</style>
