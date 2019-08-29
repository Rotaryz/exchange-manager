<template>
  <div :class="{inline:inline}">
    <div v-if="type === 'image' && !multiple" class="image-one">
      <div v-if="data" class="show-image hand">
        <div v-if="showLoading" class="loading-mask">
          <img src="./loading.gif" class="loading">
        </div>
        <img :src="data" class="image" :style="imgStyle">
        <span v-if="!disabled && isShowDel" class="close" @click="deleteBtn()"></span>
        <input
          v-if="isChange"
          type="file"
          :multiple="multiple"
          class="sendImage"
          accept="image/*"
          @change="getFiles($event)"
        >
        <div v-if="firstTag" class="tag">{{firstTag}}</div>
      </div>
      <div v-else class="hand upload-wrap">
        <slot name="icon">
          <div :style="addStyle" class="add-image">
            <div v-if="showLoading" class="loading-mask">
              <img src="./loading.gif" class="loading">
            </div>
          </div>
        </slot>
        <input type="file" :multiple="multiple" class="sendImage hand" accept="image/*" @change="getFiles($event)">
      </div>
    </div>
    <div v-if="type === 'image' && multiple" class="edit-image image-more">
      <draggable v-model="list" class="draggable">
        <div v-for="(item, index) in data" :key="index" class="show-image hand">
          <img :src="item.image_url ||item" class="image" :style="imgStyle">
          <span v-if="!disabled && isShowDel" class="close" @click="deleteBtn(index)"></span>
          <div v-if="firstTag && !index" class="tag">{{firstTag || item.title}}</div>
          <div v-if="otherTag && index" class="tag">{{otherTag || item.title}}</div>
        </div>
        <div v-if="data.length<limit" class="hand upload-wrap" draggable="false" @dragstart.stop>
          <slot name="icon">
            <div :style="addStyle" class="add-image">
              <div v-if="showLoading" class="loading-mask">
                <img src="./loading.gif" class="loading">
              </div>
            </div>
          </slot>
          <input type="file" :multiple="multiple" class="sendImage hand" accept="image/*" @change="getFiles($event)">
        </div>
      </draggable>
    </div>
    <div v-if="type === 'video'" class="edit-image">
      <template v-if="data || data.length>0">
        <draggable v-if="multiple" v-model="list" class="draggable">
          <div v-for="(item, index) in data" :key="index" width="90px" class="show-image hand">
            <video class="video-tag" :src="item.image_url ||item"></video>
            <span v-if="!disabled && isShowDel" class="close" @click="deleteBtn(index)"></span>
          </div>
        </draggable>
        <div v-else width="90px" class="show-image hand">
          <video class="video-tag" :src="item.video_url ||item"></video>
          <span v-if="!disabled && isShowDel" class="close" @click="deleteBtn()"></span>
        </div>
      </template>
      <div v-if="(multiple && data.length < limit) || (!multiple && !data)" class="hand upload-wrap">
        <slot name="icon">
          <div :style="addStyle" class="add-image">
            <div v-if="showLoading" class="loading-mask">
              <img src="./loading.gif" class="loading">
            </div>
          </div>
        </slot>
        <input type="file" :multiple="multiple" class="sendImage hand" accept="video/*" @change="getFiles($event)">
      </div>
    </div>

    <div v-if="type === 'image-custom'" class="custom-item edit-image">
      <div v-if="showLoading" class="loading-mask">
        <img src="./loading.gif" class="loading">
      </div>
      <input :multiple="multiple" type="file" class="sendImage hand" accept="image/*" @change="getFiles($event)">
      <slot>
        上传图片
      </slot>
    </div>

    <div v-if="type === 'video-custom'" class="custom-item edit-image">
      <div v-if="showLoading" class="loading-mask">
        <img src="./loading.gif" class="loading">
      </div>
      <input type="file" class="sendImage hand" accept="video/*" @change="getFiles($event)">
      <slot>
        上传视频
      </slot>
    </div>

    <div class="tip">{{tip}}</div>
  </div>
</template>
<script>
  import Draggable from 'vuedraggable'
  import {uploadFiles as cos} from '@utils/cos/cos'

  const EDIT_IMAGE = 'BASE_EDIT_IMAGE'

  export default {
    name: EDIT_IMAGE,
    components: {
      Draggable
    },
    props: {
      inline: {
        type: [Boolean, String], // 是否行内tip
        default: null
      },
      defaultKey: {
        type: String, // 返回的对象需要的值 { id:'image_id}'
        default: 'id'
      },
      valueKey: {
        type: [Object, String], // 返回的对象需要的值 { id:'image_id}'
        default: () => {}
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
      },
      addStyle: {
        // 添加样式
        type: String,
        default: ''
      },
      isShowDel: {
        // 是否展示删除
        type: Boolean,
        default: true
      },
      isChange: {
        //  是否可以点击更换图片
        type: Boolean,
        default: false
      },
      imgStyle: {
        type: [String, Object],
        default: null
      }
    },
    data() {
      return {
        showLoading: false
      }
    },
    computed: {
      list: {
        get() {
          return this.data
        },
        set(val) {
          this.$emit('update:data', val)
          this.$emit('drag-change', val)
        }
      }
    },
    methods: {
      deleteBtn(index) {
        let res = this.data
        if (Array.isArray(this.data)) res.splice(index, 1)
        this.$emit('update:data', res)
        this.$emit('delete', index)
      },
      getFiles(e) {
        let files = Array.from(e.target.files)
        if (files.length > this.limit) files = files.splice(0, this.limit)
        e.target.value = ''
        files.forEach((item) => {
          let size = item.size / 1024 / 1024
          if (this.size && size > this.size) {
            this.$loading.hide()
            this.$emit('failFile', '文件不能超过' + this.size + 'M')
            return false
          }
        })
        this._action(files)
      },
      async _action(files, fileType) {
        this.showLoading = true
        await cos(fileType, files)
          .then((arr) => {
            this.showLoading = false
            let item = arr.find((item) => item.error_code !== this.$ERR_OK)
            if (item) this.$emit('failFile', item.message)
            else this.$emit('successImage', Array.isArray(this.data) ? arr : arr[0])
          })
          .catch((err) => {
            this.showLoading = false
            this.$emit('failFile', err)
          })
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .inline
    display flex
    align-items center

  .edit-image
    flex-wrap: wrap
    display: flex

    .draggable
      margin: 0
      padding: 0
      flex-wrap: wrap
      display: flex

  .custom-item
    position: relative

  .add-image
    icon-image('pic-picture1')
    height: 90px
    width: @height
    position: relative
    border-radius: 2px
    overflow: hidden
    margin: 0

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
    position: relative

    /*&:last-child*/
    /*margin: 0*/

    .image
      height: 90px
      width: @height
      border-radius: 2px
      object-fit: cover

    .video-tag
      width: 100%
      height: 100%
      object-fit: cover

  .tag
    position absolute
    bottom 3px
    right: 0
    left: 0
    background: rgba(30, 35, 51, 0.5)
    border-radius: 0 0 1px 1px
    height: 20px
    line-height 20px
    text-align center
    color: $color-white
    font-size $font-size-14
    font-family $font-family-regular

  .close
    icon-image('icon-del')
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
    z-index: 999
    left: 0
    background: rgba(30, 35, 51, .5)

    .loading
      all-center()
      width: 25px
      height: 25px

  .tip
    color: $color-text-sub
    font-size $font-size-14

  .image-more
    display: flex

    .show-image
      margin-bottom: 14px
</style>
