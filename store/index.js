import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    username: '登录/注册'
  },
  mutations: {
    setUsenamer(state, val) {
      state.username = val
    }
  },
  actions : {
    async nuxtServerInit({
        commit
      }, {req, app}) {
        const {status:status2,data:{user}}=await app.$axios.get('/bloguser/getUser')
        commit('setUsenamer',status2===200?decodeURIComponent(user):'登录/注册')
    }
  }
})

export default store