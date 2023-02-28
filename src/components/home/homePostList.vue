//Component that display all the posts in the home page in a blog way (title,
date, author, image, description)

<template lang="pug">
.BlogTitle
    h1 Blog
.BlogPosts
    .BlogPostsContainer
        .BlogPost(v-for="post in postsSorted" :key="post.id")
            .BlogPostHeader
                h2 {{post.Contents[0].Title}}
                .BlogPostDateAuthor
                    //- p {{formatDistance(post.Date, new Date())}}
                    p {{post.Date}}
            .BlogPostImage
                home-picture(:imageUrl="'http://localhost:3010/' +post.MainPicture")
            .BlogPostDescription
                p {{post.Abstract}}
                .BlogPostLink
                    router-link(:to="'/post/' + post.Contents[0].URL") Read More


</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import type { postType } from "@/types/api";
import homePicture from "@/components/home/homePicture.vue";
import { formatDistance } from "date-fns";

const store = useUserStore();

await store.fetchPosts();

const posts = computed(() => store.posts);

const postsSorted = ref<postType[]>(posts.value);

postsSorted.value = posts.value.sort((a, b) =>
  a.Date > b.Date ? -1 : b.Date > a.Date ? 1 : 0
);
</script>
