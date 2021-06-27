<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <login-first></login-first>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginFirst from "@/x-vue/components/user/LoginFirst.vue";

@Component({
  components: {
    HelloWorld,
    LoginFirst,
  },
})
export default class Home extends Vue {}
</script>
