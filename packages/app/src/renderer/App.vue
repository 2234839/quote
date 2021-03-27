<template>
  <div class="app g-allow-drag min-h-screen">
    <!-- <navigator /> -->
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import directive from "/@/directives/sample";
import Navigator from "/@/components/HomeNavigator.vue";
// import MdCard from "vue-material/dist/components/MdCard";
// console.log('[MdCard]',MdCard)
// Vue.use(MdCard)
export default defineComponent({
  components: {
    Navigator,
    // MdCard,
  },
  directives: {
    directive,
  },
});
</script>

<style></style>
