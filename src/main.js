import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//创建时间总线对象
Vue.prototype.$bus = new Vue()
//注册toast插件
Vue.use(toast)

//使用图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
