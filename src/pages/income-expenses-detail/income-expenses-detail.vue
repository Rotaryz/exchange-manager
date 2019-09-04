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
      const id = to.params.id
      const type = to.query.type
      API.Finance.getAccountDetails({
        data: {
          type: type,
          target_id: id,
          page: 1
        }
      }).then((res) => {
        next((vw) => {
          vw.setData(res)
          vw._getStatistic()
        })
      })
    },
    data() {
      return {
        totalList: [
          {
            iconClass: 'total-income-icon',
            name: '收入总额(元)',
            valueKey: 'total_remaining'
          },
          {
            iconClass: 'balance-icon',
            name: '账户余额(元)',
            valueKey: 'remaining'
          },
          {
            iconClass: 'withdraw-icon',
            name: '已提现总额(元)',
            valueKey: 'already_remaining'
          }
        ],
        money: {total_remaining: '—', remaining: '—', already_remaining: '—'},
        filter: {
          page: 1,
          type: this.$route.query.type,
          target_id: this.$route.params.id
        },
        listHeader: {
          settlement_at: {name: '生成时间'},
          order_type_text: {name: '类型'},
          income: {name: '收入'},
          expend: {name: '支出'},
          after_remaining: {name: '余额'},
          order_sn: {name: '关联单号'}
        },
        list: [],
        total: 0,
        type: this.$route.query.type
      }
    },
    computed: {
      title() {
        return `${this.$route.query.name}-收支明细`
      }
    },
    methods: {
      // 收支明细列表
      _getList() {
        API.Finance.getAccountDetails({data: this.filter, loading: false}).then((res) => {
          this.setData(res)
        })
      },
      setData(res) {
        // 格式化收入和支出
        res.data.forEach((item) => {
          item.income = item.money > 0 ? item.money : '—'
          item.expend = item.money < 0 ? item.money : '—'
        })
        this.list = res.data
        this.total = res.meta.total
      },
      // 顶部数据
      _getStatistic() {
        API.Finance.accountDetailsTotal({data: {target_id: this.filter.target_id, type: this.type}, loading: false}).then((res) => {
          this.money = res.data
        })
      },
      pageChange(val) {
        this._getList()
        this._getStatistic()
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
