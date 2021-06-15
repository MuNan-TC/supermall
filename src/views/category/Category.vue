<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"></tab-menu>
    </div>
  </div>
</template>
  
<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComp/TabMenu.vue'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/categroy'

  export default {
    name: 'Category',
    components: {
      NavBar,
      TabMenu
    },
    data() {
      return {
        categories: [],
        categoryData: {}
      }
    },
    created() {
      // 请求分类数据
      this._getCategory()
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
          // this._getSubcategories(0)
        })
      },
      /* _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey
        getSubcategory(mailKey).then(res => {
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
      } */
    }
  }
</script>

<style scoped>
  /* #categroy {

  } */
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
</style>