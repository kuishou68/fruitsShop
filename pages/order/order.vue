<template>
	<view>
		<!-- 切换菜单栏 -->
		<!-- <view class="nav-wrapper">
			<zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs">
			</zzx-tabs>
		</view> -->
		<!-- 选项卡 -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button" activeColor="#ff3861"></uni-segmented-control>
        <unicloud-db
			v-slot:default="{data, loading, error, options}"
			collection="uni-id-base-order"
			orderby="_id asc"
			>
		<view class="content" v-for="(item, index) in data" :key="index">
			<!-- 小程序 -->
            <view v-show="current === 0" >
				<!--订单1-->
                <view class="goods" >
                	<view class="g-top">
                		<view class="top-left">
                			<span class="iconfont iconshizhong"></span>
                			<text>{{ item.create_time | formatData}}</text>
                			<view class="order-img"><img src="../../static/order.png" alt=""></view>
                		</view>
                		<text class="top-right">已完成</text>
                	</view>
                	<view class="g-img">
						<img :src="item.goods_thumb" alt="">
						<img :src="item.goods_thumb2" alt="" v-show="true" style="display: none;">
						<img :src="item.goods_thumb3" alt="" v-show="true">
						<img :src="item.goods_thumb4" alt="" v-show="true">
					</view>
                	<view class="g-bottom">
                		<view class="bottom-left">
                			<view>共计 {{ item.count }} 件商品</view>
                			<view class="sum">合计：<text>￥{{item.total_fee}}</text></view>
                		</view>
                		<view class="bottom-right">
                			<button type="submit" class="btn del" >删除订单</button>
                			<button type="default" class="btn res">再来一单</button>
                		</view>
                	</view>
                </view>
              
			</view>
			
            <!--拼团-->
			<view v-show="current === 1">
				<!-- 拼团订单1 -->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods02.png" alt="">
				        <view class="g-img-right">
				            <text>甜蜜水润！&nbsp;【8.8元/个】新疆甜蜜瓜</text>
				            <view class="num01">
				                <text>1个/每份</text>
				                <text>X1</text>
				            </view><br>
				            <view class="num02">
				                <text class="price1">￥9.90</text>
				                <text class="price2">￥8.80</text>
				            </view>
				        </view>
				    </view>
				    <view class="g-bottom">
						<view class="bottom-left">
							<text>完成时间：</text>
							<view class="sum">2020-08-05 09:30:23</view>
						</view>
				        <view class="bottom-right">
				            <button class="btn del-p">删除订单</button>
				        </view>
				    </view>
				</view>
				<!-- 拼团订单2 -->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods01.png" alt="">
				        <view class="g-img-right">
				            <text>纯甜到爆 &nbsp;【3.8元/斤】纯甜砂糖桔</text>
				            <view class="num01">
				                <text>1个/每份</text>
				                <text>X1</text>
				            </view>
				            <view class="num02">
				                <text class="del-line">￥4.90</text>
				                <text class="price2">￥3.80</text>
				            </view>
				        </view>
				    </view>
				    <view class="g-bottom">
				    	<view class="bottom-left">
				    		<text>完成时间：</text>
				    		<view class="sum">2020-07-15 08:30:23</view>
				    	</view>
				        <view class="bottom-right">
				            <button class="btn del-p">删除订单</button>
				        </view>
				    </view>
				</view>
				<!-- 拼团订单3 -->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods02.png" alt="">
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
				    	<view class="bottom-left">
				    		<text>完成时间：</text>
				    		<view class="sum">2020-08-05 09:30:23</view>
				    	</view>
				        <view class="bottom-right">
				            <button class="btn del-p">删除订单</button>
				        </view>
				    </view>
				</view>
				
			</view>
			<!--预售-->
			<view v-show="current === 2">
				<!-- 预售订单1-->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods03.png" alt="">
				        <view class="g-img-right">
				            <text>芒果盒子&nbsp;1盒/份</text>
				            <text class="title2">预售芒果盒子1盒周五提货</text>
				            <view class="num02">
				                <text class="price2">￥12.80</text>
				                <text class="price1">￥18.80</text>
				            </view>
				        </view>
				        <text class="sum">x1</text>
				    </view>
				    <view class="g-presale-bottom">
				        <view class="bottom-right">
				            <button class="btn del-y">删除订单</button>
				        </view>
				    </view>
				</view>
				<!-- 预售订单2 -->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods03.png" alt="">
				        <view class="g-img-right">
				            <text>芒果盒子&nbsp;1盒/份</text>
				            <text class="title2">预售芒果盒子1盒周五提货</text>
				            <view class="num02">
				                <text class="price2">￥12.80</text>
				                <text class="price1">￥18.80</text>
				            </view>
				        </view>
				        <text class="sum">x1</text>
				    </view>
				    <view class="g-presale-bottom">
				        <view class="bottom-right">
				            <button class="btn del-y">删除订单</button>
				        </view>
				    </view>
				</view>
				<!-- 预售订单3 -->
				<view class="goods">
				    <view class="g-top">
				        <view class="top-left">
				            <text>订单编号：</text>
				            <text>082122214892941089</text>
				        </view>
				        <text class="top-right">已完成</text>
				    </view>
				    <view class="g-center">
				        <img src="../../static/goods03.png" alt="">
				        <view class="g-img-right">
				            <text>芒果盒子&nbsp;1盒/份</text>
				            <text class="title2">预售芒果盒子1盒周五提货</text>
				            <view class="num02">
				                <text class="price2">￥12.80</text>
				                <text class="price1">￥18.80</text>
				            </view>
				        </view>
				        <text class="sum">x1</text>
				    </view>
				    <view class="g-presale-bottom">
				        <view class="bottom-right">
				            <button class="btn del-y">删除订单</button>
				        </view>
				    </view>
				</view>
				
			</view>
			<!--门店-->
			<view v-show="current === 3">
				<view class="store-wrapper">
					<view class="store-center">
						<img src="../../static/no_order.png" alt="">
						<text>竟然一个订单都没有！</text><br />
						<text>“快去门店下一单吧^_^”</text>
					</view>
				</view>
				
			</view>
			
        </view>
		</unicloud-db>
		<!--底部栏-->
		<Footer></Footer>
	</view>
