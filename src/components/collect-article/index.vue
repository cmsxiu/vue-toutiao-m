<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collectStar : value
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/articles'
export default {
  name: 'CollectArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏，取消收藏
          await delCollect(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
        }

        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败，请稍后再试')
      }

      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collectStar {
  .van-icon {
    color: #ffa500;
  }
}
</style>