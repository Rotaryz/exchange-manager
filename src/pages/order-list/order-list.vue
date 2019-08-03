<template>
  <div class="order-list normal-box table">
    <div class="down-content">
      <base-search @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-order_list@2x.png')" title="订单列表">
      <div slot="status">
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

  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  const PAGE_NAME = 'ORDER_LIST'
  const TITLE = '订单列表'
  const LIST_HEADER = ['', '手机号', '店铺名称', '所属行业', '所在地区', '账号等级', '操作']

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER
      }
    },
    methods: {
      // 搜索
      search(keyword) {

      },
      // 导出Excel
      downExcel() {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .order-list
    width: 100%
</style>
