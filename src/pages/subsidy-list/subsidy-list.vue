<template>
  <div class="subsidy-list">
    <base-tabs :data="tabStatus" :value.sync="tabIndex" valueKey="type" tabAlign="left" margin="0 20px"
               defaultColor="#4E5983" class="tab-top" @change="_changeTopTab"
    ></base-tabs>
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
          <div v-if="listData.length">
            <div v-for="(item, index) in listData" :key="index" class="list-content list-box">
              <div v-for="(head, idx) in listHeader" :key="idx" :class="head.class" class="list-item">
                <template v-if="Array.isArray(head.key)">
                  <div class="item-text">{{item[head.key[0]]}}</div>
                  <div class="item-text">{{item[head.key[1]]}}</div>
                </template>
                <template v-else>{{item[head.key]}}</template>
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
  const TAB_CONFIG = [{text: '业务补贴', type: 0}, {text: '商品补贴', type: 1}]
  const LIST_CONFIG = [
    [
      {title: '创建时间', key: 'settlement_at', class: 'width-1'},
      {title: '客户名称', key: ['target_shop_truename', 'target_shop_level_name'], class: 'width-3'},
      {title: '被推荐人', key: 'source_shop_truename', class: 'width-3'},
      {title: '升级类型', key: 'source_shop_level_name', class: 'width-2'},
      {title: '升级金额', key: 'total', class: 'width-2'},
      {title: '补贴方式', key: ['commission_way_text', 'commission_value'], class: 'width-3'},
      {title: '补贴金额', key: 'commission_money', class: 'width-2'},
      {title: '关联单号', key: 'order_sn', class: 'width-1'}
    ],
    [
      {title: '创建时间', key: 'settlement_at', class: 'width-1'},
      {title: '客户名称', key: ['target_shop_truename', 'target_shop_level_name'], class: 'width-3'},
      {title: '被推荐人', key: ['source_shop_truename', 'source_shop_level_name'], class: 'width-3'},
      {title: '订单类型', key: 'order_type_text', class: 'width-2'},
      {title: '订单金额', key: 'total', class: 'width-2'},
      {title: '补贴方式', key: 'commission_way_text', class: 'width-2'},
      {title: '补贴比例', key: 'commission_value', class: 'width-2'},
      {title: '补贴金额', key: 'commission_money', class: 'width-2'},
      {title: '关联单号', key: 'order_sn', class: 'width-1'}
    ]
  ]
  const TOP_DATA = [
    [{img: require('./icon-yybt@2x.png'), title: '业务补贴总额(元)', value: '—'}],
    [{img: require('./icon-spbtze@2x.png'), title: '商品补贴总额(元)', value: '—'}]
  ]
  const TEST_DATA = {
    "data": [
      {
        "id": 1,
        "type": 1,
        "title": "全能版",
        "money": 30,
        "order_type": 40,
        "order_type_text": "权益订单",
        "order_sn": "xxxx",
        "status": 1,
        "settlement_at": "2019-08-24 14:31:54",
        "source_shop_truename": "刘强东1",
        "source_shop_level_name": "合伙版",
        "target_shop_truename": "刘强东4",
        "target_shop_level_name": "全能版",
        "total": 60,
        "commission_way": 2,
        "commission_way_text": "比例",
        "commission_money": 3000,
        "commission_value": "60%"
      }
    ],
    "links": {
      "first": "http://exchange-platform-api.com/exchange-platform/platform/settlement/settlement/index?page=1",
      "last": "http://exchange-platform-api.com/exchange-platform/platform/settlement/settlement/index?page=1",
      "prev": null,
      "next": null
    },
    "meta": {
      "current_page": 1,
      "from": 1,
      "last_page": 1,
      "path": "http://exchange-platform-api.com/exchange-platform/platform/settlement/settlement/index",
      "per_page": 10,
      "to": 1,
      "total": 1
    },
    "error_code": 0,
    "message": "操作成功！"
  }

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
        tabIndex: DEFAULT_TAB,
        tabStatus: TAB_CONFIG,
        topData: TOP_DATA[DEFAULT_TAB],
        listHeader: LIST_CONFIG[DEFAULT_TAB],
        tabName: TAB_CONFIG[DEFAULT_TAB].text,
        listData: [],
        currentPage: 1,
        page: 1,
        keyword: '',
        total: 21,
        time: []
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Subsidy.getSubsidyList({data: {type: DEFAULT_TAB + 1, target_type: 2, page: 1,}, loading: true, toast: true})
        .then((res) => {
          next(vx => {
            res = TEST_DATA
            vx.listData = res.data
            vx.total = res.meta.total
            vx._getSubsidyTotal()
          })
        })
        .catch(() => {
          next('404')
        })
    },
    computed: {
      paramObj() {
        return {
          type: this.tabIndex + 1,
          target_type: 2,
          target_shop_truename: this.keyword,
          page: this.page,
          start_at: this.time[0] || '',
          end_at: this.time[1] || ''
        }
      }
    },
    methods: {
      _initParams() {
        this.paramObj = {type: this.tabIndex + 1, target_type: 2, page: 1,}
        this._getListData()
        this._getSubsidyTotal()
      },
      // 切换顶部tab
      _changeTopTab(select) {
        this.topData = TOP_DATA[select]
        this.listHeader = LIST_CONFIG[select]
        this.tabName = TAB_CONFIG[select].text
        this._initParams()
      },
      _getSubsidyTotal() {
        API.Subsidy.getSubsidyTotal({
          data: { type: this.tabIndex + 1, target_type: 2 },
          loading: false,
        })
          .then((res) => {
            this.topData.value = res.data.total_remaining
          })
      },
      // 获取订单列表
      _getListData(loading = false) {
        API.Subsidy.getSubsidyList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {
          }
        })
          .then((res) => {
            res = TEST_DATA
            this.listData = res.data
            this.total = res.meta.total
          })
      },
      _search(keyword) {
        this.keyword = keyword || ''
        this.page = 1
        this._getListData()
      },
      _changePage(page) {
        this.page = page || 1
        this._getListData()
      },
      _changeDate() {
        this.page = 1
        this._getListData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .subsidy-list
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
        flex: 2
        max-width: 240px
      &.width-2
        flex: 0.8
      &.width-3
        flex: 1
      .item-text
        line-height: 20px

</style>
