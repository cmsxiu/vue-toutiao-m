/**
 * 搜索请求模块
 */
// 引入 request
import request from '@/utils/request'

/**
 * 获取搜索联想
 * @param params q 搜索内容
 */
export const getSuggestion = q => {
    return request({
        url: 'app/v1_0/suggestion',
        methods: 'GET',
        params: {
            q
        }
    })
}

/**
 * 获取搜索结果
 * @param params page 非必填 页数，不传默认为1
 *               per_page 非必填 每页数量，不传每页数量由后端决定
 *               q 必填 搜索关键词
 */
export const getResult = params => {
    return request({
        url: 'app/v1_0/search',
        methods: 'GET',
        params
    })
}

/**
 * 获取搜索历史
 * @param params page 非必填 页数，不传默认为1
 *               per_page 非必填 每页数量，不传每页数量由后端决定
 *               q 必填 搜索关键词
 */

export const getHistories = params => {
    return request({
        url: 'app/v1_0/histories',
        methods: 'GET',
        params
    })
}
/**
 * 删除搜索历史
 * @param params page 非必填 页数，不传默认为1
 *               per_page 非必填 每页数量，不传每页数量由后端决定
 *               q 必填 搜索关键词
 */
export const delHistories = params => {
    return request({
        url: 'app/v1_0/histories',
        methods: 'DELETE',
        params
    })
}