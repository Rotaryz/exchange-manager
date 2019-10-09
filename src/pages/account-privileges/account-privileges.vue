<template>
  <div class="account-privileges">
    <base-tabs :data="tabList" :value.sync="tabIndex" valueKey="type" tabAlign="left" margin="0 20px"
               defaultColor="#4E5983" class="tab-top" @change="_changeTopTab"
    ></base-tabs>
    <div v-if="tabIndex===0" class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="请输入账号" class="base-search" @search="searchFun"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-number_list@2x.png')" title="账号列表">
        <router-link tag="div" :to="{path:'account-edit'}" append>
          <base-button type="primary" plain addIcon>新建账号</base-button>
        </router-link>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in accountHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in accountHeader" :key="key" class="list-item" :style="val.style">
                  <div v-if="val.type === 'operate'">
                    <router-link tag="span" :to="{path:'account-edit',query:{id:item.id}}" class="list-operation" append>编辑</router-link>
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
    <div v-if="tabIndex===1" class="content-wrap">
      <base-table-tool :iconUrl="require('./icon-role_list@2x.png')" title="角色权限"></base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in privilegesHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in privilegesHeader" :key="key" class="list-item" :style="val.style">
                  <div class="item-text">{{item[key]}}</div>
                </div>
              </div>
            </template>
            <base-blank v-else></base-blank>
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
  const PAGE_NAME = 'ACCOUNT_PRIVILEGES'
  const TITLE = '账号权限'
  const TAB_CONFIG = [{text: '账号管理', type: 0}, {text: '角色权限', type: 1}]

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      API.Business.getAccountList({
        data: {
          role_type: '2',
          keyword: '',
          page: 1,
          limit: 10,
        }
      })
        .then((res) => {
          next((vx) => {
            vx.setData(res)
          })
        })
    },
    data() {
      return {
        tabIndex: 0,
        tabList: TAB_CONFIG,
        accountHeader: {
          name: {name: '姓名'}, mobile: {name: '账号'}, role_type_text: {name: '角色'}, created_at: {name: '注册时间'},
          operate: {name: '操作', type: "operate", style: 'max-width:122px; padding-right: 0'}
        },
        privilegesHeader: {role_text: {name: '角色名称'}, description: {name: '角色描述'}, role_num: {name: '授权人员数量', style: 'max-width:300px; padding-right: 0'}},
        filter: {
          role_type: '2',
          keyword: '',
          page: 1,
          limit: 10
        },
        total: 0,
        list: []
      }
    },
    methods: {
      // 切换顶部tab
      _changeTopTab(select) {
        this.tabIndex = select
        this.page = 1
        this.keyword = ''
        this.time = []
        this._getList({loading: true})
      },
      // set列表数据
      setData(res) {
        if(!res.data) return
        this.list = res.data
        res.meta && (this.total = res.meta.total)
      },
      // 获取列表数据
      _getList(other) {
        let apiName = 'getAccountList'
        let params = this.filter
        if (this.tabIndex === 1) {
          apiName = 'getRoleList'
          params = {}
        }
        API.Business[apiName]({data: params, ...other}).then(res => {
          this.setData(res)
        })
      },
      // 更新页面数据
      updatePage() {
        this._getList({loading: false})
      },
      // 操作-删除按钮
      deleteBtn(item) {
        this.$confirm.confirm({text: `确定删除该账号?`}).then(async () => {
          API.Business.deleteAccount({data: {id: item.id}, loading: false})
            .then(res => {
              this.$toast.show('删除成功')
              this.updatePage()
            })
        }).catch()
      },
      // 搜索
      searchFun() {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange() {
        this._getList({loading: false})
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .account-privileges
    width: 100%
    position: relative
    display: flex
    flex-direction: column
  .content-wrap
    padding: 20px
    flex: 1
    display: flex
    flex-direction: column
  .base-search
    margin-left: 0
  .list-box .list-item .list-img
    width: 75px
    height: 45px
  .list-item
    display: flex

    .item-text
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
</style>
