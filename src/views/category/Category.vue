<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" 
                @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>
  
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'

  import TabMenu from './childComp/TabMenu.vue'
  import TabContentCategory from './childComp/TabContentCategory.vue'
  import TabContentDetail from './childComp/TabContentDetail.vue'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/categroy'
  import {tabControlMixin} from 'common/mixin'
  import {POP, NEW, SELL} from 'common/const'

  export default {
    name: 'Category',
    components: {
      NavBar,
      Scroll,
      TabControl,
      TabMenu,
      TabContentCategory,
      TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: POP
      }
    },
    created() {
      // 请求分类数据
      this._getCategory()
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          console.log(res);
          // 1.获取分类数据
          this.categories = res.data.category.list
          // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey
        getSubcategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(NEW)
          this._getCategoryDetail(SELL)
        })
      },
      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey和type
        const miniWallkey = this.categories[this.currentIndex].miniWallkey
        // 2.发送请求并传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.保存请求的数据
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this._getSubcategories(index)
      }
    }
  }
</script>

<style scoped>
  #categroy {
    height: 100vh;
    overflow: hidden;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>