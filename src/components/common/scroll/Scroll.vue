<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import PullUp from '@better-scroll/pull-up'
  BScroll.use(PullUp)

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

      console.log(this.scroll);
      /* console.log(this.scroll); */
      /* 监听滚动的位置 */
      if(this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
          /* 将position发送出去 */
          this.$emit('scroll', position)
        })
      }
      
      /* 上拉加载更多 */ 
      if(this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        }) 
      }         
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getSaveY() {
        return this.scroll.y ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>