<template>
  <div ref="wrapper">
    <slot></slot>
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
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scroll: {} 
      }
    },
    mounted() {
      setTimeout(this.initScroll, 20)   
    },
    methods: {
      initScroll() {
        /* 通过this.refs.refname拿到准确的对象
        * 创建BScroll对象
        */
        if(!this.$refs.wrapper) return
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
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      getSaveY() {
        return this.scroll.y ? this.scroll.y : 0
      }
    },
    watch: {
      data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>

</style>