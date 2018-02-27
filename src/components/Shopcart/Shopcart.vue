<template>
  <div class="shopcart">
    <div class="shopcart-wrapper" :class="{ 'heighlight': totalCount>0 }">
      <div class="content-left">
        <div class="logo-wrapper" :class="{ 'heighlight': totalCount>0 }" @click="toggleList">
          <span class="icon-shopping_cart logo" :class="{ 'heighlight': totalCount>0 }"></span>
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <div class="total-price" v-show="totalPrice">$ {{totalPrice}}</div>
          <p class="tip" :class="{ 'heighlight': totalCount>0 }">另需 {{poiInfo.shipping_fee_tip}}</p>
        </div>
      </div>

      <div class="content-right" :class="{ 'heighlight': totalCount>0 }">
        {{payStr}}
      </div>

      <div class="shopcart-list" v-show="!fold" :class="{show: !fold}">
        <div class="list-top" v-if="poiInfo.discounts2">
          {{poiInfo.discounts2[0].info}}
        </div>
        <div class="list-header">
          <h3 class="title">購買清單</h3>
          <div class="empty" @click="clearShop">
            <img src="./../../assets/resource/img/ash_bin.png">
            <span>清空購物車</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in SelectFoods" :key="food.name">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="food.unit">{{food.unit}}</p>
                  <p class="description" v-show="food.description">{{food.description}}</p>
                </div>
                <div class="desc-right">
                  <span class="price">${{food.min_price}}</span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="food"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>

    </div>
    <div class="shopcart-mask" v-show="!fold" @click="toggleList"></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol';
export default {
  data() {
    return {
      fold: true,
      shopScroll: {}
    }
  },
  props: {
    poiInfo: {
      type: Object,
      default: {}
    },
    SelectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  beforeUpdate () {
    this.$nextTick(() => {
      if(this.totalCount) {
        // new BScroll('.list-content');
        if(this.shopScroll) {
          this.shopScroll = new BScroll('.list-content');
        } else {
          this.shopScroll.refresh();
        }
      }
    })
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
        return "結帳去";
      } else {
        this.fold = true;
        return this.poiInfo.min_price_tip;
      }
    },
  },
  methods: {
    toggleList() {
      if(!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    clearShop() {
      this.SelectFoods.forEach((food) => {
        food.count = 0;
      })
      this.fold = true;
    }
  },
  components: {
    Cartcontrol,
    BScroll
  }
}
</script>
<style>
@import url('./Shopcart.css');
</style>

