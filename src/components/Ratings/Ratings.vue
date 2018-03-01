<template>
  <div class="ratings-wrapper">
    <div class="scroll-wrapper">
      <div class="overView">
        <div class="overView-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家評分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <Star :score="ratings.quality_score"></Star>
              <span class="score">{{ratings.quality_score}}</span>
            </div>
            <div class="pack-score item">
              <span class="text">包裝</span>
              <Star :score="ratings.pack_score"></Star>
              <span class="score">{{ratings.pack_score}}</span>
            </div>
          </div>
        </div>
        <div class="overView-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送評分</p>
          </div>
        </div>
      </div>

      <Split></Split>

      <div class="content">
        <div class="rating-select" v-if="ratings.tab">
          <span class="item" @click="selectTypeFn(2)" :class="{active:selectType==2}">
            {{ratings.tab[0].comment_score_title}}
          </span>
          <span class="item" @click="selectTypeFn(1)" :class="{active:selectType==1}">
            {{ratings.tab[1].comment_score_title}}
          </span>
          <span class="item" @click="selectTypeFn(0)" :class="{active:selectType==0}">
            <img src="./../../assets/resource/img/icon_sub_tab_dp_normal@2x.png" v-if="selectType!=0">
            <img src="./../../assets/resource/img/icon_sub_tab_dp_highlighted@2x.png" v-if="selectType==0">
            {{ratings.tab[2].comment_score_title}}
          </span>
        </div>
        <div class="labels-view">
          <span v-for="item in ratings.labels" :key="item.content" class="label-item" :class="{heighlight: item.label_star>0}">
            {{item.content}}{{item.label_count}}
          </span>
        </div>
        <ul class="rating-list">
          <li class="comment-item" v-for="comment in selectComments" :key="comment.user_id">
            <div class="comment-header">
              <img v-if="comment.user_pic_url" :src="comment.user_pic_url">
              <img v-if="!comment.user_pic_url" src="./../../assets/resource/img/anonymity.png">
            </div>
            <div class="comment-main">
              <div class="user">
                {{comment.user_name}}
              </div>
              <div class="time">
                {{comment.comment_time | formatData}}
              </div>
              <div class="star-wrapper">
                <span class="text">評分</span>
                <Star :score="comment.order_comment_score" class="rating-star"></Star>
              </div>
              <div class="rating-content" v-html="commentStr(comment.comment)"></div>
              <div class="img-wrapper" v-if="comment.comment_pics.length">
                <img v-for="item in comment.comment_pics" :key="item.url" :src="item.url">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import './Ratings.scss'
import Vue from 'vue'
import moment from 'moment';

import Star from '@/components/Star/Star'
import Split from '@/components/Split/Split'
import BScroll from 'better-scroll';


const ALL = 2; // rating-select '全部'
const PICTURE = 1; // '有圖'
const COMMENT = 0; // '點評'

export default {
  data() {
    return {
      ratings: {},
      selectType: ALL,
    }
  },
  created() { // Ajax
    let that = this; // 指向 App.vue 的實例

    this.$axios.get('/api/ratings').then(function(res) {
      let dataSource = res.data;
      if(dataSource.code == 0) {
        that.ratings = dataSource.data;

        that.$nextTick(() => {
          if(!that.scroll) {
            that.scroll = new BScroll('.ratings-wrapper', {
              click: true
            });
          } else {
            that.scroll.refresh();
          }
        })
      }
    }).catch(function(err) {
      console.log(err);
    });
  },
  computed: {
    selectComments() {
      if(this.selectType == ALL) {
        return this.ratings.comments;
      } else if(this.selectType == PICTURE) {
        return this.ratings.comments.filter((item) => {
          return item.comment_pics.length > 0;
        })
      } else {
        return this.ratings.comments_dp.comments;
      }
    }
  },
  filters: {
    formatData: function(time) {
      return moment(new Date(time)).format("YYYY.MM.DD");
    }
  },
  components: {
    Star,
    Split,
  },
  methods: {
    selectTypeFn(type) {
      this.selectType = type;
    },
    commentStr(content) {
      let rel = /#[^#]+#/g;
      return content.replace(rel, '<i>$&</i>');
    }
  }
};
</script>

<style>
  /* @import url('./Ratings.scss'); */
</style>

