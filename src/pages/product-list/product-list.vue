<template>
  <div class="product-list normal-box table">
    <base-layout class="layout-top">
      <base-form-item label="分类筛选" :required="false">
        <cascade-select size="small" defaultLabel1="一级分类" defaultLabel2="二级分类" @change="changeGategory"></cascade-select>
      </base-form-item>
      <base-form-item :inline="true" :required="false" verticalAlign="center">
        <base-search :value.sync="filter.keyword" placeholder="商品名称或编码" @search="searchBtn"></base-search>
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
              <base-switch v-if="val.type ==='switch'" :status.sync="item.status" @changeSwitch="changeSwitch(i)"></base-switch>
              <div v-else-if="val.type === 'operate'">
                <router-link tag="span" :to="{path:'edit-product',query:{id:item.id}}" class="list-operation" append>编辑</router-link>
                <span class="list-operation" @click="deleteBtn(i)">删除</span>
              </div>
              <template v-else>{{item[key]}}</template>
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
  const params =  {
    keyword:'11111',
    category: 0,
    status:1,
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
        getDataFunction:API.Goods.getGoodsList,
        statusList:[{label: '全部', value: 0, num: 0},{label: '上架', value:1, num: 0},{label: '下架', value: 2, num: 0}],
        inputValue: '1122',
        total: 40,
        filter: params,
        listHeader: {
          first: {name: '商品名称'},
          second: {name: '分类'},
          third: {name: '库存'},
          fourth: {name: '零售价'},
          five: {name: '库存'},
          six: {name: '会员价'},
          status: {name: '状态',type:"switch"},
          operate_text: {name: '操作',type:"operate"}
        },
        list: [{id:1,first: 123,second:5255,third:5255,fourth:5255,five:5255,six:5255,status:1}]
      }
    },
    mounted() {
      this._getList(this.filter)
    },
    methods: {
      setData(res){
        this.list = res.data
      },
      _getList() {
        API.Goods.getGoodsList({
          data: this.filter,
        }).then(res => {
          this.setData(res)
        })
      },
      changeGategory(val){
        this.filter.category = val
        this._getList()
      },
      statusChange(val){
        this._getList()
        console.log(this.filter.status)
      },
      deleteBtn(idx){
        this.$confirm.confirm().then(async () => {
          console.log('确认 ')
          let res = await  API.Goods.deleteGoods({data:idx})
          if(res.isFail) return false
          this._getList()
        }, () => {
          console.log('取消 ')
        })
        console.log(idx,this.list[idx])
      },
      async changeSwitch(idx){
        let res = await  API.Goods.editStatus({data:idx})
        if(res.isFail) return false
        this._getList()
        console.log(idx,this.list[idx].status)
      },
      searchBtn(val) {
        this._getList()
      },
      pageChange(val) {
        this.filter.keyword = 111
        this._getList()
        console.log(this.filter.page)
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
</style>
