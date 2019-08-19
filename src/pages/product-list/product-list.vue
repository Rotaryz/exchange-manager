<template>
  <div class="product-list normal-box table">
    <base-layout class="layout-top">
      <base-form-item label="分类筛选" labelSize="12px" :required="false">
        <cascade-select size="small" defaultLabel1="一级分类" defaultLabel2="二级分类" @change="changeGategory"></cascade-select>
      </base-form-item>
      <base-form-item :inline="true" :required="false" verticalAlign="center">
        <base-search v-model="filter.keyword" placeholder="商品名称或编码" @search="searchBtn"></base-search>
      </base-form-item>
    </base-layout>
    <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="商品列表">
      <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
      <router-link tag="div" to="edit-product" append>
        <base-button type="primary" plain addIcon>新建商品</base-button>
      </router-link>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in listHeader" :key="key" class="list-item">
                <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="changeSwitch(item,i)"></base-switch>
                <div v-else-if="val.type === 'operate'">
                  <router-link tag="span" :to="{path:'edit-product',query:{id:item.id}}" class="list-operation" append>编辑</router-link>
                  <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                </div>
                <template v-else>
                  <img v-if="val.before && val.before.img" class="list-img" :src="item[val.before.img]">
                  <div class="item-text">{{item[key]}}</div>
                </template>
              </div>
            </div>
          </template>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import CascadeSelect from '@components/cascade-select/cascade-select'

  const PAGE_NAME = 'PRODUCT_LIST'
  const TITLE = '商品列表'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {CascadeSelect},
    beforeRouteEnter(to, from, next) {
      Promise.all([API.Goods.getGoodsList({
        data: {
          keyword: '',
          category_id: '',
          status: '',
          page: 1,
          limit: 10
        }
      }), API.Goods.getGoodsListStatus({
        data: {
          keyword: '',
          category_id: ''
        }
      })]).then(res => {
        // console.log(res)
        next(vw => {
          vw.setData(res[0])
          vw.setStatus(res[1])
        })
      })
    },
    data() {
      return {
        getDataFunction: API.Goods.getGoodsList,
        statusList: [],
        inputValue: '1122',
        total: 0,
        filter: {
          keyword: '',
          category_id: '',
          status: '',
          page: 1,
          limit: 10
        },
        listHeader: {
          name: {
            name: '商品名称', before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '分类'},
          saleable: {name: '库存'},
          price: {name: '零售价'},
          discount_price: {name: '会员价'},
          status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate"}
        },
        list: []
      }
    },
    mounted() {
      this._getList()
      this._getStatus()
    },
    methods: {
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      setStatus(res) {
        this.statusList = res.data
      },
      _getStatus() {
        API.Goods.getGoodsListStatus({
          data: {
            keyword: this.filter.keyword,
            category_id: this.filter.category_id
          }, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList(other) {
        API.Goods.getGoodsList({
          data: this.filter, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      changeGategory(val) {
        this.filter.page = 1
        this.filter.category_id = val
        this._getList()
        this._getStatus()
      },
      statusChange(val) {
        this.filter.page = 1
        this._getList({loading: false})
        this._getStatus()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGoods({data: {id: item.id}, loading: false})
          this._getList()
        })
      },
      async changeSwitch(item) {
        await API.Goods.editStatus({data: {id: item.id, status: item.status ? 0 : 1}})
        this._getList({loading: false})
        this._getStatus()
      },
      searchBtn(val) {
        this.filter.page = 1
        this._getList()
        this._getStatus()
      },
      pageChange(val) {
        this._getList({loading: false})
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .product-list
    width: 100%

  .layout-top
    padding: 24px
    margin-bottom: 20px

  .type-frist
    margin-right: 10px
  .list-box  .list-item:nth-child(1)
    flex:2
  .list-item
    display flex

    .item-text
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap
</style>
