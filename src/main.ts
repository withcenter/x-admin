import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ApiService } from "./x-vue/services/api.service";
import { UserModel } from "./x-vue/services/interfaces";

Vue.config.productionTip = false;

ApiService.instance.init({
  host: "main.philov.com",
  userChanges: (user: UserModel) => {
    store.state.user = user;
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
