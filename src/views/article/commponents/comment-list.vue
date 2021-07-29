<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多评论了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in dataList"
        :key="index"
        :comment="item"
      />
    </van-list>
  </div>
</template>
<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, Object, String],
      required: true
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getComments({
          type: 'a', // 评论 a 对文章的评论 c 对 评论的评论
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = res.data
        this.dataList.push(...results)
        this.$emit('onload-success', res.data)
        // 本次加载完成
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
          this.offset = res.data.last_id
        } else {
          // 没有数据了，就停止刷新加载
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('评论加载失败，请点击重试')
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.onLoad()
  }
}
</script>
<style lang="less" scoped>
</style>