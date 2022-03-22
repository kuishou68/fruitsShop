<template>
	<view>
		<view class="content">
			<view class="nav">
				<view class="nav-top">
					<view class="nav-l">
						<!-- <text class="iconfont iconchakantiezizhaopian"></text> -->
						<image class="user-logo" src="../../static/kuishou.jpg" />
						<text class="name">魁首</text>
					</view>
					<view class="nav-r">
						<text class="iconfont iconHUNhunguozhihuiyuanxitongxiaotubiao-huiyuanma"></text>
						<text class="namema">会员名</text>
					</view>
				</view>
				<ul class="local-nav">
					<li>
						<a href="#" title="分">
							<span class="local-c">263</span>
							<span class="h">积分兑好礼</span>
						</a>
					</li>
					<li>
						<a href="#" title="分">
							<span class="local-c">0</span>
							<span class="h">卡劵/红包</span>
						</a>
					</li>
					<li>
						<a href="#" title="分">
							<span class="local-c">0.00</span>
							<span class="h">余额.钱包充值</span>
						</a>
					</li>
				</ul>
			</view>
			<view>
				<ul class="local-bnav">
					<li>
						<a href="#" title="分">
							<span class="iconfont iconpingjia"></span>
							<span class="w">我的评价</span>
						</a>
					</li>

					<li>
						<a href="#" title="分">
							<span class="iconfont iconrenwuzhongxin"></span>
							<span class="w">每日签到</span>
						</a>
					</li>
					<li>
						<a href="#" title="分">
							<span class="iconfont icondianzixiaopiao"></span>
							<span class="w">电子小票</span>
						</a>
					</li>
				</ul>
			</view>
			<view>
				<ul class="subnav-entry">
					<li>
						<a href="#">
							<span class="iconfont icondingwei1"></span>
							<span class="S">收货地址</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="iconfont iconfujinmendian3"></span>
							<span class="S">附近门店</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="iconfont iconzhanghuguanli"></span>
							<span class="S">账号管理</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="iconfont iconfankui2"></span>
							<span class="S">反馈中心</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="iconfont iconkefu"></span>
							<span class="S">在线客服</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span class="iconfont iconbangzhu"></span>
							<span class="S">帮助中心</span>
						</a>
					</li>
				</ul>
			</view>
			<view class="nav-ren">
				<view class="nav-common">
					<view class="nav-common-left">
						<a href="#"><span class="ren">任务中心</span><span class="jifen">(做任务，赚积分)</span></a>
					</view>
					<view class="nav-common-right">
						<a href="#" class="jifen">更多任务></a>
					</view>
				</view>
				<view class="nav-common">
					<view class="nav-common-left">
						<a href="#"><span class="iconfont iconrenwuzhongxin2"></span><span class="qian">每日签到</span><span class="chong">签到叠加积分</span></a>
					</view>
					<view class="nav-common-right">
						<a href="#" class="pike">去签到</a>
					</view>
				</view>
				<view class="nav-common">
					<view class="nav-common-left">
						<a href="#"><span class="iconfont iconxianshangchongzhi"></span><span class="qian">线上首次充值</span><span class="chong">15积分</span></a>
					</view>
					<view class="nav-common-right">
						<a href="#" class="pike">去充值</a>
					</view>
				</view>
			</view>
			<view class="food">
				<img src="../../static/index-carousel2.png" class="img-t">
			</view>
		</view>
		<!--底部栏-->
		<Footer></Footer>
	</view>
</template>

<script>
	
	// 底部栏
	import Footer from '../../components/song-footer/song-footer.vue'
	
	export default {
		data() {
			return {
				
			}
		},
		components:{
			Footer
		},
		methods: {
			
		}
	}
</script>

<style>
	@import '../../common/iconfont.css';
	@import '../../common/yl/my.css';
	@import '../../common/yl/normalize.css';
	
</style>
