<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <!-- 判断goods对象是否为空，为空就不展示下面东西 -->
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discountDesc">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span class="info-other-center">{{goods.columns[1]}}</span>
      <span class="info-other-right">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item">
        <img :src="goods.services[0].icon" alt="">
        <span>{{goods.services[0].name}}</span>
        <img :src="goods.services[1].icon" alt="">
        <span>{{goods.services[1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style>
  .info-title {
    margin: 10px 0;
    padding: 0 4px;
    font-size: 14px;
    line-height: 20px;
  }

  .info-price {
    display: flex;
    padding: 0 4px 10px;
  }

  .info-price .n-price {
    color: var(--color-high-text);
  }

  .info-price .o-price {
    color: #999;
    font-size: 12px;
    margin: 0 4px;
    text-decoration: line-through;
  }

  .info-price .discount {
    color: #fff;
    font-size: 12px;
    border-radius: 100px;
    padding: 2px 6px;
    background-color: var(--color-high-text);
  }

  .info-other {
    display: flex;
    color: #999;
    font-size: 12px;
    padding: 10px 4px;
    border-bottom: 1px solid #ededed;
    border-top: 1px solid #ededed;
  }

  .info-other span {
    flex: 1;
  }

  .info-other .info-other-center {
    margin-left: 50px;
  }

  .info-other .info-other-right {
    margin-left: 40px;
  }

  .info-services {
    font-size: 12px;
    color: #333;
    padding: 10px 4px;
    justify-content: space-between;
    border-bottom: 4px solid #ededed;
  }

  .info-services img {
    width: 12px;
    height: 12px;
    vertical-align: middle;
  }
</style>