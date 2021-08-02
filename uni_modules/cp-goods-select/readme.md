# cp-goods-select
> 该组件是一款实用性的分类商品展示组件,适用于需要多层分类的场景,支持滑动自动选中，自定义菜单和商品展示等功能
> 基于 HBuilderX 3.1.0+ 的uni_modules 模块开发。

## 使用说明

--------
##### 基础用法
```
<cp-goods-select height="50vh" :props="{label:'label',value:'value',children:'children'}" :options="list" @category-change="handelCategoryChange">
	<cp-goods-select-goods customClass="cloumn-2" @scrolltolower="handelScrolltolower">
		<template v-slot="{scope}">
		   <view class="cp-goods-select-goods__item" >
			 {{ scope.label}} 
		   </view>
		 </template>
	</cp-goods-select-goods>
</cp-goods-select>
```

##### 自定义商品列表
```
<!-- 自定义商品列表 -->

<cp-goods-select height="50vh" :options="list2" @category-change="handelCategoryChange">
	<cp-goods-select-goods @scrolltolower="handelScrolltolower">
		<template v-slot:classify="{scope}">
			<!-- 分类插槽 -->
			<view style="color: #4CD964;border: 1px solid #007AFF;"> 自定义 {{ scope.label}} </view>
		</template>
		 <template v-slot="{scope}">
			 <!-- 列表插槽-->
			<view class="item" style="width: 50%;">
			  {{ scope.label}} 
			</view>
		  </template>
	</cp-goods-select-goods>
</cp-goods-select>
		
```

##### 自定义菜单
```
<!-- 自定义菜单 -->
<cp-goods-select height="50vh" :options="list4" @scrolltolower="handelScrolltolower" @category-change="handelCategoryChange">
	<template v-slot:category>
		<cp-goods-select-category>
			<template v-slot="{scope}">
				<text>{{scope.label}}</text><text class="num">3</text>
			</template>
			<template v-slot:bottom>
				<!-- 底部预留插槽 -->
				<view style="width: 100%; background-color: #007AFF; color: #fff; text-align: center;">设置</view>
			</template>
		</cp-goods-select-category>
	</template>
	<cp-goods-select-goods customClass="cloumn-1" @scrolltolower="handelScrolltolower">
		<template v-slot="{scope}">
		   <view class="cp-goods-select-goods__item" >
			 {{ scope.label}} 
		   </view>
		 </template>
		 
	</cp-goods-select-goods>
</cp-goods-select>

		
```

##### 独立商品列表
```
<!-- 独立商品列表  -->
<cp-goods-select height="50vh" :options="list3" @category-change="handelCategoryChange">
	<view class="list">
		<view  v-for="item in goods">
			<view class="item">
				{{item.label}} 
			</view>
		</view>
	</view>
</cp-goods-select>
```

##### cp-goods-select  参数说明
|字段|类型|必填|默认值|说明|
|-|-|-|-|-|
|height|String|是|500upx|scroll-view 必须指定高度|
|options|Array|是||数据集|
|props|Object|否|{label: 'label',value: 'value',children: 'children'}||


##### cp-goods-select-goods  参数说明

|字段|类型|必填|默认值|说明|
|-|-|-|-|-|
|customClass|String|否|-|默认单行展示商品，参考值：cloumn-2(商品两列展示) ；cloumn-3(商品三列展示) |
|props|Object|否|{label: 'label',value: 'value',children: 'children'}|否|
