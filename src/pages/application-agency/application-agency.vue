<template>
  <div class="application-agency normal-box table">
    <base-layout-top>
      <base-date dateStyle="margin-right: 20px" datePlaceholder="请选择时间" textName="提交时间" :infoTime.sync="time"></base-date>
      <base-form-item :inline="true" :required="false" verticalAlign="center" label="等级筛选" labelSize="12px">
        <base-select v-model="level" placeholder="账号等级" width="120" radius="2"></base-select>
      </base-form-item>
      <base-search v-model="keyword" placeholder="客户昵称/客户手机号" boxStyle="margin-left: 20px" @search="search"></base-search>
    </base-layout-top>
    <base-table-tool :iconUrl="require('./icon-sqjl@2x.png')" title="交易记录">
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
          <div v-if="applicationList.length">
            <div v-for="(item, index) in applicationList" :key="index" class="list-content list-box">
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
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
  import storage from 'storage-controller'

  const PAGE_NAME = 'APPLICATION_AGENCY'
  const TITLE = '代理申请'
  const LIST_HEADER = ['客户名称', '当前等级', '申请类型', '代理金额', '提交时间', '提交渠道']
  const EXCEL_URL = ''

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        time: [],
        applicationList: [{}],
        page: 1,
        level: '',
        keyword: '',
        total: 1
      }
    },
    computed: {
      paramObj() {
        let data = {
          page: this.page,
          keyword: this.keyword,
          level: this.level,
          start_at: this.time[0] || '',
          end_at: this.time[1] || ''
        }
        return data
      },
      excelUrl() {
        let data = Object.assign({}, this.paramObj, {access_token: storage.get('auth.token', '')})
        let search = []
        for (let key in data) {
          search.push(`${key}=${data[key]}`)
        }
        let url = `${process.env.VUE_APP_API}${EXCEL_URL}?${search.join('&')}`
        return url
      }
    },
    watch: {
      page() {
        this._getApplicationList()
      },
      keyword() {
        this.page = 1
        this._getApplicationList()
      },
      level() {
        this.page = 1
        this._getApplicationList()
      },
      time() {
        this.page = 1
        this._getApplicationList()
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   let data = {page: 1, keyword: '', level: '', start_at: '', end_at: ''}
    //   API.Application.getApplicationList({data, loading: true, toast: true})
    //     .then((res) => {
    //       API.Order.orderStatus({data: null, loading: true, toast: true})
    //         .then((status) => {
    //           next(vx => {
    //             vx.applicationList = res.data
    //             vx.total = res.meta.total
    //           })
    //         })
    //     })
    //     .catch(() => {
    //       next('404')
    //     })
    // },
    methods: {
      // 导出Excel
      downExcel() {
        window.open(this.excelUrl, '_blank')
      },
      search(keyword) {
        this.keyword = keyword
      },
      _getApplicationList(loading = false) {
        API.Application.getApplicationList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {}
        }).then((res) => {
          this.applicationList = res.data
          this.total = res.meta.total
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .list-box
    .list-item
      &:last-child
        min-width: 86px
        max-width: 86px
</style>
