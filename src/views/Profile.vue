<template>
  <div class="w-50 mx-auto">
    <profile @submit="onSubmit" @on-error="$app.error"></profile>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Profile from "@/x-vue/components/user/Profile.vue";
import { ApiService } from "@/x-vue/services/api.service";

@Component({
  components: {
    Profile,
  },
})
export default class ProfileView extends Vue {
  async onSubmit(event: Event, form: Request): Promise<void> {
    try {
      this.$store.commit("user", await ApiService.instance.register(form));
      this.$router.push("/");
    } catch (e) {
      this.$app.error(e);
    }
    try {
      await ApiService.instance.profileUpdate(form);
      this.$app.alert("Update Success");
    } catch (e) {
      this.$app.error(e);
    }
  }
}
</script>
