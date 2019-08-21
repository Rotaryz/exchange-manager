<template>
  <div class="trading-record">
    <base-layout-top>
      <base-form-item :inline="true" :required="false" verticalAlign="center" label="搜索" labelSize="12px">
        <base-select v-model="filter.level" placeholder="账号等级" width="120" radius="2"></base-select>
        <base-search v-model="filter.keyword" placeholder="商户昵称/客户手机号" :isShowTip="false" @search="searchBtn"></base-search>
      </base-form-item>
    </base-layout-top>
    <base-table-tool :iconUrl="require('./icon-jyjl@2x.png')" title="交易记录">
    </base-table-tool>
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

  const PAGE_NAME = 'TRADING_RECORD'
  const TITLE = '交易记录'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      API.Customer.getTradingRecord({
        data: {
          keyword: '',
          level: '',
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
        filter: {
          keyword: '',
          level: '',
          page: 1,
          limit: 10
        },
        listHeader: {
          name: {name: '账号等级名称'},
          level: {name: '账号等级'},
          price: {name: '代理金额(元) '},
          referrer: {name: '推荐人 '},
          channels: {name: '升级渠道 '},
          update_time: {name: '升级时间 '}
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

  .trading-record
    width: 100%
    display flex
    flex-direction column
</style>
