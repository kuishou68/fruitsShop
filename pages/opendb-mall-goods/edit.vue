
<template>
  <view class="uni-container">
    <uni-forms ref="form" :value="formData" validateTrigger="bind">
      <uni-forms-item name="category_id" label="分类ID">
  <uni-easyinput placeholder="分类 id，参考`opendb-mall-categories`表" v-model="formData.category_id" />
</uni-forms-item>
<uni-forms-item name="goods_sn" label="货号" required>
  <uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both" />
</uni-forms-item>
<uni-forms-item name="name" label="名称" required>
  <uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both" />
</uni-forms-item>
<uni-forms-item name="keywords" label="关键字">
  <uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both" />
</uni-forms-item>
<uni-forms-item name="goods_desc" label="详细描述">
  <uni-easyinput placeholder="商品详细描述" v-model="formData.goods_desc" trim="both" />
</uni-forms-item>
<uni-forms-item name="goods_thumb" label="缩略图地址">
  <uni-easyinput placeholder="商品缩略图，用于在列表或搜索结果中预览显示" v-model="formData.goods_thumb" trim="both" />
</uni-forms-item>
<uni-forms-item name="goods_banner_imgs" label="banner图地址">
  <uni-file-picker file-mediatype="image" file-extname="jpg,png" :limit="3" return-type="array" v-model="formData.goods_banner_imgs" />
</uni-forms-item>
<uni-forms-item name="goods_newPrice" label="最新优惠价" required>
  <uni-easyinput placeholder="最新优惠价" type="number" v-model="formData.goods_newPrice" />
</uni-forms-item>
<uni-forms-item name="goods_price" label="价格" required>
  <uni-easyinput placeholder="价格(优惠前)" type="number" v-model="formData.goods_price" />
</uni-forms-item>
<uni-forms-item name="remain_count" label="库存数量" required>
  <uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count" />
</uni-forms-item>
<uni-forms-item name="month_sell_count" label="月销量" required>
  <uni-easyinput placeholder="月销量" type="number" v-model="formData.month_sell_count" />
</uni-forms-item>
<uni-forms-item name="total_sell_count" label="总销量" required>
  <uni-easyinput placeholder="总销量" type="number" v-model="formData.total_sell_count" />
</uni-forms-item>
<uni-forms-item name="comment_count" label="累计评论数">
  <uni-easyinput placeholder="累计评论数" type="number" v-model="formData.comment_count" />
</uni-forms-item>
<uni-forms-item name="is_real" label="是否为实物" required>
  <switch @change="binddata('is_real', $event.detail.value)" :checked="formData.is_real" />
</uni-forms-item>
<uni-forms-item name="is_on_sale" label="是否上架" required>
  <switch @change="binddata('is_on_sale', $event.detail.value)" :checked="formData.is_on_sale" />
</uni-forms-item>
<uni-forms-item name="is_alone_sale" label="是否单独销售">
  <switch @change="binddata('is_alone_sale', $event.detail.value)" :checked="formData.is_alone_sale" />
</uni-forms-item>
<uni-forms-item name="is_best" label="是否精品">
  <switch @change="binddata('is_best', $event.detail.value)" :checked="formData.is_best" />
</uni-forms-item>
<uni-forms-item name="is_new" label="是否新品">
  <switch @change="binddata('is_new', $event.detail.value)" :checked="formData.is_new" />
</uni-forms-item>
<uni-forms-item name="is_hot" label="是否热销">
  <switch @change="binddata('is_hot', $event.detail.value)" :checked="formData.is_hot" />
</uni-forms-item>
<uni-forms-item name="add_date" label="上架时间">
  <uni-datetime-picker return-type="timestamp" :value="formData.add_date" />
</uni-forms-item>
<uni-forms-item name="last_modify_date" label="最后修改时间">
  <uni-datetime-picker return-type="timestamp" :value="formData.last_modify_date" />
</uni-forms-item>
<uni-forms-item name="seller_note" label="商家备注">
  <uni-easyinput placeholder="仅商家可见" v-model="formData.seller_note" trim="both" />
</uni-forms-item>

      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
            <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-mall-goods.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'opendb-mall-goods';

  function getValidator(fields) {
    let reuslt = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        reuslt[key] = validator[key]
      }
    }
    return reuslt
  }

  export default {
    data() {
      return {
        formData: {
  "category_id": "",
  "goods_sn": "",
  "name": "",
  "keywords": "",
  "goods_desc": "",
  "goods_thumb": "",
  "goods_banner_imgs": [],
  "goods_newPrice": null,
  "goods_price": null,
  "remain_count": null,
  "month_sell_count": null,
  "total_sell_count": null,
  "comment_count": null,
  "is_real": null,
  "is_on_sale": null,
  "is_alone_sale": null,
  "is_best": null,
  "is_new": null,
  "is_hot": null,
  "add_date": null,
  "last_modify_date": null,
  "seller_note": ""
},
        formOptions: {},
        rules: {
          ...getValidator(["category_id","goods_sn","name","keywords","goods_desc","goods_thumb","goods_banner_imgs","goods_newPrice","goods_price","remain_count","month_sell_count","total_sell_count","comment_count","is_real","is_on_sale","is_alone_sale","is_best","is_new","is_hot","add_date","last_modify_date","seller_note"])
        }
      }
    },
    onLoad(e) {
      const id = e.id
      this.formDataId = id
      this.getDetail(id)
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      /**
       * 触发表单提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.submit().then((res) => {
          this.submitForm(res)
        }).catch((errors) => {
          uni.hideLoading()
        })
      },

      submitForm(value) {
        // 使用 clientDB 提交数据
        db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field('category_id,goods_sn,name,keywords,goods_desc,goods_thumb,goods_banner_imgs,goods_newPrice,goods_price,remain_count,month_sell_count,total_sell_count,comment_count,is_real,is_on_sale,is_alone_sale,is_best,is_new,is_hot,add_date,last_modify_date,seller_note').get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
        })
      }
    }
  }
</script>

