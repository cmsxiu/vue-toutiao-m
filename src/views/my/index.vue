<template>
  <div class="my-container">
    <!-- 未登录 -->
    <template v-if="!token">
      <div class="header">
        <div class="not-login">
          <div
            class="login-btn"
            @click="$router.push('/login')"
          >
            <img src="~@/assets/mobile.png">
            <span class="text">登录 / 注册</span>
          </div>
        </div>
      </div>
    </template>
    <!-- 未登录 end -->

    <!-- 已登录 -->
    <template v-else>
      <div class="header">
        <div class="user-info">
          <div class="user-base">
            <div class="left">
              <van-image
                round
                class="headSculpture"
                fit="cover"
                :src="userInfo.photo"
              />
              <div class="text">{{userInfo.name}}</div>
            </div>
            <div class="right">
              <van-button
                type="primary"
                round
              >编辑资料</van-button>
            </div>
          </div>
          <div class="data-stats">
            <div class="data-item">
              <span class="number">
                {{ userInfo.art_count ? userInfo.art_count : 8888 }}
              </span>
              <span class="text">头条</span>
            </div>
            <div class="data-item">
              <span class="number">
                {{ userInfo.follow_count ? userInfo.follow_count : 8888 }}
              </span>
              <span class="text">关注</span>
            </div>
            <div class="data-item">
              <span class="number">
                {{ userInfo.fans_count ? userInfo.fans_count : 8888 }}
              </span>
              <span class="text">粉丝</span>
            </div>
            <div class="data-item">
              <span class="number">
                {{ userInfo.like_count ? userInfo.like_count : 8888 }}
              </span>
              <span class="text">获赞</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 已登录 end -->

    <!-- 收藏/历史 -->
    <van-grid
      :column-num="2"
      class="nav-grid"
      clickable
    >
      <van-grid-item text="收藏">
        <i
          slot="icon"
          class="toutiao toutiao-shoucang"
        ></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i
          slot="icon"
          class="toutiao toutiao-lishi"
        ></i>
      </van-grid-item>
    </van-grid>
    <!-- 收藏/历史 end -->

    <!-- 消息通知/小智同学 -->
    <div class="nav-cell">
      <van-cell
        title="消息通知"
        is-link
      />
      <van-cell
        title="小智同学"
        is-link
      />
    </div>
    <!-- 消息通知/小智同学 end -->

    <!-- 退出登录 -->
    <van-button
      type="default"
      block
      @click="logOut"
      v-if="token"
    >退出登录</van-button>
    <!-- 退出登录 end -->
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.token) {
      this.loadUserInfo()
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    // 退出登录
    logOut () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认要退出登录吗？'
      })
        .then(() => {
          // 清除 vuex 和 localStorage 中的 token
          this.setToken(null)
          this.$notify({ type: 'warning', message: '退出成功，请重新登录' })
        })
        .catch(() => {
          this.$toast('取消了退出登录')
        })
    },
    // 加载用户信息
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        this.userInfo = res.data
      } catch (err) {
        return this.$toast('获取个人信息失败，请稍后操作')
      }
    }
  },
  computed: {
    ...mapState(['token'])
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .van-button {
    border: 0;
  }
  .header {
    width: 100%;
    height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .login-btn {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img {
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
        }
        span.text {
          font-size: 28px;
          color: #fff;
        }
      }
    }

    .user-info {
      .user-base {
        display: flex;
        justify-content: space-between;
        height: 231px;
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 72px 32px 23px;
          box-sizing: border-box;
          .headSculpture {
            width: 132px;
            height: 132px;
            border: 2px solid #fff;
            border-radius: 50%;
            box-sizing: border-box;
          }
          .text {
            margin-left: 22px;
            font-size: 30px;
            line-height: 10px;
            color: #fff;
          }
        }
        .right {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 72px 32px 23px;
          box-sizing: border-box;
          .van-button {
            width: 115.22px;
            height: 32.06px;
            padding: 0;
            background: #fff;
            color: #666666;
            font-size: 20px;
          }
        }
      }
      .data-stats {
        display: flex;
        .data-item {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          .number {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
        }
      }
    }
  }
  .nav-grid {
    .van-grid-item {
      // font-size: 38px;
      height: 141px;
      .toutiao {
        margin-top: 15px;
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
    }
  }
  .nav-cell {
    margin: 9px 0;
  }
}
</style>