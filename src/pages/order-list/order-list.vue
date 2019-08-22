<template>
  <div class="order-list normal-box table">
    <base-tabs :data="tabList" :value.sync="tabIndex" valueKey="type" tabAlign="left" margin="0 20px"
               defaultColor="#4E5983" class="tab-top" @change="_changeTopTab"
    ></base-tabs>
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="下单时间" :infoTime.sync="time"></base-date>
      <base-search placeholder="订单号/客户昵称/客户手机号" boxStyle="margin-left: 20px" @search="search"></base-search>
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
          <div v-for="(head, headIdx) in listHeader" :key="headIdx" :class="head.class" class="list-item">{{head.title}}</div>
        </div>
        <div class="list">
          <div v-if="orderList.length">
            <div v-for="(item, index) in orderList" :key="index" class="list-content list-box">
              <div v-for="(head, headIdx) in listHeader" :key="headIdx" :class="head.class" class="list-item">
                <template v-if="head.type==='keyArr'">
                  <template v-if="head.key.length===2">
                    {{item[head.key[0]] ? item[head.key[0]][head.key[1]] : ''}}
                  </template>
                  <template v-if="head.key.length===3">
                    {{item[head.key[0]] ? item[head.key[0]][head.key[1]][head.key[2]] : ''}}
                  </template>
                </template>
                <template v-if="head.type==='normal'">{{item[head.key]}}</template>
                <template v-if="head.type==='goods'">
                  <!--商品样式-->
                  <img :src="item.detail ? item.detail.goods_cover_image : ''" class="item-img">
                  <p class="goods-name two-line">{{item.detail ? item.detail.goods_name : ''}}</p>
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
                </template>
                <template v-if="head.type==='user'">
                  <div class="item-dark"> {{item.receiver_addresses ? item.receiver_addresses.name : ''}}</div>
                  <div class="item-sub-time"> {{item.receiver_addresses ? item.receiver_addresses.mobile : ''}}
                  </div>
                </template>
                <template v-if="head.type==='address'">
                  {{`${item.receiver_addresses.province}${item.receiver_addresses.city}${item.receiver_addresses.district}${item.receiver_addresses.address}`}}
                </template>
                <template v-if="head.type==='option'">
                  <span class="list-operation" @click="deliver(item)">{{item.status === 10 ? '发货' : item.status === 20 || item.status === 100 ? '查看' : ''}}</span>
                  {{item.status === 0 || item.status === -1 ? '——' : ''}}
                </template>
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
    <base-modal :visible.sync="visible" height="268px" :title="title" :submitBefore="justifyForm" @submit="setLogistics">
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
  const INFO_STATUS = ''
  const EXCEL_URL = '/exchange-platform/platform/platform-order/sub-order/export'
  const TAB_CONFIG = [{text: '采集订单', type: 0}, {text: '赞播优品订单', type: 1}]
  const LIST_CONFIG = [
    [
      {title: '主单号', key: ['order','order_sn'], class: 'width-3', type: 'keyArr'},
      {title: '子单号', key: 'sub_order_sn', class: 'width-3', type: 'normal'},
      {title: '商品', key: '', class: 'goods-item', type: 'goods'},
      {title: '数量', key: ['detail','goods_num'], class: 'width-1', type: 'keyArr'},
      {title: '单价(元)', key: ['detail','goods_spec','price'], class: 'width-1', type: 'keyArr'},
      {title: '姓名', key: '', class: 'width-2 list-double-row', type: 'user'},
      {title: '收货地址', key: '', class: 'width-3 two-line', type: 'address'},
      {title: '下单时间', key: 'created_at', class: 'width-3', type: 'normal'},
      {title: '实付款(元)', key: 'pay_amount', class: 'width-1', type: 'normal'},
      {title: '状态', key: 'status_str', class: 'width-1', type: 'normal'},
      {title: '操作', key: '', class: 'option-item', type: 'option'},
    ],
    [
      {title: '主单号', key: ['order','order_sn'], class: 'width-3', type: 'keyArr'},
      {title: '商品', key: '', class: 'goods-item', type: 'goods'},
      {title: '数量', key: ['detail','goods_num'], class: 'width-1', type: 'keyArr'},
      {title: '单价(元)', key: ['detail','goods_spec','price'], class: 'width-1', type: 'keyArr'},
      {title: '姓名', key: '', class: 'width-2 list-double-row', type: 'user'},
      {title: '收货地址', key: '', class: 'width-3 two-line', type: 'address'},
      {title: '下单时间', key: 'created_at', class: 'width-3', type: 'normal'},
      {title: '实付款(元)', key: 'pay_amount', class: 'width-1', type: 'normal'},
      {title: '状态', key: 'status_str', class: 'width-1', type: 'normal'},
      {title: '操作', key: '', class: 'option-item', type: 'option'},
    ]
  ]
  const TEST_ORDER = [{"id":1,"sub_order_sn":"Z1908081837365775","goods_price":"31.05","goods_amount":"0.03","freight_amount":"34","pay_amount":"34.03","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-08 18:37:36","order":{"id":1,"order_sn":"C1908081837366641"},"detail":{"id":1,"goods_id":1,"goods_name":"测试的商品1测试的商品1测试的商品1测试的商品1","goods_describe":"测试的商品描述1","goods_category_id":1,"goods_serial_number":"1234567891","goods_weight":2400,"goods_num":3,"goods_manufacturer":"赞播集团出品","goods_spec_id":1,"goods_spec":{"id":"1","goods_id":"1","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":1,"address_id":1,"name":"程赐明1","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":2,"sub_order_sn":"Z1908081837362193","goods_price":"20.7","goods_amount":"0.02","freight_amount":"26","pay_amount":"26.02","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-08 18:37:36","order":{"id":1,"order_sn":"C1908081837366641"},"detail":{"id":2,"goods_id":2,"goods_name":"测试的商品2","goods_describe":"测试的商品描述2","goods_category_id":1,"goods_serial_number":"1234567892","goods_weight":2400,"goods_num":2,"goods_manufacturer":"赞播集团出品","goods_spec_id":2,"goods_spec":{"id":"2","goods_id":"2","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":1,"address_id":1,"name":"程赐明1","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":3,"sub_order_sn":"Z1908081925438406","goods_price":"31.05","goods_amount":"0.03","freight_amount":"34","pay_amount":"34.03","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-08 19:25:43","order":{"id":3,"order_sn":"C1908081925435464"},"detail":{"id":3,"goods_id":1,"goods_name":"测试的商品1","goods_describe":"测试的商品描述1","goods_category_id":1,"goods_serial_number":"1234567891","goods_weight":2400,"goods_num":3,"goods_manufacturer":"赞播集团出品","goods_spec_id":1,"goods_spec":{"id":"1","goods_id":"1","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":3,"address_id":1,"name":"程赐明2","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":4,"sub_order_sn":"Z1908081925433029","goods_price":"20.7","goods_amount":"0.02","freight_amount":"26","pay_amount":"26.02","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-08 19:25:43","order":{"id":3,"order_sn":"C1908081925435464"},"detail":{"id":4,"goods_id":2,"goods_name":"测试的商品2","goods_describe":"测试的商品描述2","goods_category_id":1,"goods_serial_number":"1234567892","goods_weight":2400,"goods_num":2,"goods_manufacturer":"赞播集团出品","goods_spec_id":2,"goods_spec":{"id":"2","goods_id":"2","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":3,"address_id":1,"name":"程赐明2","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":7,"sub_order_sn":"Z1908091200145828","goods_price":"31.05","goods_amount":"0.03","freight_amount":"34","pay_amount":"34.03","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:00:14","order":{"id":7,"order_sn":"C1908091200146131"},"detail":{"id":7,"goods_id":1,"goods_name":"测试的商品1","goods_describe":"测试的商品描述1","goods_category_id":1,"goods_serial_number":"1234567891","goods_weight":2400,"goods_num":3,"goods_manufacturer":"赞播集团出品","goods_spec_id":1,"goods_spec":{"id":"1","goods_id":"1","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":7,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":8,"sub_order_sn":"Z1908091200147377","goods_price":"20.7","goods_amount":"0.02","freight_amount":"26","pay_amount":"26.02","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:00:14","order":{"id":7,"order_sn":"C1908091200146131"},"detail":{"id":8,"goods_id":2,"goods_name":"测试的商品2","goods_describe":"测试的商品描述2","goods_category_id":1,"goods_serial_number":"1234567892","goods_weight":2400,"goods_num":2,"goods_manufacturer":"赞播集团出品","goods_spec_id":2,"goods_spec":{"id":"2","goods_id":"2","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":7,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":13,"sub_order_sn":"Z1908091203041712","goods_price":"31.05","goods_amount":"0.03","freight_amount":"34","pay_amount":"34.03","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:03:04","order":{"id":10,"order_sn":"C1908091203042053"},"detail":{"id":13,"goods_id":1,"goods_name":"测试的商品1","goods_describe":"测试的商品描述1","goods_category_id":1,"goods_serial_number":"1234567891","goods_weight":2400,"goods_num":3,"goods_manufacturer":"赞播集团出品","goods_spec_id":1,"goods_spec":{"id":"1","goods_id":"1","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":10,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":14,"sub_order_sn":"Z1908091203043757","goods_price":"20.7","goods_amount":"0.02","freight_amount":"26","pay_amount":"26.02","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:03:04","order":{"id":10,"order_sn":"C1908091203042053"},"detail":{"id":14,"goods_id":2,"goods_name":"测试的商品2","goods_describe":"测试的商品描述2","goods_category_id":1,"goods_serial_number":"1234567892","goods_weight":2400,"goods_num":2,"goods_manufacturer":"赞播集团出品","goods_spec_id":2,"goods_spec":{"id":"2","goods_id":"2","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":10,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":17,"sub_order_sn":"Z1908091206001827","goods_price":"31.05","goods_amount":"0.03","freight_amount":"34","pay_amount":"34.03","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:06:00","order":{"id":12,"order_sn":"C1908091206001526"},"detail":{"id":17,"goods_id":1,"goods_name":"测试的商品1","goods_describe":"测试的商品描述1","goods_category_id":1,"goods_serial_number":"1234567891","goods_weight":2400,"goods_num":3,"goods_manufacturer":"赞播集团出品","goods_spec_id":1,"goods_spec":{"id":"1","goods_id":"1","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":12,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}},{"id":18,"sub_order_sn":"Z1908091206007812","goods_price":"20.7","goods_amount":"0.02","freight_amount":"26","pay_amount":"26.02","status":0,"status_str":"待付款","pay_status":0,"pay_status_str":"待支付","ship_status":0,"ship_status_str":"待发货","created_at":"2019-08-09 12:06:00","order":{"id":12,"order_sn":"C1908091206001526"},"detail":{"id":18,"goods_id":2,"goods_name":"测试的商品2","goods_describe":"测试的商品描述2","goods_category_id":1,"goods_serial_number":"1234567892","goods_weight":2400,"goods_num":2,"goods_manufacturer":"赞播集团出品","goods_spec_id":2,"goods_spec":{"id":"2","goods_id":"2","price":10.35,"discount_price":0.01}},"receiver_addresses":{"id":12,"address_id":1,"name":"程赐明","mobile":"13711458538","province":"广东省","city":"广州市","district":"海珠区","address":"海珠唯品同创会F5栋"}}]

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        tabIndex: 0,
        tabList: TAB_CONFIG,
        listHeader: LIST_CONFIG[0],
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
          API.Order.orderStatus({data: null, loading: true, toast: true})
            .then((status) => {
              next(vx => {
                res.data = TEST_ORDER
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
      _initParams() {
        this.page = 1
        this.keyword = ''
        this.time = []
        this.getOrderList()
      },
      _changeTopTab(index) {
        this.tabIndex = index
        this.listHeader = LIST_CONFIG[index]
        // this._initParams()
      },
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
            res.data = TEST_ORDER
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
          this.title = '查看物流'
          this._getLogisticsDetail()
          return
        }
        this.title = '订单发货'
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

  .order-list
    width: 100%
    padding-top: 50px
    .tab-top
      position: fixed
      top: 50px
      left: 200px
      z-index: 99
  .list-box
    overflow: visible
    .two-line
      color: $color-text-main
      font-size: $font-size-14
      line-height: 18px
      font-family: $font-family-regular
      max-width: 240px
      white-space: normal !important
      no-wrap-plus(2)
    .list-item
      &.option-item
        max-width: 58px
        min-width: 58px
        padding: 0
      &.width-1
        min-width: 66px
        flex: 0.6
      &.width-2
        min-width: 110px
        flex: 1
      &.width-3
        flex: 1.6
        min-width: 176px
      &.goods-item
        flex: 2
        min-width: 220px
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

</style>
