<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view />
  </div>
</template>
<style lang="scss">
.size-sm {
  width: 14px;
  height: 14px;
}
.size-md {
  width: 20px;
  height: 20px;
}
</style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppHeader from "./components/AppHeader.vue";

@Component({
  components: {
    AppHeader,
  },
})
export default class PostEdit extends Vue {}
</script>
