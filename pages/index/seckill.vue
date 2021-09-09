<template>
	<view>
		<view class="box-t">
        <img src="../../static/miaosha_02.jpg" alt="" />
      </view>
      <view class="box-b">
        <view class="box-b-c">
          <view class="qianggou">
            <img src="../../static/miaosha_01.jpg" alt="" />
            <h3>正在抢购</h3>
          </view>
          <view class="jishi">
			  <uni-countdown 
				:show-day="false" 
				:hour="12" 
				:minute="12" 
				:second="12" 
				showColon="true" 
				color="#fff"
				backgroundColor="#333"
				></uni-countdown>
		  </view>
          <view class="chanping">
				<unicloud-db
					v-slot:default="{data}"
					collection="opendb-mall-goods"
				 >
				 <view class="goodsList" v-for="(item, index) in data" :key="index">
				   <img :src="item.goods_thumb" alt="" />
				   <h4>{{ item.name }}</h4>
				   <i>(限购5份)</i>
				   <p>剩余{{ item.remain_count }}份</p>
				   <view>
				     <span>&yen {{ item.goods_price }}</span>
				     <span>&yen {{ item.goods_newPrice }}</span>
				     <a href="">立即秒杀</a>
				   </view>
				 </view>
				 </unicloud-db>

          </view>
        </view>
      </view>
	</view>
</template>

<script>
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
        data(){
            return{

            }
        },
        components:{

        },
        methods: {
            
        }
        
    }
</script>

<style lang="less">
	@import '../../common/jhc/miaosha.less';
	// @import '../../common/jhc/miaosha.css';
</style>
