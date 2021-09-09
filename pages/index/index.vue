<template>
	<view class="content">
		<!--头部定位、搜索、消息-->
		<view class="index-head">
			<view class="index-head-left">
				<text class="index-dingwei iconfont icondingwei"></text>
				<text class="index-place">江苏省南通市如皋人才公寓</text>
				<!-- <text class="">由 泉塘二店 提供服务 </text> -->
			</view>
			<navigator class="index-search" url="../search/search">
				<text class="iconfont iconsousuo"></text>
				<input type="submit" placeholder="搜一搜啊" />
			</navigator>
			<view class="index-head-right" style="">
				<text class="iconfont iconxiaoxi"></text><br />
				<text style="font-size: 24rpx; ">消息</text>
			</view>
		</view>
		<!--领劵、会员码、待提货-->
		<view class="index-member">
			<view class="index-member-left">
				<text class="iconfont iconlingjuanzhongxin"></text><br />
				<text>领劵·购卷</text>
			</view>
			<view class="index-member-vip">
				<text class="iconfont iconhuiyuanma1"></text><br />
				<text>会员码</text>
			</view>
			<view class="index-member-right">
				<text class="iconfont icondaitihuo1"></text><br />
				<text>待提货</text>
			</view>
		</view>
		<!--轮播-->
		<view class="index-carousel">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
							:duration="duration">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image src="../../static/index-carousel1.png"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../static/index-carousel2.png"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/index-carousel3.png"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<!--积分商城-->
		<view class="index-integral">
			<view>
				<text class="iconfont iconjifenshangcheng-copy-copy-copy"></text>
				<text class="index-integral-text">积分商城</text>
			</view>
			<view>
				<text class="iconfont iconyushou"></text>
				<text class="index-integral-text">预售爆品</text>
			</view>
			<view>
				<text class="iconfont iconkefu"></text>
				<text class="index-integral-text">联系客服</text>
			</view>
			<view>
				<text class="iconfont iconrenwuzhongxin"></text>
				<text class="index-integral-text">任务中心</text>
			</view>
		</view>
		<!--限时秒杀、团购-->
		<view class="index-special">
			<navigator class="index-special-seckill" url="./seckill">
				<!-- <view class="index-special-countdown">
					
				</view> -->
				<uni-countdown
					:show-day="false" 
					:hour="12" 
					:minute="12" 
					:second="12" 
					color="#fff"
					backgroundColor="#ff3861"
					></uni-countdown>
				<view>
					<img class="index-special-img" src="../../static/限时秒杀_09.png" alt="">
					<img class="index-special-img" src="../../static/限时秒杀_11.png" alt="">
				</view>
			</navigator>
			<navigator class="index-special-group" url="./seckill">
				<text>超值拼团</text>
				<view>
					<img class="index-special-img" src="../../static/限时秒杀_03.png" alt="">
					<img class="index-special-img" src="../../static/限时秒杀_06.png" alt="">
				</view>
			</navigator>
		</view>
		<!--分类导航-->
		<view class="index-nav">
			<!-- <view class="index-nav-text">
				<text>&nbsp;实惠好果&nbsp;&nbsp;|</text><br/>
				<text>精心挑选</text>
			</view>
			<view class="index-nav-text">
				<text>&nbsp;特惠量版&nbsp;&nbsp;|</text><br/>
				<text>最大价优</text>
			</view>
			<view class="index-nav-text">
				<text>&nbsp;凑单专区&nbsp;&nbsp;|</text><br/>
				<text>凑单好品</text>
			</view>
			<view class="index-nav-text">
				<text>鲜果现切</text><br/>
				<text>免洗即食</text>
			</view> -->
			<!--Tab选项卡-->
			<view class="index-nav-text">
				<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs">
				</zzx-tabs>
			</view>
			<!--分类商品-->
			<view class="index-tab">
				<!--实惠好果-->
				<view v-show="current === 0">
					<view class="index-commodity">
						<view class="index-commodity-row" >
							<!--unicloud-db数据渲染标签-->
							<unicloud-db
								v-slot:default="{data, loading, error, options}" 
								collection="opendb-mall-goods"  
								orderby="category_id asc"
								>
								<view v-if="error">{{ error.message }}</view>
								<view class="index-commodity-detail" v-for="(item, index) in data" :key="index">
									<img :src="item.goods_thumb" /><br />
									<text>{{item.name}}</text><br />
									<view class="index-commodity-price">
										<text >晶莹剔透，饱满汁多</text><br />
										<text>￥{{ item.goods_price }}</text><br />
										<text>￥{{ item.goods_newPrice}}</text>
									</view>
									<view class="index-commodity-add">
										<text>+</text>
									</view>
								</view>
								<view v-if="loading">加载中...</view>
							</unicloud-db>
						</view>
						<!-- <view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_10.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_03.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							
						</view>
					 -->
					</view>
				</view>
				<!--特惠量版-->
				<view v-show="current === 1">
					<view class="index-commodity">
						<view class="index-commodity-row" style="" >
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_06.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_10.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
						<view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_12.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_06.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="current === 2">
					<view class="index-commodity">
						<view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_12.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_06.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
						<view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_03.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_12.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
						
					</view>
				</view>
				<view v-show="current === 3">
					<view class="index-commodity">
						<view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_06.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_12.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
						<view class="index-commodity-row">
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_06.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
							<view class="index-commodity-detail">
								<img src="../../static/首页-商品_12.png" /><br />
								<text>【泰龙】约100g/份晶莹剔透，饱满汁多</text><br />
								<view class="index-commodity-price">
									<text >晶莹剔透，饱满汁多</text><br />
									<text>￥13.80</text><br />
									<text>￥15.00</text>
								</view>
								<view class="index-commodity-add">
									<text>+</text>
								</view>
							</view>
						</view>
						
					</view>
					
				</view>
			</view>
		</view>
		<!--底部导航栏-->
		<Footer></Footer>
	</view>
