<template>
	<scroll-view :scroll-top="scrollTop" :style="{'height':height}" @scrolltolower="$emit('scrolltolower',$event)"
	 @scroll="handleScroll" class="cp-goods-select-goods" :scroll-with-animation="false" :scroll-y="true">
		<view id="top-anchor"></view>
		<!-- 列表插槽 -->
		<template v-for="(item,index) in options">
			<view :key="index" :id="'cp-goods-id-'+index">
				<view v-if="classify" class="cp-goods-select-goods__classify">
					<slot name="classify" v-bind:scope="item">
						<text class="cp-goods-select-goods__classify_text">{{item[labelKey]}}</text>
					</slot>
				</view>
				<view :class="['cp-goods-select-goods__list' , customClass]">
					<view v-for="(goods,g_index) in item[childrenKey]" :key="g_index" class="cp-goods-select-goods__list_wrap">
						<!-- 列表项插槽 -->
						<slot v-bind:scope="goods">
						</slot>
					</view>
				</view>
			</view>
		</template>
		<view class="cp-goods-select-goods__placeholder" :style="{'padding-bottom':(height/2)+'px'}"></view>
	</scroll-view>

</template>

<script>
	import scorll from '../scroll-mixin.js'

	export default {
		name: "cp-goods-select-goods",
		mixins: [scorll],
		inject: ['goodsSelect'],
		props: {
			"props": Object,
			"customClass": String,
			"classify": {
				type: Boolean,
				default: true
			}, //商品列表是否显示分类
		},
		data() {
			return {
				topWatcher: 0,
				isCreated:false,
			};
		},
		created() {
			this.isCreated = true
		},
		computed: {
			height(){
				return this.goodsSelect? this.goodsSelect.height : '80vh'
			},
			valueKey(){
				let key = 'value'
				if(this.goodsSelect && this.goodsSelect.props) key = this.goodsSelect.props.value
				if(this.props) key = this.props.value
				return key
			},
			labelKey(){
				let key = 'label'
				if(this.goodsSelect && this.goodsSelect.props) key = this.goodsSelect.props.label
				if(this.props) key = this.props.label
				return key
			},
			childrenKey(){
				let key = 'children'
				if(this.goodsSelect && this.goodsSelect.props) key = this.goodsSelect.props.children
				if(this.props) key = this.props.children
				return key
			},
			options() {
				return this.isCreated ? this.goodsSelect.options : [];
			}
		},
		watch: {
			"goodsSelect.options": {
				immediate: true,
				async handler(v) {
					await this.$nextTick()
					this.setListChildrenTopAttr(v)
				}
			}
		},
		async mounted() {
			this.goodsSelect.$on('set-scroll-top', (data, instance) => {
				this.setScrollTop(data._rect[0])
			})
		},
		methods: {
			/* 商品<scroll-view> 滑动事件*/
			handleScroll({
				target
			}) {
				this.topWatcher = target.scrollTop;
				for (var i = 0; i < this.goodsSelect.options.length; i++) {
					let menu = this.goodsSelect.options[i]
					if(!menu._rect)return
					let top = menu._rect[0],
						bottom = menu._rect[1]
					/* 正常事件 */
					if (this.topWatcher + 10 >= top && this.topWatcher < bottom) {
						this.goodsSelect.$emit('set-category', menu)
					};
				}
			},
		}
	}
</script>

<style lang="scss" >
	@import '../cp-goods-select/cp-goods-select.scss';
</style>
