/**
 *  用户相关的请求模块
 */
import request from '@/utils/request'

/**
 * 登录页面 登录 请求模块
 * @param  data 接收手机号和验证码
 */
export const login = data => {
    return request({
        method: 'POST',
        url: 'app/v1_0/authorizations',
        data
    })
}
/**
 * 登录页面 获取验证码 请求模块
 * @param mobile 接收手机号
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        // url: 'sms/codes/' + mobile
        url: `app/v1_0/sms/codes/${mobile}`
    })
}

/**
 * 我的页面 获取用户个人信息
 * @param Headers 已经从请求拦截中添加了 Authorization (Content-Type 自动添加)
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user'
        // ,
        // Headers: {
        //     'Content-Type': 'null',
        //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU'
        // }
    })
}

/**
 * 首页页面 获取频道列表
 */
export const getUserChannelList = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user/channels'
    })
}