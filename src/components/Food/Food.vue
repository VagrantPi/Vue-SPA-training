<template>
  <transition name="detail">
    <div class="food-detail" v-show="showFalsg" ref="foodView">
      <div class="food-detail-scroll">
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

        <Split></Split>

        <div class="rating-wrapper">
          <div class="rating-title">
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{food.rating.title}}</span>
              <span class="ratio">({{food.rating.like_ratio_desc}} <i>{{food.rating.like_ratio}}</i>)</span>
            </div>
            <div class="snd-title" v-if="food.rating">
              <span class="text">{{food.rating.snd_title}}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>
          <ul class="rating-content" v-if="food.rating">
            <li class="comment-item" v-for="comment in food.rating.comment_list" :key="comment.user_name">
              <div class="comment-header">
                <img v-if="comment.user_icon" :src="comment.user_icon">
                <img v-if="!comment.user_icon" src="./../../assets/resource/img/anonymity.png">
              </div>
              <div class="comment-main">
                <div class="user">
                  {{comment.user_name}}
                </div>
                <div class="time">
                  {{comment.comment_time}}
                </div>
                <div class="content">
                  {{comment.comment_content}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Cartcontrol from '@/components/Cartcontrol/Cartcontrol';
import Vue from 'vue';
import BScroll from 'better-scroll';
import Split from '@/components/Split/Split';
export default {
  data() {
    return {
      showFalsg: false,
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
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodView, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      })
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
    BScroll,
    Split
  },
}
</script>

<style>
  @import url("./Food.css");
</style>
