<template>
  <base-modal :visible.sync="dialogVisible"
              :titleTip="titleTip"
              :footerTopLine="true"
              :submitBefore="beforeAdd"
              height="670px"
              title="选择商品" confirmText="添加" class="goods-list-dialog"
              @submit="addSubmit"
  >
    <div class="body-inner">
      <div class="operate-box">
        <cascade-select size="mini" placeholder1="一级分类" placeholder2="二级分类" @change="changeGategory"></cascade-select>
        <base-search v-model="goodsListFilter.keyword" placeholder="请输入商品名称" @search="searchBtn"></base-search>
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
        <div v-if="list.length" class="list">
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
        <base-blank v-else></base-blank>
      </div>
      <base-pagination :total="total" :currentPage.sync="goodsListFilter.page" :pageSize="goodsListFilter.limit" class="page-wrap" @pageChange="pageChange"></base-pagination>
    </div>
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
      otherParams: {
        type: Object,
        default: () => {}
      },
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
            name: '商品名称',
            before: {
              image: 'goods_cover_image'
            }
          },
          price: {
            name: '零售价',
            before: {
              text: '¥'
            }
          }
        },
        total: 0,
        goodsListFilter: {
          limit: 6,
          page: 1,
          category_id: '',
          keyword: '',
          status: 1
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
          if (this.list.length === 0) return ''
          let arr = this.list.filter((item) => item.selecteStatus !== 'disable').map((item) => {
            return this.selectGoods.findIndex((goods) => item[this.selectKey] === goods[this.selectKey])
          })
          arr = arr.filter((newItem) => newItem < 0)
          return arr.length === 0 ? 'checked' : arr.length < this.list.length ? 'indeterminate' : ''
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
        API.Goods.getGoodsList({
          data: {...this.goodsListFilter, ...this.otherParams},
          loading: true
        }).then((res) => {
          if (res.isFail) return
          this.total = res.meta.total
          this.list = res.data.map((item, index) => {
            let isInList = this.selects.findIndex((items) => items === item[this.selectKey])
            let isSelect = this.selectGoods.findIndex((select) => select[this.selectKey] === item[this.selectKey])
            item.selecteStatus = isSelect !== -1 ? 'checked' : isInList !== -1 || item.is_selected ? 'disable' : ''
            // '' 没有选择 checked 选择高亮  disable 原本已存在
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
        this.goodsListFilter.category_id = id
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
        // console.log(item.selecteStatus)
        /* eslint-disable */
      switch (item.selecteStatus) {
        case 'disable':
          break
        case 'checked':
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
          this.list[index].selecteStatus = 'checked'
          this.selectGoods.push(item)
          break
      }
    },
    //全选
    selectAllGoodsBtn() {
      if (this.allCheckType !== 'checked') {
        this.list.forEach((item, i) => {
          if (!item.selecteStatus) {
            this.selectGoodsBtn(item, i)
          }
        })
      } else {
        this.list.forEach((item, i) => {
          if (item.selecteStatus === 'checked') {
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
      let res = this.valueKey ? this.selectGoods.map((item) => item[this.valueKey]) : this.selectGoods
      this.$emit('submit', res)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .goods-list-dialog
    .big-list
      margin-top: 20px
      flex: 1

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

  .body-inner
    height: 100%
    display flex
    flex-direction column

  .list .list-box
    height: 60px

  .list-box .list-item:nth-child(3)
    max-width: 90px
</style>
