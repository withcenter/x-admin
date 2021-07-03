<template>
  <div class="forum">
    <div class="d-flex justify-content-between">
      <h1 v-if="forum.categoryId">Forum :: {{ forum.categoryId }}</h1>

      <div>
        <button @click="unsubscribeScroll">Stop</button>
        <button @click="subscribeScroll">Start</button>
        <button class="btn btn-primary" @click="toCreate">Create</button>
      </div>
    </div>

    <PostEditForm class="m-3" :forum="forum" @edited="onEdit" @cancelled="onCancel"></PostEditForm>

    <section v-if="forum.post.inEdit == false">
      <article v-for="post in forum.posts" :key="post.idx">
        <PostListTitleClosed :post="post"></PostListTitleClosed>
        <section class="post-body" v-if="post.inView">
          <FileList :post="post"></FileList>
          <div class="post-content">{{ post.content }}</div>
          <div class="buttons d-flex">
            <VoteButtons :post="post"></VoteButtons>
            <PostEditButton :post="post"></PostEditButton>
            <PostDeleteButton :post="post"></PostDeleteButton>
          </div>
          <CommentEditForm :post="post" :parent="post"></CommentEditForm>
          <div class="no-of-comments">{{ post.comments.length }} comments</div>
          <div class="comment-list">
            <div class="comment" :depth="comment.depth" v-for="comment of post.comments" :key="comment.idx">
              <CommentMeta :comment="comment"></CommentMeta>
              <FileList :post="comment"></FileList>
              <CommentContent :comment="comment"></CommentContent>

              <div class="buttons d-flex">
                <button class="btn btn-secondary btn-sm mr-2" @click="comment.inReply = !comment.inReply">reply</button>
                <VoteButtons :post="comment"></VoteButtons>
                <CommentEditButton :comment="comment"></CommentEditButton>
                <CommentDeleteButton :comment="comment"></CommentDeleteButton>
              </div>

              <CommentEditForm :post="post" :parent="comment" v-if="comment.inReply"></CommentEditForm>
              <CommentEditForm :post="post" :comment="comment" v-if="comment.inEdit"></CommentEditForm>
            </div>
          </div>
        </section>
      </article>

      <PostListLoading></PostListLoading>
      <PostListNoMore></PostListNoMore>
    </section>
  </div>
</template>
<script lang="ts">
import { ApiService } from "@/x-vue/services/api.service";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import PostEditForm from "@/x-vue/components/forum_v2/post/PostEditForm.vue";
import PostListLoading from "@/x-vue/components/forum_v2/post/PostListLoading.vue";
import PostListNoMore from "@/x-vue/components/forum_v2/post/PostListNoMore.vue";
import PostListTitleClosed from "@/x-vue/components/forum_v2/post/PostListTitleClosed.vue";
import FileList from "@/x-vue/components/file/FileList.vue";
import { ForumInterface } from "@/x-vue/interfaces/forum.interface";
import VoteButtons from "@/x-vue/components/forum_v2/buttons/VoteButtons.vue";
import PostEditButton from "@/x-vue/components/forum_v2/post/PostEditButton.vue";
import PostDeleteButton from "@/x-vue/components/forum_v2/post/PostDeleteButton.vue";
import CommentEditForm from "@/x-vue/components/forum_v2/comment/CommentEditForm.vue";
import CommentMeta from "@/x-vue/components/forum_v2/comment/CommentMeta.vue";
import CommentContent from "@/x-vue/components/forum_v2/comment/CommentContent.vue";
import CommentDeleteButton from "@/x-vue/components/forum_v2/comment/CommentDeleteButton.vue";
import CommentEditButton from "@/x-vue/components/forum_v2/comment/CommentEditButton.vue";

@Component({
  components: {
    PostEditForm,
    PostListLoading,
    PostListNoMore,
    FileList,
    PostListTitleClosed,
    VoteButtons,
    PostEditButton,
    PostDeleteButton,
    CommentEditForm,
    CommentMeta,
    CommentContent,
    CommentDeleteButton,
    CommentEditButton,
  },
})
export default class Forum extends Vue {
  api = ApiService.instance;
  forum: ForumInterface = new ForumInterface();

  mounted(): void {
    this.forum.categoryId = this.$route.params.categoryId;
    console.log("this.forum.categoryId", this.forum.categoryId);
    this.loadPage();
    this.subscribeScroll();
  }
  /// 게시판 목록을 빠져 나갈 때, scroll listen 을 중단.
  beforeDestroy(): void {
    this.unsubscribeScroll();
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
    console.log("this.forum.page", this.forum.page);
    this.forum.beginLoad();
    try {
      const posts = await this.api.postSearch(this.forum.searchOptions);
      if (posts.length < this.forum.limit) this.forum.noMore = true;
      for (const post of posts) {
        this.forum.posts.push(post);
        /// Test. Open first post of first page.
        if (this.forum.page == 1 && this.forum.posts.length == 1) post.toggleView();
        /// Test. Open second post of first page.
        // if (this.forum.page == 1 && this.forum.posts.length == 2) post.toggleView();
      }
    } catch (e) {
      alert(e);
    }
    this.forum.endLoad();
  }

  /**
   * Listen to scroll movement for endless scroll pagination.
   *
   * 사용자가 스크롤하는 것을 listen 해서, 페이지 아래쪽에 닿으면 다음 페이지를 로드한다.
   * 게시판에서 다른 게시판으로 이동 할 때, unsubscribe 또는 subscribe 를 하지 않는다.
   * 즉, 기존 subscription 을 유지한다.
   */
  subscribeScroll(): void {
    window.addEventListener("scroll", this.scrollWatch);
  }
  unsubscribeScroll(): void {
    window.removeEventListener("scroll", this.scrollWatch);
  }
  scrollWatch(): void {
    const bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 300;
    if (bottomOfWindow) {
      this.loadPage();
    }
  }

  toCreate(): void {
    this.unsubscribeScroll();
    this.forum.post.toCreate(this.forum.categoryId);
  }

  onEdit(): void {
    arguments[0].toggleView();
    this.subscribeScroll();
  }

  onCancel(): void {
    this.subscribeScroll();
  }
}
</script>

<style lang="scss" scoped>
.forum {
  margin: 1em;
  .post-content {
    padding: 1em;
    background-color: beige;
    white-space: pre-line;
  }
}

.comment-list .comment {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  background-color: rgb(220, 220, 207);
}
[depth="1"] {
  margin-left: 1em;
}
[depth="2"] {
  margin-left: 2em;
}
[depth="3"] {
  margin-left: 3em;
}
[depth="4"] {
  margin-left: 4em;
}
[depth="5"] {
  margin-left: 5em;
}
[depth="6"] {
  margin-left: 6em;
}
[depth="7"] {
  margin-left: 7em;
}
[depth="8"] {
  margin-left: 8em;
}
[depth="9"] {
  margin-left: 9em;
}
[depth="10"],
[depth="11"],
[depth="12"],
[depth="13"],
[depth="14"],
[depth="15"],
[depth="16"] {
  margin-left: 10em;
}
</style>
