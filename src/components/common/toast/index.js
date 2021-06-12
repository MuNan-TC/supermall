import Toast from './Toast'

const obj = {}

//将toast插件放入main中，在程序开始之前就加在插件，执行install函数(传回的是Vue对象)
obj.install = function(Vue) {
  /**
   * 由于Toast含有template模块，需要加载时间，所以需要先构建好DOM元素
   * 之后将Toast所创建的元素加载到vue原型中
   */

  // 1.创建组件构造器
  const toastConstrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器创建一个组件对象
  const toast = new toastConstrustor()

  //3.手动将创建出来的组件对象挂在到某个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是上面创建的div
  document.body.appendChild(toast.$el)

  // 5.将挂在的toast放入原型
  Vue.prototype.$toast = toast
}

export default obj