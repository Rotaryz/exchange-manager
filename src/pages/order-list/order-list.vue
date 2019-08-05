<template>
  <div class="order-list normal-box table">
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-date datePlaceholder="请选择时间" textName="下单时间"></base-date>
      <base-search placeHolder="订单号/客户昵称/客户手机号" boxStyle="margin-left: 20px" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="订单列表">
      <div slot="left">
        <base-status-tab></base-status-tab>
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
          <!---->
          <div v-for="(item, index) in orderList" :key="index" class="list-content list-box">
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">
              <!--商品样式-->
              <img src="" alt="" class="item-img">
              <p class="goods-name">商品名称商品名称</p>
              <span class="show-more hand">
                <transition name="fade">
                  <div class="goods-box">
                    <span class="tooltip__arrow"></span>
                    <ul class="more-goods">
                      <li class="goods-item">
                        <img src="" alt="" class="goods-img">
                        <p class="goods-name">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</p>
                        <p class="goods-num">x10</p>
                        <p class="goods-price">238.00</p>
                      </li>
                    </ul>
                  </div>
                </transition>
              </span>
            </div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item list-double-row">
              <div class="item-dark">张家辉</div>
              <div class="item-sub-time">13627778899</div>
            </div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">
              <span class="list-operation" @click="deliver">发货</span>
            </div>
          </div>
        </div>
        <div class="pagination-box">
          <!---->
          <base-pagination ref="pages" :currentPage.sync="page" :total="total"></base-pagination>
        </div>
      </div>
    </div>
    <default-modal :visible.sync="visible" height="268px" title="设置账号等级" :submitBefore="justifyForm" @submit="setLogistics">
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
            :value.sync="logisticsObj.logistics"
            :data="arr"
            :valueKey="valueKey"
            inputStyle="width:416px;height:44px"
            type="input"
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
            v-model="logisticsObj.logisticsNum"
            placeholder="请输入快递单号"
            inputStyle="width:416px;height:44px"
            type="input"
            inputType="number"
          ></base-input>
        </base-form-item>
      </div>
    </default-modal>

  </div>
</template>

<script type="text/ecmascript-6">
  import DefaultModal from '@components/default-modal/default-modal'
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  const PAGE_NAME = 'ORDER_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = ['主单号', '子单号', '商品', '数量', '单价(元)', '买家', '收货地址', '下单时间', '实付款(元)', '状态', '操作']
  const INFO_STATUS = ''
  const EXCEL_URL = ''

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      DefaultModal
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        visible: false,
        valueKey: 'id',
        arr: [{id: 111, label: '顺丰'}],
        logisticsObj: {
          logistics: '',
          logisticsNum: ''
        },
        currentPage: 1,
        page: 1,
        orderList: [{}, {}],
        keyword: '',
        total: 21,
        status: INFO_STATUS
      }
    },
    computed: {
      excelUrl() {
        let data = {
          page: this.page,
          keyword: this.keyword,
          status: this.status
        }
        let search = []
        for (let key in data) {
          search.push(`${key}=${data[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}}?${search.join('&')}`
        return url
      }
    },
    // beforeRouteEnter() {
    // this.getOrderList(true)
    // this._orderStatus
    // },
    watch: {
      page() {
        this.getOrderList()
      },
      keyword() {
        this.page = 1
        this.getOrderList()
      },
      status() {
        this.page = 1
        this.getOrderList()
      }
    },
    methods: {
      // 获取客户列表
      getOrderList(loading = false) {
        // let data = {page:this.page, keyword:this.keyword, status: this.status}
        // return API.Order.getOrderList({data, loading, toast: true, doctor(){}})
        //   .then((res) => {
        //     this.total = res.meta.total
        //     this.total = res.meta.total
        //   })
        //   .catch(() => {
        //     return false
        //   })
        //   .finally(() => {
        //     app.$loading.hide()
        //   })
        return true
      },
      // 获取订单状态
      _orderStatus() {
        // API.Order.getOrderList({data:{}, loading: false, toast: true, doctor(){}})
      },
      // 搜索
      search(keyword) {

      },
      // 导出Excel
      downExcel() {
        window.open(this.excelUrl, '_blank')
      },
      // 发货
      deliver() {
        this.visible = true
      },
      // 确认发货
      setLogistics() {
        console.log(this.logisticsObj)
      },
      //  弹窗限制
      justifyForm(done) {
        let msg = ''
        if (!this.logisticsObj.logistics) {
          msg = '请选择快递公司'
        } else if (!this.logisticsObj.logisticsNum) {
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
          background: $color-main
          border-radius: 2px
          object-fit: cover
        .goods-name
          margin-left: 12px
          color: $color-text-main
          font-size: $font-size-14
          line-height: 18px
          font-family: $font-family-regular
          max-width: 142px
          no-wrap-plus()
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
