<template>
	<uni-popup v-model="showModel" mode="right" width="100%" height="100%">
		<view class="u-wrap">

			<view class="search-warp"  v-if="showAction">
				<scroll-view scroll-y  :style="{'height': scrollHeight+'px'}" class="item-container">
					<view class="thumb-box" v-for="(item, index) in searchList" :key="index" @click="selval(item)">
						<view :class="[value==item[valueName]? 'item-active' : '']">
							<text>{{item.pname}}-{{item[labelName]}}</text>
						</view>
						<u-icon v-if="value==item[valueName]" name="checkbox-mark" :color="iconColor" size="28">
						</u-icon>
					</view>
				</scroll-view>
			</view>
			
			<view class="u-menu-wrap">
				<!--左边侧边栏选项卡-->
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
					<view v-for="(item,index) in list" :key="index" class="u-tab-item"
						:class="[current==index ? 'u-tab-item-active' : '']" :data-current="index"
						@tap.stop="swichMenu(index)">
						<text class="u-line-2">{{item[labelName]}}</text>
					</view>
				</scroll-view>
				<!--右边商品卡片-->
				<block v-for="(item,index) in list" :key="index" >
					<scroll-view scroll-y class="right-box" v-if="current==index">
						<view class="page-view">
							<view class="class-item">
								<view class="item-container">
									<unicloud-db 
										v-slot:default="{data, loading, error, options}" 
										collection="opendb-mall-goods"  
										orderby="category_id asc"
										>
										<view v-if="error" >{{error.message}}</view>
										<view class="index-commodity-detail" v-for="(item,index) in data" :key="index" >
											<img :src="item.goods_thumb" mode=""/>
											<view class="index-commodity-price">
												<navigator url="./prodetails">
													<text>{{ item.name }}</text><br />
													<text>￥{{ item.goods_price }}</text><br />
													<text>￥{{ item.goods_newPrice }}</text>
												</navigator>
												<view class="index-commodity-add" :id="item.goods_id" :data-img="item.goods_image_url" @tap="addShopCar">
													<text>+</text>
													<!-- <img :src="item.goods_img_url" mode=""/> -->
												</view>
												
											</view>
										</view>
										<view v-if="loading">加载中...</view>
									</unicloud-db>
									<view style="clear: both;"></view>
								</view>
							</view>
						</view>
					</scroll-view>
				</block>
				
			</view>
			<!-- 加入购物车动画 -->
			<!-- <template v-if="!isAdmin">
				<shopCarAnimation ref="carAnmation"></shopCarAnimation>
			</template> -->
			<view>
				<shopCarAnimation ref="carAnmation"></shopCarAnimation>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	// 加入购物车动画组件
	import shopCarAnimation from '@/components/add-shopcar-animation.vue'
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
		name: 'jobSelect',
		props: {
			//label展示字段
			labelName: {
				type: String,
				default: 'name'
			},
			//value选中字段
			valueName: {
				type: String,
				default: 'id'
			},
			//初始选中值
			selectValue: {
				type: Number,
				default: 0
			},
			//选择数据
			listData: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data() {
			return {
				showModel: false,
				list: JSON.parse(JSON.stringify(this.listData)),
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				value: this.selectValue,
				keyword: '',
				iconColor: 'primary',
				showAction: false,
				searchList: [],
				scrollHeight: 500,
				
			}
		},
		components:{
			shopCarAnimation
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let windowHeight = res.windowHeight;
					let windowWidth = res.windowWidth;
					//#ifdef H5
					let headHeight = 110 / 750 * windowWidth;
					//#endif
					//#ifndef H5
					let headHeight = 200 / 750 * windowWidth;
					//#endif
					let scrollHeight = (windowHeight - headHeight);
					that.scrollHeight = scrollHeight;

				}
			});
		},
		methods: {
			show() {
				this.showModel = true;
			},
			hide() {
				this.showModel = false;
			},
			selval(item) {
				this.value = item[this.valueName];
				this.showModel = false;
				this.keyword = '';
				this.showAction = false;
				this.$emit('confirem', item[this.valueName]);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			focus() {
				this.showAction = true;
			},
			cancle() {
				this.showAction = false;
				this.keyword = '';
			},
			toSearch() {
				let arr = [];
				this.list.map((item, index) => {
					item.children.map((it, ix) => {
						if (it[this.labelName].indexOf(this.keyword) >= 0) {
							it['pname'] = item[this.labelName];
							arr.push(it);
						}
					})
				})
				this.searchList = arr;
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

<style lang="scss" scoped>
	.u-wrap {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
		.head {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			padding: 0 20rpx;
			background-color: white;
		}
	}

	.u-search-box {
		padding: 0rpx 30rpx;
		background-color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100rpx;
		width: 100%;
	}

	.search-warp {
		display: flex;
		overflow: hidden;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 10;
		top: 200rpx;
		left: 0;
		width: 100%;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.u-tab-view {
		width: 300rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 100rpx;
		background: #f4f4f4;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		padding: 0 20rpx;
		color: #444;
		font-weight: 400;
		justify-content: center;
	}

	.u-tab-item-active {
		position: relative;
		color: #ff3861;
		font-size: 28rpx;
		font-weight: 600;
		background: #fff;
		box-shadow: 0 1px 5px 0 #dbdbdb;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #ff3861;
		height: 32rpx;
		left: 0;
		top: 39rpx;
		
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: white;
	}

	.page-view {
		background-color: white;
	}

	.class-item {
		background-color: #fff;
		border-radius: 8rpx;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
	}

	.item-container {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.thumb-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100rpx;
		width: 100%;
		padding: 0 20rpx;
		align-items: center;
		font-size: 32rpx;
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
