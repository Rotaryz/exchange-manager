<template>
  <div class="economy-order">
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="订单号/商品名称" class="base-search" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="订单列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <base-button plain @click="exportExcel">导出Excel</base-button>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">
                  <div v-if="val.type === 'status'" class="status-box" :class="[item.status===10?'online':'']">{{item[key]}}</div>
                  <template v-else>
                    <div v-if="(key==='meeting_name'||key==='meeting_price'||key==='meeting_num')&&item.detail" class="item-text">{{item.detail[0][key]}}</div>
                    <div v-else class="item-text">{{item[key]}}</div>
                  </template>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import storage from 'storage-controller'
  const PAGE_NAME = 'ECONOMY_ORDER'
  const TITLE = '订单列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([API.MeetingOrder.getOrderList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        }
      }), API.MeetingOrder.getOrderStatistic({
        data: {
          keyword: '',
        }
      })]).then(res => {
        next(vw => {
          vw.setData(res[0])
          vw.statusList = res[1].data
        })
      })
    },
    data() {
      return {
        statusList: [],
        total: 0,
        filter: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10
        },
        listHeader: {
          order_sn: {name: '订单号', style: {flex: 1.5}},
          meeting_name: {name: '商品名称', style: {flex: 1.5}},
          meeting_price: {name: '单价'},
          meeting_num: {name: '数量'},
          pay_amount: {name: '实付金额'},
          name: {name: '客户名称'},
          status_str: {name: '状态', type: 'status', style: 'max-width:92px; padding-right: 0'}
        },
        list: []
      }
    },
    methods: {
      // 更新页面数据
      updatePage() {
        this._getList({loading: false})
        this._getStatus()
      },
      // set列表数据
      setData(res) {
        if(!res.data) return
        this.list = res.data
        res.meta && (this.total = res.meta.total)
      },
      // 获取状态统计
      _getStatus() {
        API.MeetingOrder.getOrderStatistic({
          data: {
            keyword: this.filter.keyword,
          }, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      // 获取列表数据
      _getList(other) {
        API.MeetingOrder.getOrderList({
          data: this.filter, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      // 状态统计栏切换
      statusChange() {
        this.filter.page = 1
        this.updatePage()
      },
      searchBtn() {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange() {
        this._getList({loading: false})
      },
      // 导出
      exportExcel() {
        const EXCEL_URL = '/exchange-platform/platform/meeting-order/order/export'
        let _params = {...this.filter, access_token: storage.get('auth.token', '')}
        let search = []
        for (let key in _params) {
          search.push(`${key}=${_params[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}?${search.join('&')}`
        window.open(url, '_blank')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .economy-order
    position: relative
    width: 100%
    display: flex
    flex-direction: column

  .content-wrap
    flex: 1
    display: flex
    flex-direction: column
  .base-search
    margin-left: 0
  .list-box .list-item .list-img
    width: 75px
    height: 45px
  .list-item
    display: flex
    position: relative
    .status-box
      position: relative
      padding-left: 16px
      height: 14px
      &:before
        content: ''
        position: absolute
        left: 0
        top: 2px
        width: 10px
        height: @width
        background: #ECEBF0
        border-radius: 100%
    .status-box.online
      &:before
        background: #FFBD62
    .item-text
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
</style>
