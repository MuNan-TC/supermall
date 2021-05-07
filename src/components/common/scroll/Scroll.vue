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
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      /**
       * 对使用DOM没有第一时间加载出来导致无法滚动
       * 故设置一个一秒延迟（目前没想到别的办法解决）
       */
      /* 通过this.refs.refname拿到准确的对象
       * 创建BScroll对象
      */
        setTimeout(() => {
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper,{
              click: true,
              probeType: this.probeType
            }),
            /* 监听滚动的位置 */
            this.scroll.on('scroll', (position) => {
              /* 将position发送出去 */
              this.$emit('scroll', position)
            })
          }
        }, 1000);

      
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>