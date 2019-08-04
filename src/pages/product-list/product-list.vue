<template>
  <div class="product-list normal-box table">
    <base-layout class="layout-top">
      <base-form-item label="分类筛选" :inline="true" :required="false" verticalAlign="center">
        <base-select :data="categoryListL1" :value.sync="selectCategoryFrist" borderRadius="4" size="small" defaultLabel="一级分类"
                     class="type-frist" @change="getCategoryLevel1"
        ></base-select>
        <base-select :data="categoryListL2" :value.sync="selectCategorySecond" borderRadius="4" size="small" defaultLabel="二级分类"
                     @change="getCategoryLevel2"
        ></base-select>
      </base-form-item>
      <base-form-item :inline="true" :required="false" verticalAlign="center">
        <base-search ref="research" @search="searchBtn"></base-search>
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
  // import API from '@api'

  const PAGE_NAME = 'PRODUCT_LIST'
  const TITLE = '商品列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {},
    data() {
      return {
        statusList:[{label: '全部', value: 0, num: 0},{label: '上架', value:1, num: 0},{label: '下架', value: 2, num: 0}],
        inputValue: '1122',
        selectCategoryFrist: '',
        selectCategorySecond: '',
        categoryListL1: [{id: 111, label: 'ajsdf'}],
        categoryListL2: [{id: 111, label: 'ajsdf'}],
        total: 40,
        filter: {
          keywords:'',
          category: 0,
          status:1,
          page: 1,
          limit: 10
        },
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
      this.getList(this.filter)
    },
    methods: {
      statusChange(val){
        console.log(this.filter.status)
      },
      deleteBtn(idx){
        this.$confirm.confirm().then(() => {
          console.log('确认 ')
        }, () => {
          console.log('取消 ')
        })
        console.log(idx,this.list[idx])
      },
      changeSwitch(idx){
        console.log(idx,this.list[idx].status)
      },
      getList() {

      },
      getCategoryLevel1(val) {

      },
      getCategoryLevel2(val) {

      },
      searchBtn(val) {

      },
      pageChange(val) {
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
