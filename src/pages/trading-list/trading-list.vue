<template>
  <div class="trading-list">
    <base-tabs :data="tabList" :value.sync="tabIndex" valueKey="type" tabAlign="left" margin="0 20px"
               defaultColor="#4E5983" class="tab-top" @change="_changeTopTab"
    ></base-tabs>
    <top-data-bar :topData="topData"></top-data-bar>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="支付时间" :infoTime.sync="time"></base-date>
      <base-search v-model="keyword" placeholder="订单号/交易号" boxStyle="margin-left: 20px" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-business@2x.png')" title="交易明细"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(head, index) in listHeader" :key="index" :class="head.class" class="list-item">{{head.title}}</div>
        </div>
        <div class="list">
          <div v-if="listData.length">
            <div v-for="(item, index) in listData" :key="index" class="list-content list-box">
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

  const PAGE_NAME = 'BUSINESS_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = [
    {title: '支付时间', key: 'pay_at', class: 'width-1'},
    {title: '关联订单号', key: 'business_sn', class: 'width-1'},
    {title: '交易号', key: 'transaction_sn', class: 'width-3'},
    {title: '交易金额', key: 'amount', class: 'width-4'}
  ]
  const TOP_DATA = [{img: require('./icon-zfze@2x.png'), title: '支付总额(元)', value: '—'}]
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
        listData: [],
        keyword: '',
        total: 0,
        time: []
      }
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: ''}
      API.Finance.getSellList({data, loading: true, toast: true})
        .then((res) => {
          next((vx) => {
            vx.listData = res.data
            vx.total = res.meta.total
            vx._getTradingTotal()
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
        await this._getListData()
      },
      async time() {
        this.page = 1
        await this._getListData()
        await this._getTradingTotal()
      }
    },
    methods: {
      // 切换顶部tab
      _changeTopTab(select) {
        this.tabIndex = select
        this.page = 1
        this.keyword = ''
        this.time = []
      },
      // 搜索
      async search(keyword) {
        this.keyword = keyword || ''
        this.page = 1
        await this._getListData()
        await this._getTradingTotal()
      },
      // 获取总额
      async _getTradingTotal(loading = false) {
        const apiArr = ['getSellTotal', 'getPurchaseTotal']
        API.Finance[apiArr[this.tabIndex]]({
          data: {keyword: this.keyword, start_at: this.time[0] || '', end_at: this.time[1] || ''},
          loading
        }).then((res) => {
          this.topData[0].value = res.data.total_amount
        })
      },
      // 获取订单列表
      async _getListData(loading = false) {
        const apiArr = ['getSellList', 'getPurchaseList']
        API.Finance[apiArr[this.tabIndex]]({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {}
        }).then((res) => {
          this.listData = res.data
          this.total = res.meta.total
        })
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
