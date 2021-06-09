import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload) {
    console.log(payload);
    //判断新加入的payload的iid是否存在于cartList中
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNT, oldProduct)
        resolve('添加商品数量+1')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, oldProduct)
        resolve('添加新的商品')
      }
    })
  }
}