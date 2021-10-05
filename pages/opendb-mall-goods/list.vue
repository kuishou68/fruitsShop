
<template>
  <view>
    <view class="uni-header">
      <view class="uni-group">
        <view class="uni-title"></view>
        <view class="uni-sub-title"></view>
      </view>
      <view class="uni-group">
        <input class="uni-search" type="text" v-model="query" @confirm="search" placeholder="请输入搜索内容" />
        <button class="uni-button" type="default" size="mini" @click="search">搜索</button>
        <button class="uni-button" type="default" size="mini" @click="navigateTo('./add')">新增</button>
        <button class="uni-button" type="default" size="mini" :disabled="!selectedIndexs.length" @click="delTable">批量删除</button>
      </view>
    </view>
    <view class="uni-container">
      <unicloud-db ref="udb" collection="opendb-mall-goods" field="category_id,goods_sn,name,keywords,goods_desc,goods_thumb,goods_banner_imgs,goods_newPrice,goods_price,remain_count,month_sell_count,total_sell_count,comment_count,is_real,is_on_sale,is_alone_sale,is_best,is_new,is_hot,add_date,last_modify_date,seller_note" :where="where" page-data="replace"
        :orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
        v-slot:default="{data,pagination,loading,error,options}" :options="options">
        <uni-table :loading="loading" :emptyText="error.message || '没有更多数据'" border stripe type="selection" @selection-change="selectionChange">
          <uni-tr>
              <uni-th align="center">分类ID</uni-th>  <uni-th align="center">货号</uni-th>  <uni-th align="center">名称</uni-th>  <uni-th align="center">关键字</uni-th>  <uni-th align="center">详细描述</uni-th>  <uni-th align="center">缩略图地址</uni-th>  <uni-th align="center">banner图地址</uni-th>  <uni-th align="center">最新优惠价</uni-th>  <uni-th align="center">价格</uni-th>  <uni-th align="center">库存数量</uni-th>  <uni-th align="center">月销量</uni-th>  <uni-th align="center">总销量</uni-th>  <uni-th align="center">累计评论数</uni-th>  <uni-th align="center">是否为实物</uni-th>  <uni-th align="center">是否上架</uni-th>  <uni-th align="center">是否单独销售</uni-th>  <uni-th align="center">是否精品</uni-th>  <uni-th align="center">是否新品</uni-th>  <uni-th align="center">是否热销</uni-th>  <uni-th align="center">上架时间</uni-th>  <uni-th align="center">最后修改时间</uni-th>  <uni-th align="center">商家备注</uni-th>  
            <uni-th width="204" align="center">操作</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,index) in data" :key="index">
               <uni-td align="center"> {{item.category_id}} </uni-td>    <uni-td align="center"> {{item.goods_sn}} </uni-td>    <uni-td align="center"> {{item.name}} </uni-td>    <uni-td align="center"> {{item.keywords}} </uni-td>    <uni-td align="center"> {{item.goods_desc}} </uni-td>    <uni-td align="center"> {{item.goods_thumb}} </uni-td>    <uni-td align="center"> <template v-for="(file, j) in item.goods_banner_imgs">
                    <uni-file-picker v-if="file.fileType == 'image'" :value="file" :file-mediatype="file.fileType" :imageStyles="imageStyles" readonly></uni-file-picker>
                    <uni-link v-else :href="file.url" :text="file.url"></uni-link>
                </template> </uni-td>    <uni-td align="center"> {{item.goods_newPrice}} </uni-td>    <uni-td align="center"> {{item.goods_price}} </uni-td>    <uni-td align="center"> {{item.remain_count}} </uni-td>    <uni-td align="center"> {{item.month_sell_count}} </uni-td>    <uni-td align="center"> {{item.total_sell_count}} </uni-td>    <uni-td align="center"> {{item.comment_count}} </uni-td>    <uni-td align="center"> {{item.is_real == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center"> {{item.is_on_sale == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center"> {{item.is_alone_sale == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center"> {{item.is_best == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center"> {{item.is_new == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center"> {{item.is_hot == true ? '✅' : '❌'}} </uni-td>    <uni-td align="center">     <uni-dateformat :date="item.add_date" :threshold="[0, 0]" /> </uni-td>    <uni-td align="center">     <uni-dateformat :date="item.last_modify_date" :threshold="[0, 0]" /> </uni-td>    <uni-td align="center"> {{item.seller_note}} </uni-td>   
            <uni-td align="center">
              <view class="uni-group">
                <button @click="navigateTo('./edit?id='+item._id, false)" class="uni-button" size="mini" type="primary">修改</button>
                <button @click="confirmDelete(item._id)" class="uni-button" size="mini" type="warn">删除</button>
              </view>
            </uni-td>
          </uni-tr>
        </uni-table>
        <view class="uni-pagination-box">
          <uni-pagination show-icon :page-size="pagination.size" v-model="pagination.current" :total="pagination.count"
            @change="onPageChanged" />
        </view>
      </unicloud-db>
    </view>
  </view>
</template>

<script>
  import { enumConverter } from '../../js_sdk/validator/opendb-mall-goods.js';

  const db = uniCloud.database()
  // 表查询配置
  const dbOrderBy = '' // 排序字段
  const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表
  // 分页配置
  const pageSize = 20
  const pageCurrent = 1

  export default {
    data() {
      return {
        query: '',
        where: '',
        orderby: dbOrderBy,
        selectedIndexs: [],
        options: {
          pageSize,
          pageCurrent,
          ...enumConverter
        },
        imageStyles: {
          width: 64,
          height: 64
        }
      }
    },
    methods: {
      getWhere() {
        const query = this.query.trim()
        if (!query) {
          return ''
        }
        const queryRe = new RegExp(query, 'i')
        return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
      },
      search() {
        const newWhere = this.getWhere()
        const isSameWhere = newWhere === this.where
        this.where = newWhere
        if (isSameWhere) { // 相同条件时，手动强制刷新
          this.loadData()
        }
      },
      loadData(clear = true) {
        this.$refs.udb.loadData({
          clear
        })
      },
      onPageChanged(e) {
        this.$refs.udb.loadData({
          current: e.current
        })
      },
      navigateTo(url, clear) {
        // clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
        uni.navigateTo({
          url,
          events: {
            refreshData: () => {
              this.loadData(clear)
            }
          }
        })
      },
      // 多选处理
      selectedItems() {
        var dataList = this.$refs.udb.dataList
        return this.selectedIndexs.map(i => dataList[i]._id)
      },
      // 批量删除
      delTable() {
        this.$refs.udb.remove(this.selectedItems())
      },
      // 多选
      selectionChange(e) {
        this.selectedIndexs = e.detail.index
      },
      confirmDelete(id) {
        this.$refs.udb.remove(id)
      }
    }
  }
</script>
<style>
</style>
