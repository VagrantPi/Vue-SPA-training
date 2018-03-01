<template>
	<div class="seller" ref='sellerView'>
		<div class="seller-wrapper">
			<Split></Split>
			<div class="seller-view">
				<div class="address-wrapper">
					<div class="address-left">
						{{seller.address}}
					</div>
					<div class="address-right">
						<div class="content"></div>
					</div>
				</div>
				<div class="pics-wrapper" v-if="seller.poi_env" ref='picsView'>
					<ul class="pics-list" ref='picsList'>
						<li class="pics-item" v-for="imgurl in seller.poi_env.thumbnails_url_list" :key="imgurl" ref='picsItem'>
							<img :src="imgurl" />
						</li>
					</ul>
				</div>
				<div class="safety-wrapper">
					查看食品安全檔案
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>

			<Split></Split>
			<div class="tip-wrapper">
				<div class="delivery-wrapper">
					配送服務: {{seller.app_delivery_tip}}
				</div>
				<div class="shipping-wrapper">
					配送時間: {{seller.shipping_time}}
				</div>
			</div>

			<Split></Split>
			<div class="other-wrapper">
				<div class="server-wrapper">
					商機服務
					<div class="poi-server" v-for="item in seller.poi_service" :key="item.index" v-if="seller.poi_service">
						<img :src="item.icon" /> {{item.content}}
					</div>
				</div>
				<div class="discounts-wrapper">
					<div class="discounts-item" v-for="item in seller.discounts2" :key="item.id" v-if="seller.discounts2">
						<div class="icon">
							<img :src="item.icon_url" />
						</div>
						<div class="text">
							{{item.info}}
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import './Seller.scss';

import Split from './../Split/Split'
import BScroll from 'better-scroll';

export default {
  data() {
    return {
      seller: {},
    }
  },
  created() { // Ajax
    let that = this; // 指向 App.vue 的實例

    this.$axios.get('/api/seller').then(function(res) {
      let dataSource = res.data;
      if(dataSource.code == 0) {
        that.seller = dataSource.data;

        that.$nextTick(() => {
          let urlList = that.seller.poi_env.thumbnails_url_list;
          if(urlList) { // 檢查是否沒有圖片
            let imgW = that.$refs.picsItem[0].clientWidth;
            let marginR = 11;
            let width = (imgW + marginR) * urlList.length;  // 因為未載入前是沒有寬度的，所以 BScroll 無法使用，所以透過計算來拿到載入後的寬度
            that.$refs.picsList.style.width = width + 'px';
            that.scroll = new BScroll(that.$refs.picsView, {
              scrollX: true
            });
          }

          that.sellerView = new BScroll(that.$refs.sellerView);

        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  },
  components: {
    Split
  }
};
</script>

<style>

</style>

