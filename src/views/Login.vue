<template>
  <div class="w-50 mx-auto">
    <login @submit="onSubmit"></login>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/x-vue/components/user/Login.vue";

import { ApiService } from "@/x-vue/services/api.service";

@Component({
  components: {
    Login,
  },
})
export default class LoginView extends Vue {
  async onSubmit(event: Event, form: Request): Promise<void> {
    try {
      const user = await ApiService.instance.login(form);
      this.$store.commit("user", user);
      this.$router.push("/");
    } catch (e) {
      this.$app.error(e);
    }
  }
}
</script>
