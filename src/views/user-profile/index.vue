<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="个人信息"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >
    <van-cell
      title="头像"
      is-link
      @click="$refs.file.click()"
    >
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="upDateNameShow = true"
    />

    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="upDateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="upDateBirthdayShow = true"
    />
    <van-popup
      v-model="upDateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        v-if="upDateNameShow"
        @close="upDateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <van-popup
      v-model="upDateGenderShow"
      position="bottom"
    >
      <update-gender
        @close="upDateGenderShow = false"
        v-model="user.gender"
      />
    </van-popup>
    <van-popup
      v-model="upDateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        @close="upDateBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="upDatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        v-if="upDatePhotoShow"
        @close="upDatePhotoShow = false"
        :img="img"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {}, // 个人信息
      upDateNameShow: false,
      upDateGenderShow: false,
      upDateBirthdayShow: false,
      upDatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    onFileChange () {
      // 展示预览图片
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      this.upDatePhotoShow = true
      // 同一个文本不触发change，每次使用完毕，清空图片即可
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>
<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>