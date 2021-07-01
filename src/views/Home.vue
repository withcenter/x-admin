<template>
  <div class="home">
    <h1>Home</h1>
    <div>
      Server URL:
      {{ $app.api.serverUrl }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
