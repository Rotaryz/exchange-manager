<template>
  <div class="edit-product child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'商品'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="商品名称" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.name" :maxlength="20" :limit="20"></base-input>
      </base-form-item>
      <base-form-item label="商品描述" :required="false" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                      verticalAlign="top"
      >
        <base-input v-model="edit.describe" limit="50" type="textarea" placeholder="输入商品描述"></base-input>
      </base-form-item>
      <!-- 礼品商品-->
      <base-form-item v-if="edit.use_type===1" label="商品分类" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <cascade-select ref="cascadeSelect"
                        v-model="categoryId"
                        valueKey="id"
                        :width="194"
                        size="middle"
                        placeholder1="请选择分类"
                        placeholder2="请选择子分类"
        ></cascade-select>
      </base-form-item>
      <!-- 自用商品-->
      <base-form-item v-if="edit.use_type===2" label="所属品牌" labelMarginRight="40" labelWidth="78px"
                      labelAlign="right"
      >
        <base-select v-model="brandId" :height="44" :data="brandList" labelKey="name" limit="50"
                     placeholder="所属品牌"
        ></base-select>
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
      <base-form-item label="销售渠道" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-checkbox-group v-model="edit.sale_channel" @select="saleChannelChange">
          <base-checkbox v-for="item in saleChannelList" :key="item.id" :value="item.id" :label="item.label"
                         :type="item.type"
          ></base-checkbox>
        </base-checkbox-group>
      </base-form-item>
      <base-form-item label="商品规格" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top">
        <div>
          <radio v-model="edit.specification_type" :list="specList" @change="changeType"></radio>
          <div v-if="edit.specification_type === 1">
            <div v-for="(item,idx) in goodsSpecification" :key="idx" class="more-item-wrap">
              <base-form-item labelColor="#868DAA" label="规格名" marginBottom="14px">
                <base-input v-model="item.name" size="small">
                </base-input>
              </base-form-item>
              <!-- 删除按钮-->
              <div v-if="goodsSpecification.length>1" class="icon-delete-wrap"
                   @click="deleteModule(idx)"
              >
                <div class="icon-delete"></div>
              </div>
              <base-form-item labelColor="#868DAA" labelHeight="32px" label="规格值" marginBottom="0px"
                              verticalAlign="top"
              >
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
            <div v-if="goodsSpecification.length<3">
              <base-button addIcon plain size="small" @click="addSpecModule">添加规格</base-button>
              <span class="tip">最多支持3组规格</span>
            </div>
          </div>
        </div>
      </base-form-item>
      <base-form-item label="商品明细" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                      verticalAlign="top"
      >
        <div>
          <div v-if="isShowChannel('purchase')" class="big-list purchase-list">
            <div class="channel-name">赞播集采</div>
            <div class="set-price-box">
              <radio v-model="levelPriceType" :list="levelPriceTypeList" @change="levelPriceTypeChange"></radio>
            </div>
            <div class="list-header list-box">
              <div v-for="(item,key) in goodsSpecification" :key="key" class="list-item">{{item.name}}</div>
              <!-- 单规格 -->
              <div v-if="edit.specification_type === 0" class="list-item"></div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>零售价(元）
              </div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>标准版价格(元)
              </div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span> 全能版价格(元)
              </div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>合伙版价格(元)
              </div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>库存</div>
            </div>
            <div class="list">
              <div v-for="(item,i) in edit.goods_specs.purchase" :key="i" class="list-content list-box">
                <div v-for="(spec,idx) in item.specs_attrs" :key="idx" class="list-item">
                  {{spec.attr_value}}
                </div>
                <!-- 单规格 -->
                <div v-if="edit.specification_type === 0" class="list-item list-item-input">
                  统一规格
                </div>
                <!--赞播集采特有-->
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.price" type="number" :isInt="true" size="mini" clear
                              class="value-input"
                              @input="priceInputHandler(item.price,i)"
                  >
                  </base-input>
                </div>
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.standard_price" :disabled="!levelPriceType" type="number" :isInt="true"
                              size="mini"
                              clear
                              class="value-input"
                  >
                  </base-input>
                </div>
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.versatile_price" :disabled="!levelPriceType" type="number" :isInt="true"
                              size="mini"
                              clear
                              class="value-input"
                  >
                  </base-input>
                </div>
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.partner_price" :disabled="!levelPriceType" type="number" :isInt="true"
                              size="mini"
                              clear
                              class="value-input"
                  >
                  </base-input>
                </div>
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.saleable" type="number" :isInt="true" size="mini" clear
                              class="value-input"
                              @input="saleableChange('purchase',i)"
                  ></base-input>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isShowChannel('bean')" class="big-list bean-list">
            <div class="channel-name bean-title">赞播优品</div>
            <div class="list-header list-box">
              <div v-for="(item,key) in goodsSpecification" :key="key" class="list-item">{{item.name}}</div>
              <!-- 单规格 -->
              <div v-if="edit.specification_type === 0" class="list-item"></div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>零售价</div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>现金价格(元)
              </div>
              <div class="list-item list-item-input" data-type="price-2"><span class="required-mark">*</span> 播豆</div>
              <div class="list-item list-item-input" data-type="price"><span class="required-mark">*</span>库存</div>
            </div>
            <div class="list">
              <div v-for="(item,i) in edit.goods_specs.bean" :key="i" class="list-content list-box">
                <div v-for="(spec,idx) in item.specs_attrs" :key="idx" class="list-item">
                  {{spec.attr_value}}
                </div>
                <!-- 单规格 -->
                <div v-if="edit.specification_type === 0" class="list-item"> 统一规格</div>
                <!--赞播优品特有-->
                <div class="list-item list-item-input" data-type="price">
                  <base-input v-model="item.price" type="number" :isInt="true" size="mini" clear
                              class="value-input"
                  >
                  </base-input>
                </div>
                <div class="list-item  list-item-input" data-type="price">
                  <base-input v-model="item.cash_price" class="value-input" type="number" :isInt="true" width="93"
                              size="mini"
                              clear
                  >
                  </base-input>
                </div>
                <div class="list-item  list-item-input" data-type="price-2">
                  <base-input v-model="item.bean_price" type="number" :isInt="true" width="93" size="mini"
                              clear
                              class="value-input"
                  ></base-input>
                </div>
                <div class="list-item  list-item-input" data-type="price">
                  <base-input v-model="item.saleable" type="number" :isInt="true" width="93" size="mini"
                              clear
                              class="value-input"
                              @input="saleableChange('bean',i)"
                  >
                  </base-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-form-item>
    </div>
    <title-line title="物流信息" class="top-title"></title-line>
    <div class="container">
      <base-form-item label="物流费用" verticalAlign="top" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                      labelHeight="44px"
      >
        <div>
          <base-form-item v-if="isShowChannel('purchase')" :required="false" label="赞播集采" labelMarginRight="10">
            <base-select v-model="edit.freight_type.purchase" :data="freightList" height="44"
                         width="194"
            ></base-select>
            <div v-if="edit.freight_type.purchase===1" class="tip">{{defaultLogisticsInfo}}</div>
          </base-form-item>
          <base-form-item v-if="isShowChannel('bean')" :required="false" label="赞播优品" labelMarginRight="10">
            <base-select v-model="edit.freight_type.bean" :data="freightList" :disabled="true" height="44"
                         width="194"
            ></base-select>
          </base-form-item>
        </div>
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
  import API from '@api'
  import {objDeepCopy} from '@utils/common'

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
        priceLevelRatioList: {
          standard_ratio: 0,
          versatile_ratio: 0,
          partner_ratio: 0
        },
        specList: [{label: '统一规格', id: 0}, {label: '多规格', id: 1}],
        levelPriceTypeList: [{label: '默认价格', id: 0}, {label: '自定义价格', id: 1}],
        levelPriceType: 0,
        freightList: [{label: '系统模板计算', id: 1}, {label: '免邮', id: 2}],
        defaultLogisticsInfo: '',
        brandList: [],
        // 商品规格
        goodsSpecification: [],
        // 新生成的  商品sku列表
        goodsDetails: [],
        // 详情返回的元sku列表
        detailGoodsSpec: {},
        id: 0,
        edit: {
          use_type: '',
          name: '',
          describe: '',
          serial_number: '',
          weight: '',
          manufacturer: '',
          goods_detail_images: [],
          goods_banner_images: [],
          sale_channel: ['purchase'],
          specification_type: 0,
          freight_type: {purchase: 1, bean: 0},
          goods_specs: {
            purchase: [{
              spec_id: 0,
              price: 0,
              standard_price: 0,
              versatile_price: 0,
              partner_price: 0,
              saleable: 0,
            }],
            bean: []
          }
        },
        specId: 0,
        brandId: '',// 品牌
        categoryId: '', // 类型
        // 多规格校验
        justifyItems: [{
          key: 'name', rules: [{require: true, text: '请输入商品名称'}]
        }, {
          key: 'describe', rules: [{require: false, text: '请输入商品描述'}]
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
        // 礼品校验
        otherJustify1: [{
          key: 'price', rules: [{require: true, text: '请输入商品零售价'}]
        }, {
          key: 'standard_price', rules: [{require: true, text: '请输入标准版价'}]
        }, {
          key: 'versatile_price', rules: [{require: true, text: '请输入全能版价'}]
        }, {
          key: 'partner_price', rules: [{require: true, text: '请输入合伙人价'}]
        }],
        // 自用校验
        otherJustify2: [{
          key: 'price', rules: [{require: true, text: '请输入商品零售价'}]
        }, {
          key: 'cash_price', rules: [{require: true, text: '请输入现金价'}]
        }, {
          key: 'bean_price', rules: [{require: true, text: '请输入播豆'}]
        }],
      }
    },
    computed: {
      saleChannelList() {
        return this.edit.use_type === 1
          ? [{label: '赞播集采', id: 'purchase'}, {label: '赞播优品', id: 'bean'}]
          : [{
            label: '赞播集采',
            id: 'purchase',
            type: 'disable'
          }]
      }
    },
    watch: {
      goodsSpecification: {
        deep: true,
        handler(val) {
          this.edit.sale_channel.forEach(channel => {
            this.getGoodsDetails(channel)
          })
        }
      }
    },
    created() {
      this._getBrandList()
      this._getPriceLevelRatioList()
      this._getDefaultLogisticsInfo()
    },
    mounted() {
      // 1 礼品商品   2 自用商品
      if (!this.id) this.edit.use_type = +this.$route.query.use_type || 1
    },
    methods: {
      // 库存
      saleableChange(type, i) {
        console.log(type, i)
        if (type === 'purchase' && this.isShowChannel('bean')) {
          this.$set(this.edit.goods_specs.bean[i], 'saleable', this.edit.goods_specs.purchase[i].saleable)
        } else if (type === 'bean' && this.isShowChannel('purchase')) {
          this.$set(this.edit.goods_specs.purchase[i], 'saleable', this.edit.goods_specs.bean[i].saleable)
        }
      },
      // 获取默认物流费用说明
      _getDefaultLogisticsInfo() {
        API.Logistics.getDefaultLogisticsInfo().then(res => {
          this.defaultLogisticsInfo = res.data && res.data.billing_description
        })
      },
      // 设置详情数据
      setData(res) {
        let {id, specs_attrs: specsAttrs, brand_id: brandId, category_id: categoryId, goods_specs: goodsSpecs, ...edit} = res.data
        this.edit = edit
        this.$set(this.edit, 'goods_specs', objDeepCopy(goodsSpecs))
        this.id = id
        if (this.edit.use_type === 1) {
          this.categoryId = categoryId
          this.$refs.cascadeSelect.setValue({goods_id: this.id})
        } else {
          this.brandId = brandId
        }
        if (res.data.goods_specs.purchase.length) this.levelPriceType = res.data.goods_specs.purchase[0].level_price_type
        this.detailGoodsSpec = objDeepCopy(goodsSpecs)
        this.goodsSpecification = specsAttrs
      },
      // 集采价格输入
      priceInputHandler(val, i) {
        let standardPrice = Number(val) * this.priceLevelRatioList.standard_ratio
        let versatilePrice = Number(val) * this.priceLevelRatioList.versatile_ratio
        let partnerPrice = Number(val) * this.priceLevelRatioList.partner_ratio
        this.$set(this.edit.goods_specs.purchase[i], 'standard_price', standardPrice < 1 ? 1 : Math.round(standardPrice))
        this.$set(this.edit.goods_specs.purchase[i], 'versatile_price', versatilePrice < 1 ? 1 : Math.round(versatilePrice))
        this.$set(this.edit.goods_specs.purchase[i], 'partner_price', partnerPrice < 1 ? 1 : Math.round(partnerPrice))
      },
      // 是否显示 对应的 销售渠道价格库存
      isShowChannel(val) {
        return this.edit.sale_channel.includes(val)
      },
      // 销售渠道修改
      saleChannelChange() {
        this.saleChannelList.forEach(item => {
          let channel = item.id
          if (this.isShowChannel(channel)) {
            // 当此前没有展示的 物流信息
            if (!this.edit.freight_type[channel]) {
              this.$set(this.edit.freight_type, channel, channel === 'purchase' ? 1 : 2)
            }
            // 当此前没有展示的 商品信息
            if (!this.edit.goods_specs[channel].length) {
              this.getGoodsDetails(channel)
            }
          } else {
            this.$set(this.edit.freight_type, channel, '')
            this.$set(this.edit.goods_specs, channel, [])
          }
        })

      },
      // 切换价格定价方式   自定义 系统计算
      levelPriceTypeChange() {
        this.edit.goods_specs.purchase.forEach(item => {
          item.level_price_type = this.levelPriceType
          if (!this.levelPriceType) {
            let standardPrice = Number(item.price) * this.priceLevelRatioList.standard_ratio
            let versatilePrice = Number(item.price) * this.priceLevelRatioList.versatile_ratio
            let partnerPrice = Number(item.price) * this.priceLevelRatioList.partner_ratio
            item.standard_price = standardPrice < 1 ? 1 : Math.round(standardPrice)
            item.versatile_price = versatilePrice < 1 ? 1 : Math.round(versatilePrice)
            item.partner_price = partnerPrice < 1 ? 1 : Math.round(partnerPrice)
          }
        })
      },
      // 获取系统定价联动
      // 多规格单规格
      changeType() {
        // 多规格
        if (this.edit.specification_type) {
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
        } else {
          this.goodsSpecification = []
        }
      },
      _getPriceLevelRatioList() {
        API.Level.getLevelList({loading: false})
          .then(res => {
            this.priceLevelRatioList.standard_ratio = res.data.find(item => item.id === 1).discount * 0.01
            this.priceLevelRatioList.versatile_ratio = res.data.find(item => item.id === 2).discount * 0.01
            this.priceLevelRatioList.partner_ratio = res.data.find(item => item.id === 3).discount * 0.01
          })
      },
      // 获取sku
      getGoodsDetails(channel) {
        this.$set(this.edit.goods_specs, channel, [])
        // 多规格
        if (this.goodsSpecification.length) {
          // 每个规格遍历
          this.goodsSpecification.forEach(item => {
            // 获取每个规格 与剩下规格 的交叉
            this.getData(channel, item)
          })
        } else {
          // 单规格
          if (this.id && this.detailGoodsSpec[channel] && this.detailGoodsSpec[channel].length === 1 && this.detailGoodsSpec[channel][0].attr_array && this.detailGoodsSpec[channel][0].attr_array.length === 0) {
            this.$set(this.edit.goods_specs, channel, objDeepCopy(this.detailGoodsSpec[channel]))
          } else {
            let obj = channel === 'purchase' ? [{
              spec_id: 0,
              price: 0,
              standard_price: 0,
              versatile_price: 0,
              partner_price: 0,
              saleable: 0,
              level_price_type: this.levelPriceType
            }] : [{
              spec_id: 0,
              price: 0,
              bean_price: 0,
              cash_price: 0,
              saleable: 0,
            }]
            this.$set(this.edit.goods_specs, channel, obj)
          }
        }
      },
      getData(channel, currentSpec) {
        // 当前 sku 容器
        let skuArr = this.edit.goods_specs[channel]
        // 第一个规格 将所有值 列为 一项 初始化的sku
        if (skuArr.length === 0) {
          currentSpec.values.forEach(item => {
            let specsAttr = [{
              attr_key_id: currentSpec.attr_key_id,
              attr_key: currentSpec.name,
              attr_value: item.text,
              attr_value_id: item.attr_value_id || 0
            }]
            // 得到 此规格的 skuArr
            let ss = this.getGoodsSpec(specsAttr, channel)
            skuArr.push(ss)
          })
          this.$set(this.edit.goods_specs, channel, skuArr)
        } else {
          // 剩余的规格
          let zumto = [];
          skuArr.forEach(zu => {
            currentSpec.values.forEach(item => {
              let newZu = [...zu.specs_attrs, {
                attr_key_id: currentSpec.attr_key_id,
                attr_key: currentSpec.name,
                attr_value: item.text,
                attr_value_id: item.attr_value_id || 0
              }]
              let obj = {}
              if (this.id) {
                obj = this.getGoodsSpec(newZu, channel)
              } else {
                obj = {...zu, specs_attrs: newZu}
              }
              zumto.push(obj)
            })
          })
          this.$set(this.edit.goods_specs, channel, zumto)
        }
      },
      // 获取外层的sku 数据
      getGoodsSpec(newSpecsAttrs, channel) {
        let res = {}
        let newGoodsSpec = {}
        // 详情查询 存在的sku
        if (this.id) {
          let newAttrs = newSpecsAttrs.map(item => item.attr_key_id + '_' + item.attr_value_id)
          res = this.detailGoodsSpec[channel].find(goodsSpec => {
            return goodsSpec.attr_array.length === newAttrs.length && (goodsSpec.attr_array.filter(v => newAttrs.includes(v)).length === newAttrs.length)
          }) || {}
        }
        newGoodsSpec.saleable = res.saleable || 0
        newGoodsSpec.spec_id = res.spec_id || 0
        newGoodsSpec.price = res.price || 0
        // 赞播集采与 赞播优品
        if (channel === 'purchase') {
          newGoodsSpec.level_price_type = this.levelPriceType
          newGoodsSpec.standard_price = res.standard_price || 0
          newGoodsSpec.versatile_price = res.versatile_price || 0
          newGoodsSpec.partner_price = res.partner_price || 0
        } else if (channel === 'bean') {
          newGoodsSpec.cash_price = res.cash_price || 0
          newGoodsSpec.bean_price = res.bean_price || 0
        }
        newGoodsSpec.specs_attrs = newSpecsAttrs
        return newGoodsSpec
      },
      // 提交校验
      submitBtn() {
        let over = false
        over = this.justifyMethods(this.justifyItems, this.edit)
        if (!over) over = this.justifySpec()
        if (!over) over = this.justifyGoodsSpecs()
        console.log(over)
        if (!over) this._addGoods()
      },

      // 规格值校验
      justifySpec() {
        let over = false
        if (this.edit.specification_type) {
          // 规格
          for (let i in this.goodsSpecification) {
            if (!this.goodsSpecification[i].name) {
              this.$toast.show(`规格名不能为空`)
              over = true
              return true
            }
            for (let j in this.goodsSpecification[i].values) {
              if (!this.goodsSpecification[i].values[j].text) {
                this.$toast.show(`规格值不能为空`)
                over = true
                return true
              }
            }
          }
        }
        return over
      },
      // 校验商品详情
      justifyGoodsSpecs() {
        let over = false
        for (let key in  this.edit.goods_specs) {
          let goodsSpec = this.edit.goods_specs[key]
          for (let a = 0; a < goodsSpec.length; a++) {
            let otherJustify = key === 'purchase' ? this.otherJustify1 : this.otherJustify2
            for (let i = 0; i < otherJustify.length; i++) {
              let item = otherJustify[i]
              for (let j = 0; j < item.rules.length; j++) {
                let rule = item.rules[j]

                let value = +goodsSpec[a][item.key]
                let rulesRes = (rule.require && !value)
                if (rulesRes) {
                  console.log(key, rule.text, goodsSpec[a])
                  this.$toast.show(rule.text)
                  over = true
                  break
                }
              }
              if (over) break
            }
            if (over) break
          }
          if (over) break
        }
        return over
      },
      // 校验方法
      justifyMethods(justifyArr, dataArr) {
        let over = false
        for (let i = 0; i < justifyArr.length; i++) {
          let item = justifyArr[i]
          for (let j = 0; j < item.rules.length; j++) {
            let rule = item.rules[j]
            let value = dataArr[item.key]
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
      // 最终增加商品
      _addGoods() {
        let data = {
          ...this.edit, specs_attrs: this.goodsSpecification
        }
        // 集采商品
        if (this.edit.use_type === 1) {
          data.category_id = this.categoryId
        } else {
          data.brand_id = this.brandId
        }
        //  编辑 or 新增
        // 编辑
        if (this.id) data.id = this.id
        let requestName = this.id ? 'editGoods' : 'addGoods'
        API.Goods[requestName]({
          data
        }).then(() => {
          this.$emit('update')
          this.$router.go(-1)
        })
      },
      // 品牌列表
      _getBrandList() {
        API.Goods.getBrandList({data: {page: 0, limit: 0, goods_id: ''}, loading: false})
          .then(res => {
            this.brandList = res.data
          })
      },
      // 主图
      getGoodsBannerImages(arr) {
        arr.forEach(item => {
          item = item.data
          // 限制5张
          if (this.edit.goods_banner_images.length < 5) {
            this.edit.goods_banner_images.push({
              id: 0,
              image_url: item.url,
              image_id: item.id,
            })
          }
        })
      },
      // 详情图
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

      // 增加规格
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
      // 增加规格值
      addSpecValue(idx) {
        this.$set(this.goodsSpecification[idx].values, this.goodsSpecification[idx].values.length, {
          "text": "",
          "attr_value_id": 0
        })
      },
      // 删除规格
      deleteModule(idx) {
        this.goodsSpecification.splice(idx, 1)
      },
      // 删除规格值
      deleteSpec(idx, i) {
        this.goodsSpecification[idx].values.splice(i, 1)
      },
      // 取消 返回列表
      cancelBtn() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .edit-product
    right: -7px
    z-index: 100

  .list-item.list-item-input
    flex-shrink: 0
    min-width: 127px

  .icon-delete-wrap
    position: absolute

    .icon-delete
      width: 13px
      height: 13px
      background-image: url("./icon-delet@2x.png")
      background-size: 100% 100%

      &:hover
        background-image: url("./icon-delet_hover@2x.png")

  .edit-product
    .top-title
      padding-top: 3px

    .container
      padding: 24px 20px 8px 30px
      background-color: $color-white

    .first-category-item
      margin-right: 12px

    .after-word
      margin-left: 10px

    .more-item-wrap
      position relative
      min-width: 860px
      max-width: 100%
      background-color: #F4F8F9
      padding: 20px 20px 10px
      margin: 20px 0

      .icon-delete-wrap
        display none
        top: 0px
        right: 0px
        padding: 12px
        cursor pointer

      &:hover .icon-delete-wrap
        display block

      .spec-value-row
        flex-wrap: wrap

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

        .icon-delete-wrap
          display none
          top: -14px
          right: -13px
          padding: 10px

        &:hover .icon-delete-wrap
          display block

    .tip
      font-size: $font-size-14
      color: $color-text-sub
      margin-left: 10px

    .big-list
      min-width: 860px

      .set-price-box
        height: 45px
        line-height: 45px
        padding-left: 20px
        border: 1px solid $color-line
        border-bottom-width 0px

      .channel-name
        font-size $font-size-14
        margin-bottom: 20px

      .bean-title
        margin-top: 20px

      .list-box .list-item[data-type='price']
        max-width: 170px !important

      .list-box .list-item[data-type='price-2']
        max-width: 340px !important
        flex: 2 !important

      .list-box .list-item:last-child
        max-width: 134px !important
</style>
