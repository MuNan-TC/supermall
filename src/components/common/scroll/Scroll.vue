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
      this.scroll = new BScroll(this.$refs.wrapper, {

      })
    }
  }
</script>

<style scoped>

</style>