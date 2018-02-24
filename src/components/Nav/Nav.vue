<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item goods">點菜</router-link>
    <router-link to="/ratings" class="nav-item ratings">評價</router-link>
    <router-link to="/seller" class="nav-item seller">商家</router-link>
  </div>
</template>

<script>
  export default {};
</script>

<style>
.nav {
  display: flex;
  flex-direction:row;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.nav .nav-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666666;
}
.nav .active {
  color: #FFBB22;
}
.nav .active:after {
  content: "";
	position: absolute;
	min-width: 21px;
	height: 2px;
	background-color: #FFBB22;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
}
</style>

