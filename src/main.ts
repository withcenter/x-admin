import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { AppService } from "./services/app.service";
import store from "./store";
import AdminService from "./x-vue/components/admin/admin.service";
import { ApiService } from "./x-vue/services/api.service";
import { UserModel } from "./x-vue/services/interfaces";

Vue.config.productionTip = false;

ApiService.instance.init({
  serverUrl: "https://main.philov.com/index.php",
  userChanges: (user: UserModel) => {
    store.state.user = user;
  },
});

Vue.prototype.$app = new AppService();

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

AdminService.instance.init({
  vm: vm,
});
