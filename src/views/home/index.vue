<template>
  <div class="home-container">
    <!-- 搜索导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      fixed
    >
      <van-button
        icon="search"
        type="default"
        size="small"
        class="search-btn"
        slot="title"
        round
      >搜索</van-button>
    </van-nav-bar>
    <!-- 搜索导航栏 end -->

    <!-- tab 导航栏 -->
    <van-tabs
      class="home-tabs"
      v-model="tabActive"
      swipeable
      animated
    >
      <van-tab
        :title="item.name"
        v-for="item in channelList"
        :key="item.id"
      >
        <article-list :channelList="item"></article-list>
      </van-tab>
      <!-- 占位符 -->
      <div
        slot="nav-right"
        class="placeholder"
      />
      <div
        slot="nav-right"
        class="nav-right"
        @click="showPopup"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- tab 导航栏 end -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      class="channel-edit"
      v-model="channelEditShow"
      position="bottom"
      round
      closeable
      close-icon-position="top-left"
    >
      <!-- 频道编辑内容 -->
      <channel-edit
        :myChannels="channelList"
        :tabActive="tabActive"
        @updata-active="updataActive"
      ></channel-edit>
    </van-popup>
    <!-- 频道编辑弹出层 end -->
  </div>
</template>

<script>
import { getUserChannelList } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'
import { getItem } from '@/utils/setStorage'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  data () {
    return {
      tabActive: 0,
      channelList: [], // 频道列表
      channelEditShow: false // 编辑窗口
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadAllChannelList()
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    // 展示频道编辑窗口
    showPopup () {
      this.channelEditShow = true
    },
    // 更新频道窗口的选中
    updataActive (i, isShow = false) {
      // 子组件传来点击的值，然后切换到当前显示的值
      this.tabActive = i
      // 关闭频道编辑窗口
      this.channelEditShow = isShow
    },
    // 获取全部的数据
    async loadAllChannelList () {
      try {
        let channels = []
        if (this.token) {
          // 已经登录，获取用户频道列表
          const { data } = await getUserChannelList()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 如果有，直接使用
          if (localChannels) {
            channels = localChannels
          } else {
            // 如果没有，使用默认
            const { data } = await getUserChannelList()
            channels = data.data.channels
          }
        }
        this.channelList = channels
      } catch (error) {
        this.$toast.fail('获取频道数据失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    border: 0;
    background: #5babfb;
    color: #fff;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .home-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }

    // 未选中状态
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      box-sizing: border-box;
      font-size: 28px;
      color: #777;
      &:nth-last-child(4) {
        border-right: 0 !important;
        padding-right: 33px;
      }
    }

    // 选中状态
    .van-tab--active {
      color: #333333;
      font-weight: 700;
      font-size: 30px;
    }

    // 父级padding
    .van-tabs__nav {
      padding-bottom: 0;
    }

    // 下滑跟随线
    .van-tabs__line {
      width: 31px;
      height: 6px;
      bottom: 8px;
      background: #3296fa;
    }

    // 占位符
    .placeholder {
      // 新知识，不参与 flex 平分
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    // 更多
    .nav-right {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i {
        font-size: 32px;
        color: #333333;
      }
      &::before {
        position: absolute;
        left: 1px;
        content: '';
        width: 1px;
        height: 60px;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
  .channel-edit {
    height: 100%;
  }
}
</style>