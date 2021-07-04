<template>
  <div class="home m-3">
    <TwoByTwoThumbnailWithTextBottom categoryId="discussion"></TwoByTwoThumbnailWithTextBottom>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TwoByTwoThumbnailWithTextBottom from "@/x-vue/widgets/post/TwoByTwoThumbnailWithTextBottom.vue";
@Component({
  components: { TwoByTwoThumbnailWithTextBottom },
})
export default class Home extends Vue {}
</script>
