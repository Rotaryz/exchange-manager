<template>
  <div class="agent-withdrawal">
    <base-tabs :data="tabList"
               :value.sync="filter.type"
               valueKey="type"
               tabAlign="left"
               margin="0 20px"
               defaultColor="#333333"
               class="tab-top"
               @change="tabChange"
    ></base-tabs>
    <div class="content-wrap">
      <base-layout-top>
        <base-date datePlaceholder="请选择时间" textName="创建时间" :infoTime.sync="creatTime" class="date-wrap" @changeDate="_getData"></base-date>
        <base-search v-model="filter.keyword" placeholder="商户昵称/客户手机号" @search="_getData"></base-search>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="提现列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="status" @change="_getData"></base-status-tab>
        <base-button plain @click="exportExcel">导出Excel</base-button>
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
                  <template v-if="key==='operate_icon'">
                    <div :class="val.iconClass" @click="showCertificatesPhoto(item[val.imgUrlKey])"></div>
                  </template>
                  <template v-if="key==='operate_text'">
                    <span class="list-operation" @click="goDetail(item,i)">详情</span>
                    <span class="list-operation" @click="goIncomeExpenses(item,i)">收支明细</span>
                  </template>
                  <template v-else>{{item[key]}}</template>
                </div>
              </div>
            </template>
            <base-blank v-else></base-blank>
          </div>
          <div class="pagination-box">
            <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="page" @pageChange="_getData"></base-pagination>
          </div>
        </div>
      </div>
      <base-modal :visible.sync="visible" :isShowBtns="false" title="打款凭证">
        <img :src="photoCertificatesUrl" alt="打款凭证" class="photo-certificate">
      </base-modal>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as Helpers from './modules/helpers'
  import API from '@api'
  import storage from 'storage-controller'

  const PAGE_NAME = 'AGENT_WITHDRAWAL'
  const TITLE = '代理商提现'
  const DEFAULT_TYPE = '1'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        tabList: [{text: '业务补贴', type: DEFAULT_TYPE}, {text: '商品补贴', type: '2'}],
        statusList: [],
        filter: {
          start_time: '',
          end_time: '',
          keyword: '',
          type: this.$route.query.type || DEFAULT_TYPE
        },
        page: 1,
        status: '',
        listHeader: {
          withdraw_sn: {name: '提现单号'},
          created_at: {name: '申请时间'},
          withdrawal_name: {name: '客户名称'},
          total: {name: '提现金额'},
          status_text: {name: '提现状态'},
          operate_icon: {name: '打款凭证', iconClass: 'icon-certificate', imgUrlKey: 'image_url'},
          operate_text: {name: '操作'}
        },
        list: [],
        total: 0,
        visible: false,
        photoCertificatesUrl: ''
      }
    },
    computed: {
      type() {
        let query = this.$route.query
        return query.type || DEFAULT_TYPE
      },
      creatTime: {
        get() {
          return [this.filter.start_time, this.filter.end_time]
        },
        set(val) {
          this.filter.start_time = val[0]
          this.filter.end_time = val[1]
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      let type = to.query.type || DEFAULT_TYPE
      let params = {
        type: type,
        status: '',
        start_time: '',
        end_time: '',
        keyword: ''
      }
      Promise.all([
        API.Finance.getWithdrawalList({
          data: {
            ...params,
            page: 1,
            limit: 10
          }
        }),
        API.Finance.getWithdrawalStatus({
          data: params
        })
      ]).then((res) => {
        console.log(res)
        next((vw) => {
          vw.setData(res[0])
          vw.statusList = res[1].data
        })
      })
    },
    mounted() {
      console.log('mounted')
    },
    methods: {
      // 顶部类型切换
      tabChange(val) {
        // this.filter.type = val
        this.$router.push({name: 'agent-withdrawal', query: {type: val}})
      },
      // 设置页面数据
      setData(res) {
        res.data = [
          {
            "id": 1,
            "withdraw_id": 1,
            "withdraw_sn": "W1908251748135306",
            "created_at": "2019-08-25 17:48",
            "withdrawal_name": "黄锦冰111",
            "shop_name": "杂货铺子",
            "poundage": "1元",
            "total": "1元",
            "status": 1,
            "status_text": "待打款",
            "image_url": "https://exchange-platform-img.jkweixin.com/prod%2F2019%2F08%2F19%2F1566216158349-883671",
            "note": "xx"
          }
        ]
        this.list = res.data
        this.total = res.meta.total
      },
      _getData() {
        this._getWithdrawalList()
        this._getStatistics()
      },
      // 获取提现列表
      _getWithdrawalList() {
        API.Finance.getWithdrawalList({
          data: {...this.filter, page: this.page, status: this.status},
          loading: false
        }).then((res) => {
          this.setData(res)
        })
      },
      // 获取提现状态统计
      _getStatistics() {
        API.Finance.getWithdrawalStatus({data: this.filter, loading: false}).then((res) => {
          this.statusList = res.data
        })
      },
      // 导出
      exportExcel() {
        const EXCEL_URL = '/exchange-platform/platform/settlement/withdraw/export'
        let _params = {...this.filter, page: this.page, status: this.status, access_token: storage.get('auth.token', '')}
        let search = []
        for (let key in _params) {
          search.push(`${key}=${_params[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}?${search.join('&')}`
        window.open(url, '_blank')
      },
      // 展示凭证
      showCertificatesPhoto(url) {
        this.visible = true
        this.photoCertificatesUrl = url
      },
      // 收支明细
      goIncomeExpenses(item) {
        this.$router.push({
          name: 'income-expenses-detail',
          params: {id: item.id},
          query: {name: this.tabList[this.filter.type].text}
        })
      },
      // 详情
      goDetail(item) {
        this.$router.push({
          name: 'withdrawal-detail',
          params: {id: item.id},
          query: {name: this.tabList[this.filter.type].text}
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .agent-withdrawal
    position relative
    width: 100%
    display flex
    flex-direction column

    .content-wrap
      flex: 1
      padding: 20px
      display flex
      flex-direction column

      .icon-certificate
        width: 21px
        height: 17px
        icon-image('icon-voucher')

      .photo-certificate
        width: 960px
        height: 471px
        object-fit contain
        margin: 8px 0 20px 0
</style>
