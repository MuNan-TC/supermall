<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']"
                 class="tab-control"
                 @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
      <li>hfha</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComp/HomeSwiper'
  import RecommendView from './childComp/RecommendView'
  import FeatureView from './childComp/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': {page: 0, list: [] }
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求首页数据
      this.getHomeMultidata()

      //2.请求首页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 网络请求
       * 1.请求多个数据
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },

      //2.请求首页商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },

      /**
       * 事件监听相关的方法
       */

      /* 1.tab-control的监听：获取用户选择哪一类商品，根据选择加载相应的内容 */
      tabClick(index) {
        /* console.log(index); */
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      }
    }
  }
</script>

<style scoped>
  #home {
    /* height: 100vh;
    position: relative; */
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>