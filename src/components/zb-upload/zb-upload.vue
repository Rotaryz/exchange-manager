<template>
  <div :class="{inline:inline}">
    <div v-if="type === 'image'" class="edit-image">
      <template v-if="data || data.length>0">
        <draggable v-if="multiple" v-model="list" class="draggable" @update="_setSort()">
          <div v-for="(item, index) in data" :key="index" class="show-image hand">
            <img :src="item.image_url ||item" class="image">
            <span v-if="!disabled" class="close" @click="deleteBtn(index)"></span>
            <div v-if="firstTag && !index" class="tag">{{firstTag || item.title}}</div>
            <div v-if="otherTag && index" class="tag">{{otherTag || item.title}}</div>
          </div>
        </draggable>
        <div v-else class="show-image hand">
          <img :src="data.image_url || data" class="image">
          <span v-if="!disabled" class="close" @click="deleteBtn()"></span>
          <div v-if="firstTag" class="tag">{{firstTag || item.title}}</div>
          <div v-if="otherTag" class="tag">{{otherTag || item.title}}</div>
        </div>
      </template>
      <div v-if="(multiple && data.length < limit) || (!multiple && !data)" class="hand upload-wrap">
        <slot name="icon">
          <div class="add-image"></div>
        </slot>
        <input type="file" :multiple="multiple" class="sendImage hand" accept="image/*" @change="getFiles($event)">
        <div v-if="showLoading" class="loading-mask">
          <img src="./loading.gif" class="loading">
        </div>
      </div>
    </div>
    <div v-if="type === 'video'" class="edit-image">
      <template v-if="data || data.length>0">
        <draggable v-if="multiple" v-model="list" class="draggable" @update="_setSort()">
          <div v-for="(item, index) in data" :key="index" width="90px" class="show-image hand">
            <video class="video-tag" :src="item.image_url ||item"></video>
            <span v-if="!disabled" class="close" @click="deleteBtn(index)"></span>
          </div>
        </draggable>
        <div v-else width="90px" class="show-image hand">
          <video class="video-tag" :src="item.video_url ||item"></video>
          <span v-if="!disabled" class="close" @click="deleteBtn()"></span>
        </div>
      </template>
      <div v-if="(multiple && data.length < limit) || (!multiple && !data)" class="hand upload-wrap">
        <slot name="icon">
          <div class="add-image"></div>
        </slot>
        <input type="file" :multiple="multiple" class="sendImage hand" accept="video/*" @change="getFiles($event)">
        <div v-if="showLoading" class="loading-mask">
          <img src="./loading.gif" class="loading">
        </div>
      </div>
    </div>
    <div class="tip">{{tip}}</div>
  </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import {uploadFiles as vod} from '@utils/vod/vod'
  import {uploadFiles as cos} from '@utils/cos/cos'

  const EDIT_IMAGE = 'BASE_EDIT_IMAGE'

  export default {
    name: EDIT_IMAGE,
    components: {
      Draggable
    },
    props: {
      inline:{
        type: [Boolean,String], // 是否行内tip
        default: null
      },
      defaultKey: {
        type: String, // 返回的对象需要的值 { id:'image_id}'
        default: 'id'
      },
      valueKey: {
        type: [Object], // 返回的对象需要的值 { id:'image_id}'
        default: () => {
        }
      },
      otherTag: {
        type: String, // 除第一张图的其他图的标签
        default: ''
      },
      firstTag: {
        type: String, // 第一张图的标签
        default: ''
      },
      tip: {
        type: String, // 是否多个图/视频
        default: ''
      },
      placeholderImage: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean, // 是否多个图/视频
        default: false
      },
      data: {
        type: [Array, String], // 图片/视频列表
        default: ''
      }, // 可以sync
      limit: {
        // 图片/视频数量
        type: Number,
        default: 5
      },
      type: {
        // 组件使用类型
        type: String,
        default: 'image'
      },
      disabled: {
        type: [String, Number, Boolean], // false 不禁止
        default: false
      },
      size: {
        // 文件大小
        type: [String, Number],
        default: null
      }
    },
    data() {
      return {
        list: this.data,
        showLoading: false
      }
    },
    computed: {
      isArr() {
        let type = typeof (this.data)
        return type === 'string' ? 0 : 1
      }
    },
    methods: {
      _setSort(val) {
        this.$emit('update:data', val)
        this.$emit('drag-change', val)
      },
      deleteBtn(index) {
        let res = this.data
        res = this.isArr ? res.splice(index, 1) : ''
        this.$emit('update:data', res)
        this.$emit('delete', res)
      },
      getFiles(e) {
        console.log(Array.from(e.target.files))
        let files = Array.from(e.target.files)
        if (files.length > this.limit) files = files.splice(0, this.limit)
        e.target.value = ''
        files.forEach(item => {
          let size = (item.size / 1024 / 1024)
          if (this.size && size > this.size) {
            this.$loading.hide()
            this.$emit('failFile', '文件不能超过' + this.size + 'M')
            return false
          }
        })
        if (this.type === 'image') {
          this._addPic(files)
        } else {
          this._addVideo(files)
        }
      },
      async _addPic(files) {
        this.showLoading = true
        await cos('image', files).then(arr => {
          this.showLoading = false
          arr.length && arr.forEach(item => {
            if (item.error !== this.$ERR_OK) {
              this.$emit('failFile', item.message)
              return false
            }
          })
          arr = arr.filter(item => {
            return item.error === this.$ERR_OK
          })
          let res = this.getResData(arr)
          this.$emit('update:data', this.isArr ? res : res[0])
          this.$emit('successImage', arr)
        }).catch(err => {
          this.$emit('failFile', err)
          this.showLoading = false
        })
      },
      _addVideo(files) {
        // todo 还未使用过 ，使用第一次可自行修改此处，修改后请删除此注释
        this.$loading.show('视频上传中...')
        vod(files[0], curr => {
          this.$loading.showCurr(curr)
        }).then(res => {
          this.$loading.hide()
          if (res.error !== this.$ERR_OK) {
            this.$emit('failFile', res.message)
            return
          }
          let resData = this.getResData(res.data)
          this.$emit('update:data', resData)
          this.$emit('successVideo', res.data)
        }).catch(err => {
          this.$loading.hide()
          this.$emit('failFile', err)
        })
      },
      getResData(data) {
        let resData
        if (data.constructor === 'Array') {
          resData = data.map(item => {
            return this.getOneData(item)
          })
        } else {
          resData = this.getOneData(data)
        }
        return resData
      },
      getOneData(item) {
        let resData
        let keys = this.valueKey.keys()
        if (keys.length) {
          let obj = {}
          this.valueKey.keys().forEach(key => {
            obj[key] = item[this.valueKey[key]]
          })
          resData = obj
        } else {
          resData = item[this.defaultKey]
        }
        return resData
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .inline
    display flex
    align-items center
    .tip
      margin-left:10px
  .edit-image
    flex-wrap: wrap
    display: flex

    .draggable
      flex-wrap: wrap
      display: flex

  .add-image
    icon-image('pic-picture1')
    height: 90px
    width: @height
    position: relative
    border-radius: 2px
    overflow: hidden
    position: relative
    margin-bottom:14px
  .upload-wrap
    position relative
  .sendImage
    height: 100%
    width: 100%
    top: 0
    left: 0
    opacity: 0
    z-index: 1
    position: absolute
    font-size 0

  .add-video
    icon-image('pic-video')

  .show-image
    margin-right: 20px
    margin-bottom: 14px
    position: relative

    .image
      height: 90px
      width: @height
      border-radius: 2px
      confit: cover

    .video-tag
      width: 100%
      height: 100%
      object-fit: cover

  .tag
    position absolute
    bottom 0
    right: 0
    left: 0
    background: rgb(30, 35, 51)
    border-radius: 0 0 1px 1px
    height: 20px
    line-height 20px
    text-align center
    color: $color-white
    opacity 0.5
    font-size $font-size-14
    font-family $font-family-regular

  .close
    icon-image('pic-delete')
    width: 15px
    height: 15px
    position: absolute
    top: 0
    right: 0
    z-index: 10

  .loading-mask
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    background: rgba(0, 0, 0, .6)

    .loading
      all-center()
      width: 25px
      height: 25px

  .tip
    color: $color-text-sub
    font-size $font-size-14
</style>
