<template>
  <van-button
    :icon="value !== 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    :class="{
      liked: value !== 1
    }"
    @click="onGoodJob"
  />
</template>

<script>
import { addLike, delLike } from '@/api/articles'
export default {
  name: 'LikeArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  methods: {
    async onGoodJob () {
      this.loading = true
      try {
        if (this.value !== -1) {
          // 已点赞，取消点赞
          await delLike(this.articleId)
        } else {
          // 未点赞，添加点赞
          await addLike(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', -1 * this.value)
        this.$toast.success(this.value === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请稍后再试')
      }
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>