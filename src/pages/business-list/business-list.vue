<template>
  <div class="order-list normal-box table">
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="支付时间" :infoTime.sync="time"></base-date>
      <base-search placeholder="订单号/客户昵称/客户手机号" boxStyle="margin-left: 20px" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="交易明细"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(item, index) in listHeader" :key="index" class="list-item">{{item}}</div>
        </div>
        <div class="list">
          <div v-if="orderList.length">
            <div v-for="(item, index) in orderList" :key="index" class="list-content list-box">
              <div class="list-item">{{item.order ? item.order.order_sn : ''}}</div>
              <div class="list-item">{{item.sub_order_sn}}</div>
              <div class="list-item">{{item.sub_order_sn}}</div>
              <div class="list-item">{{item.sub_order_sn}}</div>
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
  // import * as Helpers from './modules/helpers'
  import API from '@api'

  const PAGE_NAME = 'ORDER_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = ['支付时间', '关联订单号', '交易号', '交易金额']
  const INFO_STATUS = ''

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        visible: false,
        valueKey: 'id',
        arr: [{id: 111, label: '顺丰'}],
        logisticsObj: {
          sub_order_id: '',
          logistics_id: '',
          logistics_sn: '',
          shipping_name: ''
        },
        currentPage: 1,
        page: 1,
        orderList: [],
        keyword: '',
        total: 21,
        status: INFO_STATUS,
        time: [],
        statusList: [],
        deliverId: '',
        disable: false,
        title: '订单发货'
      }
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: '', status: INFO_STATUS}
      API.Order.getOrderList({data, loading: true, toast: true})
        .then((res) => {
          next(vx => {
            vx.orderList = res.data
            vx.total = res.meta.total
          })
        })
        .catch(() => {
          next('404')
        })
    },
    computed: {
      paramObj() {
        let data = {page: this.page, keyword: this.keyword, status: this.status, start_at: this.time[0] || '', end_at: this.time[1] || ''}
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
      async status() {
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
        await this._orderStatus()
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
    .two-line
      color: $color-text-main
      font-size: $font-size-14
      line-height: 18px
      font-family: $font-family-regular
      max-width: 142px
      white-space: normal !important
      no-wrap-plus()
    .list-item
      &:nth-child(3)
        flex: 1.6
        min-width: 276px
        white-space: normal
        display: flex
        align-items: center
        overflow: visible
        .item-img
          width: 40px
          min-width: @width
          height: @width
          min-height: @width
          background: $color-white
          border-radius: 2px
          object-fit: cover
          overflow: hidden
          margin-right: 12px
        .show-more
          width: 14px
          height: 14px
          position: relative
          icon-image('icon-more')
          margin-left: 6px
          &:hover
            .goods-box
              opacity: 1
              z-index: 100
          .goods-box
            opacity: 0
            z-index: 0
            transition: all 0.3s
            box-shadow: 0 1px 8px 0 rgba(78, 89, 131, 0.2)
            background: $color-white
            border-radius: 4px
            left: 23px
            box-sizing: border-box
            col-center()
            .tooltip__arrow
              width: 8px
              height: 12px
              overflow: hidden
              col-center()
              left: -8px
              background: transparent
              &:after
                background: $color-white
                col-center()
                content: ''
                width: 9px
                height: 9px
                left: 50%
                transform: translateY(-50%) rotate(45deg)
                box-shadow: 0 1px 8px 0 rgba(78, 89, 131, 0.2)
          .more-goods
            max-height: 206px
            overflow: auto
            &::-webkit-scrollbar
              width: 4px
              height: 4px
              transition: all 0.2s
            &::-webkit-scrollbar-thumb
              background-color: rgba(0, 0, 0, .06)
              border-radius: 10px
            &::-webkit-scrollbar-thumb:hover
              background-color: rgba(0, 0, 0, .15)
            &::-webkit-scrollbar-track
              box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
              border-radius: 10px
            .goods-item
              width: 374.5px
              margin-bottom: 20px
              display: flex
              padding: 0 15px
              box-sizing: border-box
              font-size: $font-size-14
              align-items: center
              color: $color-text-main
              &:first-child
                margin-top: 20px
              .goods-img
                width: 42px
                height: @width
                min-width: @width
                min-height: @width
                border-radius: 2px
                box-sizing: border-box
                overflow: hidden
                display: block
                object-fit: cover
                background: $color-background
              .goods-name
                width: 142px
                line-height: 1.2
                no-wrap-plus()
              .goods-num, .goods-price
                margin-left: 30px

      &:last-child
        max-width: 58px
        min-width: 58px
        padding: 0
      &:nth-child(9)
        flex: 0.8
      &:nth-child(1), &:nth-child(2)
        min-width: 165px
      &:nth-child(4), &:nth-child(10)
        min-width: 62px
        flex: 0.4

</style>
