<template>
  <div class="trading-record">
    <base-layout-top>
      <base-form-item :inline="true" :required="false" verticalAlign="center" label="搜索" labelSize="12px">
        <base-select
          v-model="filter.level_id"
          :data="selectList"
          labelKey="name"
          placeholder="账号等级"
          width="120"
          radius="2"
          @change="_getList"
        >
        </base-select>
        <base-search v-model="filter.keyword" placeholder="店铺名称/客户手机号" :isShowTip="false" @search="searchBtn"></base-search>
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
          level_id: '',
          page: 1,
          limit: 10
        }
      }).then((res) => {
        next((vw) => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        filter: {
          keyword: '',
          level_id: '',
          page: 1,
          limit: 10
        },
        listHeader: {
          shop_name: {name: '店铺名称'},
          shop_level_name: {name: '等级类型'},
          amount: {name: '等级金额(元) '},
          shop_inviter_name: {name: '推荐人 '},
          upgrade_way_str: {name: '升级渠道 '},
          created_at: {name: '升级时间 '}
        },
        list: [],
        total: 11,
        selectList: []
      }
    },
    created() {
      this._getLevelList()
    },
    methods: {
      // 获取等级列表
      _getLevelList(loading = false) {
        API.Level.getLevelList({
          data: {page: 1},
          loading,
          toast: true,
          doctor() {
          }
        })
          .then((res) => {
            res.data.unshift({name: '全部', id: ''})
            this.selectList = res.data
          })
      },
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
