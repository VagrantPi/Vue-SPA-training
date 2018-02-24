<template>
  <div id="app">

    <Myheader :poiInfo='poiInfo'></Myheader>

    <Mynav></Mynav>

    <router-view></router-view>

  </div>
</template>

<script>
import Myheader from './components/Header/Header'
import Mynav from './components/Nav/Nav'
import { log } from 'util';

export default {
  name: 'App',
  components: {
    Myheader,
    Mynav,
  },
  data() {
    return {
      // header 所需要的資料
      poiInfo: {},
    }
  },
  // 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，
  // 对属性和方法进行运算。这意味着 你不能使用箭头函数来定义一个生命周期方法
  // (例如 created: () => this.fetchTodos())。
  // 这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同，
  // this.fetchTodos 的行为未定义。
  created() { // Ajax
    let that = this; // 指向 App.vue 的實例
    this.$axios.get('/api/goods').then(function(res) {  // 這個 this 指向 Vue 的實例
      let dataSource = res.data;
      if(dataSource.code == 0) {
        that.poiInfo = dataSource.data.poi_info;
      }
    }).catch(function(err) {
      console.log(err);
    });
  }
};
</script>

<style>
</style>
