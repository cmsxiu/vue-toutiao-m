import Vue from 'vue'
import Vuex from 'vuex'
// 引入 设置 本地存储的方法
import { setItem, getItem } from '@/utils/setStorage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_TOKEN'

export default new Vuex.Store({
  state: {
    // 留作存储 token 值
    token: getItem(TOKEN_KEY)
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      // 防止刷新丢失，把数据备份到本地存储
      setItem(TOKEN_KEY, state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})