<template>
  <div class="detial">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComp/DetailNavBar'
  import DetailSwiper from './childComp/DetailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'

  import {getDetail, Goods} from 'network/detail'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
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
      })
    },
  }
</script>

<style>

</style>