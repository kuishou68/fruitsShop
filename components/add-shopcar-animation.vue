<template>
	<view>
		<view class="container">
			<!-- 底部购物车 -->
			<view class="shopcar-bus" @tap="toShopCarPage">
				<image src="@/static/shopcar.png"></image>
				<view class="count" v-show="!hideCount">{{count}}</view>
			</view>
			<!-- 加入购物车的小球 -->
			<view class="good_box" v-show="!hide_good_box" :style="{left:bus_x+'px;',top:bus_y+'px;'}">
				<image :src="imgUrl"></image>
			</view>
		</view>
	</view>
</template>
<script>
	import $commonData from '@/common/common-data.js'
	export default {
		data() {
			return {
				goods_list: [1, 1],
				count: 0,
				hide_good_box: true,
				finger:{},
				busPos:{},
				bus_x:0,
				bus_y:0,
				token:'',
				imgUrl:''
			}
		},
		 onLoad: function() {
			var that = this;
			wx.getSystemInfo({
				success: function(res) {
					var ww = res.windowWidth;
					var hh = res.windowHeight;
					that.busPos['x'] = ww * 0.84;
					that.busPos['y'] = hh * 0.8;
				}
			})
			that.count = 0;
		},
		methods:{
			touchOnGoods: function(e) {
				this.imgUrl = e.currentTarget.dataset.img;
				// 如果good_box正在运动
				if (!this.hide_good_box) return;
				var topPoint = {};
				this.finger['x'] = e.touches["0"].clientX;
				this.finger['y'] = e.touches["0"].clientY;
			
				if (this.finger['y'] < this.busPos['y']) {
					topPoint['y'] = this.finger['y'] - 150;
				} else {
					topPoint['y'] = this.busPos['y'] - 150;
				}
				
				if(this.finger['x'] > this.busPos['x']) {
					// topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
					this.finger['x'] = this.finger['x'] - 50;
					topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
					
					console.log('111',topPoint['x']);
				} else {
					 topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
				}
				this.linePos = $commonData.bezier([this.finger, topPoint, this.busPos], 30);
				this.startAnimation();
			},
			startAnimation: function() {
				var index = 0,
					that = this,
					bezier_points = that.linePos['bezier_points'];
					that.hide_good_box= false
					that.bus_x= that.finger['x']
					that.bus_y= that.finger['y']
					that.timer = setInterval(function() {
					index++;
					that.bus_x= bezier_points[index]['x']
					that.bus_y= bezier_points[index]['y']
					if (index >= 28) {
						clearInterval(that.timer);
						that.hide_good_box= true,
						that.hideCount= false,
						that.count= that.count += 1
					}
					// 控制动画运动的时间
				}, 20);
				
			},
			// 进入到购物车的页面
			toShopCarPage() {
				console.log(123);
				uni.navigateTo({
					url: '/pages/index/shoppingcar',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onShow() {
			
		}
	}
</script>
<style lang="scss">

	.container {
		.shopcar-bus {
		  width: 40px;
		  height: 40px;
		  position: fixed;
		  left: 85%;
		  top: 85%;
		  border-radius: 50%;
		  box-sizing: border-box;
		  image {
		    width: 100%;
		    height: 100%;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    margin: -16px;
			margin-right: 14upx;
		  }
		  .count {
		    display: block;
		    height: 20px;
		    line-height: 20px;
		    font-size: 12px;
		    background: #ff4611;
		    padding: 0 6px;
		    border-radius: 10px;
		    color: #fff;
		    position: absolute;
		    right: -8px;
		    top: 2px;
		  }
		}
		.good_box {
		  width: 30px;
		  height: 30px;
		  position: fixed;
		  border-radius: 50%;
		  overflow: hidden;
		  left: 50%;
		  top: 50%;
		  z-index: +99;
		}
		.good_box image {
		  display: block;
		  width: 100%;
		  height: 100%;
		}
	}
</style>