<template>
  <div class="goods-grouping normal-box table">
    <base-table-tool title="商品分组" :iconUrl="require('./icon-product_fz@2x.png')">
      <base-button plain addIcon @click="addGroupBtn">添加分组</base-button>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in listHeader" :key="key" :style="val.style" class="list-item">
                <template v-if="val.type === 'operate'">
                  <span class="list-operation" @click="addBtn(item,i)">添加</span>
                  <span class="list-operation" @click="editBtn(item,i)">修改</span>
                  <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
                </template>
                <router-link v-else-if="val.type === 'router-link'" :to="{name:val.router.name,params:{id:item.id},query:{name:item.name}}" class="list-operation" append>
                  {{item[key] || 0}}
                </router-link>
                <template v-else>{{item[key]}}</template>
              </div>
            </div>
          </template>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :currentPage.sync="filter.page" @pageChange="pageChange"></base-pagination>
        </div>
      </div>
    </div>
    <goods-list-dialog v-if="visible" :visible.sync="visible" :otherParams="{group_id:currentGroup.id}" :limit="20" @submit="_addGoods"></goods-list-dialog>
    <base-modal :visible.sync="editVisible" :title="(edit.id?'修改':'新建')+'商品分组'" :submitBefore="justifyAddGroup" @submit="_addGroup">
      <base-form-item label="分组名称">
        <base-input v-model="edit.name"></base-input>
      </base-form-item>
      <base-form-item label="推荐行业">
        <base-select v-model="edit.industry_id" :data="tradeList" labelKey="name" width="400" height="44"></base-select>
      </base-form-item>
    </base-modal>
    <router-view @update="_getList({loading:false})"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import GoodsListDialog from '@components/goods-list-dialog/goods-list-dialog'
  import API from '@api'

  const PAGE_NAME = 'GOODS_GROUPING'
  const TITLE = '商品分组'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      GoodsListDialog
    },
    beforeRouteEnter(to, from, next) {
      API.Goods.getGroupList({
        data: {
          page: 1,
          limit: 10
        },
      }).then(res => {
        next(vw => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        tradeList: [],
        listHeader: {
          name: {name: '分组名称'},
          goods_num: {name: '商品数量', type: 'router-link', router: {name: 'mall-goods-goods-grouping-detail', params: {id: 'id'}}},
          created_at: {name: '创建时间'},
          operate_text: {name: '操作', type: 'operate', style: 'max-width:150px'},
        },
        total: 0,
        list: [],
        filter: {
          page: 1,
          limit: 10
        },
        visible: false,
        editVisible: false,
        edit: {
          id: '',
          name: '',
          industry_id: ''
        },
        currentGroup: {},
      }
    },
    methods: {
      _getTradeList() {
        return API.Goods.getTradeList({
          data: {limit: 0}
        }).then(res => {
          this.tradeList = res.data
          return res
        })
      },
      setData(res) {
        this.list = res.data
        this.total = res.meta.total
      },
      _getList(other) {
        API.Goods.getGroupList({
          data: this.filter, ...other
        }).then(res => {
          this.setData(res)
        })
      },
      addGroupBtn() {
        this.showEditModal()
        this.edit.name = ''
        this.edit.industry_id = ''
        this.edit.id = ''
      },
      showEditModal() {
        this._getTradeList().then(res => {
          this.editVisible = true
        })
      },
      pageChange(val) {
        this._getList({loading: false})
      },
      editBtn(item, i) {
        this.edit.id = item.id
        this.edit.name = item.name
        this.edit.industry_id = item.industry_id || ''
        this.showEditModal()
      },
      addBtn(item, i) {
        this.currentGroup = item
        this.visible = true
      },
      deleteBtn(item, i) {
        this.$confirm.confirm().then(async () => {
          await API.Goods.deleteGroup({data: {id: item.id}})
          this._getList({loading: false})
        }, () => {
        })
      },
      justifyAddGroup(done) {
        let msg = ''
        if (!this.edit.name) msg = '请填写分组名称'
        if (!this.edit.industry_id) msg = '请填写推荐行业'
        if (msg) {
          this.$toast.show(msg)
        } else {
          done()
        }
      },
      async _addGroup() {
        if (this.edit.id) {
          await API.Goods.editGroup({
            data: this.edit, doctor() {
            }
          })
          this.list.find(item => {
            if (item.id === this.edit.id) item.name = this.edit.name
          })
        } else {
          await API.Goods.addGroup({
            data: this.edit, doctor() {
            }
          })
          this.list.push(this.edit)
        }
        this._getList()
      },
      async _addGoods(arr) {
        await API.Goods.addGroupGoods({data: {group_id: this.currentGroup.id, goods_ids: arr}})
        this._getList({loading: false})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-grouping
    width: 100%
    position relative

    .big-list
      margin-bottom: 46px
</style>
