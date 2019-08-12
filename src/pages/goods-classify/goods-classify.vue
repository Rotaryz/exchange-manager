<template>
  <div class="goods-classify">
    <base-table-tool title="商品分类" :iconUrl="require('./icon-goods_classify@2x.png')">
      <base-button plain addIcon @click="addBtn(0)">新建分类</base-button>
    </base-table-tool>
    <div class="tree-wrap">
      <zb-tree :data="list"
               @edit-item="editItem"
               @delete-item="deleteItem"
               @add-item="addChildBtn"
      ></zb-tree>
    </div>
    <base-modal :visible.sync="editVisible" :title="editTitle" :submitBefore="justifyForm" @submit="editSubmit">
      <base-form-item label="分类名称" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.name" :maxLength="10" clear></base-input>
      </base-form-item>
      <base-form-item v-if="!edit.pid" label="分类图标" labelWidth="84px" labelAlign="right">
        <upload :data="categoryImageUrl"
                type="image-one"
                tip="建议上传1:1、大小2M以下的图片"
                inline
                size="2"
                @successImage="successImage"
                @failFile="failFile"
        >
          <div slot="icon" class="upload-add-icon"></div>
        </upload>
      </base-form-item>
      <base-form-item :required="false" label="排序" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.sort" inputType="number"></base-input>
      </base-form-item>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import ZbTree from '@components/zb-tree/zb-tree'
  import Upload from '../../components/zb-upload/zb-upload.vue'

  const PAGE_NAME = 'GOODS_CLASSIFY'
  const TITLE = '商品分类'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      ZbTree,
      Upload
    },
    data() {
      return {
        editVisible: false,
        currentIndex: null,
        currentChildIndex: null,
        categoryImageUrl: null,
        edit: {
          id: null,
          name: '',
          sort: 0,
          image_id: 0,
          pid: 0
        },
        list: []
      }
    },
    computed: {
      editTitle() {
        return `${this.edit.id ? '修改' : '新建'}商品${this.childItem ? '子' : ''}分类`
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        API.Goods.getCategory({data: {pid: -1}}).then(res => {
          this.list = res.data
        })
      },
      deleteBtn() {
        this.edit.image_id = ''
        this.categoryImageUrl = ''
      },
      successImage(res) {
        console.log('successImage', res)
        this.edit.image_id = res.data.id
        this.categoryImageUrl = res.data.url
      },
      failFile(err) {
        this.$toast(err)
      },
      addBtn(pid) {
        this.categoryImageUrl = ''
        this.editVisible = true
        this.edit = {
          id: null,
          name: '',
          image_id: 0,
          sort: 0,
          pid: pid || 0
        }
      },
      editItem(obj) {
        console.log(obj)
        this.editVisible = true
        let {index = null, item = {}, childItem = {}, childIndex = null} = obj
        this.currentIndex = index
        this.currentChildIndex = childIndex
        this.edit.name = childItem.name || item.name
        this.edit.sort = childItem.sort || item.sort
        this.edit.id = childItem.id || item.id
        this.categoryImageUrl = !childItem.id ? item.image_url : ''
        this.edit.image_id = !childItem.id ? item.image_id : ''
        this.edit.pid = childItem.id ? item.id : 0
      },
      editSubmit() {
        console.log(this.edit.id, this.currentChildIndex, '--------')
        let requestName = this.edit.id ? 'editCategory' : 'addCategory'
        let {id, ...params} = this.edit
        API.Goods[requestName]({data: this.edit.id ? this.edit : params}).then(res => {
          this.getList()
        })
      },
      deleteItem(obj) {
        let {item, childItem = null} = obj
        this.$confirm.confirm().then(() => {
          API.Goods.deleteCategory({data: {id: childItem ? childItem.id : item.id}}).then(res => {
            this.getList()
          })
        })
      },
      addChildBtn(obj) {
        let {index = null, item = null} = obj
        this.currentIndex = index
        this.currentItem = item
        this.addBtn(item.id)
      },
      justifyForm(done) {
        console.log(this.edit)
        let msg = null
        if (!this.edit.name) msg = '请输入分类名称'
        else if (!(/^(0|[1-9]\d{0,9})$/.test(this.edit.sort))) msg = '请输入正确的排序'
        else if (!this.edit.pid && !this.edit.image_id) msg = '请上传分类图标'
        if (!msg) {
          done()
        } else {
          this.$toast.show(msg)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-classify
    width: 100%
    flex: 1
    background-color $color-white

    .tree-wrap
      padding: 0px 20px 20px
      overflow: hidden
</style>
