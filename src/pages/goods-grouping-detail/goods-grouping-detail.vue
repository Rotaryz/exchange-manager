<template>
  <div class="goods-grouping-detail normal-box table">
    <base-table-tool :title="detail.name" :iconUrl="require('./icon-product_list@2x.png')">
      <base-button plain addIcon @click="addBtn">添加商品</base-button>
      <base-button class="go-back-btn" @click="goBack">返回</base-button>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <div v-for="(item,i) in list" :key="i" class="list-content list-box">
            <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">
              <template v-if="val.type === 'operate'">
                <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
              </template>
              <template v-else-if="val.type === 'status'" class="list-operation">
                <i :class="['status-dot',item[key] ? 'success':'error']"></i> {{item.status_text}}
              </template>
              <template v-else>{{item[key]}}</template>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-box">
        <base-pagination :total="total" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
      </div>
    </div>
    <goods-list-dialog v-if="visible" :visible.sync="visible" :limit="20" @submit="_addGoods"></goods-list-dialog>
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
          page: 1,
          limit: 10,
          id:to.params.id
        }
      }).then(res => {
        next((vw) => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        visible: false,
        listHeader: {
          first: {name: '商品名称'},
          second: {name: '分类'},
          third: {name: '库存'},
          fourth: {name: '零售价'},
          five: {name: '库存'},
          six: {name: '会员价'},
          status: {name: '状态', type: "status"},
          operate_text: {name: '操作', type: "operate", style: 'max-width:80px'}
        },
        total: 0,
        list: [{
          id: 1, first: 123, second: 5255, third: 5255, fourth: 5255, five: 5255, six: 5255, status: 1, status_text: '已上架'
        }, {
          id: 2, first: 123, second: 5255, third: 5255, fourth: 5255, five: 5255, six: 5255, status: 0, status_text: '已下架'
        }],
        filter: {
          id:this.$route.id,
          page: 1,
          limit: 10
        },
        detail: {
          id: 1,
          name: '家用电器'
        },
      }
    },
    methods: {
      setData(res) {
        this.detail = res.data
      },
      _getDetail() {
        console.log('_getDetail')
        API.Goods.getGroupDetail({data: this.filter}).then(res => {
          console.log('res', res)
          if (res.isFail) return false
          this.setData(res)
        })
      },
      addBtn() {
        this.visible = true
      },
      deleteBtn(item, i) {
        this.$confirm.confirm().then(async () => {
          console.log('确认 ')
          // todo 刪除請求
          await API.Goods.deleltGroupGoods({data: item})
          this._getDetail()
        }, () => {
          console.log('取消 ')
        })
      },
      pageChange(val) {
        console.log(this.filter.page)
        this._getDetail()
      },
      goBack() {
        this.$router.go(-1)
      },
      async _addGoods(arr) {
        console.log(arr)
        // todo 新增商品請求
        await API.Goods.addGroupGoods({data: arr})
        this._getDetail()
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

    .go-back-btn
      margin-left 10px
</style>
