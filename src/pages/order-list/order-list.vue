<template>
  <div class="order-list normal-box table">
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="下单时间" :infoTime.sync="time"></base-date>
      <base-search placeholder="订单号/客户名字/客户手机号" boxStyle="margin-left: 20px" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="订单列表">
      <div slot="left">
        <base-status-tab :statusList="statusList" :value.sync="status"></base-status-tab>
      </div>
      <base-button plain buttonStyle="width: 92px" @click="downExcel">
        导出Excel
      </base-button>
    </base-table-tool>
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
              <div class="list-item">
                <!--商品样式-->
                <img :src="item.detail ? item.detail.goods_cover_image : ''" class="item-img">
                <p class="goods-name">{{item.detail ? item.detail.goods_name : ''}}</p>
                <span v-if="false" class="show-more hand">
                  <transition name="fade">
                    <div class="goods-box">
                      <span class="tooltip__arrow"></span>
                      <ul class="more-goods">
                        <li class="goods-item">
                          <img src="" alt="" class="goods-img">
                          <p class="two-line">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
                          <p class="goods-num">x10</p>
                          <p class="goods-price">238.00</p>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </span>
              </div>
              <div class="list-item">{{item.detail ? item.detail.goods_num : ''}}</div>
              <!--单价-->
              <div class="list-item">{{item.detail ? item.detail.goods_name : ''}}</div>
              <div class="list-item list-double-row">
                <div class="item-dark"> {{item.receiver_addresses ? item.receiver_addresses.name : ''}}</div>
                <div class="item-sub-time"> {{item.receiver_addresses ? item.receiver_addresses.mobile : ''}}
                </div>
              </div>
              <div v-if="item.receiver_addresses" class="list-item two-line">
                {{`${item.receiver_addresses.province} ${item.receiver_addresses.city} ${item.receiver_addresses.district} ${item.receiver_addresses.address}`}}
              </div>
              <div class="list-item">{{item.created_at}}</div>
              <div class="list-item">{{item.pay_amount}}</div>
              <div class="list-item">{{item.status_str}}</div>
              <div class="list-item">
                <span class="list-operation" @click="deliver(item)">{{item.status === 10 ? '发货' : item.status === 20 || item.status === 100 ? '查看' : ''}}</span>
                {{item.status === 0 || item.status === -1 ? '——' : ''}}
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
    <base-modal :visible.sync="visible" height="268px" title="设置账号等级" :submitBefore="justifyForm" @submit="setLogistics">
      <div class="set-box">
        <base-form-item
          label="快递公司"
          labelHeight="44px"
          :inline="true"
          :required="true"
          marginBottom="20"
          verticalAlign="center"
        >
          <base-select
            placeholder="请选择快递公司"
            :value.sync="logisticsObj.logistics_id"
            :defaultLabel="logisticsObj.shipping_name"
            :data="arr"
            :valueKey="valueKey"
            :width="416"
            :height="44"
            type="input"
            labelKey="name"
            :disabled="disable"
          ></base-select>
        </base-form-item>
        <base-form-item
          label="快递单号"
          labelHeight="44px"
          :inline="true"
          :required="true"
          marginBottom="0"
          verticalAlign="center"
        >
          <base-input
            v-model="logisticsObj.logistics_sn"
            placeholder="请输入快递单号"
            :width="416"
            :height="44"
            type="input"
            inputType="number"
            :disabled="disable"
          ></base-input>
        </base-form-item>
      </div>
    </base-modal>

  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import storage from 'storage-controller'

  const PAGE_NAME = 'ORDER_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = ['主单号', '子单号', '商品', '数量', '单价(元)', '买家', '收货地址', '下单时间', '实付款(元)', '状态', '操作']
  const INFO_STATUS = ''
  const EXCEL_URL = '/exchange-platform/platform/platform-order/sub-order/export'

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
        disable: false
      }
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: '', status: INFO_STATUS}
      API.Order.getOrderList({data, loading: true, toast: true})
        .then((res) => {
          API.Order.orderStatus({data: null, loading: true, toast: true})
            .then((status) => {
              next(vx => {
                vx.statusList = status.data
                vx.orderList = res.data
                vx.total = res.meta.total
              })
            })
        })
        .catch(() => {
          next('404')
        })
    },
    computed: {
      excelUrl() {
        let data = {
          keyword: this.keyword,
          start_at: this.time[0] || '',
          end_at: this.time[1] || '',
          status: this.status,
          access_token: storage.get('auth.token', '')
        }
        let search = []
        for (let key in data) {
          search.push(`${key}=${data[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}?${search.join('&')}`
        return url
      },
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
    created() {
      this.getLogisticsList()
    },
    methods: {
      // 获取物流列表
      getLogisticsList() {
        API.Logistics.logisticsList({
          limit: 0,
          loading: false,
          toast: true
        })
          .then((res) => {
            this.arr = res.data
          })
      },
      // 获取订单列表
      async getOrderList(loading = true) {
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
      // 获取订单状态
      async _orderStatus() {
        let res = await API.Order.orderStatus({data: {keyword: this.keyword, start_at: this.time[0] || '', end_at: this.time[1] || ''}, loading: false, toast: false})
        if (res.error_code === this.$ERR_OK) {
          this.statusList = res.data
        }
      },
      // 搜索
      search(keyword) {
        this.keyword = keyword || ''
      },
      // 导出Excel
      downExcel() {
        window.open(this.excelUrl, '_blank')
      },
      // 发货
      deliver(item) {
        this.logisticsObj = {
          sub_order_id: '',
          logistics_id: '',
          logistics_sn: '',
          shipping_name: ''
        }
        this.logisticsObj.sub_order_id = item.id
        if (item.status === 20 || item.status === 100) {
          this.disable = true
          this._getLogisticsDetail()
          return
        }
        this.visible = true
        this.disable = false
      },
      // 确认发货
      async setLogistics() {
        if (this.disable) {
          return
        }
        await API.Order.setLogistics(
          {
            data: this.logisticsObj,
            loading: true,
            toast: true
          }
        )
        await this.getOrderList(false)
      },
      // 查看发货详情
      async _getLogisticsDetail() {
        let res = await API.Order.logisticsDetail(
          {
            data: {sub_order_id: this.logisticsObj.sub_order_id},
            loading: true,
            toast: true
          }
        )
        if (res.error_code === this.$ERR_OK) {
          this.logisticsObj = res.data
          this.visible = true
        }
      },
      //  弹窗限制
      justifyForm(done) {
        let msg = ''
        if (!this.logisticsObj.logistics_id) {
          msg = '请选择快递公司'
        } else if (!this.logisticsObj.logistics_sn) {
          msg = '请输入快递单号'
        }
        if (msg) {
          this.$toast.show(msg)
          return
        }
        done()
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

</style>
