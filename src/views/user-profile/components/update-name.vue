<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <div class="inputBorder">
      <van-field
        v-model.trim="localdName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </div>
    <!-- /导航栏 -->
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'updateName',
  data () {
    return {
      localdName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中......',
        forbidClick: true, // 背景禁止点击
        duration: 0 // 持续展示
      })
      try {
        const localdName = this.localdName
        if (!localdName.length) {
          return this.$toast.fail('昵称不能为空')
        }
        await updateUserProfile({
          name: localdName
        })
        this.$emit('input', localdName)
        this.$emit('close')
        this.$toast.success('修改完成')
      } catch (error) {
        return this.$toast.fail('修改失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.update-container {
  .inputBorder {
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>