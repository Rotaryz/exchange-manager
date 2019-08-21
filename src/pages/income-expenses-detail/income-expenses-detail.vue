<template>
  <div class="income-expenses-detail">
    <base-layout-top class="money-info-wrap">
      <div v-for="item in totalList" :key="item.valueKey" class="money-item">
        <div :class="['type-icon',item.iconClass]"></div>
        <div>
          <div class="name">{{item.name}}</div>
          <div class="money">{{money[item.valueKey]}}</div>
        </div>
      </div>
    </base-layout-top>
    <base-table-tool :title="title" :iconUrl="require('./icon-order_list@2x.png')"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in listHeader" :key="key" class="list-item">
                {{item[key]}}
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
// import * as Helpers from './modules/helpers'
  import API from '@api'
  const PAGE_NAME = 'INCOME_EXPENSES_DETAIL'
  const TITLE = '收支明细'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      API.Customer.getTradingRecord({
        data: {
          page: 1,
          limit: 10
        }
      }).then((res) => {
        next((vw) => {
          console.log('111')
        // vw.setData(res)
        })
      })
    },
    data() {
      return {
        totalList: [
          {
            iconClass: 'total-income-icon',
            name: '收入总额(元)',
            valueKey: 'total_income'
          },
          {
            iconClass: 'balance-icon',
            name: '账户余额(元)',
            valueKey: 'balance_money'
          },
          {
            iconClass: 'withdraw-icon',
            name: '已提现总额(元)',
            valueKey: 'withdraw_money'
          }
        ],
        money: {
          withdraw_money: '398447.00',
          balance_money: ' 398447.00',
          total_income: '398447.00'
        },
        filter: {
          page: 1,
          limit: 10
        },
        listHeader: {
          name: {name: '申请时间'},
          level: {name: '类型'},
          price: {name: '收入 '},
          referrer: {name: '支出 '},
          channels: {name: '余额 '},
          update_time: {name: '提现单号 '}
        },
        list: [
          {
            name: '刘强东',
            level: '标准版',
            price: 123.0,
            referrer: '李力',
            channels: '线下',
            update_time: '2019-09-18'
          },
          {
            name: '刘强东',
            level: '标准版',
            price: 123.0,
            referrer: '李力',
            channels: '线下',
            update_time: '2019-09-18'
          }
        ],
        total: 11
      }
    },
    computed: {
      title() {
        return `${this.$route.query.name}-收支明细`
      }
    },
    methods: {
      setData(res) {
        this.list = res.data
      },
      _getList() {
        API.Customer.getTradingRecord({data: this.filter, loading: false}).then((res) => {
          this.setData(res)
        })
      },
      pageChange(val) {
        this._getList()
      },
      searchBtn() {
        this._getList()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .income-expenses-detail
    position absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 10
    background:#f4f8f9
    display flex
    flex-direction column
    .money-info-wrap
      margin-bottom: 20px
    .money-item
      display flex
      align-items center
      margin-right:198px
      .name
        font-size $font-size-14
        margin-bottom 10px
      .money
        font-family $font-family-din-bold
        font-size 32px
        color:$color-text-main
        letter-spacing 0
      .type-icon
        width:58px
        height:58px
        margin-right 20px
      .total-income-icon
        icon-image(icon-srze)
      .balance-icon
        icon-image(icon-zhye)
      .withdraw-icon
        icon-image(icon-ytxze)
    .list-wrap
      margin:10px 0
</style>
