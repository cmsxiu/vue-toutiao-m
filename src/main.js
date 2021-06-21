import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入动态设置rem基准值
import 'amfe-flexible'

// 引入axios
import './utils/request.js'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')