<template>
  <div class="update-photo">
    <img
      class="img"
      :src="img"
      ref="img"
    >

    <div class="toolbar">
      <div
        class="cancel"
        @click="$emit('close')"
      >取消</div>
      <div
        class="confirm"
        @click="onConfirm"
      >完成</div>
    </div>
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpDatePhoto',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.photoFn(blob)
      })
    },
    async photoFn (blob) {
      try {
        this.$toast.loading({
          message: '保存中......',
          forbidClick: true, // 背景禁止点击
          duration: 0 // 持续展示
        })
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhoto(formData)
        this.$emit('update-photo', data.data.photo)
        this.$emit('close')
        this.$toast.success('修改完成')
      } catch (error) {
        this.$toast.fail('操作失败，请稍后再试')
      }
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, //
      dragMode: 'move', // 图片可动
      aspectRatio: 1, // 裁剪比例
      autoCropArea: 1, // 自动截取比例
      cropBoxMovable: false, // 截图区域移动
      cropBoxResizable: false, // 截图区域缩放,
      background: false, // 不需要透明背景
      movable: true // 画布是否可以移动
    })
  }
}
</script>
<style lang="less" scoped>
.update-photo {
  height: 100%;
  background: #000;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    .confirm,
    .cancel {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 90px;
      color: #fff;
      font-size: 30px;
    }
  }
}
</style>