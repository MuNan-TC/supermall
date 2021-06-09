<template>
  <div class="cart">
    <nav-bar class="nav-bar">
    <div slot="center">购物车({{Length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComp/CartList'
  import CartBottomBar from './childComp/CartBottomBar.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        Length: 'cartListLength'
      })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>