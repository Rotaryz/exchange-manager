<template>
  <div class="customer-list normal-box table">
    <div class="down-content">
      <base-search placeHolder="客户昵称/客户手机号" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-customer_list@2x.png')" title="客户列表"></base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(item, index) in listHeader" :key="index" class="list-item">{{item}}</div>
        </div>
        <div class="list">
          <div v-for="(item, index) in customerList" :key="index" class="list-content list-box">
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">
              <span class="list-operation" @click="showSet">设置</span>
            </div>
          </div>
        </div>
        <div class="pagination-box">
          <!--:pageDetail="contentClassPage"-->
          <base-pagination ref="pages" :currentPage.sync="currentPage" :total="total"></base-pagination>
        </div>
      </div>
    </div>
    <default-modal :visible.sync="visible" height="204px" title="设置账号等级" @change-visible="changeVisible" @submit="setGrade">
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
            :data="arr"
            :width="416"
            :height="44"
            :valueKey="valueKey"
            type="input"
          ></base-select>
        </base-form-item>
      </div>
    </default-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import DefaultModal from '@components/default-modal/default-modal'
  import * as Helpers from './modules/helpers'
  // import API from '@api'
  const PAGE_NAME = 'CUSTOMER_LIST'
  const TITLE = '客户列表'
  const LIST_HEADER = ['客户名称', '手机号', '店铺名称', '所属行业', '所在地区', '账号等级', '操作']

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
        grade: '',
        arr: [{id: 111, label: 'ajsdf'}],
        valueKey: 'id',
        currentPage: 1,
        gradeText: '',
        customerId: ''
      }
    },
    computed: {
      ...Helpers.customerListComputed
    },
    watch: {
      page(news) {
        this.currentPage = news
      },
      currentPage(page) {
        this.getMoreCustomerList({page})
      }
    },
    async created() {
      this.currentPage = this.page
      await this._getGrade()
    },
    methods: {
      ...Helpers.customerListMethods,
      async _getGrade() {
        // let res = await API.Customer.getCustomerGrade({data:{},loading:false,toast:true,doctor(){}})
        // this.arr = res.error===this.$ERR_OK ? res.data : []
        // this.grade = this.arr[0].name
      },
      showSet(id) {
        this.customerId = id
        this.visible = true
      },
      // 设置等级
      setGrade() {
        // let data = {grade: this.grade}
        // let res = await API.Customer.setCustomerGrade(this.customerId, {data,loading:false,toast:true,doctor(){}})
        // res.error===this.$ERR_OK && this.getCustomerList()
        // this.grade = this.arr[0].name
        console.log(this.grade)
      },
      search(keyword) {
        this.getMoreCustomerList({page: 1, keyword})
      },
      changeVisible() {

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
        max-width: 98px
        min-width: 98px
        padding: 0
</style>
