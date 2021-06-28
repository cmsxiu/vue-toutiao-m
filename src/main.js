import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 引入 vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 动态设置rem基准值
import 'amfe-flexible'

// 引入 axios
import '@/utils/request'

// 引入 icon
import '@/styles/global.less'

// 引入 dayjs
import '@/utils/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')