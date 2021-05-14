<template>
  <div id="detial">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content"
            :probe-type="3"
            ref="scroll"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods-info="goodsInfo"/>
      <detail-goods-params :goods-params="goodsParams" ref="goodsParams"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComp/DetailNavBar'
  import DetailSwiper from './childComp/DetailSwiper'
  import DetailBaseInfo from './childComp/DetailBaseInfo'
  import DetailShopInfo from './childComp/DetailShopInfo'
  import DetailGoodsInfo from './childComp/DetailGoodsInfo'
  import DetailGoodsParams from './childComp/DetailGoodsParams'
  import DetailCommentInfo from './childComp/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsInfo: {},
        goodsParams: {},
        commentInfo: {},
        recommends: [],
        SaveY: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      GoodsList,
      Scroll
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

        //4.获取商品详情信息
        this.goodsInfo = data.detailInfo

        //5.获取商品参数信息
        this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)

        //6.获取商品评论信息
        if(data.rate.crate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.获取推荐信息
      getRecommend(this.iid).then(res => {
        this.recommends = res.data.list
      })
    },
    methods: {
      contentScroll(position) {
        console.log(position);
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    z-index: 1;
  }

  #detail::after {
    content: "";
    height: 0;
    clear: both;
    display: block;
    overflow: hidden;
    visibility: hidden;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .detail-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* position: relative; */
    z-index: 9;
    background-color: #fff;
  }
</style>