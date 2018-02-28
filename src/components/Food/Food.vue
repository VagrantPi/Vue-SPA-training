<template>
  <transition name="detail">
    <div class="food" v-show="showFalsg">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img :src="food.picture" class="food-img">
            <span class="close-bt icon-close" @click="closeView"></span>
            <img class="share-bt" src="./../../assets/resource/img/share.png">
            <img class="more-bt" src="./../../assets/resource/img/more.png">
          </div>
          <div class="content-wrapper">
            <h3 class="name">{{food.name}}</h3>
            <p class="saled">{{food.month_saled_content}}</p>
            <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture">
            <p class="price">
              <span class="text">{{food.min_price}}</span>
              <span class="unit">{{food.unit}}</span>
            </p>
            <div class="cartcontrol-wrapper">
              <Cartcontrol :food="food"></Cartcontrol>
            </div>
            <div class="buy" v-show="!food.count || food.count == 0" @click="addFirst">選規格</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol';
import Vue from 'vue';
export default {
  data() {
    return {
      showFalsg: false
    }
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 父 component 可以呼叫子 component 的方法
    showView() {
      this.showFalsg = true;
    },
    closeView() {
      this.showFalsg = false;
    },
    addFirst() {
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    Cartcontrol,
  },
}
</script>

<style>
  @import url("./Food.css");
</style>
