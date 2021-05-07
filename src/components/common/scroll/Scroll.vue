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
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      /* 通过this.refs.refname拿到准确的对象 */
      /**
       * 对使用DOM没有第一时间加载出来导致无法滚动
       * 故设置一个一秒延迟（目前没想到别的办法解决）
       */
        setTimeout(() => {
          if(!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper,{
              click: true
            })
          }
        }, 1000);      
    }
  }
</script>

<style scoped>

</style>