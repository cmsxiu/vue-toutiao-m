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

/**
 * 获取文章详情
 * @param params articleId 文章ID
 */
export const getArticlesMain = articleId => {
    return request({
        url: 'app/v1_0/articles/' + articleId,
        methods: 'GET'
    })
}

/**
 * 收藏
 */
export const addCollect = target => {
    return request({
        method: 'POST',
        url: 'app/v1_0/article/collections',
        data: {
            target
        }
    })
}

/**
 * 取消收藏
 */
export const delCollect = target => {
    return request({
        method: 'DELETE',
        url: 'app/v1_0/article/collections/' + target
    })
}

/**
 * 点赞
 */
export const addLike = target => {
    return request({
        method: 'POST',
        url: 'app/v1_0/article/likings',
        data: {
            target
        }
    })
}

/**
 * 取消点赞
 */
export const delLike = target => {
    return request({
        method: 'DELETE',
        url: 'app/v1_0/article/likings/' + target
    })
}