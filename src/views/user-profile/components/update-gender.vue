<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="性别"
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'upDateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm (e) {
      // 加载中
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localGender = this.localGender

        await updateUserProfile({
          gender: localGender
        })

        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('修改完成')
      } catch (error) {
        this.$toast.fail('修改失败，请稍后再试')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>
<style lang="less" scoped>
</style>