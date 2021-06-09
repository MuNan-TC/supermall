import vue from 'vue'
import vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

vue.use(vuex)

const state = {
  cartList: []
}

const store = new vuex.Store({
  state,
  mutations,
  getters
})

export default store