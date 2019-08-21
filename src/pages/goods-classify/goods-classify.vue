<template>
  <div class="goods-classify">
    <base-table-tool class="base-table-tool-wrap" title="商品分类" :iconUrl="require('./icon-goods_classify@2x.png')">
      <base-button plain addIcon @click="addBtn">新建分类</base-button>
    </base-table-tool>
    <div class="tree-wrap">
      <zb-tree v-if="list.length"
               :data="list"
               @edit-item="editItem"
               @delete-item="deleteItem"
               @add-item="addChildBtn"
      ></zb-tree>
      <base-blank v-else></base-blank>
    </div>
    <base-modal :visible.sync="editVisible" :title="editTitle" :submitBefore="justifyForm">
      <base-form-item label="分类名称" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.name" :maxLength="10" clear></base-input>
      </base-form-item>
      <base-form-item v-if="!edit.pid" label="分类图标" labelWidth="84px" labelAlign="right">
        <upload :data="categoryImageUrl"
                :multiple="false"
                imgStyle="width:44px;height:44px"
                tip="建议上传1:1、大小2M以下的图片"
                inline
                size="2"
                @delete="categoryImageDelete"
                @successImage="successImage"
                @failFile="failFile"
        >
          <div slot="icon" class="upload-add-icon"></div>
        </upload>
      </base-form-item>
      <base-form-item :required="false" label="排序" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.sort" type="number"></base-input>
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
    beforeRouteEnter(to, from, next) {
      API.Goods.getCategory({data: {pid: -1}}).then((res) => {
        // console.log(res)
        next((vw) => {
          vw.setData(res)
        })
      })
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
    methods: {
      setData(res) {
        this.list = res.data
      },
      getList(other) {
        API.Goods.getCategory({data: {pid: -1}, ...other}).then((res) => {
          this.setData(res)
        })
      },
      categoryImageDelete() {
        this.edit.image_id = 0
        this.categoryImageUrl = ''
      },
      successImage(res) {
        this.edit.image_id = res.data.id
        this.categoryImageUrl = res.data.url
      },
      failFile() {
        this.$toast.show('上传失败')
      },
      addBtn() {
        this.categoryImageUrl = ''
        this.editVisible = true
        this.edit = {
          id: null,
          name: '',
          image_id: 0,
          sort: 0,
          pid: 0
        }
      },
      editItem(obj) {
        // console.log(obj)
        this.editVisible = true
        let {index = null, item = {}, childItem = {}, childIndex = null} = obj
        this.currentIndex = index
        this.currentChildIndex = childIndex
        this.edit.name = childItem.name || item.name
        this.edit.sort = childItem.sort || item.sort
        this.edit.id = childItem.id || item.id
        this.categoryImageUrl = !childItem.id ? item.image_url : ''
        this.edit.image_id = !childItem.id ? item.image_id : 0
        this.edit.pid = childItem.id ? item.id : 0
      },
      editSubmit() {
        let requestName = this.edit.id ? 'editCategory' : 'addCategory'
        let {id, ...params} = this.edit
        return API.Goods[requestName]({data: this.edit.id ? this.edit : params})
      },
      deleteItem(obj) {
        let {item, childItem = null} = obj
        this.$confirm.confirm().then(() => {
          API.Goods.deleteCategory({data: {id: childItem ? childItem.id : item.id}}).then((res) => {
            this.getList({loading: false})
          })
        })
      },
      addChildBtn(obj) {
        let {item = {}} = obj
        this.addBtn()
        this.edit.pid = item.id
      },
      justifyForm(done) {
        let msg = null
        if (!this.edit.name) msg = '请输入分类名称'
        else if (!this.edit.pid && !this.edit.image_id) msg = '请上传分类图标'
        if (!msg) {
          this.editSubmit().then(() => {
            done()
            this.getList({loading: false})
          })
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
    display flex
    flex-direction column

    .base-table-tool-wrap
      flex-shrink 0

    .tree-wrap
      padding: 0px 20px 20px
      overflow: hidden
      flex: 1

  .upload-add-icon
    margin-right: 14px
</style>
