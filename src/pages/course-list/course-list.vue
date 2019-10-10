<template>
  <div class="course-list normal-box table">
    <div class="down-content">
      <base-search v-model="filter.keyword" boxStyle="margin: 30px; margin-left: 0" placeholder=" 课程名称" @search="search"></base-search>
    </div>
    <base-table-tool :iconUrl="require('./icon-curriculum_list@2x.png')" title="课程列表">
      <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="updatePage(true)"></base-status-tab>
      <router-link tag="div" :to="{path:'course-edit'}" append>
        <base-button type="primary" plain addIcon>新建课程</base-button>
      </router-link>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in currentListHeader" :key="key" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in currentListHeader" :key="key" class="list-item">
                <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="upDownHandle(item,i)"></base-switch>
                <template v-else-if="val.type==='array'">{{item[key]}}</template>
                <div v-else-if="val.type === 'operate'">
                  <router-link tag="span" :to="{path:'course-edit',query:{id:item.id}}" class="list-operation" append>编辑</router-link>
                  <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                </div>
                <template v-else>
                  <img v-if="val.before && val.before.img" class="list-img" :src="item[val.before.img]">
                  <div class="item-text">{{item[key]}}</div>
                </template>
              </div>
            </div>
          </template>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page"
                           @pageChange="updatePage(false)"
          ></base-pagination>
        </div>
      </div>
    </div>
    <router-view @update="updatePage"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  const PAGE_NAME = 'COURSE_LIST'
  const TITLE = '课程列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        statusList: [],
        keyword: '',
        filter: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10
        },
        total: 0,
        currentListHeader: {
          name: {
            name: '课程名称', before: {
              img: 'cover_image'
            }
          },
          created_at: {name: '创建时间', type: 'array'},
          read_count: {name: '阅读人数', type: 'array'},
          status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate"}
        },
        list: []
      }
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([API.Course.getCourseList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
        },
        loading: true
      }), API.Course.getCourseStatus({
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
    methods: {
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      setStatus(res) {
        this.statusList = res.data
      },
      updatePage() {
        this._getList()
        this._getStatus()
      },
      _getList() {
        API.Course.getCourseList({
          data: this.filter
        }).then(res => {
          this.setData(res)
        })
      },
      _getStatus() {
        API.Course.getCourseStatus({
          data: {
            keyword: this.filter.keyword
          }
        }).then(res => {
          this.statusList = res.data
        })
      },
      search() {
        this.filter.page = 1
        this.updatePage()
      },
      upDownHandle(item, index) {
        let status = +item.status === 1 ? 0 : 1
        let text = +item.status === 1 ? '下架' : '上架'
        API.Course.courseUpDown({data: {status, id: item.id}})
          .then(res => {
            this.$toast.show(`课程${text}成功`)
            this.updatePage()
          })
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm({text: `确定要删除`}).then(() => {
          API.Course.courseDel({data: {id: item.id}, loading: false})
            .then(res => {
              this.$toast.show('课程删除成功')
              this.updatePage()
            })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-list
    width: 100%
    display: flex
    flex-direction: column
    position relative
    .content-wrap
      flex: 1
      padding: 20px
      display: flex
      flex-direction: column
    .list-img
      width: 75px !important
  .list-box .list-item:nth-child(1)
    flex: 2

  .list-box .list-item:nth-child(3)
    min-width: 130px

  .list-box .list-item:last-child
    max-width: 80px

  .list-item
    display: flex

    .item-text
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
</style>
