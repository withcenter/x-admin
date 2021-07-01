<template>
  <div class="home m-3">
    <h1>Home</h1>
    <div>
      Matrix Server URL:
      {{ $app.api.serverUrl }}
    </div>
    <div>
      Matrix version: {{ version }}
    </div>
  </div>
</template>

<script lang="ts">
import { ApiService } from "@/x-vue/services/api.service";
import ComponentService from "@/x-vue/services/x-vue.service";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  version = '';
  async mounted(): Promise<void> {
    try {
      this.version = await ApiService.instance.version();
    } catch (e) {
      ComponentService.instance.error(e);
    }
  }
}
</script>
