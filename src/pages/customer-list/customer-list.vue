<template>
  <div class="customer-list normal-box table">
    <div v-for="i in 1" :key="i" class="down-content">
      <base-search></base-search>
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
        <div class="list-header list-box"></div>
        <div class="list">
          <div v-for="i in 2" :key="i" class="list-content list-box">
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
          </div>
        </div>
        <div class="pagination-box">
          <!--:pageDetail="contentClassPage"-->
          <base-pagination ref="pages"></base-pagination>
        </div>
      </div>
    </div>
    <!--<default-confirm></default-confirm>-->
  </div>
</template>

<script type="text/ecmascript-6">
  // import DefaultConfirm from '@components/_global-confirm/_global-confirm'
  // import * as Helpers from './helpers'
  // import API from '@api'
  const PAGE_NAME = 'CUSTOMER_LIST'
  const TITLE = '客户列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      // DefaultConfirm
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .customer-list
    width: 100%
</style>
