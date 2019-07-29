<template>
  <div class="customer-list normal-box table">
    <base-tab-select></base-tab-select>
    <div class="down-content">
      <base-search @search="search"></base-search>
    </div>
    <div class="table-content">
      <div class="identification">
        <div class="identification-page">
          <img src="./icon-customer_list@2x.png" class="identification-icon">
          <p class="identification-name">客户列表</p>
        </div>
        <div class="function-btn">
        </div>
      </div>
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
    <default-modal :visible.sync="visible" title="设置账号等级" @change-visible="changeVisible">
      <div class="set-box">
        <base-form-item
          label="账号等级"
          labelMargin="0 14.9px 0 0"
          labelHeight="44px"
          :inline="true"
          :required="true"
          verticalAlign="center"
        >
          <base-select
            :value.sync="grade"
            :data="arr"
            :width="416"
            :height="44"
            :valueKey="valueKey"
            defaultLabel="十大大"
            type="input"
          ></base-select>
        </base-form-item>
        <div class="btn-group">
          <span class="btn cancel" @click="hideSet">取消</span>
          <span class="btn confirm" @click="setGrade">确定</span>
        </div>
      </div>
    </default-modal>
    <default-confirm></default-confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import DefaultModal from '@components/default-modal/default-modal'
  import DefaultConfirm from '@components/default-confirm/default-confirm'
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
      DefaultModal,
      DefaultConfirm
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        visible: false,
        grade: '',
        arr: [{id: 111, label: 'ajsdf'}],
        valueKey: 'id',
        currentPage: 1
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
    created() {
      this.currentPage = this.page
    },
    methods: {
      ...Helpers.customerListMethods,
      _getGrade() {

      },
      showSet() {
        this.visible = true
      },
      hideSet() {
        this.visible = false
      },
      setGrade() {
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

  .set-box
    position: relative
    box-sizing: border-box
    width: 494px
    height: 144px
    .btn-group
      padding: 0
</style>
