<template>
  <div
    class="center-slice"
    :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
  ></div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const slicePercentage = 15;

    const imageStyle = computed(() => {
      return {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        transform: "translateY(-50%)",
        width: "100%",
        height: "auto",
        clip: "rect(85%, 10%, 30%, 15%)",
      };
    });

    return {
      imageStyle,
    };
  },
};
</script>

<style>
.image-container {
  clip: rect(10%, 10%, 10%, 10%);
}

.center-slice {
  width: 100%;
  height: 150px;
  background-position: center center;
  background-size: cover;
}
</style>
