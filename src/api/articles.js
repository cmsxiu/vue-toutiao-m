/**
 * 文章列表请求模块
 */
// 引入 request
import request from '@/utils/request'

/**
 * 获取文章列表
 * @param params page 非必填 页数，不传默认为1
 *               per_page 非必填 每页数量，不传每页数量由后端决定
 */
export const getArticles = params => {
    return request({
        url: 'app/v1_1/articles',
        methods: 'GET',
        params
    })
}