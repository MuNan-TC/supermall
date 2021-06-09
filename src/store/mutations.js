const mutations = {
  addCart(state, payload) {
    //判断新加入的payload的iid是否存在于cartList中
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      oldProduct.count += 1
    } else {
      payload.count = 1
      payload.check = true
      state.cartList.push(payload)
    }
  }
}

export default mutations