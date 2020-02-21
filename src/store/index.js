import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
        phone: "",
        password: "",
        localPort: "1333",
        remoteIP: "149.28.150.201",
        remotePort: "1333",
    },
    startSwitch: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
