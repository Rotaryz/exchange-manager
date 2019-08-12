<template>
  <div class="edit-product">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" title="新建商品"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="商品名称" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.name"></base-input>
      </base-form-item>
      <base-form-item label="商品描述" :required="false" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.describe" limit="50" type="textarea" placeholder="输入商品描述"></base-input>
      </base-form-item>
      <base-form-item label="商品分类" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <cascade-select v-model="edit.category_id" valueKey="id" :inputStyle="{'min-width':'194px'}" size="middle" placeholder1="请选择分类"
                        placeholder2="请选择子分类"
        ></cascade-select>
      </base-form-item>
      <base-form-item label="商品编码" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.serial_number"></base-input>
      </base-form-item>
      <base-form-item label="商品重量" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.weight" type="number"></base-input>
        <span class="after-word">Kg</span>
      </base-form-item>
      <base-form-item label="生产厂商" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.manufacturer"></base-input>
      </base-form-item>
      <base-form-item label="商品主图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goods_banner_images" multiple firstTag="封面图" tip="建议图片的尺寸：750*750，支持png，jpeg，jpg格式，最多可上传5张。"
                @successImage="getGoodsBannerImages"
        ></upload>
      </base-form-item>
      <base-form-item label="商品详情图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goods_detail_images" multiple firstTag="详情图" tip="上传图片的格式png，jpeg，jpg，最多可上传15张。" :limit="15"
                @successImage="getGoodsDetailImages"
        ></upload>
      </base-form-item>
    </div>
    <title-line title="销售信息" class="top-title"></title-line>
    <div class="container">
      <base-form-item label="商品规格" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top">
        <div>
          <radio v-model="edit.specification_type" :list="specList"></radio>
          <div v-if="edit.specification_type === 1">
            <div v-for="(item,idx) in goodsSpecification" :key="idx" class="more-item-wrap">
              <base-form-item labelColor="#868DAA" label="规格名" marginBottom="14px">
                <base-input v-model="item.name" size="small">
                  <div v-if="goodsSpecification.length>1" slot="after" class="icon-delete-wrap" @click="deleteModule(idx)">
                    <div class="icon-delete"></div>
                  </div>
                </base-input>
              </base-form-item>
              <base-form-item labelColor="#868DAA" labelHeight="32px" label="规格值" marginBottom="0px" verticalAlign="top">
                <div class="spec-value-row">
                  <template v-for="(spec,i) in item.values">
                    <base-input :key="i" v-model="spec.text" size="small" clear class="value-input">
                      <div v-if="item.values.length>1" slot="after" class="icon-delete-wrap" @click="deleteSpec(idx,i)">
                        <div class="icon-delete"></div>
                      </div>
                    </base-input>
                  </template>
                  <span class="add-btn" @click="addSpecValue(idx)">添加规格值</span>
                </div>
              </base-form-item>
            </div>
            <div v-if="goodsSpecification.length<3" class="add-moudle-wrap">
              <base-button addIcon plain size="small" @click="addSpecModule">添加规格</base-button>
              <span class="tip">最多支持3组规格</span>
            </div>
          </div>
        </div>
      </base-form-item>
      <base-form-item v-if="edit.specification_type === 1" label="商品明细" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <div>
          <div class="big-list">
            <div class="list-header list-box">
              <div v-for="(item,key) in goodsSpecification" :key="key" class="list-item">{{item.name}}</div>
              <div class="list-item"><span class="required-mark">*</span>会员价</div>
              <div class="list-item"><span class="required-mark">*</span>库存</div>
            </div>
            <div class="list">
              <div v-for="(item,i) in goodsDetails" :key="i" class="list-content list-box">
                <div v-for="(spec,idx) in item.specs_attrs" :key="idx" class="list-item">
                  {{spec.attr_value}}
                </div>
                <div class="list-item">
                  <base-input v-model="item.discount_price" type="number" size="mini" clear class="value-input">
                  </base-input>
                </div>
                <div class="list-item">
                  <base-input v-model="item.saleable" type="number" size="mini" clear class="value-input"></base-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-form-item>
      <base-form-item label="商品价格" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.price" type="number"></base-input>
        <span class="after-word">元</span>
      </base-form-item>
      <base-form-item v-if="edit.specification_type !== 1" label="会员价" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.discount_price" type="number"></base-input>
        <span class="after-word">元</span>
      </base-form-item>
      <base-form-item v-if="edit.specification_type !== 1" label="库存" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.saleable" type="number"></base-input>
      </base-form-item>
    </div>
    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="submitBtn">保存</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Upload from '../../components/zb-upload/zb-upload.vue'
  import CascadeSelect from '../../components/cascade-select/cascade-select.vue'
  import TitleLine from "../../components/title-line/title-line"
  import Radio from "../../components/zb-radio/zb-radio"

  // import * as Helpers from './helpers'
  import API from '@api'

  const PAGE_NAME = 'EDIT_PRODUCT'
  const TITLE = '新建商品'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TitleLine,
      Upload,
      Radio,
      CascadeSelect
    },
    data() {
      return {
        arrRes: [],
        specList: [{label: '统一规格', id: 0}, {label: '多规格', id: 1}],
        justifyItems: [{
          key: 'name', rules: [{require: true, text: '请输入商品名称'}]
        }, {
          key: 'describe', rules: [{require: false, text: '请输入商品描述'}]
        }, {
          key: 'category_id', rules: [{require: true, text: '请选择商品分类'}]
        }, {
          key: 'serial_number', rules: [{require: true, text: '请输入商品编码'}]
        }, {
          key: 'weight', rules: [{require: true, text: '请输入商品重量'}]
        }, {
          key: 'manufacturer', rules: [{require: true, text: '请输入生产商'}]
        }, {
          key: 'goods_banner_images', rules: [{minLength: 1, text: '请上传商品主图'}, {maxLength: 5, text: '商品主图不可超过5张'}]
        }, {
          key: 'goods_detail_images', rules: [{minLength: 1, text: '请上传商品详情图'}, {maxLength: 15, text: '商品详情图不可超过15张'}]
        }, {
          key: 'price', rules: [{require: true, text: '请输入商品价格'}]
        }],
        otherJustfy: [{
          key: 'discount_price', rules: [{require: true, text: '请输入商品会员价'}]
        }, {
          key: 'saleable', rules: [{require: true, text: '请输入商品库存'}]
        }],
        goodsSpecification: [{
          "name": "",
          "attr_id": 0,
          "values": [
            {
              "text": "",
              "attr_detail_id": 0
            }
          ]
        }],
        goodsDetails: [],

        edit: {
          name: '',
          describe: '',
          category_id: '',
          serial_number: '',
          weight: '',
          manufacturer: '',
          goods_detail_images: [],
          // goodsDetailPic: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F29%2F1564383114632-777951',
          goods_banner_images: [],
          specification_type: 0,
          price: '',
          discount_price: '',
          inventory: ''
        },
      }
    },
    watch: {
      goodsSpecification: {
        deep: true,
        handler(val) {
          this.goodsDetails = this.getDetails(val)
        }
      }
    },
    methods: {
      deleteModule(idx) {
        this.goodsSpecification.splice(idx, 1)
      },
      deleteSpec(idx, i) {
        this.goodsSpecification[idx].values.splice(i, 1)
      },
      getGoodsBannerImages(arr) {
        console.log(arr, 'getGoodsBannerImages')
        arr.forEach(item => {
          item = item.data
          this.edit.goods_banner_images.push({
            id: 0,
            image_url: item.url,
            image_id: item.id,
          })
        })

      },
      getGoodsDetailImages(arr) {
        arr.forEach(item => {
          item = item.data
          this.edit.goods_detail_images.push({
            id: 0,
            image_url: item.url,
            image_id: item.id,
          })
        })
      },
      cancelBtn() {
        this.$router.go(-1)
      },
      addSpecValue(idx) {
        this.$set(this.goodsSpecification[idx].values, this.goodsSpecification[idx].values.length, {
          "text": "",
          "attr_detail_id": 0
        })
      },
      addSpecModule() {
        this.$set(this.goodsSpecification, this.goodsSpecification.length, {
          name: "",
          attr_id: 0,
          values: [
            {
              text: "",
              attr_detail_id: 0
            }
          ]
        })
      },
      getDetails(arr) {
        if (arr.length <= 0) return []
        let arrRes = []
        arr[0].values.forEach((val, i) => {
          if (arr[1]) {
            arr[1].values.forEach((val1, j) => {
              // console.log('arr[2]------', arr[2])
              if (arr[2]) {
                arr[2].values.forEach((val2, k) => {
                  // console.log('arr[3]------', arr[3])
                  if (arr[3]) {
                    return false
                  } else {
                    let obj = {}
                    obj.specs_attrs = [{
                      attr_id: arr[0].attr_id, attr_name: arr[0].name, attr_value: val.text, attr_detail_id: 0
                    }, {
                      attr_id: arr[1].attr_id, attr_name: arr[1].name, attr_value: val1.text, attr_detail_id: 0
                    }, {
                      attr_id: arr[2].attr_id, attr_name: arr[2].name, attr_value: val2.text, attr_detail_id: 0
                    }]
                    obj.discount_price = 0
                    obj.saleable = 0
                    obj.spec_id = 0
                    arrRes.push(obj)
                  }
                })
              } else {
                let obj = {}
                obj.specs_attrs = [{
                  attr_id: arr[0].attr_id, attr_name: arr[0].name, attr_value: val.text, attr_detail_id: 0
                }, {
                  attr_id: arr[1].attr_id, attr_name: arr[1].name, attr_value: val1.text, attr_detail_id: 0
                }]
                obj.discount_price = 0
                obj.saleable = 0
                obj.spec_id = 0
                arrRes.push(obj)
              }
            })
          } else {
            let obj = {}
            obj.specs_attrs = [{attr_id: arr[0].attr_id, attr_name: arr[0].name, attr_value: val.text, attr_detail_id: 0}]
            obj.discount_price = 0
            obj.saleable = 0
            obj.spec_id = 0
            arrRes.push(obj)
          }
        })
        console.log('arrRes:', arrRes)
        return arrRes
      },
      submitBtn() {
        let over = false
        for (let i = 0; i < this.justifyItems.length; i++) {
          let item = this.justifyItems[i]
          for (let j = 0; j < item.rules.length; j++) {
            let rule = item.rules[j]
            let value = this.edit[item.key]
            let rulesRes = (rule.require && !value) || (rule.maxLength && value.length > rule.maxLength) || (rule.minLength && value.length < rule.minLength)
            if (rulesRes) {
              this.$toast.show(rule.text)
              over = true
              break
            }
          }
          if (over) break
        }
        if(!over) this._addGoods()
      },
      _addGoods() {
        let {price, discount_price: discountPrice, saleable, ...params} = this.edit
        let specsAttrs = []
        let goodsSpecs = []
        if (this.specification_type) {
          specsAttrs = this.goodsSpecification
          goodsSpecs = this.goodsDetails.map(item => {
            item.price = price
            return item
          })
        } else {
          goodsSpecs = [{
            "spec_id": 0,
            "price": price,
            "discount_price": discountPrice,
            "saleable": saleable,
          }]
        }
        let data = {
          ...params, specs_attrs: specsAttrs, goods_specs: goodsSpecs
        }
        console.log('addGoods', data)
        API.Goods.addGoods({
          data
        }).then(()=>{
          this.$router.go(-1)
        })
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .icon-delete-wrap
    position absolute
    top: 50%
    transform translateY(-50%)
    right: 0px
    padding: 10px

    .icon-delete
      width: 13px
      height: 13px
      background-image url("./icon-delet@2x.png")
      background-size 100%


  .edit-product
    width: 100%

    .top-title
      padding-top: 3px

    .container
      padding: 24px 20px 8px 30px
      background-color $color-white

    .first-category-item
      margin-right 12px

    .after-word
      margin-left: 10px

    .more-item-wrap
      min-width: 700px
      max-width: 100%
      background-color #F4F8F9
      padding: 20px 20px 10px
      margin: 20px 0

      .spec-value-row
        flex-wrap wrap

      .add-btn
        color: $color-main
        font-size $font-size-14
        margin-left: 14px
        white-space nowrap

      .value-input
        margin-right: 10px
        margin-bottom: 10px

        &:last-child
          margin-right: 0px

    .add-moudle-wrap
      margin-bottom: 16px

    .tip
      font-size $font-size-14
      color: $color-text-sub
      margin-left: 10px

    .big-list
      min-width: 700px
</style>
