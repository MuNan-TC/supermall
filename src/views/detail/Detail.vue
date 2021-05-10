<template>
  <div class="detial">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComp/DetailNavBar'
  import DetailSwiper from './childComp/DetailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'
  import DetailShopInfo from './childComp/DetailShopInfo'

 /*  import Scroll from 'components/common/scroll/Scroll' */

  import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
    },
    created() {
      //1.保存传入的商品id
      this.iid = this.$route.params.iid

      //2.根据id获取相应商品信息
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //1.获取商品轮播的图片
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
      })
    },
  }
</script>

<style>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

 /*  .content {
    position: relative;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  } */
</style>