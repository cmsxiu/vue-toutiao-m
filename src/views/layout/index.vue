<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 子路由出口 end -->

    <!-- 标签导航栏 -->
    <van-tabbar
      class="layout-tabbar"
      route
    >
      <van-tabbar-item
        to="/"
        :model="0"
      >
        <template slot="icon">
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template slot="icon">
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template slot="icon">
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template slot="icon">
          <i class="toutiao toutiao-wode"></i>
        </template>

        <span class="text">{{ token ? "我的" : "未登录" }}</span>

      </van-tabbar-item>
    </van-tabbar>
    <!-- 标签导航栏 end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {
    ...mapState(['token'])
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>