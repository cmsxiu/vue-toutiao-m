<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell class="edit-nav">
      <div
        slot="title"
        class="title"
      >我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="editState = !editState"
      >{{ editState ? "完成" : "编辑" }}</van-button>
    </van-cell>
    <!-- 我的频道 end -->

    <!-- 已有频道 -->
    <van-grid
      :border="false"
      :gutter="10"
      clickable
      class="white-space-nowrap"
    >
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="index"
        @click="removeChannel(item.id, index)"
      >
        <span
          slot="text"
          class="text"
          :class="{tabActive: index === tabActive}"
        >{{item.name}}</span>
        <van-icon
          slot="icon"
          name="clear"
          class="clearIcon"
          v-show="editState && !fiexChannel.includes(item.id)"
        ></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 已有频道 end -->

    <!-- 频道推荐 -->
    <van-cell class="edit-nav">
      <div
        slot="title"
        class="title"
      >频道推荐</div>
    </van-cell>
    <!-- 频道推荐 end -->

    <!-- 推荐频道选择 -->
    <van-grid
      class="white-space-nowrap"
      :border="false"
      :gutter="10"
      clickable
    >
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in recommendChannel"
        :key="index"
        @click="addChannel(item)"
      >
        <span
          slot="text"
          class="text"
        >{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道选择 end -->
  </div>
</template>

<script>
import { getAllChannelList, addUserChannel, removeUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/setStorage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannelList: [], // 全部频道列表
      editState: false, // 编辑显示
      fiexChannel: [0, 3] // 固定频道，不允许被删除
    }
  },
  props: {
    // 频道列表
    myChannels: {
      type: Array, // 类型是对象
      required: true // 必须要传这个，否则直接报错
    },
    // 频道列表
    tabActive: {
      type: Number, // 类型是数值
      required: true // 必须要传这个，否则直接报错
    }
  },
  computed: {
    ...mapState(['token']),
    recommendChannel () {
      // 频道推荐数据，全部频道数据去除我的频道数据
      return this.allChannelList.filter(item => !this.myChannels.some(list => item.id === list.id))
    }
  },
  created () {
    this.loadAllChannelList()
  },
  methods: {
    // 添加频道
    async addChannel (channel) {
      this.myChannels.push(channel)
      if (this.token) {
        // 如果已登录，存到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          this.$toast.fail('保存失败，请稍后再试', error)
        }
      } else {
        // 如果未登录，存到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 删除频道
    async removeChannel (uid, i) {
      // 如果你要删除的用户频道索引和当前的索引一样
      if (this.editState) {
        // 如果是固定频道，返回
        if (this.fiexChannel.includes(uid)) return false
        // 删除
        this.myChannels.splice(i, 1)
        if (this.token) {
          // 如果已登录，存到线上
          try {
            await removeUserChannel(uid)
          } catch (error) {
            this.$toast.fail('保存失败，请稍后再试', error)
          }
        } else {
          // 如果未登录，存到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }

        // 如果删除的索引小于当前的 tabActive
        if (i <= this.tabActive) {
          this.$emit('updata-active', this.tabActive - 1, true)
        }
      } else {
        // 如果不是在编辑模式，就执行切换选择频道
        this.$emit('updata-active', i)
        this.editState = false
      }
    },
    // 获取全部的数据
    async loadAllChannelList () {
      try {
        const { data } = await getAllChannelList()
        this.allChannelList = data.data.channels
      } catch (error) {
        this.$toast.fail('请确认是否处于登录状态')
        this.$router.push('/my')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding: 86px 0;
  box-sizing: border-box;
  .edit-nav {
    .title {
      font-size: 32px;
      color: #333;
    }
    .edit-btn {
      width: 104px;
      height: 48px;
      color: #f85c5c;
    }
  }
  /deep/ .grid-item {
    position: relative;
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background: #f4f5f6;
      .text {
        font-size: 28px;
        color: #222;
      }
      .tabActive {
        color: #009def;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
        .clearIcon {
          position: absolute;
          top: -10px;
          right: 10px;
          font-size: 30px;
          color: #aaa;
        }
      }
    }
  }
  .recommendChannel {
    padding-bottom: 22px;
  }
  .white-space-nowrap {
    white-space: nowrap;
  }
}
</style>