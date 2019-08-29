<template>
  <div class="goods-grouping-detail normal-box table">
    <base-table-tool :title="name" :iconUrl="require('./icon-product_list@2x.png')">
      <base-button plain addIcon @click="addBtn">添加商品</base-button>
      <base-button class="go-back-btn" @click="goBack">返回</base-button>
    </base-table-tool>
    <div class="table-content">
      <div v-if="list.length" class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">
                <template v-if="val.type === 'operate'">
                  <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                </template>
                <template v-else-if="val.type === 'status'" class="list-operation">
                  <i :class="['status-dot',item[key] ? 'success':'error']"></i> {{item.status ? '已上架' :'未上架'}}
                </template>
                <template v-else>
                  <img v-if="val.before&& val.before.img" :src="item[val.before.img]" alt="" class="list-img">
                  <span class="list-text">{{item[key]}}</span>
                </template>
              </div>
            </div>
          </template>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
        </div>
      </div>
      <base-blank v-else></base-blank>

    </div>
    <goods-list-dialog v-if="visible" :otherParams="{group_id:filter.id}" :visible.sync="visible" :limit="20" @submit="_addGoods"></goods-list-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import GoodsListDialog from '../../components/goods-list-dialog/goods-list-dialog'
  import API from '@api'

  const PAGE_NAME = 'GOODS_GROUPING_DETAIL'
  const TITLE = '商品分组详情'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      GoodsListDialog
    },
    beforeRouteEnter(to, from, next) {
      API.Goods.getGroupDetail({
        data: {
          id: to.params.id,
          page: 1,
          limit: 10
        }
      }).then((res) => {
        next((vw) => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        visible: false,
        listHeader: {
          name: {
            name: '商品名称',
            before: {
              img: 'goods_cover_image'
            }
          },
          category_name: {name: '分类'},
          saleable: {name: '库存'},
          price: {name: '零售价'},
          status: {name: '状态', type: 'status'},
          operate_text: {name: '操作', type: 'operate', style: 'max-width:80px'}
        },
        total: 0,
        list: [],
        filter: {
          id: this.$route.params.id,
          page: 1,
          limit: 10
        },
        name: '家用电器'
      }
    },
    methods: {
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
        this.name = this.$route.query.name
      },
      _getDetail() {
        API.Goods.getGroupDetail({data: this.filter}).then((res) => {
          this.setData(res)
        })
      },
      addBtn() {
        this.visible = true
      },
      deleteBtn(item, i) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGroupGoods({
            data: {goods_id: item.goods_id, group_id: this.filter.id},
            doctor() {}
          })
          this._getDetail()
          this.$emit('update')
        })
      },
      pageChange(val) {
        this._getDetail()
      },
      goBack() {
        this.$router.go(-1)
      },
      async _addGoods(arr) {
        await API.Goods.addGroupGoods({data: {group_id: this.filter.id, goods_ids: arr}})
        this._getDetail()
        this.$emit('update')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-grouping-detail
    width: 100%
    position absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index:10
   .list-box  .list-item:nth-child(1)
      flex:2
    .list-item
      display flex
      .list-text
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .go-back-btn
      margin-left 10px

    .status-dot
      display inline-block
      width: 8px
      height: @width
      border-radius: 50%
      margin-right: 5px

      &.success
        background $color-success

      &.error
        background $color-error

</style>
