<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isFixedTabControl"/>
    <scroll class="content" 
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
      </div>
    </scroll>
    <!-- 监听组件的原生事件，需要加入.native -->
    <back-top @click.native = "backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComp/HomeSwiper'
  import RecommendView from './childComp/RecommendView'
  import FeatureView from './childComp/FeatureView'
  
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
/*   import {debounce} from 'common/utils' */
  import {itemListenerMixin} from 'common/mixin'


  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': {page: 0, list: [] }
        },
        currentType: 'pop',
        isShowBackTop: false,
        isFixedTabControl: false,
        tabControlOffsetTop: 0,
        saveY: 0
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
    mounted() {
      //3.监听图片加载完成执行refresh
      /* 为了防止在创建的时候未加载完成导致无法拿到refresh，所以最好放在mounted中 */
      this.$bus.$on('itemImageLoad', () => {
        this.$refs.scroll.refresh()
        /*debounce(this.$refs.scroll.refresh, 100)  */
      })
    },
    methods: {
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
        /* 保持当前点击和选择相同 */
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      /* 2.返回顶部 */
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      /*3.backtop的显与掩 */
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000

        /* tabcontrol是否有吸顶效果 
        *   这种之后在tabControl中动态绑定class绝对是否显掩时会造成tabcontrol看起来“消失”（其实是直接跑到界面外，看不出来）
        *   解决办法：在滚动界面外在加入一个tabcontrol组件，并在滚动到一定位置时显示出来，从而造成看起来固定的效果
        */
        this.isFixedTabControl = -position.y > this.tabControlOffsetTop
      },
      /* 4.请求加载更多 */
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      /* 获取tabcontrol的offsetTop
      *  获取组件的dom使用$el属性
      * 获取加载轮播图之后的tabcontrol的offsetTop 
      */
      swiperImageLoad() {
        this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
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

          this.$refs.scroll.finishPullUp()
        })
      }
    },
    
    /**
     * 保持home当前状态：
     * 1.设置keep-alive使得离开home时路由不会被销毁
     * 2.记录离开时的位置信息，返回时使用
     */
    /* 返回home时触发 */
      activated() {
        console.log(this.saveY);
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      },
      /* 离开home时触发 */
      deactivated() {
        this.saveY = this.$refs.scroll.getSaveY()
        console.log(this.saveY);

        //q取消全局事件的监听
        this.$bus.$off('itemImageLoad', () => {
          this.$refs.scroll.refresh()
        })
      },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
    /* padding-top: 44px; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*对于元素滚动，防止跟随界面滚动设置，在引用better-scroll之后就不需要了 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }


  /* 设置相对定位之后，通过v-show绝对是否显示 */
  .tab-control {
    position: relative;
    background-color: var(--color-background);
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>