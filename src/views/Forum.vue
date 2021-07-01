<template>
  <div>
    <h1>Forum :: {{ categoryId }}</h1>
    <div v-for="post in posts" :key="post.idx">
      <article>
        <h1>idx: {{ post.idx }}</h1>
        <div class="alert alert-secondary">this is the content</div>
      </article>
    </div>
    <div class="alert alert-info" v-if="loading">loading next page ...</div>
    <div class="alert alert-warning" v-if="noMore">There is no more posts</div>
  </div>
</template>

<script lang="ts">
import { ApiService } from "@/x-vue/services/api.service";
import { PostModel } from "@/x-vue/services/interfaces";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Forum extends Vue {
  api = ApiService.instance;
  posts: PostModel[] = [];
  pageNo = 0;
  limit = 12;
  loading = false;
  noMore = false;
  get categoryId(): string {
    return this.$route.params.categoryId;
  }
  mounted() {
    this.loadPage();
    this.listenScroll();
  }
  /// 게시판 목록을 빠져 나갈 때, scroll listen 을 중단.
  beforeDestroy() {
    window.onscroll = null;
  }
  /// 카테고리가 변경 되면, 초기하 하고, 다시 게시판 첫 페이지를 로드.
  @Watch("$route.params.categoryId")
  onCategoryIdChange(categoryId: string, old: string) {
    this.pageNo = 0;
    this.posts = [];
    this.loading = false;
    this.noMore = false;
    this.loadPage();
  }
  /// 다음 페이지 로드
  async loadPage(): Promise<void> {
    if (this.loading || this.noMore) return;
    this.loading = true;
    this.pageNo++;
    console.log("loading page no: ", this.pageNo);
    try {
      const posts = await this.api.postSearch({
        categoryId: this.categoryId,
        page: this.pageNo,
        limit: this.limit,
      });
      if (posts.length < this.limit) this.noMore = true;
      for (const post of posts) {
        this.posts.push(post);
      }
    } catch (e) {
      alert(e);
    }
    this.loading = false;
  }
  /// 사용자가 스크롤하는 것을 listen 해서, 페이지 아래쪽에 닿으면 다음 페이지를 로드한다.
  listenScroll() {
    window.onscroll = () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.offsetHeight - 300;
      if (bottomOfWindow) {
        this.loadPage();
      }
    };
  }
}
</script>
