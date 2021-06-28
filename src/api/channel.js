/**
 * 频道请求模块
 */
// 引入 request
import request from '@/utils/request'

/**
 * 获取全部频道列表
 */
export const getAllChannelList = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/channels'
    })
}

/**
 * 添加频道列表
 */
export const addUserChannel = channels => {
    return request({
        method: 'PATCH',
        url: 'app/v1_0/user/channels',
        data: {
            channels: [channels]
        }
    })
}

/**
 * 删除频道列表
 */
export const removeUserChannel = target => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/user/channels/${target}`
    })
}