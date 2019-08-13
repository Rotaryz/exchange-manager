<template>
  <div class="product-list normal-box table">
    <base-layout class="layout-top">
      <base-form-item label="分类筛选" :required="false">
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
          <div v-for="(item,i) in list" :key="i" class="list-content list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item">
              <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="changeSwitch(item,i)"></base-switch>
              <div v-else-if="val.type === 'operate'">
                <router-link tag="span" :to="{path:'edit-product',query:{id:item.id}}" class="list-operation" append>编辑</router-link>
                <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
              </div>
              <template v-else>
                <img v-if="val.before && val.before.img" class="list-img" :src="item[val.before.img]">
                <div>{{item[key]}}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
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
  const params = {
    keyword: '',
    category: 0,
    status: 1,
    page: 1,
    limit: 10
  }
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {CascadeSelect},
    beforeRouteEnter(to, from, next) {
      API.Goods.getGoodsList({
        data: params,
      }).then(res => {
        next(vw => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        getDataFunction: API.Goods.getGoodsList,
        statusList: [],
        inputValue: '1122',
        total: 0,
        filter: params,
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
      },
      _getStatus() {
        API.Goods.getGoodsListStatus({
          data: {
            keyword: this.filter.keyword,
            category: this.filter.category
          }
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList() {
        API.Goods.getGoodsList({
          data: this.filter,
        }).then(res => {
          this.setData(res)
        })
      },
      changeGategory(val) {
        this.filter.category = val
        this._getList()
      },
      statusChange(val) {
        this._getList()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGoods({data: {id: item.id}})
          this._getList()
        }, () => {
          console.log('取消 ')
        })
      },
      async changeSwitch(item) {
        console.log(item)
        await API.Goods.editStatus({data: {id: item.id, status: item.status ? 0 : 1}})
        this._getList()
      },
      searchBtn(val) {
        this._getList()
      },
      pageChange(val) {
        this._getList()
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
  .list-item
      display flex
</style>
