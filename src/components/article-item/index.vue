<template>
  <div>
    <!-- 文章列表 -->
    <van-cell
      clickable
      class="article-item"
      border
    >
      <!-- 标题 -->
      <div
        slot="title"
        class="title van-multi-ellipsis--l2"
      >
        {{ article.title }}
      </div>
      <!-- 标题 end -->

      <!-- 文章信息 -->
      <div slot="label">
        <div
          v-if="article.cover.type === 3"
          class="cover-wrap"
        >
          <div
            class="cover-item"
            v-for="(imgUrl, index) in article.cover.images"
            :key="index"
          >
            <van-image
              :src="imgUrl"
              show-error
              fit="cover"
              class="cover-item-img"
            >
              <template v-slot:error>加载失败</template>
            </van-image>
          </div>
        </div>
        <div class="article-info">
          <span
            v-if="article.is_top"
            class="article-is_top"
          >置顶</span>
          <span class="article-aut_name">
            {{article.aut_name}}
          </span>
          <span class="article-comm_count">
            {{article.comm_count}} 评论
          </span>
          <span class="article-pubdate">
            {{ article.pubdate | relativeTime }}
            <!-- relativeTime -->
          </span>
        </div>
      </div>
      <!-- 文章信息 end -->

      <!-- 右边 -->
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
        class="right-cover"
      >
        <template v-slot:error>加载失败</template>
      </van-image>
      <!-- 右边 end -->
    </van-cell>
    <!-- 文章列表 end -->
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  mounted () { },
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
    // 针对英文，强制换行
    word-break: break-all;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;

    .cover-item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover-item-img {
        width: 226px;
        height: 146px;
      }
    }
  }
  .article-info {
    display: flex;
    span {
      margin-right: 25px;
      font-size: 23px;
      color: #b4b4b4;
    }
    .article-is_top {
      color: #e22829;
    }
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
}
</style>