<template>
  <div class="cartcontrol">
    <!-- click 不知為啥會 call 兩次 -->
    <!-- <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click="decreaseCart"></div>
    </transition> -->

    <transition name="move">
      <!-- 防止事件冒泡所以使用 click.stop.prevent -->
      <input type="button" value="一"  v-show="food.count" class="cart-decrease2" @click.stop.prevent="decreaseCart">
    </transition>
    <div class="cart-count" v-show="food.count">{{ food.count }}</div>
    <input type="button" value="+" class="cart-add2" @click.stop.prevent="addCart">

    <!-- <div class="cart-add icon-add_circle" @click="addCart">
      <i class="bg"></i>
    </div> -->

  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object,
    }
  },
  methods: {
    decreaseCart() {
      this.food.count--;
    },
    addCart() {
      if(!this.food.count) {
        // 原本的 food 內是沒有 count 的，所以即使添加進去，也不會有監聽，因此需要使用 Vue.set
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count+=1;
      }
    }
  }
}
</script>

<style>
@import url('./Cartcontrol.css');
</style>
