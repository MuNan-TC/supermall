<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      /* 通过this.refs.refname拿到准确的对象
       * 创建BScroll对象
      */
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      /* console.log(this.scroll); */
      /* 监听滚动的位置 */
      this.scroll.on('scroll', (position) => {
        /* 将position发送出去 */
        this.$emit('scroll', position)
      })
      
      /* 上拉加载更多 */ 
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })          
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>