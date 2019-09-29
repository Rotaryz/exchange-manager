<template>
  <div class="course-customer-list">
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="客户昵称" class="base-search" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="客户列表">
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item, i) in list" :key="i" class="list-content list-box">
                <div v-for="(val, key) in listHeader" :key="key" class="list-item" :style="val.style">
                  <img v-if="val.before && item[val.before.img]" class="list-img" :src="item[val.before.img]">
                  <img v-if="val.before && !item[val.before.img]" class="list-img" src="./pic-caogao@2x.png">
                  <div class="item-text">{{key === 'address' ? item.country+item.province+item.city : item[key]}}</div>
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
    </div>
    <router-view @update="updatePage"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  const PAGE_NAME = 'COURSE_CUSTOMER_LIST'
  const TITLE = '客户列表'

  const LIST_HEADER = {
    nickname: {
      name: '客户',
      before: {
        img: 'avatar'
      }
    },
    address: { name: '地区', type: 'address' },
    sex: { name: '性别' },
    created_at: { name: '注册时间', style: 'max-width: 144px; padding-right: 0'}
  }

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        list: [],
        total: 0,
        filter: {
          keyword: '',
          page: 1,
          limit: 10
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      API.CourseCustomer.getCustomerList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        },
        list: [],
        total: '',
        loading: true
      })
        .then(res => {
          next(vw => {
            vw.setData(res)
          })
        })
    },
    created() {
      // this.updatePage()
    },
    methods: {
      updatePage() {
        this._getList({loading: false})
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      _getList(other) {
        API.CourseCustomer.getCustomerList({
          data: this.filter, ...other
        })
          .then(res => {
            this.setData(res)
          })
      },
      searchBtn(val) {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange(val) {
        this._getList({loading: false})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-customer-list
    position: relative
    width: 100%
    display: flex
    flex-direction: column

    .content-wrap
      flex: 1
      display: flex
      flex-direction: column
    .base-search
      margin-left: 0
    .list-item
      display: flex

      .item-text
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
</style>
