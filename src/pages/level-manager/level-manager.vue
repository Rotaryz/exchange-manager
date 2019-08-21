<template>
  <div class="level-manager normal-box table">
    <base-table-tool :iconUrl="require('./icon-djgl@2x.png')" title="等级管理">
      <base-button plain buttonStyle="width: 92px" @click="newLevel">
        新建等级<span class="add-icon"></span>
      </base-button>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(item, index) in listHeader" :key="index" class="list-item">{{item}}</div>
        </div>
        <div class="list">
          <div v-if="levelList.length">
            <div v-for="(item, index) in levelList" :key="index" class="list-content list-box">
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">sdfsdf</div>
              <div class="list-item">
                <router-link tag="span" :to="`edit-level?id=`" append class="list-operation">编辑</router-link>
                <span class="list-operation" @click="delLevel">删除</span>
              </div>
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
    <router-view @update="_getLevelList()"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
// import * as Helpers from './modules/helpers'
// import API from '@api'
  import storage from 'storage-controller'

  const PAGE_NAME = 'LEVEL_MANAGER'
  const TITLE = '等级管理'
  const LIST_HEADER = ['账号等级名称', '账号等级', '代理金额(元)', '操作']
  const EXCEL_URL = ''

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        listHeader: LIST_HEADER,
        levelList: [{}],
        page: 1,
        total: 0,
        delId: ''
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   let data = {page: 1}
    //   API.Order.getOrderList({data, loading: true, toast: true})
    //     .then((res) => {
    //       API.Order.orderStatus({data: null, loading: true, toast: true})
    //         .then((status) => {
    //           next(vx => {
    //             vx.levelList = res.data
    //             vx.total = res.meta.total
    //           })
    //         })
    //     })
    //     .catch(() => {
    //       next('404')
    //     })
    // },
    computed: {
      excelUrl() {
        let data = {
          access_token: storage.get('auth.token', '')
        }
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
        this._getLevelList()
      }
    },
    methods: {
      _getLevelList(loading = false) {
      // API.Order.getOrderList({
      //   data: {page: this.page},
      //   loading,
      //   toast: true,
      //   doctor() {
      //   }
      // })
      //   .then((res) => {
      //     this.orderList = res.data
      //     this.total = res.meta.total
      //   })
      },
      delLevel(item) {
        this.delId = item.id
        this.$confirm
          .confirm()
          .then(() => {
          // API.Cms.delDestroy({data: {id: this.delId}})
          //   .then((res) => {
          //     this[this.dataName].splice(index, 1)
          //   })
          })
          .catch(() => {})
      },
      // 导出Excel
      newLevel() {
        this.$router.push('/client/customer/level-manager/edit-level')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .list-box
    .list-item
      &:nth-child(1), &:nth-child(2)
        flex: 1.5
      &:nth-child(4)
        min-width: 118px
        max-width: 118px
</style>
