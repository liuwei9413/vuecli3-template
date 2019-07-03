import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { getStorage } from '@/util'

Vue.use(Router)

const userRoutes = {
  name: 'user',
  path: '/user',
  redirect: '/user/list',
  component: resolve => require(['@/views/user/Index'], resolve),
  meta: { title: '用户管理' },
  children: [
    {
      name: 'userList',
      path: '/user/list',
      component: resolve => require(['@/views/user/List'], resolve),
      meta: { title: '用户管理' }
    },
    {
      name: 'userManager',
      path: '/user/manager',
      component: resolve => require(['@/views/user/Manager'], resolve),
      meta: { title: '后台用户管理' }
    },
    {
      name: 'userAdd',
      path: '/user/manager/add',
      component: resolve => require(['@/views/user/Add'], resolve),
      meta: { title: '新增后台用户' },
      hidden: true
    },
    {
      name: 'userChangepass',
      path: '/user/manager/changepass',
      component: resolve => require(['@/views/user/ChangePass'], resolve),
      meta: { title: '修改密码' },
      hidden: true
    }
  ]
}

const homeRedirect = '/user/list'

const homeChildren = [
  userRoutes
]

const homeRoutes = [
  {
    name: 'home',
    path: '/',
    redirect: homeRedirect,
    component: resolve => require(['@/views/Home'], resolve),
    beforeEnter: (to, from, next) => {
      let userInfo = getStorage('userInfo')
      if (userInfo) {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    children: homeChildren
  }
]

const loginRoutes = [
  {
    name: 'login',
    path: '/login',
    component: resolve => require(['@/views/Login'], resolve),
    beforeEnter: (to, from, next) => {
      let userInfo = getStorage('userInfo')
      if (userInfo) {
        next({ path: '/' })
      } else {
        next()
      }
    },
    hidden: true
  }
]

console.log(store.getters.role)

// 是否已登录
// const hasToken = false

// Router.beforeEach(async(to, from, next) => {
//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//     } else {
//       if (store.getters.role === '') {
//         // determine whether the user has obtained his permission roles through getInfo
//         store.dispatch('getUserInfo').then(res => {
//           const role = res.data.role
//           console.log(role)
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     next('/login')
//   }
// })

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...homeRoutes,
    ...loginRoutes
  ]
})