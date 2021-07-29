<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div
        class="loading-wrap"
        v-if="loadingShow"
      >
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        class="article-detail"
        v-else-if="articleMain.title"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleMain.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell
          class="user-info"
          center
          :border="false"
        >
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleMain.aut_photo"
          />
          <div
            slot="title"
            class="user-name"
          >{{ articleMain.aut_name }}</div>
          <div
            slot="label"
            class="publish-date"
          > {{ articleMain.pubdate | relativeTime }}</div>
          <!-- 关注用户 -->
          <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用还要修改
              传递：props
              :is-followed="articleMain.is_followed"
              修改：自定义事件
              @update-is_followed="articleMain = $event"
            简写方式：在组件上使用 v-model
              value="articleMain.is_followed"
              @input="articleMain.is_followed = $event"
            如果需要修改 v-model 的规则名称，可以通过子组件的 model 属性来配置修改

            一个组件上只能使用一次 v-model
            如果有多个数据需要实现类似于 v-model 的效果咋办
            可以使用属性的 .sync 修饰符
           -->
          <followe-user
            class="follow-btn"
            v-model="articleMain.is_followed"
            :userId="articleMain.aut_id"
          />
          <!-- 关注用户 end -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleMain.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论 -->
        <comment-list
          :source="articleMain.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          :dataList="commentDataList"
        />
        <!-- 评论 end -->

        <!-- 发布评论 -->
        <!-- <van-popup
          v-model="isPostShow"
          position="bottom"
        /> -->
        <!-- 发布评论 end -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div
        class="error-wrap"
        v-else-if="errStatus === 404"
      >
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div
        class="error-wrap"
        v-else
      >
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
          class="retry-btn"
          @click="loadArticle"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <comment-post
        :target="articleMain.art_id"
        @post-success="onPostShow"
      ></comment-post>
    </van-popup>
    <!-- 发布评论 end -->
    <!-- 底部区域 -->
    <div
      class="article-bottom"
      v-if="articleMain.title"
    >
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalCommentCount"
        color="#777"
      />
      <!-- 收藏 -->
      <collect-article
        class="btn-collect"
        v-model="articleMain.is_collected"
        :article-id="articleMain.art_id"
      />
      <!-- 收藏 end -->
      <!-- 点赞 -->
      <like-article
        class="btn-collect"
        v-model="articleMain.attitude"
        :article-id="articleMain.art_id"
      />
      <!-- 点赞 end -->
      <van-icon
        name="share"
        color="#777777"
      ></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>
<script>
import FolloweUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './commponents/comment-list'
import CommentPost from './commponents/comment-post'
import { getArticlesMain } from '@/api/articles'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  // 给所有的后端组件提供数据
  // 注意不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    FolloweUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost
  },
  data () {
    return {
      articleMain: {}, // 文章内容
      loadingShow: true, // 加载中
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false,
      commentDataList: []
    }
  },
  methods: {
    async loadArticle () {
      // 开启加载状态
      this.loadingShow = true
      try {
        const { data: res } = await getArticlesMain(this.articleId)
        this.articleMain = res.data
        // console.log(this.articleMain)
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        // console.log(error.message, error.response)
        // 如果文章不存在
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 关闭加载状态
      this.loadingShow = false
    },
    previewImage () {
      // 得到所有的 img 节点
      try {
        const articleContent = this.$refs['article-content']
        const imgs = articleContent.querySelectorAll('img')
        // 获取所有 img 地址
        const images = []
        imgs.forEach((img, index) => {
          images.push(img.src)
          // 给每个 img 注册点击事件，在处理函数中调用预览
          img.onclick = () => {
            ImagePreview({
              // 预览的图片地址数组
              images,
              // 起始位置，从 0 开始
              startPosition: index
            })
          }
        })
      } catch (error) {
        console.log('该文章没有图片')
      }
    },
    onPostShow (data) {
      this.isPostShow = false
      this.commentDataList.unshift(data.data.new_obj)
    }
  },
  created () {
    this.loadArticle()
  },
  updated () {

  }
}
</script>
<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        font-size: 0.45rem;
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .btn-collect {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>