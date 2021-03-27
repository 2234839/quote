import { createRouter, createMemoryHistory } from "vue-router";
import Home from "/@/pages/home/home.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    // {
    //   path: "/about",
    //   component: About,
    // },
  ],
});

export default router;
