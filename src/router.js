import Vue from 'vue'
import Router from 'vue-router'
import { getStorage } from '@/util'

Vue.use(Router)

const dappRoutes = {
  name: 'dapp',
  path: '/dapp',
  redirect: '/dapp/list',
  component: resolve => require(['@/views/dapp/Index'], resolve),
  meta: { title: 'Dapp管理' },
  children: [
    {
      name: 'dappCheck',
      path: '/dapp/check',
      component: resolve => require(['@/views/dapp/Check'], resolve),
      meta: { title: 'Dapp审核' }
    },
    {
      name: 'dappList',
      path: '/dapp/list',
      component: resolve => require(['@/views/dapp/List'], resolve),
      meta: { title: 'Dapp列表' }
    },
    {
      name: 'dappType',
      path: '/dapp/type',
      component: resolve => require(['@/views/dapp/Type'], resolve),
      meta: { title: 'Dapp类型管理' }
    }
  ]
}

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

const activityRoutes = {
  name: 'activity',
  path: '/activity',
  redirect: '/activity/list',
  component: resolve => require(['@/views/activity/Index'], resolve),
  meta: { title: '活动管理' },
  children: [
    {
      name: 'activityList',
      path: '/activity/list',
      component: resolve => require(['@/views/activity/List'], resolve),
      meta: { title: 'banner列表' }
    },
    {
      name: 'activityAdd',
      path: '/activity/add',
      component: resolve => require(['@/views/activity/Add'], resolve),
      meta: { title: '添加新banner' }
    }
  ]
}

// 权限设置 => 目前默认为版本管理
const redirect = '/user/list'
const children = [
  dappRoutes,
  userRoutes,
  activityRoutes
]

const homeRoutes = [
  {
    name: 'home',
    path: '/',
    redirect: redirect,
    component: resolve => require(['@/views/Home'], resolve),
    beforeEnter: (to, from, next) => {
      let userInfo = getStorage('userInfo')
      if (userInfo) {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    children: children
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

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...homeRoutes,
    ...loginRoutes
  ]
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
