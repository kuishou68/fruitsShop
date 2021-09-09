<template>
	<view class="zzx-tabs">
		<view class="zzx-tabs-wrap">
			<view class="zzx-tab" v-for="(item,index) in items" :key="index" @click="_onClick(index)"
			:style="{
				width: iwidth,
				color: index === currentIndex ? activeColor : defaultColor
				}">
				<slot v-bind:item="item">
					<text class="item-title" :class="dots[index] ? 'dot-show' : ''">{{item}}</text>
				</slot>
			</view>
		</view>
		<view class="zzx-tabs-bar" :style="{
			width: iwidth,
			transform: moveDistance,
			marginTop: lineTop
		}">
			<view class="zzx-bottom-line"
			:style="{
				height: lineHeight,
				width: lineWidth,
				background: activeColor
			}"
			>			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default() {
					
				}
			},
			current: {
				type: Number,
				default: 0
			},
			defaultColor: {
				type: String,
				default: '#999999'
			},
			activeColor: {
				type: String,
				default: '#FF6633'
			},
			tabHeight: {
				type: String,
				default: '60upx'
			},
			lineHeight: {
				type: String,
				default: '3px'
			},
			lineWidth: {
				type: String,
				default: '40%'
			},
			lineTop: {
				type: String,
				default: '0px'
			}
		},
		computed: {
			iwidth() {
				const num = this.items.length;
				let w = '100%';
				if (num > 0) {
					w = (100 / num) + '%';
				}
				return w;
			},
			moveDistance() {
				let d = '';
				d = this.currentIndex * 100 + '%'
				return `translate3d(${d}, 0, 0)`;
			}
		},
		watch: {
			current(newIndex) {
				if (newIndex !== this.currentIndex) {
					this.currentIndex = newIndex
				}
			}
		},
		data() {
			return {
				currentIndex: 0,
				dots: []
			};
		},
		created() {
			this.currentIndex = this.current
			this.dots = Array(this.items.length).fill(0)
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {currentIndex:index})
				}
			},
			setDot(index) {
				// 设置红点标记
				if (index>=0 && index <this.dots.length) {
					// 如果本来就是1的话就不需要修改
					if (!this.dots[index]) {
						this.dots.splice(index, 1, 1);
					}
				}
			},
			removeDot(index) {
				// 取消红点标记
				if (index>=0 && index <this.dots.length) {
					if (this.dots[index]) {
						this.dots.splice(index, 1, 0);
					}
				}
			}
		}
	}
</script>

<style lang="scss">
.zzx-tabs {
	.zzx-tabs-wrap {
		width: 100%;
		height: 60upx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 14px;
		box-sizing: border-box;
		line-height: 60upx;
		.zzx-tab {
			box-sizing: border-box;
			text-align: center;
			color: #999999;
		}
		.item-title {
			position: relative;
		}
		.dot-show {
			&:after {
				display: inline-block;
				content: '';
				width: 5px;
				height: 5px;
				position: absolute;
				background: #ff0000;
				border-radius: 50%;
				right: -15upx;
				top: -8upx;
			}
		}
	}
	.zzx-tabs-bar {
	  display: flex;
	  justify-content: center;
	  transform-origin: 0 0;
	  transform: translate3d(100%, 0, 0);
	  transition-property: all;
	  transition-timing-function: cubic-bezier (0.645, 0.045, 0.355, 1);
	  transition-duration: 0.1s;
		.zzx-bottom-line {
			height: 2px;
			background-color: #FF6633;
			width: 40%;
		}
	}
}

</style>
