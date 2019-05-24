import Vue from 'vue'
import Vuex from 'vuex'
import language from './modules/language'
import user from './modules/user'

// import {
//   fetchAccountInfo,
// } from '@/service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    language,
    user
  }
})
