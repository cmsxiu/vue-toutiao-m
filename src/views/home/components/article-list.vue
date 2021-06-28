<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articleList"
          :key="index"
          :article="article"
        />
      </van-list>
      <!-- 文章列表 end -->
    </van-pull-refresh>
    <!-- 下拉刷新 end -->
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleListIndex',
  data () {
    return {
      articleList: [], // 储存文章数据
      loading: false, // 控制 加载中 状态
      finished: false, // 控制 加载完 状态
      timestamp: null, // 请求下一页的时间戳
      error: false, // error
      isLoading: false, // false，下拉刷新结束，true，下拉刷新
      refreshSuccessText: '刷新成功' // 下拉刷新成功后的提示
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channelList: {
      type: Object, // 类型是对象
      required: true // 必须要传这个，否则直接报错
    }
  },
  mounted () { },
  created () { },
  methods: {
    // 加载更多数据
    async onLoad () {
      try {
        // setInterval(async () => {
        const { data: res } = await getArticles({
          channel_id: this.channelList.id, // 频道ID
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳 new Date().getTime()
          timestamp: this.timestamp || Date.now(), // 时间戳
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 0
        })
        // 模拟刷新失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('ASDASDASDAS')
        // }

        const { results } = res.data
        this.articleList.push(...results)

        // 手动限制下加载数量
        // if (this.articleList.length > 20) {
        //   this.finished = true
        // }

        // 本次加载完成后，设置状态为结束
        this.loading = false
        // 判断数据还有数据
        if (results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true
          this.finished = true
        }
        // }, 1500)
      } catch (error) {
        this.$toast.fail('加载失败，请点击重试：' + error)
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新数据
    async onRefresh () {
      // 请求获取数据
      try {
        const { data: res } = await getArticles({
          channel_id: this.channelList.id, // 频道ID
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳 new Date().getTime()
          timestamp: Date.now(), // 时间戳
          // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 0
        })

        // 模拟刷新失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('ASDASDASDAS')
        // }

        // 将数据追加到列表的顶部
        const { results } = res.data
        this.articleList.unshift(...results)
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        // 关闭加载中状态
        this.isLoading = false
      } catch (error) {
        // 关闭加载中状态
        this.refreshSuccessText = '刷新失败'
        this.isLoading = false
        this.$toast.fail('请求失败，请稍后再试：' + error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  min-height: 79vh;
  max-height: 80vh;
  overflow-y: auto;
}
</style>