import vue from 'vue'
import vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

vue.use(vuex)

const state = {
  cartList: []
}

const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store