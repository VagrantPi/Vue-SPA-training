<template>
  <div class="header" v-bind:style="{ backgroundImage: 'url(' + poiInfo.head_pic_url + ')' }">
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
      <div class="content-seller-logo" v-bind:style="{ backgroundImage: 'url(' + poiInfo.pic_url + ')' }"></div>
      <div class="content-text">{{ poiInfo.name }}</div>
      <div class="content-colle-star"></div>
      <div class="content-colle-star-text">收藏</div>
    </div>
    <!-- 公告內容 -->
    <div class="bulletin-wrapper">
      <div class="bulletin-img" v-bind:style="{ backgroundImage: 'url(' + poiInfo.discounts2[0].icon_url + ')' }"></div>
      <div class="bulletin-text">{{ poiInfo.discounts2[0].info }}</div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    poiInfo : {
      type: Object,
      default: {}
    }
  }
};
</script>

<style>
/* 導入 CSS */
@import url('./Header.css');
@import url('./../../assets/style/icon.css');
</style>

