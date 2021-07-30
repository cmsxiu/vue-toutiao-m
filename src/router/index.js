import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  }, {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/home')
      }, {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/video')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/qa')
      }, {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "layout" */ '@/views/my')
      }
    ]
  }, {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search')
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: () => import(/* webpackChunkName: "article" */ '@/views/article'),
    props: true // 开启props传参，把路由的参数，映射到组件的props里
  }, {
    path: '/my/user-profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router