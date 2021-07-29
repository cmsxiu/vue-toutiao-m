<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollowed"
    :loading="loading"
  >已关注</van-button>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="onFollowed"
    :loading="loading"
  >关注</van-button>
</template>

<script>
import { addFollow, delFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  data () {
    return {
      loading: false
    }
  },
  model: {
    prop: 'isFollowed', // 默认是 value
    event: 'update-is_followed' // 默认是 input
  },
  props: {
    userId: {
      type: [Object, Number, String],
      required: true
    },
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async onFollowed () {
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await delFollow(this.userId)
        } else {
          // 未关注，添加关注
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请稍后再试'
        if (error.response && error.response.status === 400) {
          message = '自己不能关注自己'
        }
        this.$toast(message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>