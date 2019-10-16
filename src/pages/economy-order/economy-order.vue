<template>
  <div class="economy-order">
    <base-tabs :data="tabList"
               :value.sync="type"
               valueKey="type"
               tabAlign="left"
               @change="tabChange"
    ></base-tabs>
    <div class="content-wrap">
      <base-layout-top>
        <base-date v-if="type===2" datePlaceholder="请选择时间" textName="支付时间" :infoTime.sync="time"
                   @changeDate="changeDate"
        ></base-date>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="订单号/商品名称" class="base-search"
                       @search="searchBtn"
          ></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="订单列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status"
                         @change="statusChange"
        ></base-status-tab>
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
                  <div v-if="val.type === 'status'" class="status-box" :class="[item.status===10?'online':'']">
                    {{item[key]}}
                  </div>
                  <div v-else class="item-text">
                    {{getChild(key,item)}}
                  </div>
                </div>
              </div>
            </template>
            <base-blank v-else></base-blank>
          </div>
          <div class="pagination-box">
            <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page"
                             @pageChange="pageChange"
            ></base-pagination>
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
      console.log(to.query.type, 'to.query.type')
      let type = +(to.query.type || 1)
      let getListMethodsName = type === 1 ? API.MeetingOrder.getOrderList : API.MeetingOrder.getGroupOrderList
      let getStatisticMethodsName = type === 1 ? API.MeetingOrder.getOrderStatistic : API.MeetingOrder.getGroupOrderStatistic
      Promise.all([getListMethodsName({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        }
      }), getStatisticMethodsName({
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
        tabList: [{text: '订单列表', type: 1}, {text: '拼团订单', type: 2}],
        type: 1,
        statusList: [],
        total: 0,
        filter: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10
        },
        time: [],
        list: []
      }
    },
    computed: {
      listHeader() {
        return this.type === 1 ? {
          order_sn: {name: '订单号', style: {flex: 1.5}},
          'detail.0.meeting_name': {name: '商品名称', style: {flex: 1.5}, ParentName: 'detail'},
          'detail.0.meeting_price': {name: '单价'},
          'detail.0.meeting_num': {name: '数量'},
          pay_amount: {name: '实付金额'},
          name: {name: '客户名称'},
          status_str: {name: '状态', type: 'status', style: 'max-width:92px; padding-right: 0'}
        } : {
          order_sn: {name: '订单号', style: {flex: 1.5}},
          'buyer.name': {name: '客户名称', style: {flex: 1.5}},
          goods_name: {name: '活动名称', style: {flex: 3}},
          goods_price: {name: '团购价'},
          goods_num: {name: '数量'},
          pay_amount: {name: '实付金额'},
          'detail.name': {name: '卖家'},
          status_str: {name: '状态', type: 'status', style: 'max-width:92px; padding-right: 0'}
        }
      }
    },
    watch: {
      $route(router) {
        if (router.name !== 'economy-order') return
        this.updatePage()
      }
    },
    methods: {
      getChild(key, value) {
        if (key.includes('.')) {
          let arr = key.split('.')
          arr.forEach(key => {
            value = value[key]
          })
          return value
        }
        return value[key]
      },
      // 顶部类型切换
      tabChange(val) {
        this.list = []
        this.filter.keyword = ''
        this.filter.status = ''
        this.filter.page = 1
        if (this.type === 2) {
          this.time = []
        }
        this.$router.replace({
          name: 'economy-order',
          query: {type: this.type}
        })
      },
      // 更新页面数据
      updatePage() {
        this._getList({loading: false})
        this._getStatus()
      },
      // set列表数据
      setData(res) {
        this.type = +this.$route.query.type || 1
        if (!res.data) return
        this.list = res.data
        res.meta && (this.total = res.meta.total)
      },
      // 获取状态统计
      _getStatus() {
        let getStatisticMethodsName = this.type === 1 ? 'getOrderStatistic' : 'getGroupOrderStatistic'
        let statisticParams = {
          keyword: this.filter.keyword
        }
        if (this.type === 2) {
          statisticParams.start_at = this.time[0] || ''
          statisticParams.end_at = this.time[1] || ''
        }
        API.MeetingOrder[getStatisticMethodsName]({
          data: statisticParams, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      // 获取列表数据
      _getList(other) {
        let getListMethodsName = this.type === 1 ? 'getOrderList' : 'getGroupOrderList'
        let listParams = {...this.filter}
        if (this.type === 2) {
          listParams.start_at = this.time[0] || ''
          listParams.end_at = this.time[1] || ''
        }
        API.MeetingOrder[getListMethodsName]({
          data: listParams, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      // 时间选择器
      changeDate() {
        this.filter.page = 1
        this.updatePage()
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
        const EXCEL_URL = this.type === 1 ? '/exchange-platform/platform/meeting-order/order/export' : '/exchange-platform/platform/business-order/order/export'
        let filter = this.type === 1 ? this.filter : {...this.filter, start_at: this.startTime, end_at: this.endTime}
        let _params = {...filter, access_token: storage.get('auth.token', '')}
        let search = []
        for (let key in _params) {
          search.push(`${key}=${_params[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}?${search.join('&')}`
        window.open(url, '_parent')
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
    padding: 20px

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
