import Vue from 'vue'
import Router from 'vue-router'
import { getStorage } from '@/util'

Vue.use(Router)

// const dappRoutes = {
//   name: 'dapp',
//   path: '/dapp',
//   redirect: '/dapp/list',
//   component: resolve => require(['@/views/dapp/Index'], resolve),
//   meta: { title: 'Blockchain Application管理' },
//   children: [
//     {
//       name: 'dappCheck',
//       path: '/dapp/check',
//       component: resolve => require(['@/views/dapp/Check'], resolve),
//       meta: { title: 'Blockchain Application审核' }
//     },
//     {
//       name: 'dappCheckDetail',
//       path: '/dapp/check/detail',
//       component: resolve => require(['@/views/dapp/CheckDetail'], resolve),
//       meta: { title: 'Blockchain Application审核详情' },
//       hidden: true      
//     },
//     {
//       name: 'dappCheckHistory',
//       path: '/dapp/check/history',
//       component: resolve => require(['@/views/dapp/CheckHistory'], resolve),
//       meta: { title: '历史审核记录' },
//       hidden: true
//     },
//     {
//       name: 'dappList',
//       path: '/dapp/list',
//       component: resolve => require(['@/views/dapp/List'], resolve),
//       meta: { title: 'Blockchain Application列表' }
//     },
//     {
//       name: 'dappDetail',
//       path: '/dapp/detail',
//       component: resolve => require(['@/views/dapp/Detail'], resolve),
//       meta: { title: 'Blockchain Application详情' },
//       hidden: true
//     },
//     {
//       name: 'dappType',
//       path: '/dapp/type',
//       component: resolve => require(['@/views/dapp/Type'], resolve),
//       meta: { title: 'Blockchain Application类型管理' }
//     },
//     {
//       name: 'addDappType',
//       path: '/dapp/type/add',
//       component: resolve => require(['@/views/dapp/AddType'], resolve),
//       meta: { title: '新增类型' },
//       hidden: true
//     },
//     {
//       name: 'editDappType',
//       path: '/dapp/type/edit',
//       component: resolve => require(['@/views/dapp/AddType'], resolve),
//       meta: { title: '编辑类型' },
//       hidden: true
//     },
//     {
//       name: 'recommendDapp',
//       path: '/dapp/recommend',
//       component: resolve => require(['@/views/dapp/Recommend'], resolve),
//       meta: { title: 'Blockchain Application推荐配置' },
//     }
//   ]
// }

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

// const activityRoutes = {
//   name: 'activity',
//   path: '/activity',
//   redirect: '/activity/list',
//   component: resolve => require(['@/views/activity/Index'], resolve),
//   meta: { title: '活动管理' },
//   children: [
//     {
//       name: 'activityList',
//       path: '/activity/list',
//       component: resolve => require(['@/views/activity/List'], resolve),
//       meta: { title: 'banner列表' }
//     },
//     {
//       name: 'activityAdd',
//       path: '/activity/add',
//       component: resolve => require(['@/views/activity/Add'], resolve),
//       meta: { title: '添加新banner' }
//     }
//   ]
// }

const homeRedirect = '/user/list'

const homeChildren = [
  // dappRoutes,
  userRoutes,
  // activityRoutes
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

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...homeRoutes,
    ...loginRoutes
  ]
})