<template>
  <div class="order-list normal-box table">
    <base-tab-select :tabStatus="tabStatus" @getStatusTab="_changeTopTab"></base-tab-select>
    <top-data-bar :topData="topData"></top-data-bar>
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="创建时间" :infoTime.sync="time" @changeDate="_changeDate"></base-date>
      <base-search placeholder="客户名称" boxStyle="margin-left: 20px" @search="_search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-business@2x.png')" :title="tabName+'明细'"></base-table-tool>
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

  const PAGE_NAME = 'SUBSIDY_LIST'
  const TITLE = '订单列表'
  const DEFAULT_TAB = 0
  const TAB_CONFIG = [{text: '业务补贴', status: 'business'}, {text: '商品补贴', status: 'goods'}]
  const LIST_CONFIG = [
    [
      {title: '创建时间', key: 'time', class: 'width-1'},
      {title: '客户名称', key: 'name', class: 'width-2'},
      {title: '被推荐人', key: 'name', class: 'width-2'},
      {title: '等级类型', key: 'type', class: 'width-2'},
      {title: '升级金额', key: 'price', class: 'width-3'},
      {title: '补贴比例', key: 'ratio', class: 'width-2'},
      {title: '补贴金额', key: 'price', class: 'width-3'},
      {title: '关联单号', key: 'order', class: 'width-1'}
    ],
    [
      {title: '创建时间', key: 'time', class: 'width-3'},
      {title: '客户名称', key: 'name', class: 'width-2'},
      {title: '订单金额', key: 'price', class: 'width-2'},
      {title: '补贴金额', key: 'price', class: 'width-2'},
      {title: '关联单号', key: 'order', class: 'width-3'}
    ]
  ]
  const TOP_DATA = [
    [{img: require('./icon-yybt@2x.png'), title: '业务补贴总额(元)', value: '99999.99'}],
    [{img: require('./icon-spbtze@2x.png'), title: '商品补贴总额(元)', value: '77777.77'}]
  ]

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
        tabStatus: TAB_CONFIG,
        topData: TOP_DATA[DEFAULT_TAB],
        listHeader: LIST_CONFIG[DEFAULT_TAB],
        tabName: TAB_CONFIG[DEFAULT_TAB].text,
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
          next(vx => {
            // vx.orderList = res.data
            // vx.total = res.meta.total
            vx.orderList = [
              {time: '2019-01-01', order:'dd234557577', price:'12.1', name: 'Joe', type: '全能版', ratio: '67%'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1', name: 'Joe', type: '全能版', ratio: '67%'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1', name: 'Joe', type: '全能版', ratio: '67%'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1', name: 'Joe', type: '全能版', ratio: '67%'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1', name: 'Joe', type: '全能版', ratio: '67%'}
            ]
            vx.total = res.meta.total
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
      _changeTopTab(select, index) {
        this.topData = TOP_DATA[index]
        this.listHeader = LIST_CONFIG[index]
        this.tabName = TAB_CONFIG[index].text
        this._initParams()
      },
      // 获取订单列表
      async getOrderList(loading = false) {
        API.Order.getOrderList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {
          }
        })
          .then((res) => {
            res.data = [
              {time: '2019-01-01', order:'dd234557577', price:'12.1'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1'},
              {time: '2019-01-01', order:'dd234557577', price:'12.1'}
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

  .list-box
    overflow: visible
    .list-item
      &.width-1
        flex: 2
        max-width: 240px
      &.width-2
        flex: 0.8
      &.width-3
        flex: 1

</style>
