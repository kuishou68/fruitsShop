<template>
	<scroll-view class="cp-goods-select-category" :style="{'height':height}" :scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="false">
		<view id="top-anchor"></view>
		<view class="cp-goods-select-category__wrap">
			<template v-for="(category,index) in options">
				<view :key="index" :id="'category-' + index" :class="{'cp-goods-select-category-item':true,'cp-goods-select-category-hl': isHighLight(category) }"
				 @click="handelClick(category)">
					<!-- 菜单项插槽 -->
					<slot v-bind:scope="category">
						{{category[labelKey]}}
					</slot>
				</view>
			</template>
		</view>
		<view class="cp-goods-select-category__actions">
			<!-- 菜单底部插槽 -->
			<slot name="bottom"></slot>
		</view>
	</scroll-view>
</template>

<script>
	import scorll from '../scroll-mixin.js'

	export default {
		name: "cp-goods-select-category",
		inject: ['goodsSelect'],
		mixins: [scorll],
		props: {
			"value": String,
			"props": Object,
		},
		data() {
			return {
				selected: "",
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
			value: {
				immediate: true,
				handler(v) {
					if (this.options.length) {
						let key = this.valueKey
						let selected = this.options.find(res => v == res[key])
						this.selected = selected
					}
				}
			},
			"options": {
				immediate: true,
				async handler(v) {
					if (!v.length) {
						this.selected = ""
						return;
					}
					
					this.setListChildrenTopAttr(v, '#category-');

					if (this.selected) {
						return
					}
					if(this.value){
						let key = this.valueKey
						let selected = v.find(res => this.value == res[key])
						this.selected = selected
					}else{
						this.selected = v[0]
					}
				}
			},
			selected(v) {
				if (v) {
					this.$emit('input', v[this.valueKey])
					this.goodsSelect.$emit('category-change', v)
				}
			}
		},
		async mounted() {
			this.goodsSelect.$on('set-category', (data, instance) => {
				if(this.selected == data) return
				this.selected = data
				
				//跟随移动分类至中间位置
				clearTimeout(this._id)
				this._id = setTimeout(() => {
					this.setScrollTop(data._rectMenu[0] - this.goodsSelect._height / 2)
				}, 100);
			})
		},
		methods: {
			handelClick(object) {
				if (object && object !== this.selected) {
					this.selected = object
					this.goodsSelect.$emit('set-scroll-top', object)
				}
			},
			isHighLight(v){
				return this.selected == v
			}
		}
	}
</script>

<style lang="scss">
	@import '../cp-goods-select/cp-goods-select.scss';
</style>