</template>

<script>
	// 引入iconfont 
	import '../../common/iconfont.css'
	// 引入轮播组件
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
	// 引入Tab选项卡
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	// 引入底部导航栏
	import Footer from '@/components/song-footer/song-footer.vue'
	// 获取db引用
	const db = uniCloud.database()
	db.collection('opendb-mall-goods')
	.get().then((res)=>{
		console.log(res);
	}).catch((err)=>{
		console.log(err.code);
		console.log(err.message);
	})
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				current: 0,
				items: ['实惠好果', '特惠量版', '凑单专区', '鲜果现切'],
			}
		},
		onLoad() {

		},
		// 注册局部组件
		components: {
			bwSwiper,
			zzxTabs,
			Footer
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			setMydot() {
				this.$refs.mytabs.setDot(0)
			},
			removeMydot() {
				this.$refs.mytabs.removeDot(0);
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/*头部定位、搜索、消息*/
	.index-head {
		height: 80rpx;
		width: 100%;
		background: #ff3861;
		padding-top: 10px;
	}

	/*定位*/
	.index-head-left {
		width: 180px;
		float: left;
		margin-left: 15px;
		margin-right: 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.index-dingwei {
		font-size: 35rpx;
		margin: 10rpx;
		color: #FFFFFF;
	}

	.index-place {
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: bold;
	}

	/*搜索*/
	.index-search {
		display: flex;
		background: #f7f7f7;
		height: 63rpx;
		width: 230rpx;
		border-radius: 50rpx;
		align-items: center;
	}

	.index-search text {
		font-size: 25rpx;
		color: #999999;
		margin-left: 50rpx;
		margin-right: 15rpx;
	}

	.index-search input {
		font-size: 23rpx;
		flex: 1;
	}

	/*消息*/
	.index-head-right {
		float: right;
		position: relative;
		height: 80rpx;
		margin-top: -35px;
		margin-right: 20rpx;
	}

	.index-head-right text {
		font-size: 45rpx;
		color: #FFFFFF;
	}

	/*领劵、会员码、待提货*/
	.index-member {
		height: 186rpx;
		width: 100%;
		background: #ff3861;
	}

	.index-member text {
		color: #FFFFFF;
		font-size: 25rpx;
	}

	/*领劵*/
	.index-member-left {
		width: 33%;
		float: left;
		padding-top: 30rpx;
		padding-left: 80rpx;
	}

	.index-member-left text:nth-child(1) {
		font-size: 70rpx;
		margin-left: 15rpx;
	}

	/*会员码*/
	.index-member-vip {
		float: left;
		padding-top: 36rpx;
	}

	.index-member-vip text:nth-child(1) {
		font-size: 65rpx;
		padding-left: 5rpx;
	}

	/*待提货*/
	.index-member-right {
		float: right;
		padding-top: 30rpx;
		padding-left: 90rpx;
		padding-right: 90rpx;
	}

	.index-member-right text:nth-child(1) {
		font-size: 70rpx;
	}

	/*轮播*/
	.index-carousel {
		width: 100%;
		height: 235rpx;
	}

	.index-carousel image {
		width: 100%;
		height: 200rpx;
	}

	.swiper {
		margin-top: 30rpx;
	}

	/*积分商城*/
	.index-integral {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.index-integral view {
		width: 25%;
	}

	.index-integral view text:nth-child(1) {
		display: flex;
		justify-content: space-around;
		font-size: 40px;
		color: #ff3861;
		margin-top: 10px;
		justify-content: center;
	}

	.index-integral-text {
		font-size: 15px;
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
	}

	/*限时秒杀、团购*/
	/*限时秒杀*/
	.index-special {
		display: flex;
		background: #fff;
		margin-left: 10px;
		margin-right: 10px;
	}

	.index-special-seckill {
		background: #f5f6f9;
		border-radius: 22rpx;
		display: flex;
		flex-flow: wrap;
		margin: 1px;
		width: 50%;
	}

	.index-special-seckill text {
		font-size: 16px;
		font-weight: bold;
		margin-left: 8px;
		margin-top: 3px;
	}
	
	
	.index-special-img{
		width: 43%;
		margin: 5px;
		border-radius: 12rpx;
	}

	/*团购*/
	.index-special-group {
		float: right;
		background: #f5f6f9;
		border-radius: 22rpx;
		display: flex;
		flex-flow: wrap;
		margin: 1px;
		width: 50%;
	}

	.index-special-group text {
		font-size: 16px;
		font-weight: bold;
		margin-left: 8px;
	}

	/*分类导航*/
	.index-nav {
		height: 100%;
		width: 100%;
		background: #f5f6f9;
	}
	.index-nav view{
		
	}
	.index-tab {
		margin-top: 20upx;
		font-size: 24upx;
		height: 260upx;
		border-radius: 50%;
	}

	.index-nav-text {
		background-color: #fff;
		height: 70rpx;
	}

	/*分类商品*/
	.index-commodity {
		background: #f5f6f9;
		width: 100%;
		height: 100%;
		display: flex;
	}
	
	.index-commodity-row{
		max-width: 414px;
	}
	
	.index-commodity-detail {
		height: 50%;
		background-color: #FFFFFF;
		border-radius: 5%;
		margin: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-flow: row wrap; /*横向，*/
	}

	.index-commodity-detail img {
		width: 100%;
		height: 55%;
		border-radius: 5%;
	}
	.index-commodity-detail text:nth-of-type(1) {
		font-size: 28rpx;
	}

	/*商品价格*/
	.index-commodity-price {
		width: 197px;
		width: 100%;
		padding-top: 10rpx;
	}

	.index-commodity-price text {
		line-height: 30px;
		float: left;
	}

	.index-commodity-price text:nth-of-type(1){
		font-size: 27rpx;
		color: #999;
		margin-left: 3px;
	}
	.index-commodity-price text:nth-of-type(2) {
		clear: both;
		font-size: 22px;
		color: #FF3861;
		font-weight: bold;
	}

	.index-commodity-price text:nth-of-type(3) {
		clear: both;
		font-size: 15px;
		color: #999;
		text-decoration: line-through;
	}

	.index-commodity-add {
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background: #FF3861;
		float: right;
		margin: 0 10rpx 10rpx 0;
	}

	.index-commodity-add text:nth-of-type(1) {
		font-size: 30px;
		color: #FFFFFF;
		line-height: 0.9;
		margin: 8rpx;
	}
</style>
