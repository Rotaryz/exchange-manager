<template>
  <div class="content-list">
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search v-model="filter.keyword" placeholder="请输入标题名称" class="base-search" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="文章列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <router-link tag="div" :to="{path:'content-edit',query:{type: 'common'}}" append>
          <base-button type="primary" plain addIcon>创建文章</base-button>
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
                  <!--<base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="changeSwitch(item,i)"></base-switch>-->
                  <div v-if="val.type === 'operate'">
                    <router-link v-if="+item.status === 1" tag="span" :to="'content-edit?id='+item.id+'&isSee=1'" append class="list-operation">查看</router-link>
                    <router-link v-else tag="span" :to="'content-edit?id='+item.id" append class="list-operation">编辑</router-link>
                    <span v-if="+item.status === 1" class="list-operation" @click="onOffHandle(item, i)">下线</span>
                    <span v-if="+item.status === -1" class="list-operation" @click="onOffHandle(item, i)">上线</span>
                    <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                  </div>
                  <div v-else-if="val.type === 'status'">{{statusHandle(item.status)}}</div>
                  <template v-else>
                    <img v-if="val.before && val.before.img && item[val.before.img]" class="list-img" :src="item[val.before.img]">
                    <img v-if="val.before && !item[val.before.img]" class="list-img" src="./pic-caogao@2x.png">
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

  const PAGE_NAME = 'CONTENT_LIST'
  const TITLE = '内容列表'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([API.Content.getArticleList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        }
      }), API.Content.getArticleListStatus({
        data: {
          keyword: '',
        }
      })]).then(res => {
        next(vw => {
          vw.setData(res[0])
          vw.setStatus(res[1])
        })
      })
    },
    data() {
      return {
        statusList: [],
        total: 0,
        filter: {
          keyword: '',
          category_id: '',
          status: '',
          page: 1,
          limit: 10,
          type: this.$route.query.type || '1'
        },
        listHeader: {
          name_: {
            name: '封面图',
            before: {img: 'cover_image_url'},
            style: {flex: 0.8}
          },
          title: {name: '文章标题', style: {flex: 1.2}},
          list_date: {name: '时间', style: {flex: 1.2}},
          browse_count: {name: '阅读数 '},
          fabulous_num: {name: '点赞数'},
          status: {name: '状态', type: 'status'},
          // status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate", style: 'max-width:122px; padding-right: 0'}
        },
        list: []
      }
    },
    mounted() {
      this.updatePage()
    },
    methods: {
      updatePage() {
        this._getList({loading: false})
        this._getStatus()
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      setStatus(res) {
        this.statusList = res.data
      },
      _getStatus() {
        API.Content.getArticleListStatus({
          data: {
            keyword: this.filter.keyword,
          }, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList(other) {
        API.Content.getArticleList({
          data: this.filter, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      statusHandle(status) {
        switch (+status) {
        case -1:
          return '已下线'
        case 0:
          return '草稿'
        default:
          return '已上线'
        }
      },
      statusChange(val) {
        this.filter.page = 1
        this.updatePage()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm({text: `确定要删除`}).then(async () => {
          await API.Content.deleteArticle({data: {id: item.id}, loading: false})
          this.$toast.show('文章删除成功')
          this.updatePage()
        }).catch()
      },
      // changeSwitch(item) {},
      searchBtn(val) {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange(val) {
        this._getList({loading: false})
      },
      onOffHandle(item, index) {
        let status = +item.status === 1 ? -1 : 1
        let text = +item.status === 1 ? '下线' : '上线'
        this.$confirm.confirm({text: `确定要${text}`}).then(() => {
          API.Content.offline({data: {status, id: item.id}})
            .then(res => {
              this.$toast.show(`文章${text}成功`)
              this.updatePage()
            })
        }).catch()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .content-list
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
