import store from "@/store";
import { ApiService } from "@/x-vue/services/api.service";
import { UserModel } from "@/x-vue/interfaces/interfaces";

export class AppService {
  private constructor() {
    console.log("AppService;;");
    this.init();
  }
  // Singletone
  private static _instance: AppService;
  public static get instance(): AppService {
    if (!AppService._instance) {
      AppService._instance = new AppService();
    }
    return AppService._instance;
  }

  api: ApiService = ApiService.instance;

  async init(): Promise<void> {
    try {
      store.commit("version", await ApiService.instance.version());
    } catch (e) {
      this.error(e);
    }
  }

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
  async refreshProfile(): Promise<void> {
    const user = await this.api.refreshLoginUserProfile();
    store.commit("user", user);
  }
}
