<template>
  <div class="star">
    <!-- 這邊塞 key 的原因是因為 eslint 報錯 ╮(╯_╰)╭ https://github.com/vuejs/vetur/issues/261 -->
    <span v-for="itemClass in itemClasses" :class="itemClass" :key="itemClass" class="start-item"></span>
  </div>
</template>
<script>
  // 定義星星長度
  const LENGTH = 5;
  // 星星對應的 class
  const CLS_ON = 'on';
  const CLS_GALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let result = [];
        // 4.7 => 4.5   3.9 => 3.5   4.1 => 4.0
        // 對數字取 floor
        let score = Math.floor(this.score*2)/2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for(let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        if(hasDecimal) result.push(CLS_GALF);

        while(result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  }
</script>
<style>
.star {
  font-size: 0;
}
.star .start-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;
}
.star .start-item:last-child {
  margin-right: 0;
}
.star .on {
  background-image: url('./../../assets/resource/img/star24_on@2x.png')
}
.star .half {
  background-image: url('./../../assets/resource/img/star24_half@2x.png')
}
.star .off {
  background-image: url('./../../assets/resource/img/star24_off@2x.png')
}
</style>
