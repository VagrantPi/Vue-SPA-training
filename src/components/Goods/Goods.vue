<template>
  <div class="goods-wrapper">

    <!-- 分類 -->
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item">
          <p class="text">
            <img :src="container.tag_icon" class="icon" v-if="container.tag_icon">
            {{ container.tag_name }}
          </p>
        </li>
        <li class="menu-item" v-for="item in goods" :key="item.name">
          <p class="text">
            <img :src="item.icon" class="icon" v-if="item.icon">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper">

    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      container: {},
      goods: {}
    }
  },
  created() {
    let that = this;
    this.$axios.get('/api/goods').then(function(res) {
      let dataSource = res.data;
      if(dataSource.code == 0) {
        that.container = dataSource.data.container_operation_source;
        that.goods = dataSource.data.food_spu_tags;
      }
    }).catch(function(err) {
      console.log(err);
    });
  }
};
</script>

<style>
@import url('./Goods.css');
</style>

