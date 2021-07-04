<template>
  <header class="d-flex justify-content-between">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/forum/qna">QnA</router-link>
      <router-link to="/forum/discussion">Discussion</router-link>
    </div>
    <div class="d-flex">
      <router-link to="/">User</router-link>

      <div class="item"><MenuSvg class="size-md" v-b-toggle.sidebar-backdrop></MenuSvg></div>

      <b-sidebar id="sidebar-backdrop" title="Sidebar with backdrop" backdrop-variant="dark" backdrop right shadow>
        <div class="px-3 py-2">
          <h1>Home</h1>
          <div>
            Matrix Server URL o :
            {{ $app.api.serverUrl }}
          </div>
          <div>Matrix version: {{ $store.state.version }}</div>
        </div>
      </b-sidebar>
    </div>
  </header>
</template>
<style lang="scss">
header {
  background-color: aliceblue;
  a,
  .item {
    display: inline-block;
    padding: 1em;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MenuSvg from "@/x-vue/components/svg/MenuSvg.vue";
@Component({
  components: { MenuSvg },
})
export default class extends Vue {}
</script>
