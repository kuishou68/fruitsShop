<template>
	<view>
	 <!-- 商品图片 -->
	 <unicloud-db
	  v-slot:default="{data, error}"
	  collection="opendb-mall-goods"  
	  where="_id=='6138af0feb2f8b000153307c'"
	  >
		<view v-if="error">{{ error.message }}</view>
       <view class="pro" v-for="(item, index) in data" :key="index">
            <view class="proimg">
                <img :src="item.goods_thumb">
            </view>
            <view class="mark">
            </view>
            <view class="titles">
				<p>{{ item.name }}</p>
            </view>
            <view class="water">
                <p>&nbsp;&nbsp;&nbsp;{{ item.goods_desc }}</p>
            </view>
            <view class="price">
                <p>&nbsp;&nbsp;&nbsp;￥<span class="sp1">{{ item.goods_newPrice }}</span>&nbsp;&nbsp;
                    <span class="sp2">￥{{ item.goods_price }}</span>
                </p>
            </view>
        </view> 
		</unicloud-db>
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
		<unicloud-db
			v-slot="{data, error}"
			collection="opendb-mall-goods"
			where="_id=='6138af0feb2f8b000153307c'"
			>
		<view class="good-detail">
			<image src="../../static/proimg-1.png" style=""></image>
		</view>
		
		<!-- 商品介绍 -->
        <view class="addshop" v-for="(item, index) in data" :key="index">
            <view class="shopcar">
                <view class="shopcarimg"><img src="../../static/shopcar.png"></view>
                <view class="er">
                    <view class="num" @tap="toShopCarPage">
                        <p class="count">{{ count }}</p>
                    </view>
                </view>
                <view class="shopcartext">
                    <navigator url="../shopCart/shopCart">购物车</navigator>
                </view>
            </view>
            <view class="shu"></view>
            <view class="show">
                <view class="showimg"><img src="../../static/show.png"></view>
                <view class="showtext">
                    <p>分享</p>
                </view>
            </view>
            <view class="add" :id="item.goods_id" @tap="addshopCar">
                <p>加入购物车</p>
            </view>
        </view>
		</unicloud-db>
		<view>
			<shopCarAnimation ref="carAnmation"></shopCarAnimation>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	db.collection('opendb-mall-goods')
	.get().then((res)=>{
		console.log(res)
	}).catch((err)=>{
		console.log(err.code);
		console.log(err.message);
	})
	// 加入购物车动画组件	import shopCarAnimation from '@/components/add-shopcar-animation.vue'
	export default {
		data() {
			return {
				count: 0,
			}
		},
		onLoad: function(){
			that.count = 0;
		},
		components:{
			shopCarAnimation
		},
		methods:{
			addshopCar(e){
				console.log('加入购物车');
				console.log(e);
				// 成功的话，调用加入购物车动画
				// this.$refs.carAnmation.touchOnGoods(e);
				this.touchOnGoods(e);
			},
			// 购物车小图标动态+1
			touchOnGoods(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="less">
	@import "../../common/hcw/common.less";
	@import "../../common/hcw/prodetails.less";
	

</style>
