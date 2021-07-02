<template>
  <section>
    <h2 class="px-3">Sample widgets</h2>
    <hr />
    <div class="px-3">
      <h4>ThumbnailWithText</h4>
      <thumbnail-with-text></thumbnail-with-text>

      <h4>TwoStoriesThumbnailWithText</h4>
      <two-stories-thumbnail-with-text></two-stories-thumbnail-with-text>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import ThumbnailWithText from "@/x-vue/widgets/post/ThumbnailWithText.vue";
import TwoStoriesThumbnailWithText from "@/x-vue/widgets/post/TwoStoriesThumbnailWithText.vue";

@Component({
  components: {
    ThumbnailWithText,
    TwoStoriesThumbnailWithText,
  },
})
export default class SampleWidgetView extends Vue {
  //
}
</script>
