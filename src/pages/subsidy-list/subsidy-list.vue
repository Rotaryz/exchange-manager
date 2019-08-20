<template>
  <div class="order-list normal-box table">
    <top-data-bar :topData="topData"></top-data-bar>
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="创建时间" :infoTime.sync="time"></base-date>
      <base-search placeholder="客户名称" boxStyle="margin-left: 20px" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-business@2x.png')" title="业务补贴明细"></base-table-tool>
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
          <base-pagination ref="pages" :currentPage.sync="page" :total="total"></base-pagination>
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
  const LIST_HEADER = [
    {title: '创建时间', key: 'time', class: 'width-1'},
    {title: '客户名称', key: 'name', class: 'width-2'},
    {title: '被推荐人', key: 'name', class: 'width-2'},
    {title: '等级类型', key: 'type', class: 'width-2'},
    {title: '升级金额', key: 'price', class: 'width-3'},
    {title: '补贴比例', key: 'ratio', class: 'width-2'},
    {title: '补贴金额', key: 'price', class: 'width-3'},
    {title: '关联单号', key: 'order', class: 'width-1'}
  ]
  const TOP_DATA = [{img: require('./icon-yybt@2x.png'), title: '业务补贴总额(元)', value: '99234.33'}]

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
    watch: {
      async page() {
        await this.getOrderList()
      },
      async keyword() {
        this.page = 1
        await this.getOrderList()
      },
      async time() {
        this.page = 1
        await this.getOrderList()
      }
    },
    methods: {
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
            this.orderList = res.data
            this.total = res.meta.total
          })
      },
      // 搜索
      search(keyword) {
        this.keyword = keyword || ''
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
