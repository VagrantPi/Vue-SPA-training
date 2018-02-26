<template>
  <div class="shopcart" :class="{ 'heighlight': totalCount>0 }">
    <div class="content-left">
      <div class="logo-wrapper" :class="{ 'heighlight': totalCount>0 }">
        <span class="icon-shopping_cart logo" :class="{ 'heighlight': totalCount>0 }"></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <div class="total-price" v-show="totalPrice">$ {{totalPrice}}</div>
        <p class="tip" :class="{ 'heighlight': totalCount>0 }">另需 {{shipping_fee_tip}}</p>
      </div>
    </div>

    <div class="content-right" :class="{ 'heighlight': totalCount>0 }">
      {{payStr}}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min_price_tip: {
      type: String,
      default: ''
    },
    shipping_fee_tip: {
      type: String,
      default: ''
    },
    SelectFoods: {
      type: Array,
      default() {
        return [
          // { // mock data
          //   min_price: 10,
          //   count: 3
          // },
          // {
          //   min_price: 15,
          //   count: 7
          // },
          // {
          //   min_price: 9,
          //   count: 2
          // },
          // {
          //   min_price: 6,
          //   count: 1
          // }
        ];
      }
    }
  },
  computed: {
    totalCount() {
      let num = 0;
      this.SelectFoods.forEach((food) => {
        num += food.count
      });
      return num;
    },
    totalPrice() {
      let total = 0;
      this.SelectFoods.forEach((food) => {
        total += food.min_price * food.count;
      });
      return total;
    },
    payStr() {
      if(this.totalCount > 0) {
        return "結帳";
      } else {
        return this.min_price_tip;
      }
    }
  }
}
</script>
<style>
@import url('./Shopcart.css');
</style>

