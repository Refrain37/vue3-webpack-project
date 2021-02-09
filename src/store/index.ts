import { createStore } from 'vuex'

export default createStore({
  state: {
    value:10
  },
  mutations: {
    INCREMENT(state) {
      state.value += 1
    }
  },
  actions: {
    increment ({commit}) {
      commit('INCREMENT')
    }
  },
  modules: {
  }
})
