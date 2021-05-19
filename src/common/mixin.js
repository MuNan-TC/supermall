import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    this.itemImageListener = () => {
      this.$refs.scroll.refresh()
    }
    this.$bus.$on('itemImagLoad', this.itemImageListener)
    // console.log('我是混入的内容');
  }
}

/* 当在多处需要使用相同的代码，此时可以用一个混入将重复代码统一
  与继承的区别：继承是在类当中的，而混入是作用在对象中
 */

export const BackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}