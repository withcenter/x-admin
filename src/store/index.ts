import { UserModel } from "@/x-vue/interfaces/interfaces";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * @attention It should not handle anything that are related with UI. It only does logic.
 */
export default new Vuex.Store({
  state: {
    user: new UserModel(),
    version: "0.0.0",
  },
  mutations: {
    user: (state, user: UserModel) => {
      state.user = user;
    },
    version: (state, version) => {
      state.version = version;
    },
  },
  actions: {},
  modules: {},
});
