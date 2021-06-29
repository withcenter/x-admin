import { ApiService } from "@/x-vue/services/api.service";
import { UserModel } from "@/x-vue/services/interfaces";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * @attention It should not handle anything that are related with UI. It only does logic.
 */
export default new Vuex.Store({
  state: {
    user: new UserModel(),
    router: {} as VueRouter,
  },
  mutations: {
    user: (state, user: UserModel) => {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
