import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/Resident",
    component: () => import("../views/Resident.vue"),
  },
  {
    path: "/Nurse",
    component: () => import("../views/Nurse.vue"),
  },
  {
    path: "*",
    component: () => import("../views/Error404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
