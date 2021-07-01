import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { AppService } from "./services/app.service";
import store from "./store";
import { ApiService } from "./x-vue/services/api.service";
import { UserModel } from "./x-vue/services/interfaces";

import {
  AvatarPlugin,
  AlertPlugin,
  ButtonPlugin,
  ProgressPlugin,
  SpinnerPlugin,
  FormTextareaPlugin,
  NavbarPlugin,
  FormInputPlugin,
  PopoverPlugin,
  TabsPlugin,
  CardPlugin,
  ModalPlugin,
  PaginationNavPlugin,
  ToastPlugin,
  FormSelectPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
} from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(AvatarPlugin);
Vue.use(AlertPlugin);
Vue.use(ButtonPlugin);
Vue.use(ProgressPlugin);
// Vue.use(IconsPlugin);
Vue.use(NavbarPlugin);
Vue.use(FormInputPlugin);
Vue.use(SpinnerPlugin);
Vue.use(FormTextareaPlugin);
Vue.use(PopoverPlugin);
Vue.use(TabsPlugin);
Vue.use(CardPlugin);
Vue.use(ModalPlugin);
Vue.use(PaginationNavPlugin);
Vue.use(ToastPlugin);

Vue.use(FormCheckboxPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormGroupPlugin);

Vue.config.productionTip = false;

ApiService.instance.init({
  serverUrl: process.env.VUE_APP_SERVER_URL ?? "",
  apiKey: process.env.VUE_APP_API_KEY ?? "",
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
