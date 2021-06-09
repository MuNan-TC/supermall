<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            :probe-type="3"
            ref="scroll"
            @scroll="contentScroll">
      <div>
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :goods-info="goodsInfo"/>
        <detail-goods-params :goods-params="goodsParams" ref="params"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :goods="recommends" ref="recommend"/>
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native = "backTop" v-show="isShowBackTop"/>
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
  import DetailBottomBar from './childComp/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail'
/*   import {itemListenerMixin} from 'common/mixin' */
  import {debounce} from 'common/utils'
  import {BackTopMixin} from 'common/mixin'

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
        SaveY: [],
        getSaveY: null,
        currentIndex: 0
      }
    },
  /*   mixins: [itemListenerMixin], */
    mixins: [BackTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    created() {
      //1.保存传入的商品id
      this.iid = this.$route.params.iid

      //2.根据id获取相应商品信息
      getDetail(this.iid).then(res => {
        console.log(res);
        //保留结果
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
      getRecommend(this.iid).then((res, err) => {
        if(err) return
        this.recommends = res.data.list
      })

      //4.给getSaveY赋值
      this.getSaveY = debounce(() => {
        this.SaveY = []
        this.SaveY.push(0)
        this.SaveY.push(this.$refs.params.$el.offsetTop)
        this.SaveY.push(this.$refs.comment.$el.offsetTop)
        this.SaveY.push(this.$refs.recommend.$el.offsetTop)
        this.SaveY.push(Number.MAX_VALUE)
        // console.log(this.SaveY);
      }, 100)
    },
    mounted() {
      this.$bus.$on('itemImageLoad', () => {
        if(this.$refs.scroll != undefined) {
          this.$refs.scroll.refresh()
        }
        this.getSaveY()
      })
    },
    methods: {
      contentScroll(position) {
        //获取y值
        const y = -position.y
        //小技巧：为了改变判断最后一个数，直接在数组最后加入一个最大值以达到判断条件统一，从而简化代码
        for (let i = 0; i < this.SaveY.length - 1; i++) {
          if(this.currentIndex !== i && (y >= this.SaveY[i] && y < this.SaveY[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = -position.y > 1000
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.SaveY[index], 100)
        // console.log(index);
      },
      addCart() {
        // 1.保存购物车需要展示的商品信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice

        /* this.$store.commit('addCart', product).then(res => {
          console.log(res);
        }) */
        console.log(product);
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res);
        })
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', () => {
        this.$refs.scroll.refresh()
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
   /*  overflow: hidden; */
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