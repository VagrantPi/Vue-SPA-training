<template>
  <div class="header" :style="content_bg">
    <!-- 頂部通知欄 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>
      <div class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜尋店內商品">
      </div>
      <div class="more-wrapper">
        <a href="#" class="spelling-bt">選單</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>
    <!-- 主題內容 -->
    <div class="bg-opacity"></div>
    <div class="content-wrapper">
      <div class="content-seller-logo" :style="content_seller_logo"></div>
      <div class="content-text">{{ poiInfo.name }}</div>
      <div class="content-colle-star"></div>
      <div class="content-colle-star-text">收藏</div>
    </div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper">
      <!--
        這邊會吐 Error 原因是因為 discounts2[0] 這樣取值不好，如果 discounts2 內沒東西時，這邊就會壞掉因此需要加上 v-if 來判斷是否選染
      -->
      <img class="bulletin-img" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url">
      <div class="bulletin-text" v-if="poiInfo.discounts2">{{ poiInfo.discounts2[0].info }}</div>
      <div class="detail" v-on:click="switchBulletin">
        <div class="text">{{ poiInfo.discounts2.length }}個活動</div>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <!-- 公告詳細內容 -->
    <transition name="detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bg ">
            <div class="icon" :style="content_seller_logo"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i>
              {{poiInfo.shipping_fee_tip}} <i>|</i>
              {{poiInfo.delivery_time_tip}}
            </p>
            <p class="time">
              配送時間:
              {{poiInfo.shipping_time}}
            </p>
            <div class="discounts">
              <p>
                <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url">
                <span v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wrapper" v-on:click="switchBulletin">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  props: {
    poiInfo : {
      type: Object,
      default: {}
    }
  },
  computed: {
    content_seller_logo() {
      return "backgroundImage: url(" + this.poiInfo.pic_url + ")";
    },
    content_bg() {
      return "backgroundImage: url(" + this.poiInfo.head_pic_url + ")";
    },
    detail_bg() {
      return "backgroundImage: url(" + this.poiInfo.poi_back_pic_url + ")";
    }
  },
  methods: {
    switchBulletin() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style>
/* 導入 CSS */
@import url('./Header.css');
@import url('./../../assets/style/icon.css');
</style>

