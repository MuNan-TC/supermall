<template>
  <div>
    <nav-bar>
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item, index) in titles" 
             class="item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)"
             :key="index">
             {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 13px;
  }
  
  .item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .left img {
    margin-top: 11px;
  }
</style>