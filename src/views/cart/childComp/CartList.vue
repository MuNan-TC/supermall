<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item v-for="(item, index) in cartList" 
                    :key="index" 
                    :product="item">
      </cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem'

  import Scroll from 'components/common/scroll/Scroll'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 49px - 44px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>