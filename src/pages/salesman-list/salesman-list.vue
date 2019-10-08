<template>
  <div class="course-list">
    <div v-show="$route.name==='salesman-list'" class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="分销员名称" class="base-search" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-distribution_list@2x.png')" title="分销员列表">
        <!--<base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>-->
        <router-link tag="div" :to="{path:'salesman-edit'}" append>
          <base-button type="primary" plain addIcon>新建分销员</base-button>
        </router-link>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">
                  <div v-if="val.type === 'operate'">
                    <router-link tag="span" :to="{path:'salesman-edit', query:{id: item.id}}" append class="list-operation">编辑</router-link>
                    <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                  </div>
                  <template v-else>
                    <div class="item-text">{{item[key]}}</div>
                  </template>
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
  import API from '@api'
  const PAGE_NAME = 'SALESMAN_LIST'
  const TITLE = '分销员列表'

  const LIST_HEADER = {
    name: { name: '分销员名称' },
    mobile: { name: '帐号' },
    invite_num: { name: '累计邀请人数' },
    turnover_num: { name: '累计成交人数' },
    created_at: { name: '加入时间' },
    operate_text: { name: '操作', type: "operate", style: 'max-width: 99px; padding-right: 0' }
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
        statusList: [],
        total: 0,
        filter: {
          role_type: 1,
          keyword: '',
          page: 1,
          limit: 10
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Salesman.getSalesmanList({
        data: {
          role_type: 1,
          keyword: '',
          page: 1,
          limit: 10,
        },
        loading: true
      }).then(res => {
        next(vw => {
          vw.setData(res)
        })
      })
    },
    methods: {
      updatePage() {
        this._getList()
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      _getList() {
        API.Salesman.getSalesmanList({
          data: this.filter
        }).then(res => {
          this.setData(res)
        })
      },
      statusChange(val) {
        this.filter.page = 1
        this.updatePage()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm({text: `确定要删除`}).then(() => {
          API.Salesman.salesmanDel({data: {id: item.id}, loading: false})
            .then(res => {
              this.$toast.show('分销员删除成功')
              this.updatePage()
            })
        })
      },
      searchBtn(val) {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange(val) {
        this._getList()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-list
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
      line-height: 1.2
</style>
