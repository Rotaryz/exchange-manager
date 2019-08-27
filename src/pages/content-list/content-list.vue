<template>
  <div class="content-list">
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item :inline="true" :required="false" verticalAlign="center" labelMarginRight="0">
          <base-search style="margin-left: 0" v-model="filter.keyword" placeholder="请输入标题名称" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="商品列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <router-link tag="div" :to="{path:'content-edit',query:{type:filter.type}}" append>
          <base-button type="primary" plain addIcon>创作文章</base-button>
        </router-link>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list" :key="i" class="list-content list-box">
                <div v-for="(val,key) in listHeader" :key="key" class="list-item">
                  <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="changeSwitch(item,i)"></base-switch>
                  <div v-else-if="val.type === 'operate'">
                    <span class="list-operation" @click="onOffHandle(item, i)">下线</span>
                    <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                  </div>
                  <template v-else>
                    <img v-if="val.before && val.before.img" class="list-img" style="width: 75px; height: 45px" :src="item[val.before.img]">
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
      let type = to.query.type
      Promise.all([API.Goods.getGoodsList({
        data: {
          keyword: '',
          category_id: '',
          status: '',
          page: 1,
          limit: 10,
          type: type
        }
      }), API.Goods.getGoodsListStatus({
        data: {
          keyword: '',
          category_id: '',
          type: type
        }
      })]).then(res => {
        // console.log(res)
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
            name: '封面图', before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '文章标题'},
          ctegory_1: {name: '时间'},
          saleable: {name: '阅读数 '},
          price: {name: '点赞数'},
          discount_price: {name: '状态'},
          // status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate"}
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
        API.Goods.getGoodsListStatus({
          data: {
            type: this.filter.type,
            keyword: this.filter.keyword,
            category_id: this.filter.category_id
          }, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList(other) {
        API.Goods.getGoodsList({
          data: this.filter, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      statusChange(val) {
        this.filter.page = 1
        this.updatePage()
      },
      deleteBtn(item, idx) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGoods({data: {id: item.id}, loading: false})
          this.updatePage()
        })
      },
      async changeSwitch(item) {
        // await API.Goods.editStatus({data: {id: item.id, status: item.status ? 0 : 1}})
        // this.updatePage()
      },
      searchBtn(val) {
        this.filter.page = 1
        this.updatePage()
      },
      pageChange(val) {
        this._getList({loading: false})
      },
      onOffHandle(item, index) {
        // todo
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .content-list
    position relative
    width: 100%
    display flex
    flex-direction column

  .content-wrap
    flex: 1
    display flex
    flex-direction column

  .list-box > .list-item
    &:nth-child(1)
      flex: 1.6

  .list-item
    display flex

    .item-text
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap

</style>
