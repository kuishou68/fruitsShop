//做节流用的
var prev = Date.now();

export default {

	data() {
		return {
			// 设置滑动的距离
			scrollTop: 0,

			//滑动容器距离顶部高度
			_scrollViewTop: 0,
		}
	},
	methods: {
		/* 获取元素*/
		queryElement(id) {
			const query = uni.createSelectorQuery().in(this);
			return new Promise((resolve, reject) => {
				try {
					query.select(id).boundingClientRect(data => resolve(data)).exec();
				} catch (e) {
					reject(e)
				}
			})
		},
		/* 格式化list,使得每个list-item 具有top属性;*/
		async setListChildrenTopAttr(list, key = '#cp-goods-id-') {
			await this.$nextTick()
			let t = new Date().getTime()
			//获取顶部位置
			const data = await this.queryElement("#top-anchor");
			this._scrollViewTop = data.top;
			//计算分类区间
			var i = 0;
			for (; i < list.length; i++) {
				const data = await this.queryElement(key + i);
				let top = data.top - this._scrollViewTop,
					bottom = top + data.height;
				if (key === '#cp-goods-id-') {
					list[i]._rect = [top, bottom]
				} else {
					list[i]._rectMenu = [top, bottom]
				}
			}

			console.log('init time:', new Date().getTime() - t)
		},
		setScrollTop(target = 0) {
			this.scrollTop = target - 1;
			this.$nextTick(() => this.scrollTop = target);
		},
	}
}
