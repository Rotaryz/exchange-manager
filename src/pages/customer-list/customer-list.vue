<template>
  <div class="customer-list normal-box table">
    <div class="down-content">
      <base-form-item :required="false" labelSize="12px" label="筛选" marginBottom="0">
        <base-select boxStyle="margin: 0" :width="120" :height="32" defaultLabel="账号等级"></base-select>
      </base-form-item>
      <base-search boxStyle="margin: 30px" placeholder="客户昵称/客户手机号" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-customer_list@2x.png')" title="客户列表"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(item, index) in listHeader" :key="index" class="list-item">{{item}}</div>
        </div>
        <div class="list">
          <div v-if="customerList.length">
            <div v-for="(item, index) in customerList" :key="index" class="list-content list-box">
              <div class="list-item">{{item.truename}}</div>
              <div class="list-item">{{item.mobile}}</div>
              <div class="list-item">{{item.name}}</div>
              <div class="list-item">{{item.industry_name}}</div>
              <div class="list-item">{{`${item.province} ${item.city} ${item.district}`}}</div>
              <div class="list-item">{{item.shop_level_name}}</div>
              <div class="list-item">
                <router-link tag="span" :to="`level-setting?id=${item.id}`" append class="list-operation">设置</router-link>
              </div>
            </div>
          </div>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <!--:pageDetail="contentClassPage"-->
          <base-pagination ref="pages" :currentPage.sync="page" :total="total"></base-pagination>
        </div>
      </div>
    </div>
    <base-modal :visible.sync="visible" height="204px" title="设置账号等级" :submitBefore="justifyForm" @submit="setGrade">
      <div class="set-box">
        <base-form-item
          label="账号等级"
          labelHeight="44px"
          :inline="true"
          :required="true"
          marginBottom="0"
          verticalAlign="center"
        >
          <base-select
            :value.sync="grade"
            :defaultLabel="defaultLabel"
            :data="arr"
            :width="416"
            :height="44"
            :valueKey="valueKey"
            labelKey="name"
            type="input"
          ></base-select>
        </base-form-item>
      </div>
    </base-modal>
    <router-view @update="getCustomerList({loading:false})"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'

  const PAGE_NAME = 'CUSTOMER_LIST'
  const TITLE = '客户列表'
  const LIST_HEADER = ['客户名称', '手机号', '店铺名称', '所属行业', '所在地区', '账号等级', '操作']

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        visible: false,
        grade: '',
        arr: [],
        valueKey: 'id',
        currentPage: 1,
        gradeText: '',
        customerId: '',
        customerList: [],
        page: 1,
        keyword: '',
        total: 1,
        defaultLabel: ''
      }
    },
    computed: {
      paramObj() {
        let data = {page: this.page, keyword: this.keyword}
        return data
      }
    },
    watch: {
      async page() {
        await this.getCustomerList()
      },
      async keyword() {
        this.page = 1
        await this.getCustomerList()
      }
    },
    async created() {
      await this._getGrade()
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: ''}
      API.Customer.getCustomerList({data, loading: true, toast: true})
        .then((res) => {
          next(vx => {
            vx.customerList = res.data
            vx.total = res.meta.total
          })
        })
        .catch(() => {
          next('404')
        })
    },
    methods: {
      // 获取客户列表
      async getCustomerList(loading = false) {
        API.Customer.getCustomerList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {
          }
        })
          .then((res) => {
            this.customerList = res.data
            this.total = res.meta.total
          })
      },
      async _getGrade() {
        let res = await API.Customer.getCustomerGrade({
          data: {}, loading: false, toast: true, doctor() {
          }
        })
        this.arr = res.error_code === this.$ERR_OK ? res.data : []
      },
      showSet(item) {
        this.$router.push(`/client/customer/customer-list/`)
        console.log(`/client/customer/customer-list/level-setting/${item.id}`)
        // this.customerId = item.id
        // this.grade = item.shop_level_id
        // this.visible = true
        // this.defaultLabel = item.shop_level_name
      },
      // 设置等级
      async setGrade() {
        let data = {shop_id: this.customerId, shop_level_id: this.grade}
        let res = await API.Customer.setCustomerGrade({
          data, loading: false, toast: true, doctor() {
          }
        })
        res.error_code === this.$ERR_OK && this.getCustomerList()
      },
      search(keyword) {
        this.keyword = keyword || ''
      },
      //  弹窗限制
      justifyForm(done) {
        let msg = ''
        if (!this.grade) {
          msg = '请选择等级'
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
    .list-item
      &:nth-child(3)
        flex: 1.6
        min-width: 140px
      &:last-child
        max-width: 58px
        min-width: 58px
        padding: 0
</style>
