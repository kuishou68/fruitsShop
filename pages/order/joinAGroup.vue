<template>
	 <!-- 切换菜单栏 -->
	    <nav class="nav-wrapper">
	        <view><a href="./applets.html">小程序</a></view>
	        <view><a href="./joinAGroup.html">拼团</a></view>
	        <view><a href="./preSale.html">预售</a></view>
	        <view><a href="./store.html">门店</a></view>
	    </nav>
	
	    <!-- 商品块 -->
	    <view class="goods">
	        <view class="g-top">
	            <view class="top-left">
	                <text>订单编号：</text>
	                <text>082122214892941089</text>
	            </view>
	            <text class="top-right">已完成</text>
	        </view>
	        <view class="g-center">
	            <img src="./img/goods02.png" alt="">
	            <view class="g-img-right">
	                <text>甜蜜水润！&nbsp;【8.8元/个】新疆甜蜜瓜</text>
	                <view class="num01">
	                    <text>1个/每份</text>
	                    <text>X1</text>
	                </view>
	                <view class="num02">
	                    <text class="price1">￥9.90</text>
	                    <text class="price2">￥8.80</text>
	                </view>
	            </view>
	        </view>
	        <view class="g-bottom">
	            <view class="bottom-btn">
	                <button class="btn del">删除订单</button>
	                <button class="btn group">去拼团</button>
	            </view>
	        </view>
	    </view>
	    <!-- 商品块 -->
	    <view class="goods">
	        <view class="g-top">
	            <view class="top-left">
	                <text>订单编号：</text>
	                <text>082122214892941089</text>
	            </view>
	            <text class="top-right">已完成</text>
	        </view>
	        <view class="g-center">
	            <img src="./img/goods02.png" alt="">
	            <view class="g-img-right">
	                <text>甜蜜水润！&nbsp;【8.8元/个】新疆甜蜜瓜</text>
	                <view class="num01">
	                    <text>1个/每份</text>
	                    <text>X1</text>
	                </view>
	                <view class="num02">
	                    <text class="del-line">￥9.90</text>
	                    <text class="price2">￥8.80</text>
	                </view>
	            </view>
	        </view>
	        <view class="g-bottom">
	            <view class="bottom-btn">
	                <button class="btn del">删除订单</button>
	                <button class="btn group">去拼团</button>
	            </view>
	        </view>
	    </view>
	    <!-- 商品块 -->
	    <view class="goods">
	        <view class="g-top">
	            <view class="top-left">
	                <text>订单编号：</text>
	                <text>082122214892941089</text>
	            </view>
	            <text class="top-right">已完成</text>
	        </view>
	        <view class="g-center">
	            <img src="./img/goods02.png" alt="">
	            <view class="g-img-right">
	                <text>甜蜜水润！&nbsp;【8.8元/个】新疆甜蜜瓜</text>
	                <view class="num01">
	                    <text>1个/每份</text>
	                    <text>X1</text>
	                </view>
	                <view class="num02">
	                    <text>￥9.90</text>
	                    <text class="price2">￥8.80</text>
	                </view>
	            </view>
	        </view>
	        <view class="g-bottom">
	            <view class="bottom-btn">
	                <button class="btn del">删除订单</button>
	            </view>
	        </view>
	    </view>
</template>


<script>
	// 引入重置样式
	import '../../common/way/reset.css'
	// 底部栏
	import Footer from '../../components/song-footer/song-footer.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			Footer
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	// 全局样式
	@import "../../common/way/common.less";
	// 拼团
	@import "../../common/way/joinAGroup.less";
	// // 预售
	// @import "../../common/way/preSale.less";
	// // 门店
	// @import "../../common/way/store.less";
	
</style>
