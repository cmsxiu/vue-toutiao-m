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
        url: 'authorizations',
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
        url: `sms/codes/${mobile}`
    })
}