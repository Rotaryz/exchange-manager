<template>
  <div class="goods-classify">
    <base-table-tool title="商品分类" :iconUrl="require('./icon-goods_classify@2x.png')">
      <base-button plain addIcon @click="addBtn">新建分类</base-button>
    </base-table-tool>
    <div class="tree-wrap">
      <zb-tree :data="list" labelKey="name" @edit-item="editItem" @delete-item="deleteItem" @add-item="addChildBtn"></zb-tree>
    </div>
    <base-modal :visible.sync="editVisible" :title="editTitle" :submitBefore="justifyForm" @submit="editSubmit">
      <base-form-item label="分类名称" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.name" :maxLength="10" clear></base-input>
      </base-form-item>
      <base-form-item v-if="currentChildIndex===null" label="分类图标" labelWidth="84px">
        <upload tip="建议上传1:1、大小2M以下的图片" inline size="2">
          <div slot="icon" class="upload-add-icon"></div>
        </upload>
      </base-form-item>
      <base-form-item label="排序" labelWidth="84px" labelAlign="right">
        <base-input v-model="edit.sort" inputType="number"></base-input>
      </base-form-item>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
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
        currentItem: null,
        currentChildIndex: null,
        currentChildItem: null,
        edit: {
          id: null,
          name: '',
          sort: 0,
          image_url: ''
        },
        list: [{
          "id": 20,
          "name": "\u4f11\u95f2\u96f6\u98df2",
          "parent_id": 0,
          "goods_count": 82,
          "sort": 19,
          "is_selected": false,
          "image_url": "https://social-shopping-api-1254297111.picgz.myqcloud.com/1/2019/05/20/155832800017676.png",
          "image_id": 109865,
          "list": [{
            "id": 47, "name": "32", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 46, "name": "\u81a8\u5316\u98df\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 45, "name": "\u52a0\u5de5\u8089\u8d28\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 43, "name": "\u52a0\u5de5\u8c46\u5236\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 30, "name": "\u996e\u6599", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 24, "name": "\u7cd6\u679c", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []
          }, {
            "id": 23,
            "name": "\u5de7\u514b\u529b",
            "parent_id": 20,
            "goods_count": 0,
            "sort": 0,
            "is_selected": false,
            "image_url": "",
            "image_id": 0,
            "list": [{"id": 47, "name": "32", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 46, "name": "\u81a8\u5316\u98df\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 45, "name": "\u52a0\u5de5\u8089\u8d28\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 43, "name": "\u52a0\u5de5\u8c46\u5236\u54c1", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 30, "name": "\u996e\u6599", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 24, "name": "\u7cd6\u679c", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {
              "id": 23,
              "name": "\u5de7\u514b\u529b",
              "parent_id": 20,
              "goods_count": 0,
              "sort": 0,
              "is_selected": false,
              "image_url": "",
              "image_id": 0,
              "list": []
            }]
          }, {"id": 22, "name": "\u575a\u679c\u7c7b", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}, {"id": 21, "name": "\u997c\u5e72", "parent_id": 20, "goods_count": 0, "sort": 0, "is_selected": false, "image_url": "", "image_id": 0, "list": []}]
        }]
      }
    },
    computed: {
      editTitle() {
        return `${this.edit.id ? '修改' : '新建'}商品${this.childItem ? '子' : ''}分类`
      }
    },
    methods: {
      addBtn() {
        this.editVisible = true
        this.edit = {
          id: null,
          name: '',
          sort: 0,
          image_url: ''
        }
      },
      editItem(obj) {
        this.editVisible = true
        let {index = null, item = {}, childItem = {}, childIndex = null} = obj
        this.currentIndex = index
        this.currentChildIndex = childIndex
        this.currentChildItem = childItem
        this.currentItem = item
        this.edit.name = childItem.name || item.name
        this.edit.sort = childItem.sort || item.sort
        this.edit.id = childItem.id || item.id
      },
      editSubmit() {
        console.log(this.edit.id ,this.currentChildIndex,'--------')
        if(this.edit.id === null){
          if(this.currentChildIndex!==null){
            this.$set(this.list[this.currentIndex].list,this.currentChildIndex+1, this.edit)
          }else{
            this.$set(this.list,this.currentIndex+1, this.edit)
          }
        }else{
          if(this.currentChildIndex!==null){
            this.$set(this.list[this.currentIndex].list,this.currentChildIndex, this.edit)
          }else{
            this.$set(this.list,this.currentIndex, this.edit)
          }
        }
      },
      deleteItem(obj) {
        let {index, childItem = null, childIndex} = obj
        this.$confirm.confirm().then(() => {
          console.log(obj, childItem)
          if (childItem) {
            this.list[index].list.splice(childIndex, 1)
          } else {
            console.log(this.list[index])
            this.list.splice(index, 1)
          }
        })
      },
      addChildBtn(obj) {
        let {index = null, item = null} = obj
        this.currentIndex = index
        this.currentItem = item
        this.addBtn()
      },
      justifyForm(done) {
        let msg= null
        if(!this.edit.name) msg ='请输入分类名称'
        else if(!(/^(0|[1-9]\d{0,9})$/.test(this.edit.sort))) msg ='请输入正确的排序'
        else if(this.currentChildIndex===null && !this.edit.image_url) msg ='请上传分类图标'
        if(!msg){
          done()
        }else{
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
