<template>
  <div>
    <h1>Login</h1>
    <login @submit="onSubmit"></login>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "@/x-vue/components/user/Login.vue";

@Component({
  components: {
    Login,
  },
})
export default class LoginView extends Vue {
  onSubmit(event: Event, form: Request): void {
    console.log("event; ", event);
    console.log("form; ", form);
    this.$store.commit("login", form);
  }
}
</script>
