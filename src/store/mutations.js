import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types.js'

/* const mutations = {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
} */
const mutations = {
  addCart(state, payload) {
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      payload.check = true
      state.cartList.push(payload)
    }

  }
}

export default mutations