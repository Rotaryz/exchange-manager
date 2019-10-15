<template>
  <div class="course-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'课程'"></base-table-tool>
    <title-line title="基础信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="课程名称" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.name" :limit="20"></base-input>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
      </base-form-item>
      <base-form-item label="课程描述"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelHeight="40px"
                      labelAlign="right"
                      verticalAlign="top"
      >
        <base-input v-model="msg.description" :limit="100" type="textarea" :textareaHeight="120" placeholder="输入课程描述"></base-input>
      </base-form-item>

      <!--上传封面图-->
      <base-form-item label="封面图"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
                      verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="msg.banner_images"
                :addStyle="`margin:0 0 14px 0`"
                multiple firstTag="封面图"
                tip="建议图片的尺寸：750*422，支持png，jpeg，jpg格式，最多可上传5张。"
                @successImage="addBanner"
        ></upload>
      </base-form-item>

      <!--上传详情图-->
      <base-form-item label="课程详情图"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
                      verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="msg.detail_images"
                :addStyle="`margin:0 0 14px 0`"
                multiple
                firstTag="详情图"
                tip="上传图片的格式png，jpeg，jpg，最多可上传15张。"
                :limit="15"
                @successImage="addDetail"
        ></upload>
      </base-form-item>

      <base-form-item label="课程视频"
                      :required="false"
                      verticalAlign="top"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelHeight="40px"
                      labelAlign="right"
      >
        <div class="video-box">
          <div class="video-list-box">
            <div class="video-list-header">
              <div class="list-item list-first"><span class="required-mask">*</span>视频</div>
              <div class="list-item"><span class="required-mask">*</span>视频标题</div>
            </div>
            <div v-for="(item, index) in videoList" :key="index" class="video-list-item">
              <div class="list-item list-first">
                <div class="list-video-upload">
                  <div v-if="showLoading && videoIndex === index" class="loading-mask">
                    <img src="./loading.gif" class="loading">
                  </div>
                  <input type="file" class="sendImage hand" accept="video/*" @change="getFiles($event, index)">
                  <video class="video-tag" :src="item.video_url"></video>
                  <img v-if="item.video_url" src="./icon-del@2x.png" class="sendImage-close" @click.stop="delVideo(index)">
                </div>
              </div>
              <div class="list-item">
                <base-input v-model="item.video_name" :limit="20" width="350"></base-input>
                <img src="./icon-del_2@2x.png" class="item-close hand" @click="delVideoItem(index)">
              </div>
            </div>
          </div>
          <base-button type="primary" plain addIcon @click="addVideoList">添加视频</base-button>
        </div>
      </base-form-item>
    </div>
    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="submitBtn">保存</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import TitleLine from "../../components/title-line/title-line"
  import Upload from '../../components/zb-upload/zb-upload.vue'
  import {uploadFiles as cos} from '@utils/cos/cos'
  // import {objDeepCopy} from '@utils/common'

  import API from '@api'
  const PAGE_NAME = 'COURSE_EDIT'
  const TITLE = '新建课程'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TitleLine,
      Upload
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.id) {
        API.Course.courseDetail({
          data: {id: to.query.id}
        }).then(res => {
          next(vw => {
            vw.setData(res)
          })
        })
      } else {
        next()
      }
    },
    data() {
      return {
        msg: {
          name: '',
          description: '',
          banner_images: [],
          detail_images: []
        },
        id: '',
        isSubmit: false,
        showLoading: false,
        videoList: [],
        videoIndex: 0
      }
    },
    created() {
      this.id = this.$route.query.id || ''
    },
    methods: {
      setData(res) {
        this.msg = res.data
        this.videoList = res.data.banner_videos
      },
      addBanner(data) {
        let arr = data.map(item => {
          return {
            id: 0,
            image_id: item.data.id,
            image_url: item.data.url
          }
        })
        this.msg.banner_images = [...this.msg.banner_images, ...arr]
        this.msg.banner_images = this.msg.banner_images.slice(0, 5)
      },
      addDetail(data) {
        let arr = data.map(item => {
          return {
            id: 0,
            image_id: item.data.id,
            image_url: item.data.url
          }
        })
        this.msg.detail_images = [...this.msg.detail_images, ...arr]
        this.msg.detail_images = this.msg.detail_images.slice(0, 15)
      },
      cancelBtn() {
        this.$router.back()
      },
      courseNew() {
        API.Course.courseNew({
          data: this.msg
        })
          .then((res) => {
            this.$toast.show('保存成功')
            setTimeout(() => {
              this.msg.name = ''
              this.isSubmit = true
              this.$emit('update')
              this.$router.back()
            }, 1500)
          })
          .catch(res => {
            this.isSubmit = false
          })
      },
      courseEdit() {
        API.Course.courseEdit({
          data: this.msg
        })
          .then(res => {
            this.$toast.show('保存成功')
            setTimeout(() => {
              this.isSubmit = true
              this.$emit('update')
              this.$router.back()
            }, 1500)
          })
          .catch(res => {
            this.isSubmit = false
          })
      },
      submitBtn() {
        if (this.isSubmit) return
        if (this.msg.name.length === 0) {
          this.$toast.show('请输入课程名称')
          return
        } else if (this.msg.banner_images.length === 0) {
          this.$toast.show('请上传课程封面图')
          return
        } else if (this.msg.detail_images.length === 0) {
          this.$toast.show('请上传课程详情图')
          return
        }
        let over = this.justifySpec()
        this.msg.banner_videos = this.videoList
        console.log(over)
        if (over) return
        console.log(this.msg)
        this.isSubmit = true
        if (this.id) {
          this.courseEdit()
        } else {
          this.courseNew()
        }
      },
      // 规格值校验
      justifySpec() {
        let over = false
        if (this.videoList) {
          // 规格
          for (let i in this.videoList) {
            console.log(i)
            if (this.videoList[i].video_url.length === 0) {
              this.$toast.show(`视频不能为空`)
              over = true
              return true
            }
            if (!this.videoList[i].video_name) {
              this.$toast.show(`视频标题不能为空`)
              over = true
              return true
            }
          }
        }
        return over
      },
      getFiles(e, index) {
        this.videoIndex = index
        let files = Array.from(e.target.files)
        if (files.length > this.limit) files = files.splice(0, this.limit)
        e.target.value = ''
        files.forEach((item) => {
          let size = item.size / 1024 / 1024
          if (this.size && size > this.size) {
            this.$loading.hide()
            this.$toast.show('文件不能超过' + this.size + 'M')
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
            if (item) this.$toast.show(item.message)
            else this.addVideo(Array.isArray(this.data) ? arr : arr[0])
          })
          .catch((err) => {
            this.$emit('failFile', err)
            this.$toast.show(err)
          })
      },
      addVideo(data) {
        this.videoList[this.videoIndex].id = 0
        this.videoList[this.videoIndex].video_id = data.data.id
        this.videoList[this.videoIndex].video_url = data.data.url
        console.log(data)
      },
      delVideo(index) {
        this.videoList[index].id = 0
        this.videoList[index].video_id = ''
        this.videoList[index].video_url = ''
      },
      delVideoItem(index) {
        this.videoList.splice(index, 1)
      },
      addVideoList() {
        this.videoList.push({id: '', video_id:'', video_url: '', video_name: ''})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-edit
    width: 100%
    background: #FFF
    .container
      padding: 24px 20px 8px 30px
      background-color: $color-white
  .video-list-box
    width: 586px
    background: #F4F8F9
    margin-bottom: 20px
    border-1px(#D9D9D9)
    .video-list-header
      display: flex
      align-items: center
      box-sizing: border-box
      padding: 0 20px
      height: 44px
      .list-item
        font-size: $font-size-14
        box-sizing: border-box
        padding-right: 20px
        flex: 1
        align-items: center
        .required-mask
          color: $color-error
      .list-first
        max-width: 135px
    .video-list-item
      display: flex
      align-items: center
      box-sizing: border-box
      padding: 0 20px
      height: 60px
      border-top-1px(#D9D9D9)
      .list-item
        font-size: $font-size-14
        box-sizing: border-box
        padding-right: 20px
        flex: 1
        align-items: center
        layout(row)
        .list-video-upload
          width: 75px
          height: 42px
          position: relative
          icon-image('pic-add_video')
          cursor: pointer
          overflow: hidden
      .list-first
        max-width: 135px
  .sendImage
    height: 100%
    width: 100%
    top: 0
    left: 0
    opacity: 0
    z-index: 1
    position: absolute
    font-size: 0
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
  .item-close
    width: 12px
    height: 12px
    display: block
    margin-left: 10px
    extend-click()
  .video-tag
    width: 75px
    height: 42px
    object-fit: cover
  .sendImage-close
    width: 15px
    height: 15px
    display: block
    position: absolute
    right: 0
    top: 0
    z-index: 1000
  .w
    width: 100px
</style>
