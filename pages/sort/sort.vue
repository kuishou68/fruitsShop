<template>
	<view>
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

		</view>
		<!--分类商品-->
		<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
		

		<!--底部导航-->
		<Footer></Footer>
	</view>
</template>

<script>
	// 商品分类展示组件
	import jobSelect from '@/components/yunmiao-jobSelect/yunmiao-jobSelect.vue'
	// 底部栏
	import Footer from '@/components/song-footer/song-footer.vue'
	export default {
		data() {
			return {
				listData: [{
					"id": 1,
					"name": "实惠好果",
				}, {
					"id": 2,
					"name": "特惠量版",
				}, {
					"id": 3,
					"name": "凑单专区",
				}, {
					"id": 4,
					"name": "鲜果现切",
				}, {
					"id": 5,
					"name": "女神最爱",
				}, {
					"id": 6,
					"name": "一人独享",
				}, {
					"id": 7,
					"name": "瓜果飘香",
				}, {
					"id": 8,
					"name": "休闲零食",
				}, {
					"id": 9,
					"name": "葡提浆果",
				}, {
					"id": 10,
					"name": "枣芒橙柚",
				}, {
					"id": 11,
					"name": "苹果蕉梨",
				}, {
					"id": 12,
					"name": "自选果切",
				}, {
					"id": 13,
					"name": "件装好礼",
				}, {
					"id": 14,
					"name": "用心服务",
				}],
				recomendList:[{
					goods_id: 1,
					goods_name:'【大粒蓝莓】约200g/份晶莹剔透，饱满汁多',
					goods_img_url:'../../static/首页-商品_10.png',
					goods_newPrice: 12.8,
					goods_price: 10.8
				},{
					goods_id: 2,
					goods_name:'【脆李】约500g/份晶莹剔透，饱满汁多',
					goods_img_url:'../../static/首页-商品_12.png',
					goods_newPrice: 9.8,
					goods_price: 18.8
				},{
					goods_id: 3,
					goods_name:'【极品葡萄】约500g/份晶莹剔透，饱满汁多',
					goods_img_url:'../../static/首页-商品_03.png',
					goods_newPrice: 22.8,
					goods_price: 19.8
				},{
					goods_id: 4,
					goods_name:'【泰龙】约100g/份晶莹剔透，饱满汁多',
					goods_img_url:'../../static/首页-商品_06.png',
					goods_newPrice: 15.8,
					goods_price: 13.8
				}]
			}
		},
		components: {
			jobSelect,
			// shopCarAnimation,
			Footer
		},
		methods: {
			show() {
				this.$refs.jobSelect.show()
			},
			confiremJob(e) {
				console.log(e)
			},
			addShopCar(e){
				console.log('加入购物车');
				console.log(e);
				// 成功的话，调用加入购物车动画
				this.$refs.carAnmation.touchOnGoods(e);
			}
		}
	}
</script>

<style lang="less">
	.shopcart {
	    height: 50/16rem;
	    width: 50/16rem;
	    background-color: rgba(0, 0, 0, 0.5);
	    border: 1/16rem solid white;
	    border-radius: 40/16rem;
	    position: absolute;
	    bottom: 50/16rem;
	    left: 30/16rem;
	    position: fixed;
	    margin-bottom: 17px;
	    .shop {
	        height: 32/16rem;
	        width: 32/16rem;
	        margin: 0 auto;
	
	        img {
	            display: block;
	            width: 100%;
	            margin-top: 9/16rem;
	        }
	    }
	}
	
	
	/*头部定位、搜索、消息*/
	.index-head {
		height: 80rpx;
		width: 100%;
	}

	/*定位*/
	.index-head-left {
		width: 180px;
		float: left;
		margin-top: 10px;
		margin-left: 15px;
		margin-right: 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.index-dingwei {
		font-size: 35rpx;
		margin: 10rpx;
		color: #000;
	}

	.index-place {
		font-size: 30rpx;
		color: #ff3861;
		font-weight: bold;
	}

	/*搜索*/
	.index-search {
		display: flex;
		background: #eaebec;
		height: 70rpx;
		float: right;
		margin-top: 3px;
		margin-right: 36rpx;
		width: 258rpx;
		border-radius: 50rpx;
		align-items: center;
	}

	.index-search text {
		font-size: 25rpx;
		color: #999;
		margin-left: 50rpx;
		margin-right: 15rpx
	}

	.index-search input {
		font-size: 23rpx;
		flex: 1
	}
	
	
	
	.index-commodity {
		background: #f5f6f9;
		width: 100%;
		height: 100%;
	}
	
	.index-commodity-detail {
		background-color: #FFFFFF;
		border-radius: 5%;
		margin: 1px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.index-commodity-detail img {
		width: 30%;
		border-radius: 5%;
		margin-top: 8px;
		height: 86px;
	}
	
	/*商品价格*/
	.index-commodity-price {
		float: right;
		width: 68%;
		padding-top: 10rpx;
	}
	
	.index-commodity-price navigator text {
		line-height: 30px;
		float: left;
	}
	.index-commodity-price navigator text:nth-of-type(1){
		font-size: 28rpx;
	}
	.index-commodity-price navigator text:nth-of-type(2){
		clear: both;
		font-size: 18px;
		color: #FF3861;
		font-weight: bold;
	}
	.index-commodity-price navigator text:nth-of-type(3) {
		font-size: 12px;
		color: #999;
		margin-left: 3px;
		text-decoration: line-through;
	}
	
	.index-commodity-price navigator text:nth-of-type(4) {
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
		margin-left: 4px;
	}

</style>
