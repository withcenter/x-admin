<template>
  <div>
    <h1>Forum</h1>
    <div v-for="post in posts" :key="post.idx">
      <article>
        <h1>idx: {{ post.idx }}</h1>
        <div class="alert alert-secondary">this is the content</div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { AppService } from "@/services/app.service";
import { ApiService } from "@/x-vue/services/api.service";
import { PostModel } from "@/x-vue/services/interfaces";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Forum extends Vue {
  app = new AppService();
  api = ApiService.instance;
  posts: PostModel[] = [];
  pageNo = 0;
  i = 0;
  beforeMount() {
    this.loadPage();
  }
  mounted() {
    this.listenScroll();
  }
  created() {
    console.log("created;.. ");
  }

  async loadPage(): Promise<void> {
    try {
      const posts = await this.api.postSearch({});
      for (const post of posts) {
        this.posts.push(post);
      }
    } catch (e) {
      this.app.error(e);
    }
    // this.pageNo++;
    // console.log("page: ", this.pageNo);
    // for (let j = this.i; j < this.i + 10; j++) {
    //   const post = new PostModel();
    //   post.idx = j;
    //   this.posts.push(post);
    // }
    // this.i += 10;
  }
  listenScroll() {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.offsetHeight - 300;
      if (bottomOfWindow) {
        console.log("user reached bottom;");
        this.loadPage();
      }
    };
  }
}
</script>
