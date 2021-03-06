/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONbigint from 'json-bigint'

// 配置 axios 请求默认根路径
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 默认接口路径
    transformResponse: [function (data) {
        try {
            return JSONbigint.parse(data)
        } catch (error) {
            return data
        }
    }]
})
// 配置 axios 请求头
request.interceptors.request.use(config => {
    const { token } = store.state
    if (token && token.token) {
        config.headers.Authorization = `Bearer ${token.token}`
    }
    // 必须ruturn config
    return config
})

// 添加一个响应拦截器
// axios.interceptors.response.use(config => {
// Do something with response data
// return config
// })
// 全局使用 axios
// Vue.prototype.$http = axios
export default request