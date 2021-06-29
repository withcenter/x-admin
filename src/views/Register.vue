<template>
  <div>
    <h1>Login</h1>
    <register @submit="onSubmit"></register>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Register from "@/x-vue/components/user/Register.vue";
import { ApiService } from "@/x-vue/services/api.service";

@Component({
  components: {
    Register,
  },
})
export default class LoginView extends Vue {
  async onSubmit(event: Event, form: Request): Promise<void> {
    try {
      this.$store.commit("user", await ApiService.instance.register(form));
    } catch (e) {
      this.$app.error(e);
    }
  }
}
</script>
