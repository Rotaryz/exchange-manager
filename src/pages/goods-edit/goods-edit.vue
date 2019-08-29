<template>
  <div class="edit-product child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'商品'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="商品名称" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.name"></base-input>
      </base-form-item>
      <base-form-item label="商品描述" :required="false" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                      verticalAlign="top"
      >
        <base-input v-model="edit.describe" limit="50" type="textarea" placeholder="输入商品描述"></base-input>
      </base-form-item>
      <!-- b端 集采特有-->
      <template v-if="edit.type===1">
        <base-form-item label="商品类型" :required="false" labelMarginRight="40" labelWidth="78px" labelAlign="right">
          <base-select v-model="useType" :height="44" :data="goodsUseList" limit="50"
                       placeholder="商品类型"
          ></base-select>
        </base-form-item>
        <base-form-item label="所属品牌" :required="false" labelMarginRight="40" labelWidth="78px" labelAlign="right">
          <base-select v-model="brandId" :height="44" :data="brandList" labelKey="name" limit="50"
                       placeholder="所属品牌"
          ></base-select>
        </base-form-item>
      </template>
      <!------------>
      <base-form-item label="商品分类" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <cascade-select ref="cascadeSelect"
                        v-model="edit.category_id"
                        valueKey="id"
                        :inputStyle="{'min-width':'194px'}"
                        size="middle"
                        placeholder1="请选择分类"
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
      <!-- b端 集采特有-->
      <base-form-item v-if="edit.type===1" label="邮费信息" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <radio v-model="freightType" :list="freightList" @change="changeType"></radio>
      </base-form-item>
      <!---------------->
      <base-form-item label="商品主图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goods_banner_images" :addStyle="`margin:0 0 14px 0`" multiple firstTag="封面图"
                tip="建议图片的尺寸：750*750，支持png，jpeg，jpg格式，最多可上传5张。"
                @successImage="getGoodsBannerImages"
        ></upload>
      </base-form-item>
      <base-form-item label="商品详情图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goods_detail_images" :addStyle="`margin:0 0 14px 0`" multiple firstTag="详情图"
                tip="上传图片的格式png，jpeg，jpg，最多可上传15张。" :limit="15"
                @successImage="getGoodsDetailImages"
        ></upload>
      </base-form-item>
    </div>
    <title-line title="销售信息" class="top-title"></title-line>
    <div class="container">
      <base-form-item label="商品规格" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top">
        <div>
          <radio v-model="edit.specification_type" :list="specList" @change="changeType"></radio>
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
                    <base-input :key="i" v-model="spec.text" size="small" class="value-input">
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
      <base-form-item v-if="edit.specification_type === 1" label="商品明细" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                      verticalAlign="top"
      >
        <div>
          <div class="big-list">
            <div class="list-header list-box">
              <div v-for="(item,key) in goodsSpecification" :key="key" class="list-item">{{item.name}}</div>
              <div class="list-item list-item-input"><span class="required-mark">*</span>零售价</div>
              <!--     // 赞播优品与普通商品区别 -->
              <template v-if="edit.type===1">
                <div class="list-item list-item-input"><span class="required-mark">*</span>库存</div>
              </template>
              <template v-if="edit.type===2">
                <div class="list-item list-item-input"><span class="required-mark">*</span>现金价格(元)</div>
                <div class="list-item list-item-input"><span class="required-mark">*</span> 播豆</div>
                <div class="list-item list-item-input"><span class="required-mark">*</span>库存</div>
              </template>
            </div>
            <div class="list">
              <div v-for="(item,i) in goodsDetails" :key="i" class="list-content list-box">
                <div v-for="(spec,idx) in item.specs_attrs" :key="idx" class="list-item">
                  {{spec.attr_value}}
                </div>
                <div class="list-item list-item-input">
                  <base-input v-model="item.price" type="number" size="mini" clear class="value-input">
                  </base-input>
                </div>
                <!--     // 赞播优品与普通商品区别 -->
                <template v-if="edit.type===1">
                  <div class="list-item list-item-input">
                    <base-input v-model="item.saleable" type="number" size="mini" clear class="value-input"></base-input>
                  </div>
                </template>
                <template v-if="edit.type===2">
                  <div class="list-item  list-item-input">
                    <base-input v-model="item.cash_price" type="number" width="93" size="mini" clear
                                class="value-input"
                    >
                    </base-input>
                  </div>
                  <div class="list-item  list-item-input">
                    <base-input v-model="item.bean_price" type="number" width="93" size="mini" clear
                                class="value-input"
                    ></base-input>
                  </div>
                  <div class="list-item  list-item-input">
                    <base-input v-model="item.saleable" type="number" width="93" size="mini" clear
                                class="value-input"
                    >
                    </base-input>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </base-form-item>
      <!-- 单规格 -->
      <template v-if="edit.specification_type ===0 ">
        <!-- 集采商品  优品商品区别-->
        <!-- 优品商品 -->
        <base-form-item label="零售价" labelMarginRight="40" labelWidth="78px" labelAlign="right">
          <base-input v-model="edit.price" type="number"></base-input>
          <span class="after-word">元</span>
        </base-form-item>
        <template v-if="edit.type===2">
          <base-form-item label="现金价" labelMarginRight="40" labelWidth="78px" labelAlign="right">
            <base-input v-if="edit.specification_type !== 1" v-model="edit.cash_price" type="number"></base-input>
            <span class="after-word">元</span>
          </base-form-item>
          <base-form-item label="播豆" labelMarginRight="40" labelWidth="78px" labelAlign="right">
            <base-input v-if="edit.specification_type !== 1" v-model="edit.bean_price" type="number"></base-input>
            <span class="after-word">元</span>
          </base-form-item>
        </template>
        <base-form-item label="库存" labelMarginRight="40" labelWidth="78px" labelAlign="right">
          <base-input v-model="edit.saleable" type="number"></base-input>
        </base-form-item>
      </template>

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
    beforeRouteEnter(to, from, next) {
      if (to.query.id) {
        API.Goods.getGoodsDetail({
          data: {id: to.query.id},
        }).then(res => {
          next(vw => {
            vw.setData(res)
          })
        })
      } else {
        next()
      }
    },
    data() {
      return {
        arrRes: [],
        specList: [{label: '统一规格', id: 0}, {label: '多规格', id: 1}],
        // 多规格校验
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
        }],
        // 单规格校验
        otherJustfy1: [{
          key: 'price', rules: [{require: true, text: '请输入商品零售价'}]
        }, {
          key: 'saleable', rules: [{require: true, text: '请输入商品库存'}]
        }],
        otherJustfy2: [{
          key: 'price', rules: [{require: true, text: '请输入商品零售价'}]
        }, {
          key: 'bean_price', rules: [{require: true, text: '请输入播豆'}]
        }, {
          key: 'cash_price', rules: [{require: true, text: '请输入现金价'}]
        }, {
          key: 'saleable', rules: [{require: true, text: '请输入商品库存'}]
        }],
        // 商品规格
        goodsSpecification: [{
          "name": "",
          "attr_key_id": 0,
          "values": [
            {
              "text": "",
              "attr_value_id": 0
            }
          ]
        }],
        // 新生成的  商品sku列表
        goodsDetails: [],
        // 详情返回的元sku列表
        detailGoodsSpec: [],
        id: 0,
        brandList: [],
        freightList: [{label: '系统模板计算', id: 1}, {label: '免邮', id: 2}],
        goodsUseList: [{label: '兑换商品', id: 1}, {label: '自用商品', id: 2}],
        edit: {
          type: 1,
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
          // ------ 单规格-----
          // 赞播优品商品 & 集采商品
          saleable: 0,
          price: 0,
          // 赞播优品商品
          cash_price: 0,
          bean_price: 0,
        },
        specId: 0,
        useType: 1,
        brandId: '',
        freightType: 1
      }
    },
    watch: {
      goodsSpecification: {
        deep: true,
        handler(val) {
          this.getGoodsDetials()
        }
      }
    },
    created() {
      this._getBrandList()
    },
    mounted() {
      this.id = this.$route.query.id || 0
      if (this.id) {
        this.$refs.cascadeSelect.setValue({goods_id: this.id})
      } else {
        this.edit.type = +this.$route.query.type || 1
      }
    },
    methods: {
      changeType() {
        if (this.edit.specification_type && !this.goodsSpecification.length) {
          this.getGoodsDetials()
          this.goodsSpecification = [{
            "name": "",
            "attr_key_id": 0,
            "values": [
              {
                "text": "",
                "attr_value_id": 0
              }
            ]
          }]
        }
      },
      _getBrandList() {
        API.Goods.getBrandList({data: {page: 0, limit: 0, goods_id: ''}})
          .then(res => {
            this.brandList = res.data
          })
      },
      setData(res) {
        let {specs_attrs: specsAttrs, goods_specs: goodsSpecs, brand_id: brandId,freight_type:freightType,use_type:useType, ...edit} = res.data
        this.goodsSpecification = specsAttrs
        this.detailGoodsSpec = goodsSpecs
        this.edit = edit
        // 单规格

        if (!this.edit.specification_type) {
          let obj = this.detailGoodsSpec[0]
          this.saleable = obj.saleable
          this.edit.price = obj.price
          // 赞播优品与普通商品区别
          if (this.edit.type === 2) {
            this.edit.cash_price = obj.cash_price
            this.edit.bean_price = obj.bean_price
          }
        }
        if (this.edit.type === 1) {
          this.brandId = brandId
          this.useType = useType
          this.freightType = freightType
        }
      },
      deleteModule(idx) {
        this.goodsSpecification.splice(idx, 1)
      },
      deleteSpec(idx, i) {
        this.goodsSpecification[idx].values.splice(i, 1)
      },
      getGoodsBannerImages(arr) {
        // console.log(arr, 'getGoodsBannerImages')
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
          "attr_value_id": 0
        })
      },
      addSpecModule() {
        this.$set(this.goodsSpecification, this.goodsSpecification.length, {
          name: "",
          attr_key_id: 0,
          values: [
            {
              text: "",
              attr_value_id: 0
            }
          ]
        })
      },
      getGoodsDetials() {
        this.goodsDetails = [];
        this.goodsSpecification.forEach(item => {
          this.getData(this.goodsDetails, item)
        })
      },
      getData(zum, first) {
        // 公共存的集合  第一个集合
        if (zum.length !== 0) {
          let zumto = [];
          zum.forEach(zu => {
            first.values.forEach(item => {
              console.log(zu.specs_attrs,)
              let newZu = [...zu.specs_attrs, {
                attr_key_id: first.attr_key_id,
                attr_key: first.name,
                attr_value: item.text,
                attr_value_id: item.attr_value_id || 0
              }]
              let obj = {}
              if (this.id) {
                obj = this.getGoodsSpec(zu, this.detailGoodsSpec, newZu)
                console.log(obj)
              } else {
                obj = {...zu, specs_attrs: newZu}
              }
              zumto.push(obj)
            })
          })

          this.goodsDetails = zumto
        } else {
          first.values.forEach(item => {
            let ss = {
              spec_id: 0,
              price: 0,
              cash_price: 0,
              bean_price: 0,
              saleable: 0,
              discount_price: 0,
              specs_attrs: [{
                attr_key_id: first.attr_key_id,
                attr_key: first.name,
                attr_value: item.text,
                attr_value_id: item.attr_value_id || 0
              }]
            }
            if (this.id) {
              ss = this.getGoodsSpec(ss, this.detailGoodsSpec, ss.specs_attrs)
            }
            zum.push(ss);
          })
          this.goodsDetails = zum;
        }
      },
      getGoodsSpec(initObj, oldGoodsSpecs, newSpecsAttrs) {
        let res = null
        let newGoodsSpec = {}
        // 详情查询 存在的sku
        if (this.id) {
          let newAttrs = newSpecsAttrs.map(item => item.attr_key_id + '_' + item.attr_value_id)
          res = oldGoodsSpecs.find(goodsSpec => {
            return goodsSpec.attr_array.length === newAttrs.length && (goodsSpec.attr_array.filter(v => newAttrs.includes(v)).length === newAttrs.length)
          })
        }
        // 如果存在此sku
        if (res) {
          newGoodsSpec.saleable = res.saleable
          newGoodsSpec.spec_id = res.spec_id
          // 赞播优品与普通商品区别
          newGoodsSpec.price = res.price
          if (this.edit.type === 2) {
            newGoodsSpec.cash_price = res.cash_price
            newGoodsSpec.bean_price = res.bean_price
          }
        } else {
          newGoodsSpec.saleable = 0
          newGoodsSpec.spec_id = 0
          newGoodsSpec.price = 0
          // 赞播优品与普通商品区别
          if (this.edit.type === 2) {
            newGoodsSpec.cash_price = 0
            newGoodsSpec.bean_price = 0
          }
        }
        newGoodsSpec.specs_attrs = newSpecsAttrs
        return newGoodsSpec
      },
      // 提交校验
      submitBtn() {
        let over = false
        over = this.justfyMethods(this.justifyItems)
        if (over) return
        // 多规格的校验
        if (this.edit.specification_type) {
          // 规格
          for (let i in this.goodsSpecification) {
            if (!this.goodsSpecification[i].name) {
              this.$toast.show(`规格名不能为空`)
              over = true
              return
            }
            for (let j in this.goodsSpecification[i].values) {
              if (!this.goodsSpecification[i].values[j].text) {
                this.$toast.show(`规格值不能为空`)
                over = true
                return
              }
            }
          }
          for (let j in this.goodsDetails) {
            // 赞播优品与普通商品区别
            if (this.edit.type === 1) {
              if (!this.goodsDetails[j].price) {
                this.$toast.show(`价格不能为空`)
                over = true
                return
              }
            } else if (this.edit.type === 2) {
              if (!this.goodsDetails[j].cash_price) {
                this.$toast.show(`现金价格不能为空`)
                over = true
                return
              }
              if (!this.goodsDetails[j].bean_price) {
                this.$toast.show(`播豆不能为空`)
                over = true
                return
              }
            }
            if (!this.goodsDetails[j].saleable) {
              this.$toast.show(`库存不能为空`)
              over = true
              return
            }
          }
        } else {
          let others = this.edit.type === 1 ? this.otherJustfy1 : this.otherJustfy2
          over = this.justfyMethods(others)
        }
        // 赞播优品与普通商品区别

        if (!over) this._addGoods()
      },
      justfyMethods(arr) {
        let over = false
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
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
        return over
      },
      _addGoods() {
        let {price, cash_price: cashPrice, bean_price: beanPrice, saleable, ...params} = this.edit
        let specsAttrs = []
        let goodsSpecs = this.goodsDetails
        // 多规格
        if (this.edit.specification_type) {
          specsAttrs = this.goodsSpecification
        } else {
          // 单规格
          goodsSpecs = [{
            "spec_id": this.specId,
            "price": price,
            "saleable": saleable
          }]
          // 赞播优品与普通商品区别
          if (this.edit.type === 2) {
            goodsSpecs[0].cash_price = cashPrice
            goodsSpecs[0].bean_price = beanPrice
          }
        }
        let data = {
          ...params, specs_attrs: specsAttrs, goods_specs: goodsSpecs
        }
        // 编辑
        if (this.id) data.id = this.id
        // 集采商品
        if (this.edit.type === 1) {
          data.use_type = this.useType
          data.brand_id = this.brandId
          data.freight_type = this.freightType
        }
        //  编辑 or 新增
        let requestName = this.id ? 'editGoods' : 'addGoods'
        API.Goods[requestName]({
          data
        }).then(() => {
          this.$emit('update')
          this.$router.go(-1)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .list-item.list-item-input
    flex-shrink 0
    min-width: 127px

  .icon-delete-wrap
    position absolute
    top: -14px
    right: -13px
    padding: 10px

    .icon-delete
      width: 13px
      height: 13px
      background-image url("./icon-delet@2x.png")
      background-size 100%

  .edit-product
    width: 100%
    position absolute

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
      min-width: 860px
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
      min-width: 860px
</style>
