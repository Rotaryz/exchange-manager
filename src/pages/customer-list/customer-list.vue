<template>
  <div class="customer-list normal-box table">
    <div class="down-content">
      <base-form-item :required="false" labelSize="12px" label="等级筛选" marginBottom="0">
        <base-select
          v-model="id"
          boxStyle="margin: 0"
          :width="120"
          :data="selectList"
          labelKey="name"
          :height="32"
          placeholder="账号等级"
          @change="_exchangeList"
        >
        </base-select>
      </base-form-item>
      <base-form-item :required="false" labelSize="12px" label="行业筛选" marginBottom="0" marginLeft="20">
        <base-select
          v-model="industryId"
          boxStyle="margin: 0"
          :width="120"
          :data="tradeList"
          labelKey="name"
          :height="32"
          placeholder="所属行业"
          @change="_exchangeTradeList"
        >
        </base-select>
      </base-form-item>
      <base-form-item :required="false" labelSize="12px" label="认证筛选" marginBottom="0" marginLeft="20">
        <base-select
          v-model="certificateStatus"
          boxStyle="margin: 30px"
          :width="120"
          :data="certificateList"
          labelKey="name"
          :height="32"
          placeholder="账号等级"
          @change="_exchangeCertificateList"
        >
        </base-select>
      </base-form-item>
      <base-search v-model="keyword" boxStyle="margin: 30px" placeholder="客户名称" @search="search"></base-search>
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
              <div class="list-item">{{item.created_at}}</div>
              <div class="list-item">{{item.shop_level_name}}</div>
              <div class="list-item">{{item.certificate_status === 0 ? '待认证' : item.certificate_status === 1 ? '已认证' : '认证未通过'}}</div>
              <div class="list-item">
                <img v-if="item.certificate_image_url" :src="item.certificate_image_url" class="list-img" @click="showCertificatesPhoto(item.certificate_image_url)">
              </div>
              <div class="list-item">
                <span v-if="item.certificate_status === 0" class="list-operation" @click="checkBtn(item)">审核</span>
                <router-link tag="span" :to="`level-setting?id=${item.id}`" append class="list-operation">设置</router-link>
              </div>
            </div>
          </div>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination ref="pages" :currentPage.sync="page" :total="total" @pageChange="pageChange"></base-pagination>
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
    <base-modal
      :visible="checkVisible"
      :submitBefore="justifyFormCheck"
      width="534px"
      height="234px"
      title="审核" @close="checkVisible=false"
      @submit="checkSubmit"
    >
      <base-form-item label="选择审核结果" labelWidth="106px">
        <radio v-model="edit.result" :list="radioList"></radio>
      </base-form-item>
      <base-form-item v-if="edit.result * 1 === 2" label="不通过原因" labelWidth="106px">
        <base-input v-model="edit.reason" width="388" :maxlength="15" placeholder="不超过15个字"></base-input>
      </base-form-item>
    </base-modal>
    <base-modal :visible.sync="visibleImg" :isShowBtns="false" title="打款凭证">
      <img :src="photoCertificatesUrl" alt="打款凭证" class="photo-certificate">
    </base-modal>
    <router-view @update="getCustomerList()"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as Helpers from './modules/helpers'
  import Radio from '../../components/zb-radio/zb-radio'
  import API from '@api'

  const PAGE_NAME = 'CUSTOMER_LIST'
  const TITLE = '客户列表'
  const LIST_HEADER = ['客户名称', '手机号', '店铺名称', '所属行业', '所在地区', '注册时间', '账号等级', '认证状态', '营业执照', '操作']
  const CERTIFICATELIST = [{name: '全部', id: ''}, {name: '待认证', id: 0}, {name: '已认证', id: 1}, {name: '认证不通过', id: 2}]

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      Radio
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        checkVisible: false,
        radioList: [{label: '认证通过', id: 1}, {label: '审核不通过', id: 2}],
        edit: {
          result: 1,
          reason: ''
        },
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
        defaultLabel: '',
        selectList: [],
        certificateList: CERTIFICATELIST,
        id: '',
        visibleImg: false,
        photoCertificatesUrl: '',
        curItem: {},
        certificateStatus: '',
        industryId: '',
        tradeList: []
      }
    },
    computed: {
      paramObj() {
        let data = {page: this.page, keyword: this.keyword, shop_level_id: this.id, industry_id: this.industryId ,certificate_status: this.certificateStatus}
        return data
      }
    },
    async created() {
      this._getLevelList()
      this._getTradeList()
    },
    beforeRouteEnter(to, from, next) {
      let data = {page: 1, keyword: '', shop_level_id: ''}
      API.Customer.getCustomerList({data, loading: true, toast: true})
        .then((res) => {
          next((vx) => {
            vx.customerList = res.data
            vx.total = res.meta.total
          })
        })
        .catch(() => {
          next('404')
        })
    },
    methods: {
      // 获取行业列表
      _getTradeList(loading = false) {
        return API.Goods.getTradeList({
          data: {limit: 0},
          loading
        }).then((res) => {
          res.data.unshift({name: '全部', id: ''})
          this.tradeList = res.data
          console.log(this.tradeList)
        })
      },
      // 获取等级列表
      _getLevelList(loading = false) {
        API.Level.getLevelList({
          data: {page: this.page},
          loading,
          toast: true
        })
          .then((res) => {
            res.data.unshift({name: '普通会员', id: 0})
            res.data.unshift({name: '全部', id: ''})
            this.selectList = res.data
          })
      },
      async _exchangeList() {
        this.page = 1
        await this.getCustomerList()
      },
      async _exchangeCertificateList() {
        this.page = 1
        await this.getCustomerList()
      },
      async _exchangeTradeList() {
        this.page = 1
        await this.getCustomerList()
      },
      // 获取客户列表
      async getCustomerList(loading = false) {
        API.Customer.getCustomerList({
          data: this.paramObj,
          loading,
          toast: true,
          doctor() {}
        }).then((res) => {
          this.customerList = res.data
          this.total = res.meta.total
        })
      },
      async _getGrade() {
        let res = await API.Customer.getCustomerGrade({
          data: {},
          loading: false,
          toast: true,
          doctor() {}
        })
        this.arr = res.error_code === this.$ERR_OK ? res.data : []
      },
      // 设置等级
      async setGrade() {
        let data = {shop_id: this.customerId, shop_level_id: this.grade}
        let res = await API.Customer.setCustomerGrade({
          data,
          loading: false,
          toast: true,
          doctor() {}
        })
        res.error_code === this.$ERR_OK && this.getCustomerList()
      },
      // 搜索
      async search(keyword) {
        this.page = 1
        await this.getCustomerList()
      },
      // 审核，显示审核弹窗
      checkBtn(item) {
        this.curItem = item
        this.checkVisible = true
      },
      checkSubmit() {
        API.Customer.postCertificateStatus({
          data: {
            id: this.curItem.id,
            certificate_status:  this.edit.result,
            reasons: this.edit.reason
          },
          toast: true,
          doctor() {
          }
        })
          .then(async (res) => {
            await this.getCustomerList()
          })
      },
      // 分页
      async pageChange() {
        await this.getCustomerList()
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
      },
      // 展示凭证
      showCertificatesPhoto(url) {
        this.visibleImg = true
        this.photoCertificatesUrl = url
      },
      //  弹窗限制
      justifyFormCheck(done) {
        if (this.edit.reason.length === 0 && this.edit.result * 1 === 2) {
          this.$toast.show('请写不通过原因')
          return false
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
        flex: 1.4
        min-width: 140px
      &:nth-child(5)
        flex: 1.6
        min-width: 140px
      &:nth-child(4),&:nth-child(7)
        flex: 0.7
      &:last-child
        max-width: 80px
        min-width: 80px
        padding: 0
  .photo-certificate
    width: 960px
    height: 471px
    object-fit contain
    margin: 8px 0 20px 0
</style>
