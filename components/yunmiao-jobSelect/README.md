说明：适用于职位选择，带模糊搜索分类功能使用方便，基于uview组件库开发，使用本组件请确保引入uview!!!
1. 引入文件
```
	import jobSelect from '@/components/yunmiao-jobSelect/yunmiao-jobSelect.vue'
export default {
		components: {
			jobSelect
		},
		..............
```
2.使用组件
```
<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
```
3.调用显示隐藏
```
this.$refs.jobSelect.show()
this.$refs.jobSelect.hide()
```
4.参数说明
|  参数   | 默认值  | 说明  | 类型 |
|  ----  | ----  | ---- | ---- |
| listData  | [ ]  | 选择数据 | Array |
| labelName  | 'name' | label展示字段  | String |
| valueName  | 'id' | value选中字段  | String |
| selectValue  | [] | 默认选中  | Array |
5.事件说明
|  方法   |  说明  |
|  ----  |  ---- |
| @confirem  | 返回选中的value |
6.完整示例
```
<template>
	<view>
		<view @click="show">
			<text>展开区域选择</text>
		</view>
		<jobSelect ref="jobSelect" :listData="listData" @confirem="confiremJob"></jobSelect>
	</view>
</template>
<script>
	import jobSelect from '@/components/yunmiao-jobSelect/yunmiao-jobSelect.vue'
	export default {
		components:{
			jobSelect
		},
		data() {
			return {
				listData: [{
					"id": 1,
					"name": "餐饮",
					"children": [{
						"id": 2,
						"name": "服务员",
					},{
						"id": 3,
						"name": "送餐员",
					},{
						"id": 4,
						"name": "传菜员",
					},
					{
						"id": 5,
						"name": "厨师",
					}]
				},{
					"id": 6,
					"name": "家政保洁",
					"children": [{
						"id": 7,
						"name": "保洁",
					},{
						"id": 8,
						"name": "保姆",
					},{
						"id": 9,
						"name": "月嫂",
					}]
				},{
					"id":10 ,
					"name": "美容美发",
					"children": [{
						"id": 11,
						"name": "发型师",
					}]
				}],
			};
		},
		methods:{
			show() {
				this.$refs.jobSelect.show()
			},
			confiremJob(e){
				console.log(e)
			}
		}
	}
</script>
<style lang="scss">
</style>
```

作者联系方式：

qq:1315723390

wx:ZHT131572

开发交流群：[点击加uniapp开发交流群：971617215](https://qm.qq.com/cgi-bin/qm/qr?k=9ILQir4VGU3XIXm7MtxQYrYShO-b4Zqu&jump_from=webapi)