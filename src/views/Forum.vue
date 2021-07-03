<template>
  <div class="forum">
    <div class="d-flex justify-content-between">
      <h1 v-if="forum.categoryId">Forum :: {{ forum.categoryId }}</h1>

      <div>
        <button class="btn btn-primary" @click="forum.post.toCreate(forum.categoryId)">
          Create
        </button>
      </div>
    </div>

    <PostEditBasic class="m-3" :forum="forum" @edited="arguments[0].toggleView()"></PostEditBasic>

    <post-list-loading :page="forum.page"></post-list-loading>
    <section v-if="forum.post.inEdit == false">
      <article v-for="post in forum.posts" :key="post.idx">
        <PostListTitleClosed :post="post"></PostListTitleClosed>
        <div class="post-body" v-if="post.inView">
          <FileList :post="post"></FileList>
          <div class="post-content" v-html="post.content"></div>
          <div class="buttons">
            <button class="btn btn-secondary btn-sm" @click="post.like()">Like</button>
            <button class="btn btn-secondary btn-sm" @click="post.dislike()">Dislike</button>
            <button class="btn btn-secondary btn-sm" @click="forum.post.toEdit(post)">Edit</button>
          </div>
        </div>
      </article>

      <PostListLoading></PostListLoading>
      <PostListNoMore></PostListNoMore>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.forum {
  margin: 1em;
  .post-content {
    padding: 1em;
    background-color: beige;
    white-space: pre-line;
  }
}
</style>
<script lang="ts">
import { ApiService } from "@/x-vue/services/api.service";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import PostEditBasic from "@/x-vue/components/post/PostEditBasic.vue";
import PostListLoading from "@/x-vue/components/post/PostListLoading.vue";
import PostListNoMore from "@/x-vue/components/post/PostListNoMore.vue";
import PostListTitleClosed from "@/x-vue/components/post/PostListTitleClosed.vue";
import FileList from "@/x-vue/components/file/FileList.vue";
import { ForumInterface } from "@/x-vue/interfaces/forum.interface";

@Component({
  components: {
    PostEditBasic,
    PostListLoading,
    PostListNoMore,
    FileList,
    PostListTitleClosed,
  },
})
export default class Forum extends Vue {
  api = ApiService.instance;
  forum: ForumInterface = new ForumInterface();

  mounted(): void {
    this.forum.categoryId = this.$route.params.categoryId;
    console.log("this.forum.categoryId", this.forum.categoryId);
    this.loadPage();
    this.listenScroll();
    // this.forum.post.toCreate(this.forum.categoryId);
  }
  /// 게시판 목록을 빠져 나갈 때, scroll listen 을 중단.
  beforeDestroy(): void {
    window.onscroll = null;
  }
  /// 카테고리가 변경 되면, 초기하 하고, 다시 게시판 첫 페이지를 로드.
  @Watch("$route.params.categoryId")
  onCategoryIdChange(categoryId: string): void {
    this.forum = new ForumInterface();
    this.forum.categoryId = categoryId;
    this.loadPage();
  }

  /// 다음 페이지 로드
  async loadPage(): Promise<void> {
    if (this.forum.canLoad) return;
    this.forum.beginLoad();
    try {
      const posts = await this.api.postSearch(this.forum.searchOptions);
      if (posts.length < this.forum.limit) this.forum.noMore = true;
      for (const post of posts) {
        this.forum.posts.push(post);
        /// Test. Open second post of first page.
        if (this.forum.page == 1 && this.forum.posts.length == 2) post.toggleView();
      }
    } catch (e) {
      alert(e);
    }
    this.forum.endLoad();
  }

  /// 사용자가 스크롤하는 것을 listen 해서, 페이지 아래쪽에 닿으면 다음 페이지를 로드한다. -------------------------------------------
  listenScroll(): void {
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
