<template>
  <base-modal :visible.sync="dialogVisible"
              :titleTip="titleTip"
              :footerTopLine="true"
              :submitBefore="beforeAdd"
              title="选择商品" confirmText="添加" class="goods-list-dialog"
              @submit="addSubmit"
  >
    <div class="operate-box">
      <cascade-select size="mini" placeholder1="一级分类" placeholder2="二级分类" @change="changeGategory"></cascade-select>
      <base-search v-model="goodsListFilter.keyword" placeHolder="请输入商品名称" @search="searchBtn"></base-search>
    </div>
    <div class="big-list">
      <div class="list-header list-box">
        <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">
          <template v-if="val.type === 'select'">
            <zb-checkbox :type="allCheckType" @click="selectAllGoodsBtn"></zb-checkbox>
          </template>
          <template v-else>
            {{val.name}}
          </template>
        </div>
      </div>
      <div class="list">
        <div v-for="(item,i) in list" :key="i" class="list-box">
          <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">
            <template v-if="val.type === 'select'">
              <zb-checkbox :type="item.selecteStatus|| ''" @click="selectGoodsBtn(item,i)"></zb-checkbox>
            </template>
            <template v-else>
              <template v-if="val.before">
                <template v-if="val.before.text">{{val.before.text}}</template>
                <div v-if="val.before.image" class="goods-image-wrap">
                  <img :src="item[val.before.image]" class="goods-image">
                </div>
              </template>
            </template>
            <template>
              {{item[key]}}
            </template>
          </div>
        </div>
      </div>
    </div>
    <base-pagination :total="total" :currentPage.sync="goodsListFilter.page" class="page-wrap" @pageChange="pageChange"></base-pagination>
  </base-modal>
</template>

<script type="text/ecmascript-6">
  import ZbCheckbox from '@components/zb-checkbox/zb-checkbox'
  import CascadeSelect from '@components/cascade-select/cascade-select'

  import API from '@api'

  const COMPONENT_NAME = 'GOODS_LIST_DIALOG'

  export default {
    name: COMPONENT_NAME,
    components: {
      ZbCheckbox,
      CascadeSelect
    },
    props: {
      selectKey: {
        type: String,
        default: 'id'
      },
      valueKey: {
        type: [String, Boolean],
        default: 'id'
      },
      visible: {
        type: Boolean,
        default: false
      },
      limit: {
        type: Number,
        default: null
      },
      selects: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        listHeader: {
          operate_select: {
            name: '',
            style: 'max-width:60px;text-align:center',
            type: 'select'
          },
          name: {
            name: '商品名称', before: {
              image: 'goods_cover_image'
            }
          },
          original_price: {
            name: '零售价', before: {
              text: '¥'
            }
          },
        },
        total: 0,
        goodsListFilter: {
          limit: 7,
          page: 1,
          goods_category_id: '',
          keyword: ''
        },
        list: [], // 弹框商品列表
        selectGoods: [] // 单次选择的商品
      }
    },
    computed: {
      titleTip() {
        return this.limit ? `(商品数量一共可添加${this.limit}个,已添加${this.selectGoods.length})个` : ''
      },
      dialogVisible: {
        get() {
          return this.visible
        },
        set(newValue) {
          this.$emit('update:visible', newValue)
          this.$emit('close', newValue)
        }
      },
      allCheckType: {
        get() {
          let arr = this.list.map(item => {
            return this.selectGoods.findIndex(goods => item[this.selectKey] === goods[this.selectKey])
          })
          console.log(arr, 'arr1')
          arr = arr.filter(newItem => newItem < 0)
          console.log(arr, 'arr2')

          return arr.length === 0 ? 'selected' : arr.length < this.list.length ? 'indeterminate' : ''
        },
        set(newValue) {
          return newValue
        }
      }
    },
    mounted() {
      this._getGoodsList()
    },
    methods: {
      // 获取商品列表
      _getGoodsList() {
        console.log('selectGoods', this.selectGoods)
        API.Goods.getGoodsList({
          data: this.goodsListFilter,
          loading: true
        }).then(res => {
          if (!res.isSuccess) return
          this.total = res.meta.total
          this.list = res.data.map((item, index) => {
            item[this.selectKey] = item[this.selectKey] + '' + this.goodsListFilter.page
            let isInList = this.selects.findIndex((items) => items[this.selectKey] === item[this.selectKey])
            let isSelect = this.selectGoods.findIndex((select) => select[this.selectKey] === item[this.selectKey])
            item.selecteStatus = isSelect !== -1 ? 'selected' : (isInList !== -1 ? 'disable' : '')
            // '' 没有选择 selected 选择高亮  disable 原本已存在
            return item
          })
        })
      },
      // 获取分页商品列表
      async pageChange(page) {
        this.goodsListFilter.page = page
        await this._getGoodsList()
      },
      // 选择分类
      async changeGategory(id) {
        this.goodsListFilter.goods_category_id = id
        this.goodsListFilter.page = 1
        this.selectGoods = []
        await this._getGoodsList()
      },
      // 搜索商品
      async searchBtn(text) {
        this.goodsListFilter.page = 1
        this.selectGoods = []
        await this._getGoodsList()
      },
      // 勾选商品
      selectGoodsBtn(item, index) {
        console.log(item.selecteStatus)
        /* eslint-disable */
        switch (item.selecteStatus) {
          case 'disable':
            break
          case 'selected':
            this.list[index].selecteStatus = ''
            let idx = this.selectGoods.findIndex((items) => items[this.selectKey] === item[this.selectKey])
            if (idx !== -1) {
              this.selectGoods.splice(idx, 1)
            }
            break
          default:
            if (this.limit && this.selects.length + this.selectGoods.length >= this.limit) {
              this.$toast.show(`选择商品数量不能超过${this.limit}个`)
              return
            }
            this.list[index].selecteStatus = 'selected'
            this.selectGoods.push(item)
            break
        }
      },
      //全选
      selectAllGoodsBtn() {
        if (this.allCheckType !== 'selected') {
          this.list.forEach((item, i) => {
            if (!item.selecteStatus) {
              this.selectGoodsBtn(item, i)
            }
          })
        } else {
          this.list.forEach((item, i) => {
            if (item.selecteStatus === 'selected') {
              this.selectGoodsBtn(item, i)
            }
          })
        }
      },
      beforeAdd(done) {
        if (this.selectGoods.length === 0) this.$toast.show('请选择需要添加的商品')
        else done()
      },
      // 批量添加
      addSubmit() {
        console.log(this.valueKey)
        let res = this.valueKey ? this.selectGoods.map(item => item[this.valueKey]) : this.selectGoods
        this.$emit('submit', res)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .goods-list-dialog
    .big-list
      margin-top:20px
    .operate-box
      display flex
      align-items center
  .goods-image-wrap
    display inline-block
    width: 40px
    height: @width
    border-radius 2px
    vertical-align middle
    overflow hidden
    text-align center
    line-height @width
    font-size 0

    border-1px()

    .goods-image
      object-fit cover
      width: 40px
      height: @width

  .page-wrap
    margin: 20px 0 30px

  .list .list-box
    height: 60px
</style>
