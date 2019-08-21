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
      <base-layout class="layout-top">
        <base-date datePlaceholder="请选择时间" textName="创建时间" :infoTime.sync="creatTime" class="date-wrap" @changeDate="changeDate"></base-date>
        <base-search v-model="filter.keyword" placeholder="商户昵称/客户手机号" @search="searchBtn"></base-search>
      </base-layout>
      <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="提现列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
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
            <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
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

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      let type = to.query.type
      console.log(type, 'type')
      let params = {
        type: type,
        start_time: '',
        end_time: '',
        keyword: '',
        status: '',
      }
      Promise.all([API.Finance.getWithdrawalList({
        data: {
          ...params,
          page: 1,
          limit: 10,
        }
      }), API.Finance.getWithdrawalStatus({
        data: params
      })]).then(res => {
        // console.log(res)
        next(vw => {
          // vw.setData(res[0])
          // vw.setStatus(res[1])
        })
      })
    },
    data() {
      return {
        tabList: [{text: '业务补贴', type: '0'}, {text: '商品补贴', type: '1'}],
        statusList: [],
        filter: {
          start_time: '',
          end_time: '',
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
          type: this.$route.query.type || 0
        },
        listHeader: {
          name: {name: '提现单号'},
          level: {name: '申请时间'},
          price: {name: '客户名称 '},
          referrer: {name: '提现金额  '},
          channels: {name: '提现状态 '},
          operate_icon: {name: '打款凭证 ', iconClass: 'icon-certificate', imgUrlKey: 'image'},
          operate_text: {name: '操作 '}
        },
        list: [{
          id: 0,
          name: '刘强东',
          level: '标准版',
          price: 123.00,
          referrer: '李力',
          channels: '线下',
          update_time: '2019-09-18',
          image: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F08%2F06%2F1565065823684-%E7%89%9B%E6%B2%B9%E6%9E%9C.png'
        }, {
          id: 1,
          name: '刘强东',
          level: '标准版',
          price: 123.00,
          referrer: '李力',
          channels: '线下',
          update_time: '2019-09-18',
          image: 'https://social-shopping-api-1254297111.picgz.myqcloud.com/corp1%2F2019%2F08%2F06%2F1565065823684-%E7%89%9B%E6%B2%B9%E6%9E%9C.png'
        }],
        total: 11,
        visible: false,
        photoCertificatesUrl: ''
      }
    },
    computed: {
      type() {
        let query = this.$route.query
        return query.type || 0
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
    mounted() {
      console.log('dskf;')
    },
    methods: {
      // 顶部类型切换
      tabChange(val) {
        // this.filter.type = val
        this.$router.push({name: 'agent-withdrawal', query: {type: val}})
      },
      // 设置页面数据
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      setStatus(res) {
        this.statusList = res.data
      },
      // 获取转态列表
      _getStatus() {
        API.Finance.getWithdrawalList({
          data: {
            keyword: this.filter.keyword,
            category_id: this.filter.category_id
          }, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      // 获取列表
      _getList() {
        API.Finance.getWithdrawalStatus({data: this.filter, loading: false}).then(res => {
          this.setData(res)
        })
      },
      // 导出
      exportExcel() {
        const EXCEL_URL = '/exchange-platform/platform/platform-order/sub-order/export'
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
        window.open(url, '_blank')
      },
      // 展示凭证
      showCertificatesPhoto(url) {
        this.visible = true
        this.photoCertificatesUrl = url
      },
      // 收支明细
      goIncomeExpenses(item, i) {
        this.$router.push({name: 'income-expenses-detail', params: {id: item.id}, query: {name: this.tabList[this.filter.type].text}})
      },
      // 详情
      goDetail(item, i) {
        this.$router.push({name: 'withdrawal-detail', params: {id: item.id}, query: {name: this.tabList[this.filter.type].text}})
      },
      // 分页
      pageChange(val) {
        this._getList()
      },
      // 搜索
      searchBtn() {
        this._getList()
      },
      // 时间选择
      changeDate() {

        this._getList()
      },
      // 状态改变
      statusChange() {
        this._getStatus()
        this._getList()
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
