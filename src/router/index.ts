import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/forum/:categoryId",
    name: "Forum",
    component: () => import("../views/Forum.vue"),
  },

  {
    path: "/admin",
    // name: "Admin",
    component: () => import("@/x-vue/components/admin/Admin.vue"),
    children: [
      {
        path: "",
        name: "AdminDefault",
        component: () =>
          import("@/x-vue/components/admin/user/AdminUserList.vue"),
      },
      {
        path: "user",
        name: "AdminUserList",
        component: () =>
          import("@/x-vue/components/admin/user/AdminUserList.vue"),
      },
      {
        path: "user/edit/:userIdx",
        name: "AdminUserEdit",
        component: () =>
          import("@/x-vue/components/admin/user/AdminUserEdit.vue"),
      },
      {
        path: "category",
        name: "AdminCategoryList",
        component: () =>
          import("@/x-vue/components/admin/category/AdminCategoryList.vue"),
      },
      {
        path: "category/edit/:categoryId",
        name: "AdminCategoryEdit",
        component: () =>
          import("@/x-vue/components/admin/category/AdminCategoryEdit.vue"),
      },
      {
        path: "post",
        name: "AdminPostList",
        component: () =>
          import("@/x-vue/components/admin/post/AdminPostList.vue"),
      },
      {
        path: "file",
        name: "AdminFileList",
        component: () =>
          import("@/x-vue/components/admin/file/AdminFileList.vue"),
      },
      {
        path: "messaging",
        name: "AdminPushNotification",
        component: () =>
          import(
            "@/x-vue/components/admin/messaging/AdminPushNotification.vue"
          ),
      },
      {
        path: "setting",
        name: "AdminSetting",
        component: () =>
          import("@/x-vue/components/admin/setting/AdminSetting.vue"),
      },
      {
        path: "advertisement",
        name: "AdminAdvertisementSettings",
        component: () =>
          import(
            "@/x-vue/components/admin/advertisement/AdminAdvertisement.vue"
          ),
      },

      {
        path: "samples",
        name: "Samples",
        component: () => import("@/x-vue/components/samples/Samples.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
