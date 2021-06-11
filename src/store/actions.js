import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types.js'

export default {
  addCart(context, payload) {
    console.log(payload);
    //设置一个Promise对象，在点击加入购物车resolve相关信息（actions返回的为Promise对象）
    return new Promise((resolve, reject) => {
      //判断新加入的payload的iid是否存在于cartList中
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