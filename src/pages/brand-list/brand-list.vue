<template>
  <div class="brand-list">
    <div class="content-wrap">
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="品牌列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <router-link tag="div" :to="{path:'brand-edit',query:{type:filter.type}}" append>
          <base-button type="primary" plain addIcon>创建品牌</base-button>
        </router-link>
      </base-table-tool>
      <div class="table-content">
        <div class="big-list">
          <div class="list-header list-box">
            <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
          </div>
          <div class="list">
            <template v-if="list.length">
              <div v-for="(item,i) in list"
                   :key="i"
                   class="list-content list-box"
              >
                <div v-for="(val,key) in listHeader"
                     :key="key"
                     class="list-item"
                     :style="val.style"
                >
                  <base-switch v-if="val.type ==='switch'"
                               :status="item.status"
                               @changeSwitch="changeSwitch(item,i)"
                  ></base-switch>
                  <div v-else-if="val.type === 'operate'">
                    <router-link tag="span"
                                 :to="{path:'brand-edit',query:{id:item.id}}"
                                 class="list-operation"
                                 append
                    >编辑</router-link>
                    <span class="list-operation"
                          @click="deleteBtn(item,i)"
                    >删除</span>
                  </div>
                  <template v-else>
                    <img v-if="val.before && val.before.img"
                         class="list-img"
                         :src="item[val.before.img]"
                    >
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

  const PAGE_NAME = 'BRAND_LIST'
  const TITLE = '品牌列表'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([API.Brand.getBrandList({
        data: {
          page: 1,
          limit: 10
        }
      }), API.Brand.getBrandListStatus({
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
          status: '',
          page: 1,
          limit: 10
        },
        // key值代表后台的字段 val代表前端页面字段
        listHeader: {
          first: {
            name: '品牌首图', before: {
              img: 'banner_image_url'
            }
          },
          logo: {
            name: '品牌Logo', before: {
              img: 'logo_image_url'
            }
          },
          industry_name: {name: '所属行业'},
          name: {name: '品牌名称'},
          created_at: {name: '时间 ', style: 'flex: 1.4'},
          status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate", style: 'max-width: 98px'}
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
        API.Brand.getBrandListStatus({
          data: {}, loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      _getList(other) {
        API.Brand.getBrandList({
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
          await API.Brand.deleteBrand({data: {id: item.id}, loading: false})
          this.updatePage()
        })
      },
      async changeSwitch(item) {
        await API.Brand.switchStatus({data: {id: item.id, status: item.status ? 0 : 1}})
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

  .brand-list
    position relative
    width: 100%
    display flex
    flex-direction column

  .content-wrap
    flex: 1
    display flex
    flex-direction column

  .list-box > .list-item:nth-child(1)
    flex: 1

  .list-item
    display flex

    .item-text
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap

</style>
