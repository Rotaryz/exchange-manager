<template>
  <div class="goods-list">
    <base-tabs :data="tabList"
               :value.sync="filter.type"
               valueKey="type"
               tabAlign="left"
               @change="tabChange"
    ></base-tabs>
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item label="分类筛选" labelSize="12px" :required="false">
          <cascade-select ref="selects" size="small" defaultLabel1="一级分类" defaultLabel2="二级分类" @change="changeGategory"></cascade-select>
        </base-form-item>
        <base-form-item :inline="true" :required="false" verticalAlign="center">
          <base-search v-model="filter.keyword" placeholder="商品名称或编码" @search="searchBtn"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="商品列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="statusChange"></base-status-tab>
        <router-link tag="div" :to="{path:'goods-edit',query:{type:filter.type}}" append>
          <base-button type="primary" plain addIcon>新建商品</base-button>
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
                  <base-switch v-if="val.type ==='switch'" :status="item.status" @changeSwitch="changeSwitch(item,i)"></base-switch>
                  <div v-else-if="val.type === 'operate'">
                    <router-link tag="span" :to="{path:'goods-edit',query:{id:item.id,type:filter.type}}" class="list-operation" append>编辑</router-link>
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
  import CascadeSelect from '@components/cascade-select/cascade-select'

  const PAGE_NAME = 'PRODUCT_LIST'
  const TITLE = '商品列表'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {CascadeSelect},
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
        tabList: [{text: '集采商品', type: '1'}, {text: '赞播优品', type: '2'}],
        getDataFunction: API.Goods.getGoodsList,
        statusList: [],
        inputValue: '1122',
        total: 0,
        filter: {
          keyword: '',
          category_id: '',
          status: '',
          page: 1,
          limit: 10,
          type: this.$route.query.type || '1'
        },
        listHeader1: {
          name: {
            name: '商品名称', before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '分类'},
          saleable: {name: '库存'},
          price: {name: '零售价'},
          status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate"}
        },
        listHeader2: {
          name: {
            name: '商品名称', before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '分类'},
          saleable: {name: '库存'},
          price: {name: '零售价'},
          cash_price: {name: '现金价格'},
          bean_price: {name: '播豆'},
          status: {name: '状态', type: "switch"},
          operate_text: {name: '操作', type: "operate"}
        },
        list: []
      }
    },
    computed: {
      currentListHeader() {
        return this.filter.type === '1' ? this.listHeader1 : this.listHeader2
      }
    },
    watch: {
      $route() {
        this.filter.category_id = ''
        this.$refs.selects.clearValues()
        this.filter.keyword = ''
        this.filter.status = ''
        this.filter.page = 1
        this.updatePage()
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
      // 顶部类型切换
      tabChange(val) {
        this.$router.push({name: 'mall-goods-goods-list', query: {type: val}})
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
      changeGategory(val) {
        this.filter.page = 1
        this.filter.category_id = val
        this.updatePage()
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
        await API.Goods.editStatus({data: {id: item.id, status: item.status ? 0 : 1}})
        this.updatePage()
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

  .goods-list
    position relative
    width: 100%
    display flex
    flex-direction column

    .content-wrap
      flex: 1
      padding: 20px
      display flex
      flex-direction column

  .list-box .list-item:nth-child(1)
    flex: 2

  .list-item
    display flex

    .item-text
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap
</style>
