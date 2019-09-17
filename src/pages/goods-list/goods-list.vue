<template>
  <div class="goods-list">
    <base-tabs :data="tabList"
               :value.sync="filter.use_type"
               valueKey="type"
               tabAlign="left"
               @change="tabChange"
    ></base-tabs>
    <div class="content-wrap">
      <base-layout-top>
        <base-form-item v-if="filter.use_type===2" label="品牌筛选" labelSize="12px" :required="false">
          <base-select v-model="brand"
                       :data="brandList"
                       labelKey="name"
                       size="small"
                       defaultLabel="品牌名称"
                       @change-visible="getBrandList"
                       @change="updatePage"
          ></base-select>
        </base-form-item>
        <template v-else-if="filter.use_type===1">
          <base-form-item label="分类" labelSize="12px" labelMarginLeft="20" :required="false">
            <cascade-select ref="selects" v-model="category_id" :isAddAll="true" size="small" defaultLabel1="一级分类"
                            defaultLabel2="二级分类"
                            @change="updatePage"
            ></cascade-select>
          </base-form-item>
          <base-form-item label="渠道" labelSize="12px" :required="false">
            <base-select v-model="sale_channel" :data="saleChannelList" :width="120" size="small"
                         defaultLabel="销售渠道"
                         @change="updatePage"
            ></base-select>
          </base-form-item>
        </template>

        <base-form-item :inline="true" :required="false" verticalAlign="center">
          <base-search v-model="filter.keyword" placeholder="商品名称或编码" @search="updatePage"></base-search>
        </base-form-item>
      </base-layout-top>
      <base-table-tool :iconUrl="require('./icon-product_list@2x.png')" title="商品列表">
        <base-status-tab slot="left" :statusList="statusList" :value.sync="filter.status" @change="updatePage"></base-status-tab>
        <router-link tag="div" :to="{path:'goods-edit',query:{use_type:filter.use_type}}" append>
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
                  <div v-else-if="val.type==='array'">{{item[key] && item[key].join('/')}}</div>
                  <div v-else-if="val.type === 'operate'">
                    <router-link tag="span" :to="{path:'goods-edit',query:{id:item.id,use_type:filter.use_type}}" class="list-operation" append>编辑</router-link>
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
      let useType = +(to.query.use_type || 1)
      let otherParams = useType === 1 ? {category_id: '', sale_channel: ''} : {brand: ''}
      Promise.all([API.Goods.getGoodsList({
        data: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
          use_type: useType,
          ...otherParams
        }
      }), API.Goods.getGoodsListStatus({
        data: {
          keyword: '',
          use_type: useType,
          ...otherParams
        }
      })]).then(res => {
        next(vw => {
          vw.setData(res[0])
          vw.statusList = res[1].data
        })
      })
    },
    data() {
      return {
        tabList: [{text: '礼品商品', type: 1}, {text: '自用商品', type: 2}],
        statusList: [],
        // 下拉列表数据
        brandList: [],
        saleChannelList: [{
          label: '全部', id: ''
        }, {
          label: '赞播集采', id: 'purchase'
        }, {
          label: '赞播优品', id: 'bean'
        }],
        total: 0,
        filter: {
          keyword: '',
          status: '',
          page: 1,
          limit: 10,
          use_type: +(this.$route.query.use_type || 1)
        },
        // 自用
        brand: '',
        // 礼品
        category_id: '',
        sale_channel: '',

        listHeader1: {
          name: {
            name: '商品名称', before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '分类'},
          sale_channel_text: {name: '销售渠道', type: 'array'},
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
          brand_name: {name: '品牌名称'},
          sale_channel_text: {name: '销售渠道', type: 'array'},
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
        return this.filter.use_type === 1 ? this.listHeader1 : this.listHeader2
      }
    },
    watch: {
      $route(router) {
        console.log('$route', router)
        if (router.name !== 'mall-goods-goods-list') return
        this.updatePage()
      }
    },
    mounted() {
      console.log('2222222')
      this.updatePage()
    },
    methods: {
      getBrandList(val) {
        if (val && this.filter.use_type === 2) {
          API.Brand.getBrandList().then(res => {
            this.brandList = [{
              name: '全部', id: ''
            }, ...res.data]
          })
        }
      },
      // 页面数据更新
      updatePage(isUpdatePage = true) {
        if (isUpdatePage) this.filter.page = 1
        let otherParams = this.filter.use_type === 1 ? {
          category_id: this.category_id,
          sale_channel: this.sale_channel
        } : {brand: this.brand}
        this._getList(otherParams)
        this._getStatus(otherParams)
      },
      // 顶部类型切换
      tabChange(val) {
        this.filter.keyword = ''
        this.filter.status = ''
        this.filter.page = 1
        if (this.filter.use_type === 1) {
          this.category_id = ''
          this.sale_channel = ''
        } else {
          this.brand = ''
        }
        this.$router.replace({name: 'mall-goods-goods-list', query: {use_type: this.filter.use_type}})
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      // 获取状态列表
      _getStatus(otherData) {
        API.Goods.getGoodsListStatus({
          data: {
            use_type: this.filter.use_type,
            keyword: this.filter.keyword,
            ...otherData
          },
          loading: false
        }).then(res => {
          this.statusList = res.data
        })
      },
      // 获取表格数据
      _getList(otherData) {
        API.Goods.getGoodsList({
          data: {...this.filter, ...otherData},
          loading: false
        }).then(res => {
          this.setData(res)
        })
      },
      // 删除
      deleteBtn(item, idx) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGoods({data: {id: item.id}, loading: false})
          this.updatePage(false)
        })
      },
      // 上下架改变
      async changeSwitch(item) {
        await API.Goods.editStatus({data: {id: item.id, status: item.status ? 0 : 1}})
        this.updatePage(false)
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
