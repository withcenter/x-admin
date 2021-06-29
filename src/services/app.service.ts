import store from "@/store";
import { ApiService } from "@/x-vue/services/api.service";
import { UserModel } from "@/x-vue/services/interfaces";

export class AppService {
  api: ApiService = ApiService.instance;
  alert(msg: string): void {
    alert(msg);
  }
  error(e: string): void {
    this.alert(e);
  }

  logout(): void {
    console.log("logout");
    ApiService.instance.logout();
    store.commit("user", new UserModel());
  }

  get user(): UserModel {
    return store.state.user;
  }

  get loggedIn(): boolean {
    return store.state.user.loggedIn;
  }

  get notLoggedIn(): boolean {
    return store.state.user.notLoggedIn;
  }
}
