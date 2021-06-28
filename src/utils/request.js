/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
// 导入 NProgress 包对对应的 js 和 css 用作美化
// import NProgress from 'nprogress'

// 配置 axios 请求默认根路径
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/' // 默认接口路径
})
// 配置 axios 请求头
request.interceptors.request.use(config => {
    const { token } = store.state
    // 在 request 拦截器中，展示进度条 NProgress.start()
    // NProgress.start()
    if (token && token.token) {
        config.headers.Authorization = `Bearer ${token.token}`
    }
    // 必须ruturn config
    return config
})

// 添加一个响应拦截器
// axios.interceptors.response.use(config => {
// 在 response 拦截器中，隐藏进度条 NProgress.done()
// NProgress.done()
// Do something with response data
// return config
// })
// 全局使用 axios
// Vue.prototype.$http = axios
export default request