</template>

<script>
	// 引入iconfont
	import '../../common/iconfont.css'
	// 引入重置样式
	import '../../common/way/reset.css'
	// tab 选项卡
	import zzxTabs from "@/components/zzx-tabs/zzx-tabs.vue"
	// 底部栏
	import Footer from '../../components/song-footer/song-footer.vue'
	const db = uniCloud.database()
	db.collection('uni-id-base-order')
	.get().then((res)=>{
		console.log(res);
	}).catch((err)=>{
		console.log(err.code);
		console.log(err.message);
	})
	export default {
		data() {
			return {
				current: 0,
				// items: ['小程序', '拼团', '预售', '门店'],
			}
		},
		components: {
			zzxTabs,
			Footer
		},
		
		methods: {
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
		},
		// 服务器端时间戳格式化处理
		filters:{
			formatData:function(timer){
				var arrTimestamp = (timer + '').split('');
				for (var start = 0; start < 13; start++) {
					if (!arrTimestamp[start]) {
						arrTimestamp[start] = '0';
					}
				}
				var Etime = arrTimestamp.join('') * 1; //参数时间
				var Etimer = new Date(Etime)
				
				var Eyear = Etimer.getFullYear(); //取得4位数的年份
				var Emonth = Etimer.getMonth() + 1 < 10 ? '0' + (Etimer.getMonth() + 1) : Etimer.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
				var Edate = Etimer.getDate()< 10 ? '0' + Etimer.getDate() : Etimer.getDate(); //返回日期月份中的天数（1到31）
				var Ehour = Etimer.getHours() < 10 ? '0' + Etimer.getHours() : Etimer.getHours(); //返回日期中的小时数（0到23）
				var Eminute = Etimer.getMinutes() < 10 ? '0' + Etimer.getMinutes() : Etimer.getMinutes(); //返回日期中的分钟数（0到59）
				
				return Eyear + "-" + Emonth + "-" + Edate + " " + Ehour + ":" + Eminute
			}
		}
	}
	
</script>

<style lang="less" scoped>
	// 全局样式
	@import "../../common/way/common.less";
	// 小程序
	@import "../../common/way/applets.less";
	// 拼团
	@import "../../common/way/joinAGroup.less";
	// 预售
	@import "../../common/way/preSale.less";
	// 门店
	@import "../../common/way/store.less";
	
</style>
