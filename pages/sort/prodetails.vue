<template>
	<view>
	 <!-- 商品图片 -->
        <view class="pro">
            <view class="proimg">
				
                <img src="../../static/proimg.png">
            </view>
            <view class="mark">
            </view>
            <view class="titles">
                <p>&nbsp;&nbsp;&nbsp;【农夫山泉】&nbsp;550ml/瓶</p>
            </view>
            <view class="water">
                <p>&nbsp;&nbsp;&nbsp;纯净水</p>
            </view>
            <view class="price">
                <p>&nbsp;&nbsp;&nbsp;￥<span class="sp1">1.50</span>&nbsp;&nbsp;
                    <span class="sp2">￥2.00</span>
                </p>
            </view>
        </view>
        <!-- 商品介绍 -->
        <view class="detail">
            <view class="service">
                <p class="pser">服务</p>
                <view class="mark1"><img src="../../static/mark.png" alt=""></view>
                <p class="ptext">好吃新鲜健康</p>
                <view class="mark1"><img src="../../static/mark.png" alt=""></view>
                <p class="ptext">无条件退换货</p>
                <view class="mark1"><img src="../../static/mark.png" alt=""></view>
                <p class="ptext">客服快速反应</p>
            </view>
            <view class="active">
                <p class="act1">活动</p>
                <view class="liji">
                    <p>赠送积分</p>
                </view>
                <p class="act2">购买本商品即可获得0积分</p>
            </view>
        </view>
        <!-- 用户评价 -->
      <!--  <view class="score">
            <p>用户评价</p>
			
        </view> -->
		<view class="good-detail">
			<image src="../../static/proimg-1.png" style=""></image>
		</view>
		
		
		<!-- 商品介绍 -->
        <view class="addshop">
            <view class="shopcar">
                <view class="shopcarimg"><img src="../../static/shopcar.png"></view>
                <view class="er">
                    <view class="num">
                        <p>1</p>
                    </view>
                </view>
                <view class="shopcartext">
                    <p>购物车</p>
                </view>
            </view>
            <view class="shu"></view>
            <view class="show">
                <view class="showimg"><img src="../../static/show.png"></view>
                <view class="showtext">
                    <p>分享</p>
                </view>
            </view>
            <view class="add">
                <p>加入购物车
                </p>
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
		methods: {

		}
	}
</script>

<style lang="less">
	@import "../../common/hcw/common.less";
	@import "../../common/hcw/prodetails.less";
	

</style>
