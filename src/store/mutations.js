import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'

const mutations = {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}

export default mutations