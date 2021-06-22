<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    />
    <!-- 导航栏 end -->

    <!-- 登录表单 -->
    <van-form
      @submit="onSubmit"
      ref="loginForm"
    >
      <van-field
        v-model="loginForm.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="loginRules.mobile"
        maxlength="11"
        type="number"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-shouji"
        ></i>
      </van-field>
      <van-field
        v-model="loginForm.code"
        name="code"
        placeholder="请输入验证码"
        :rules="loginRules.code"
        class="login-verification-code"
        maxlength="6"
        type="number"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma"
        ></i>
        <template
          #button
          class="abc"
        >
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="countDownShow"
            @finish="changeShow"
          />
          <van-button
            v-else
            type="default"
            size="small"
            round
            class="verification-code"
            native-type="button"
            @click="onSendSms"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          block
          type="info"
          native-type="submit"
          class="sign-in-btn"
        >登录</van-button>
      </div>
    </van-form>
    <!-- 登录表单 end -->
    <a
      href="#"
      class="privacy-clause"
    >隐私条款</a>
  </div>
</template>
<script>
// 引入登录模块的 api
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      loginRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      countDownShow: false
    }
  },
  methods: {
    // 获取验证码
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return this.$toast.fail(err.message)
      }
      // 显示倒计时
      this.countDownShow = true

      // 接收手机号验证码
      try {
        await sendSms(this.loginForm.mobile)
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast.fail('发送太频繁了，请稍后再试')
        } else {
          this.countDownShow = false
          return this.$toast.fail('未知错误，请联系管理员')
        }
      }
    },
    // 登录
    async onSubmit () {
      // 在组件中必须通过 this.$toast 来调用Toast组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续时间，默认是2000，如果为0，则默认不关闭
      })
      try {
        const { data: res } = await login(this.loginForm)
        this.$toast.success('登录成功')
        console.log(res)

        // 存储 token 到 vuex
        this.$store.commit('setToken', res.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('请检查手机号或验证码')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 配置 token
      // window.sessionStorage.setItem('token', res.data.data.token)
    },
    // 倒计时结束时触发
    changeShow () {
      this.countDownShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .sign-in-btn {
    background: #6db4fb;
    border: 0;
    border-radius: 12px;
  }
  .toutiao {
    font-size: 37px;
  }
  .verification-code {
    width: 100%;
    height: 46px;
    background: #ededed;
    font-size: 20px;
    color: #666;
    line-height: 46px;
  }
  .van-count-down {
    width: 100%;
    height: 46px;
    line-height: 46px;
    padding: 5.5px;
  }
  .privacy-clause {
    display: block;
    width: 115px;
    height: 27.82px;
    margin: 20px auto;
    color: #666;
    font-size: 25px;
  }
}
</style>