<template>
	<view>
	<!-- 外部容器 -->
	    <view class="outer">
	        <!-- 搜索框 -->
	        <view class="search">
	            <view class="index-search">
	                <!-- 输入框 -->
				   <!-- <text class="iconfont iconsousuo magnifying"></text>
	               <input class="seaname"  placeholder='搜索"苹果"' /> -->
				   <text class="iconfont iconsousuo"></text>
				   <input type="submit" placeholder='搜索"苹果"' />
	               
	            </view>
				<view class="index-search-right">
					<navigator href="#">搜索</navigator>
				</view>
	        </view>
	
	        <!-- 商品详情页 -->
	        <view class="food">
	            <!-- 左边图片 -->
	            <view class="foodimg">
	                <img src="../../static/food1.jpg" alt="">
	            </view>
	            <!-- 右边文字 -->
	            <view class="rtext">
	                <view class="toptext">
	                    <p class="toptextp1">【果切】"维密"天使蜜瓜--纯果肉约500g<span>(限购5份)</span></p>
	                    <view class="xiangou">
	                        <view class="shenyu">
	                            <p>剩余370份</p>
	                        </view>
	
	                    </view>
	                </view>
	                <view class="bot">
	                    <view class="botletext">
	                        <p class="p1">￥</p>
	                        <p class="p2">11.80</p>
	                        <p class="p3">￥</p>
	                        <p class="p4">12.80
	                        </p>
	                    </view>
	                    <view class="botrigbtn1">
	                        <a href="#">
	                            <navigator class="liji" url="../index/seckill">
	                                <p>立即秒杀</p>
	                            </navigator>
	                        </a>
	                    </view>
	                </view>
	
	            </view>
	        </view>
	        <view class="food">
	            <!-- 左边图片 -->
	            <view class="foodimg">
	                <img src="../../static/food2.jpg" alt="">
	            </view>
	            <!-- 右边文字 -->
	            <view class="rtext">
	                <view class="toptext">
	                    <p>【定制版果娃纸巾】颜色随机，1盒/份</p>
	                </view>
	                <view class="bot">
	                    <view class="botletext">
	                        <p class="p1">￥</p>
	                        <p class="p2">2.98</p>
	                        <p class="p3">￥</p>
	                        <p class="p4">3.98
	                        </p>
	                    </view>
	                    <view class="botrigbtn">
	                        <a href="#"><img src="../../static/seabtn.png" alt=""></a>
	                    </view>
	                </view>
	            </view>
	        </view>
	        <view class="food">
	            <!-- 左边图片 -->
	            <view class="foodimg">
	                <img src="../../static/food3.jpg" alt="">
	            </view>
	            <!-- 右边文字 -->
	            <view class="rtext">
	                <view class="toptext">
	                    <p>【果切--一级麒麟瓜】纯果肉约1kg/份</p>
	                </view>
	                <view class="bot">
	                    <view class="botletext">
	                        <p class="p1">￥</p>
	                        <p class="p2">23.96</p>
	                        <p class="p3">￥</p>
	                        <p class="p4">25.80 </p>
	                    </view>
	                    <view class="botrigbtn">
	                        <a href="#"><img src="../../static/seabtn.png" alt=""></a>
	                    </view>
	                </view>
	            </view>
	        </view>
	        <view class="food">
	            <!-- 左边图片 -->
	            <view class="foodimg">
	                <img src="../../static/food4.jpg" alt="">
	            </view>
	            <!-- 右边文字 -->
	            <view class="rtext">
	                <view class="toptext">
	                    <p>【佳沛金果件装】33个/件</p>
	                </view>
	                <view class="bot">
	                    <view class="botletext">
	
	                        <p class="p1">￥</p>
	                        <p class="p2">260.00</p>
	                        <p class="p3">￥</p>
	                        <p class="p4">368.00</p>
	                    </view>
	                    <view class="botrigbtn">
	                        <a href="#"><img src="../../static/seabtn.png" alt=""></a>
	                    </view>
	                </view>
	
	            </view>
	        </view>
	        <view class="food">
	            <!-- 左边图片 -->
	            <view class="foodimg">
	                <img src="../../static/food4.jpg" alt="">
	            </view>
	            <!-- 右边文字 -->
	            <view class="rtext">
	                <view class="toptext">
	                    <p>【佳沛金果】1个/份</p>
	                </view>
	                <view class="bot">
	                    <view class="botletext">
	                        <p class="p1">￥</p>
	                        <p class="p2">15.80</p>
	                        <p class="p3">￥</p>
	                        <p class="p4">30.00</p>
	                    </view>
	                    <view class="botrigbtn">
	                        <a href="#"><img src="../../static/seabtn.png" alt=""></a>
	                    </view>
	                </view>
	            </view>
	        </view>
	        <view class="shopcart">
	            <view class="shop">
	                <img src="../../static/shopcart.png" alt="">
	            </view>
	            <view class="er">
	                <view class="num">
	                    <p>2</p>
	                </view>
	            </view>
	        </view>
			
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		components: {
			
		},
		methods: {
		 
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/hcw/common.less";
	@import "../../common/hcw/search.less";
	// /*搜索*/
	// .index-search {
	// 	display: flex;
	// 	background: #f7f7f7;
	// 	height: 63rpx;
	// 	border-radius: 50rpx;
	// 	align-items: center;
	// }
	
	// .index-search text {
	// 	font-size: 25rpx;
	// 	color: #999999;
	// 	margin-left: 50rpx;
	// 	margin-right: 15rpx;
	// }
	
	// .index-search input {
	// 	font-size: 23rpx;
	// 	flex: 1;
	// }
</style>
