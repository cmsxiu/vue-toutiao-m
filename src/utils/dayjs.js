import Vue from 'vue'
import dayjs from 'dayjs'

// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 引入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs默认是英文，配置语言包
dayjs.locale('zh-cn') // 全局使用

dayjs.extend(relativeTime)

/**
 * 定义一个模板过滤器，仅供模板使用
 * @param val 时间值
 */
Vue.filter('relativeTime', val => {
    return dayjs().to(dayjs(val))
})