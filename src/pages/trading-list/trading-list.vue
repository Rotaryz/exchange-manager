<template>
  <div class="trading-list">
    <base-tabs :data="tabList" :value.sync="tabIndex" valueKey="type" tabAlign="left" margin="0 20px"
               defaultColor="#4E5983" class="tab-top" @change="_changeTopTab"
    ></base-tabs>
    <top-data-bar :topData="topData"></top-data-bar>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="支付时间" :infoTime.sync="time" @changeDate="_changeDate"></base-date>
      <base-search placeholder="订单号/交易号" boxStyle="margin-left: 20px" @search="_search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-business@2x.png')" title="交易明细"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(head, index) in listHeader" :key="index" :class="head.class" class="list-item">{{head.title}}</div>
        </div>
        <div class="list">
          <div v-if="orderList.length">
            <div v-for="(item, index) in orderList" :key="index" class="list-content list-box">
              <div v-for="(head, idx) in listHeader" :key="idx" :class="head.class" class="list-item">
                {{item[head.key]}}
              </div>
            </div>
          </div>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <!---->
          <base-pagination ref="pages" :currentPage.sync="page" :total="total" @pageChange="_changePage"></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import TopDataBar from './top-data-bar/top-data-bar'

  const PAGE_NAME = 'BUSINESS_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = [
    {title: '支付时间', key: 'time', class: 'width-1'},
    {title: '关联订单号', key: 'order', class: 'width-1'},
    {title: '交易号', key: 'order', class: 'width-3'},
    {title: '交易金额', key: 'price', class: 'width-4'}
  ]
  const TOP_DATA = [{img: require('./icon-zfze@2x.png'), title: '支付总额(元)', value: '99234.33'}]
  const TAB_CONFIG = [{text: '销售业务', type: 0}, {text: '采购订单', type: 1}]

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TopDataBar
    },
    data() {
      return {
        tabIndex: 0,
        tabList: TAB_CONFIG,
        topData: TOP_DATA,
        listHeader: LIST_HEADER,
        currentPage: 1,
        page: 1,
        orderList: [],
        keyword: '',
        total: 21,
        time: []
      }
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: ''}
      API.Order.getOrderList({data, loading: true, toast: true})
        .then((res) => {
          next((vx) => {
            // vx.orderList = res.data
            // vx.total = res.meta.total
            vx.orderList = [
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
              {time: '2019-01-01', order: 'dd234557577', price: '12.1'}
            ]
          })
        })
        .catch(() => {
          next('404')
        })
    },
    computed: {
      paramObj() {
        let data = {page: this.page, keyword: this.keyword, start_at: this.time[0] || '', end_at: this.time[1] || ''}
        return data
      }
    },
    methods: {
      _initParams() {
        this.page = 1
        this.keyword = ''
        this.time = []
        this.getOrderList()
      },
      // 切换顶部tab
      _changeTopTab(select) {
        this._initParams()
      },
      // 获取订单列表
      async getOrderList(loading = false) {
        API.Order.getOrderList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {}
        }).then((res) => {
          res.data = [
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'},
            {time: '2019-01-01', order: 'dd234557577', price: '12.1'}
          ]
          this.orderList = res.data
          this.total = res.meta.total
        })
      },
      _search(keyword) {
        this.keyword = keyword || ''
        this.page = 1
        this.getOrderList()
      },
      _changePage(page) {
        this.page = page || 1
        this.getOrderList()
      },
      _changeDate() {
        this.page = 1
        this.getOrderList()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .trading-list
    width: 100%
    padding-top: 50px
    .tab-top
      position: fixed
      top: 50px
      left: 200px
      z-index: 99
  .list-box
    overflow: visible
    .list-item
      &.width-1
        flex: 1
        min-width: 165px
      &.width-3
        flex: 1.8
        min-width: 276px
      &.width-4
        max-width: 140px
        flex: 0.5

</style>
