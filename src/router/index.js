import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackName: "login" */ '@/views/login')
  }, {
    path: '/',
    component: () => import(/* webpackName: "layout" */ '@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackName: "layout" */ '@/views/home')
      }, {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackName: "layout" */ '@/views/video')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import(/* webpackName: "layout" */ '@/views/qa')
      }, {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackName: "layout" */ '@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router