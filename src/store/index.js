import Vue from 'vue'
import Vuex from 'vuex'
import loginInfo from './modules/login'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    loginInfo
  },
  strict: debug,
  middlewares: debug ? [] : []
})