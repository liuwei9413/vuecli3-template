import Vue from 'vue'
import Vuex from 'vuex'
// import {
//   fetchAccountInfo,
// } from '@/service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountInfo: {
      a: 2
    },
    obj: {
      message: 'hello world',
      message2: 'abc'
    }
  },
  getters: {
    doubleAccount: state => {
      return state.accountInfo.a * 2
    }
  },
  mutations: {
    accountInfo (state, data) {
      state.accountInfo = data.data
    },
    updateMessage (state, message) {
      state.obj.message = message
    },
    updateMessage2 (state, message) {
      state.obj.message2 = message
    }
  },
  actions: {
    accountInfoAction ( { commit }, preload ) {
      // return fetchAccountInfo().then(() => {
      //   commit('accountInfo', { data: { a: 1 } })            
      // })
      console.log(`preload: ${JSON.stringify(preload)}`)

      return new Promise((resolve) => {
        setTimeout(() => {
          commit('accountInfo', { data: { a: 1 } })
          resolve()
        }, 3000)
      })
    },
    // async actionA ({ commit }) {
    //   commit('gotData', await getData())
    // },
    // async actionB ({ dispatch, commit }) {
    //   await dispatch('actionA')
    //   commit('gotOtherData', await getOtherData())
    // }
  }
})
