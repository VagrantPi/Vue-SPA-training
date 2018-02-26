<template>
  <div class="goods-wrapper">

    <!-- 分類 -->
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li class="menu-item" :class="{'current': currentIndex===0 }" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" class="icon" v-if="container.tag_icon">
            {{ container.tag_name }}
          </p>
        </li>
        <li class="menu-item" v-for="(item, index) in goods" :class="{'current': currentIndex===index+1 }" :key="item.name" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" class="icon" v-if="item.icon">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <div class="foods-list-wrapper">
        <div class="info-wrapper food-list-hook">
          <div class="info-item" v-for="item in container.operation_source_list" :key="item.pic_url">
            <img :src="item.pic_url">
          </div>
        </div>
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook" :key="item.name">
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li v-for="food in item.spus" class="food-item" :key="food.name">
                <div class="icon" :style="head_bg(food.picture)"></div>
                <div class="content">
                  <h3 class="name">{{food.name}}</h3>
                  <p class="desc" v-if="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="saled">{{food.month_saled_content}}</span>
                    <span class="praise">{{food.praise_content}}</span>
                  </div>
                  <img v-show="food.product_label_picture" :src="food.product_label_picture" class="product">
                  <p class="price">
                    <span class="text">{{food.min_price}}</span>
                    <span class="unit">/{{food.unit}}</span>
                  </p>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food"></Cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <Shopcart
      :shipping_fee_tip="poiInfo.shipping_fee_tip"
      :min_price_tip="poiInfo.min_price_tip"
    ></Shopcart>

  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Shopcart from '@/components/Shopcart/Shopcart';
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol';

export default {
  data() {
    return {
      container: {},
      goods: {},
      poiInfo: {},
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {}
    }
  },
  components: {
    Shopcart,
    Cartcontrol,
  },
  created() {
    let that = this;
    this.$axios.get('/api/goods').then(function(res) {
      let dataSource = res.data;
      if(dataSource.code == 0) {
        that.container = dataSource.data.container_operation_source;
        that.goods = dataSource.data.food_spu_tags;
        that.poiInfo = dataSource.data.poi_info;

        // 呼叫滾動方法
        that.initScroll();
        // created 時 DOM 未渲染，即高度是有問題的，所以不能加在這邊

        // vm.$nextTick: 可將 callback 延遲到 DOM 更新後執行
        that.$nextTick( () => {
          // DOM 已更新
          that.initScroll();

          // 計算分類區高度
          that.calculateHeight();
        })
      }
    }).catch(function(err) {
      console.log(err);
    });
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ")";
    },
    initScroll() {
      // vm.$refs: 一個物件，持有以註冊過的 ref 的所有子組件。用來綁定某個 DOM 元素或組件
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        // probeType 為 3 時，才有辦法監聽到滑動
        probeType: 3,
        momentum: true,
        // bounce: true
        click: true
      });
      // new BScroll('.menu-wrapper');
      // new BScroll('.foods-wrapper');

      // 滾動監聽事件
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log('scrollY: ' + this.scrollY)
      })
    },
    calculateHeight() {
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      // 添加到陣列區間
      // 0-216 第一個區間(專場)
      // 217~1342 第二個區間(熱銷)
      let height = 0;
      this.listHeight.push(height);
      for(let item = 0, len = foodlist.length; item < len; item++) {
        height += foodlist[item].clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
      let el = foodlist[index];
      this.foodScroll.scrollToElement(el, 1000)
    }
  },
  computed: { // computed 不能傳遞參數
    currentIndex() {   // 根據右側滾動位置，確定對應的索引下標

      for(let item = 0, len = this.listHeight.length; item < len; item++) {
        // 獲取商品區間的範圍
        let height1 = this.listHeight[item];
        let height2 = this.listHeight[item+1];

        // 是否在上述區間
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return item;
        }
      }
      return 0;
    }
  }
};
</script>

<style>
@import url('./Goods.css');
</style>

