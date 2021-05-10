<template>
  <div class="params-info" v-if="Object.keys(goodsParams).length !== 0">
    <table v-for="(table, index) in goodsParams.sizes" :key="index">
      <tr v-for="(tr, index) in table" :key="index">
        <td v-for="(td, index) in tr" :key="index">{{td}}</td>
      </tr>
    </table>
    <table class="goods-parmas">
      <tr v-for="(info, index) in goodsParams.info" :key="index">
        <td class="item-params-key">{{info.key}}</td>
        <td class="params-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsParams',
    props: {
      goodsParams: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style>
  .params-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .params-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .params-info table tr {
    height: 42px;
  }

  .params-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .info-params-key {
    width: 95px;
  }

  .info-params {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .parmas-value {
    color: #eb4868;
  }

  .info-img img {
    width: 100%;
  }
</style>