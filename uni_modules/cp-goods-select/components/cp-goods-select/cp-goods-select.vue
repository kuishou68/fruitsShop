<template>
	<view class="cp-goods-select" :style="{height}">
		<slot name="category">
			<cp-goods-select-category @category-change="handelCategoryChange"></cp-goods-select-category>
		</slot>
		<view class="cp-goods-select_wrap">
			<slot>
			</slot>
		</view>

	</view>
</template>

<script>
	import scorll from '../scroll-mixin.js'
	//做节流用的
	var prev = Date.now();

	export default {
		name: "cp-goods-select",
		components: {},
		mixins: [scorll],
		provide() {
			return {
				goodsSelect: this
			};
		},
		props: {
			"height": {
				type: String,
				default: "500upx"
			},
			"props": {
				type: Object,
				default: function() {
					return {
						label: 'label',
						value: 'value',
						children: 'children',
					}
				}
			},
			"options": Array,
		},
		data() {
			return {};
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select(".cp-goods-select").boundingClientRect(data => {
				this._height = data.height
			}).exec();
		},
		watch: {},
		methods: {
			handelCategoryChange(e){
				this.$emit('category-change',e)
			}
		}
	}
</script>

<style lang="scss">
	@import './cp-goods-select.scss';
	
</style>
