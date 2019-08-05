<template>
  <div class="edit-product">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" title="新建商品"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="商品名称" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.name"></base-input>
      </base-form-item>
      <base-form-item label="商品描述" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.describe" type="textarea" placeholder="输入商品描述"></base-input>
      </base-form-item>
      <base-form-item label="商品分类" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-select v-model="categoryLevel1" inputStyle="min-width:194px" placeholder="请选择分类" class="first-category-item"></base-select>
        <base-select v-model="categoryLevel2" inputStyle="min-width:194px" placeholder="请选择子分类"></base-select>
      </base-form-item>
      <base-form-item label="商品编码" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.code"></base-input>
      </base-form-item>
      <base-form-item label="商品重量" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.weight" inputType="number"></base-input>
        <span class="after-word">Kg</span>
      </base-form-item>
      <base-form-item label="生产厂商" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.manufacturer"></base-input>
      </base-form-item>
      <base-form-item label="商品主图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goodMainPic" multiple firstTag="封面图" tip="建议图片的尺寸：750*750，支持png，jpeg，jpg格式，最多可上传5张。" @delete="deleteGoodsMainPic()"></upload>
      </base-form-item>
      <base-form-item label="商品详情图" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="edit.goodsDetailPic" multiple firstTag="详情图" tip="上传图片的格式png，jpeg，jpg，最多可上传15张。" :limit="15"
                @delete="deleteGoodsMainPic()"
        ></upload>
        <!--<upload :data.sync="edit.goodsDetailPic"  firstTag="详情图" tip="上传图片的格式png，jpeg，jpg，最多可上传15张。" :limit="15" @delete="deleteGoodsDetailPic()"></upload>-->
      </base-form-item>
    </div>
    <title-line title="销售信息" class="top-title"></title-line>
    <div class="container">
      <base-form-item label="商品规格" labelMarginRight="40" labelWidth="78px" labelAlign="right" verticalAlign="top">
        <div>
          <radio v-model="edit.specification" :list="specList"></radio>
          <div v-if="edit.specification === 1">
            <div v-for="(item,idx) in goodsSpecification" :key="idx" class="more-item-wrap">
              <base-form-item labelColor="#868DAA" label="规格名" marginBottom="14px">
                <base-input v-model="item.name" size="small" clear></base-input>
              </base-form-item>
              <base-form-item labelColor="#868DAA" labelHeight="32px" label="规格值" marginBottom="0px" verticalAlign="top">
                <div class="spec-value-row">
                  <template v-for="(value,i) in item.values">
                    <base-input :key="i" v-model="item.values[i]" size="small" clear class="value-input"></base-input>
                  </template>
                  <span class="add-btn" @click="addSpecVlaue(idx)">添加规格值</span>
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
      <base-form-item v-if="edit.specification === 1" label="商品明细" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <div>
          <div class="big-list">
            <div class="list-header list-box">
              <div v-for="(item,key) in goodsSpecification" :key="key" class="list-item">{{item.name}}</div>
              <div class="list-item"><span class="required-mark">*</span>会员价</div>
              <div class="list-item"><span class="required-mark">*</span>库存</div>
            </div>
            <div class="list">
              <div v-for="(item,i) in edit.goodsDetails" :key="i" class="list-content list-box">
                <div v-for="(val,key) in item" :key="key" class="list-item">
                  <template v-if="key==='vipPrice'">
                    <base-input v-model="item.vipPrice" inputType="number" size="mini" clear class="value-input"></base-input>
                  </template>
                  <template v-else-if="key==='inventory'">
                    <base-input v-model="item.inventory" inputType="number" size="mini" clear class="value-input"></base-input>
                  </template>
                  <template v-else>
                    {{val}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </base-form-item>
      <base-form-item label="商品价格" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.price" inputType="number"></base-input>
        <span class="after-word">元</span>
      </base-form-item>
      <base-form-item label="会员价" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.vipPrice" inputType="number"></base-input>
        <span class="after-word">元</span>
      </base-form-item>
      <base-form-item label="库存" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="edit.inventory" inputType="number"></base-input>
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
  import TitleLine from "../../components/title-line/title-line"
  import Radio from "../../components/zb-radio/zb-radio"

  // import * as Helpers from './helpers'
  // import API from '@api'
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
      Radio
    },
    data() {
      return {
        arrRes: [],
        specList: [{label: '统一规格', id: 0}, {label: '多规格', id: 1}],
        categoryLevel1: '',
        categoryLevel2: '',
        justifyItems: [{
          key: 'name', rules: [{require: true, text: '请输入商品名称'}]
        }, {
          key: 'describe', rules: [{require: true, text: '请输入商品描述'}]
        }, {
          key: 'category', rules: [{require: true, text: '请选择商品分类'}]
        }, {
          key: 'code', rules: [{require: true, text: '请输入商品编码'}]
        }, {
          key: 'weight', rules: [{require: true, text: '请输入商品重量'}]
        }, {
          key: 'manufacturer', rules: [{require: true, text: '请输入生产商'}]
        }, {
          key: 'goodMainPic', rules: [{minLength: 1, text: '请上传商品主图'}, {maxLength: 5, text: '商品主图不可超过5张'}]
        }, {
          key: 'goodsDetailPic', rules: [{minLength: 1, text: '请上传商品详情图'}, {maxLength: 15, text: '商品详情图不可超过15张'}]
        }, {
          key: 'specification', rules: [{require: true, text: '请输入商品规格'}]
        }, {
          key: 'price', rules: [{require: true, text: '请输入商品价格'}]
        }, {
          key: 'vipPrice', rules: [{require: true, text: '请输入商品会员价'}]
        }, {
          key: 'inventory', rules: [{require: true, text: '请输入商品库存'}]
        }],
        goodsSpecification: [{
          name: '颜色',
          values: ['蓝色', '粉色']
        }, {
          name: '尺寸',
          values: ['s', 'm', 'l']
        }],
        edit: {
          name: '',
          describe: '',
          category: '',
          code: '',
          weight: '',
          manufacturer: '',
          goodsDetailPic: [
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F29%2F1564383114632-777951',
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F30%2F1564467265993-294130',
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F30%2F1564467265995-733336'
          ],
          // goodsDetailPic: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F29%2F1564383114632-777951',
          goodMainPic: [
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F29%2F1564383114632-777951',
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F30%2F1564467265993-294130',
            'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F07%2F30%2F1564467265995-733336'
          ],
          specification: 1,

          // {
          //   name: '',
          //     values: ['']
          // }
          goodsDetails: [],
          price: '',
          vipPrice: '',
          inventory: ''
        },
      }
    },
    watch: {
      goodsSpecification:{
        deep:true,
        handler(val) {
          this.edit.goodsDetails = this.getDetails(val)
        }
      }
    },
    methods: {
      cancelBtn() {

      },
      addSpecVlaue(idx) {
        this.$set(this.goodsSpecification[idx].values, this.goodsSpecification[idx].values.length, '')
      },
      addSpecModule() {
        this.$set(this.goodsSpecification, this.goodsSpecification.length, {
          name: '',
          values: ['']
        })
      },
      getDetails(arr) {
        if (arr.length <= 0) return []
        let arrRes = []
        arr[0].values.forEach((val, i) => {
          // console.log('arr[1]------', arr[1])
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
                    obj['name' + i] = val
                    obj['name' + i + j] = val1
                    obj['name' + i + j + k] = val2
                    obj.vipPrice = 0
                    obj.inventory = 0
                    arrRes.push(obj)
                  }
                })
              } else {
                let obj = {}
                obj['name' + i] = val
                obj['name' + i + j] = val1
                obj.vipPrice = 0
                obj.inventory = 0
                console.log(obj)
                arrRes.push(obj)
              }
            })
          } else {
            let obj = {}
            obj['name' + i] = val
            obj.vipPrice = 0
            obj.inventory = 0
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
        console.log(this.edit)
      },
      deleteGoodsDetailPic() {
        console.log()
        // this.edit.goodsDetailPic = ''
      },
      deleteGoodsMainPic(idx) {
        console.log(idx)
        this.edit.goodMainPic.splice(idx, 1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

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
