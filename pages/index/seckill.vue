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
            <view>
              <view class="goodsList">
                <img src="../../static/miaosha_03.jpg" alt="" />
                <h4>【甜葡萄】 约250g/份</h4>
                <i>(限购5份)</i>
                <p>剩余138份</p>
                <view>
                  <span>&yen 3.90</span>
                  <span>&yen 5.90</span>
                  <a href="">立即秒杀</a>
                </view>
              </view>
              <view class="goodsList">
                <img src="../../static/miaosha_03.jpg" alt="" />
                <h4>【甜葡萄】 约250g/份</h4>
                <i>(限购5份)</i>
                <p>剩余138份</p>
                <view>
                  <span>&yen 3.90</span>
                  <span>&yen 5.90</span>
                  <a href="">立即秒杀</a>
                </view>
              </view>
              <view class="goodsList">
                <img src="../../static/miaosha_03.jpg" alt="" />
                <h4>【甜葡萄】 约250g/份</h4>
                <i>(限购5份)</i>
                <p>剩余138份</p>
                <view>
                  <span>&yen 3.90</span>
                  <span>&yen 5.90</span>
                  <a href="">立即秒杀</a>
                </view>
              </view>
              <view class="goodsList">
                <img src="../../static/miaosha_03.jpg" alt="" />
                <h4>【甜葡萄】 约250g/份</h4>
                <i>(限购5份)</i>
                <p>剩余138份</p>
                <view>
                  <span>&yen 3.90</span>
                  <span>&yen 5.90</span>
                  <a href="">立即秒杀</a>
                </view>
              </view>
			  <view class="goodsList">
			    <img src="../../static/miaosha_03.jpg" alt="" />
			    <h4>【甜葡萄】 约250g/份</h4>
			    <i>(限购5份)</i>
			    <p>剩余138份</p>
			    <view>
			      <span>&yen 3.90</span>
			      <span>&yen 5.90</span>
			      <a href="">立即秒杀</a>
			    </view>
			  </view>
            </view>
          </view>
        </view>
      </view>
	</view>
</template>

<script>
	
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
