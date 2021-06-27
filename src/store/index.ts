import { ApiService } from "@/x-vue/services/api.service";
import { UserModel } from "@/x-vue/services/interfaces";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

class App {
  static alert(e: string): void {
    alert(e);
  }
}

export default new Vuex.Store({
  state: {
    user: new UserModel(),
  },
  mutations: {
    login: async (state, form) => {
      try {
        state.user = await ApiService.instance.login(form);
        console.log("state.user", state.user);
      } catch (e) {
        App.alert(e);
      }
    },
  },
  actions: {},
  modules: {},
});
