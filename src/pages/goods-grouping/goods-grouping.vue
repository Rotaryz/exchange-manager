<template>
  <div class="goods-grouping normal-box table">
    <base-table-tool title="商品分组" :iconUrl="require('./icon-product_list@2x.png')">
      <base-button plain addIcon @click="addGroupBtn">添加分组</base-button>
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
                <span class="list-operation" @click="addBtn(item,i)">添加</span>
                <span class="list-operation" @click="editBtn(item,i)">修改</span>
                <span class="list-operation" @click="deleteBtn(item,i)">删除</span>
              </template>
              <router-link v-else-if="val.type === 'router-link'" :to="{name:val.router.name,params:{id:item.id}}" class="list-operation" append>
                {{item[key] || 0}}
              </router-link>
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
    <base-modal :visible.sync="editVisible" title="新建商品分组" :submitBefore="justifyAddGroup" @submit="_addGroup">
      <base-form-item label="分组名称">
        <base-input v-model="edit.name"></base-input>
      </base-form-item>
      <base-form-item label="推荐行业">
        <base-input v-model="edit.trade"></base-input>
      </base-form-item>
    </base-modal>
    <router-view></router-view>
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
        listHeader: {
          name: {name: '分组名称'},
          count: {name: '商品数量', type: 'router-link', router: {name: 'mall-goods-goods-grouping-detail', params: {id: 'id'}}},
          create_time: {name: '创建时间'},
          operate_text: {name: '操作', type: 'operate', style: 'max-width:150px'},
        },
        total: 0,
        list: [{name: '家居电器', count: 20, create_time: '2018-03-18', id: 1}],
        filter: {
          page: 1,
          limit: 10
        },
        visible: false,
        editVisible: false,
        edit: {
          name: '',
          trade: ''
        },
        currentGroup: {},
      }
    },
    methods: {
      setData(res) {
        this.list = res.data
        this.total = res.total || 20
      },
      _getList() {
        API.Goods.getGroupList({
          data: this.filter,
        }).then(res => {
          if (res.isFail) return false
          this.setData(res)
        })
      },
      addGroupBtn() {
        this.edit.name = ''
        this.edit.trade = ''
        this.edit.id = ''
        this.editVisible = true
      },
      pageChange(val) {
        this._getList()
      },
      editBtn(item, i) {
        this.edit.id = item.id
        this.edit.name = item.name
        this.edit.trade = item.trade || ''
        this.editVisible = true
      },
      addBtn(item, i) {
        // todo 获取已选择的商品数组
        this.currentGroup = item
        API.Goods.getGroupDetail({data: item})
        this.visible = true
      },
      deleteBtn(item, i) {
        this.$confirm.confirm().then(async () => {
          // todo 删除请求
          console.log('确认 ')
          let res = await API.Goods.deleltGroup({data: item})
          if (res.isFail) return false
          this._getList()
        }, () => {
          console.log('取消 ')
        })
      },
      justifyAddGroup(done) {
        let msg = ''
        if (!this.edit.name) msg = '请填写分组名称'
        if (!this.edit.trade) msg = '请填写推荐行业'
        if (msg) {
          this.$toast.show(msg)
        } else {
          done()
        }
      },
      async _addGroup() {
        let res = null
        if (this.edit.id) {
          // todo 修改商品分组请求
          res = await API.Goods.editGroup({data: {id: this.edit.id}})
          this.list.find(item => {
            if (item.id === this.edit.id) item.name = this.edit.name
          })
        } else {
          // todo 增加商品分组请求
          res = await API.Goods.addGroup({data: {id: this.edit.id}})
          this.list.push(this.edit)
        }
        if (res.isFail) return false
        this._getList()
        console.log('_addGroup', this.edit)
      },
      async _addGoods(arr) {
        let res = await API.Goods.addGroupGoods({data: arr})
        if (res.isFail) return false
        this._getList()
        console.log(arr)
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
