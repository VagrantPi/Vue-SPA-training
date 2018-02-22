// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Axios from 'Axios';

// 1. 導入 component
import Goods from './components/Goods/Goods.vue'
import Ratings from './components/Ratings/Ratings.vue'
import Seller from './components/Seller/Seller.vue'

Vue.config.productionTip = false

// 安裝 vue-router
Vue.use(VueRouter)

// 如果在其他 component 中使用 axios，需要該寫為 Vue 原型屬性
Vue.prototype.$axios = Axios;

// 2. 定義路由
const routes = [
  {
    path: '/',
    // 重定向
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  },
]

// 3. 建立 router 實例
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 4. 建立並掛載實例
  router
})
