<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <login-first></login-first>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginFirst from "@/x-vue/components/user/LoginFirst.vue";

@Component({
  components: {
    LoginFirst,
  },
})
export default class Home extends Vue {}
</script>
