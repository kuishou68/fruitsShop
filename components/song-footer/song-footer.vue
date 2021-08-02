<template>
	<view class="container">
		<view class="bar-item" >
			<navigator class="inner" url="../../pages/index/index" open-type="redirect" hover-class="other-navigator-hover">
				<text class="iconfont iconshouye3 icon" ></text><br>
				<text>首页</text>
			</navigator>
			<navigator class="inner" url="../../pages/sort/sort" open-type="redirect" hover-class="other-navigator-hover">
				<text class="iconfont iconfenlei1 icon"></text><br>
				<text>分类</text>
			</navigator>
			<navigator class="inner" url="../../pages/shopCart/shopCart" open-type="redirect" hover-class="other-navigator-hover">
				<text class="iconfont icongouwuche-copy icon"></text><br>
				<text>购物车</text>	
			</navigator>
			<navigator class="inner"  url="../../pages/order/order" open-type="redirect" hover-class="other-navigator-hover">
				<text class="iconfont icondingdan1 icon"></text><br>
				<text>订单</text>
			</navigator >
			<navigator class="inner" url="../../pages/user/user" open-type="redirect" hover-class="other-navigator-hover">
				<text class="iconfont iconziyuan icon"></text><br>
				<text>我的</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Footer",
		props:{
		
		},
		methods:{
		}
	}
</script>

<style lang="scss" scoped>
	/*底部栏*/
	.container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 98rpx;
		background: #FFFFFF;
		box-shadow: 0 2rpx 40rpx 0 rgba(0, 0, 0, 0.18);
		display: flex;
		justify-content: space-around;
		align-items: center;
		z-index: 9999;
	}
	.bar-item{
		width: 100%;
		display: flex;
		text-align: center;
	}
	.inner{
		width: 100%;
		height: 100%;
		list-style: none;
		justify-content: center;
	}
	.inner text:nth-of-type(1){
		font-size: 32px;
		color: #999;
	}
	.inner:hover text:nth-of-type(1){
		color: #FF385C;
	}
	.inner text:nth-of-type(2){
		font-size: 14px;
	}
	.inner:hover text:nth-of-type(2){
		color: #FF385C;
	}
</style>
