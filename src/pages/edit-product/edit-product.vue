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
            <div v-for="(item,idx) in edit.goodsDetails" :key="idx" class="more-item-wrap">
              <base-form-item labelColor="#868DAA" label="规格名" marginBottom="14px">
                <base-input v-model="item.name" inputSize="small" clear></base-input>
              </base-form-item>
              <base-form-item labelColor="#868DAA" label="规格值" marginBottom="0px">
                <template v-for="(value,i) in item.values">
                  <base-input :key="i" v-model="item.values[i]" inputSize="small" clear class="value-input"></base-input>
                </template>
                <div class="add-btn" @click="addSpecVlaue(idx)">添加规格值</div>
              </base-form-item>
            </div>
            <div class="add-moudle-wrap">
              <base-button addIcon plain size="small" @click="addSpecModule">添加规格</base-button>
              <span class="tip">最多支持3组规格</span>
            </div>
          </div>
        </div>
      </base-form-item>
      <base-form-item v-if="edit.specification === 1" label="商品明细" labelMarginRight="40" labelWidth="78px" labelAlign="right">
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
          goodsDetails: [{
            name: '',
            values: ['']
          }],
          price: '',
          vipPrice: '',
          inventory: ''
        }
      }
    },
    methods: {
      cancelBtn() {

      },
      addSpecVlaue(idx){
        this.$set(this.edit.goodsDetails[idx].values,this.edit.goodsDetails[idx].values.length,'')
      },
      addSpecModule(){
        this.$set(this.edit.goodsDetails,this.edit.goodsDetails.length,{
          name: '',
          values: ['']
        })
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
        width:700px
        background-color #F4F8F9
        padding:20px
        margin:20px 0
        .add-btn
          color:$color-main
          font-size $font-size-14
          margin-left:14px
          white-space nowrap
        .value-input
          margin-right:10px
          &:last-child
            margin-right:0px

    .add-moudle-wrap
      margin-bottom:40px
    .tip
      font-size $font-size-14
      color:$color-text-sub
      margin-left:10px
</style>
