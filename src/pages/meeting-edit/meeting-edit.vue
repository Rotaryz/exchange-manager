<template>
  <div class="course-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'会议'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="会议名称" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.name" :limit="20"></base-input>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
      </base-form-item>
      <base-form-item label="会议描述"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
                      verticalAlign="top"
      >
        <base-input v-model="msg.description" :limit="100" type="textarea" :textareaHeight="120" placeholder="输入会议描述"></base-input>
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

      <!--上传视频-->
      <base-form-item label="视频"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
                      verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="msg.banner_videos"
                type="video"
                :addStyle="`margin:0 0 14px 0`"
                multiple
                firstTag="视频"
                :limit="1"
                tip="建议上传50M以内的清晰视频，内容突出会议1-2个核心卖点。"
                @successImage="addVideo"
        ></upload>
      </base-form-item>

      <!--上传详情图-->
      <base-form-item label="会议详情图"
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

      <base-form-item label="关联微信号" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.wechat" :limit="20"></base-input>
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
  // import {objDeepCopy} from '@utils/common'

  import API from '@api'
  const PAGE_NAME = 'COURSE_EDIT'
  const TITLE = '新建会议'

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
        API.Meeting.meetingDetail({
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
          wechat: '',
          banner_images: [],
          banner_videos: [],
          detail_images: []
        },
        id: '',
        isSubmit: false
      }
    },
    created() {
      this.id = this.$route.query.id || ''
    },
    methods: {
      setData(res) {
        this.msg = res.data
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
      addVideo(data) {
        this.msg.banner_videos = data.map(item => {
          return {
            id: 0,
            video_id: item.data.id,
            video_url: item.data.url
          }
        })
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
        API.Meeting.meetingNew({
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
        API.Meeting.meetingEdit({
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
        let checkResult = this.checkForm()
        if (!checkResult) return
        this.isSubmit = true
        if (this.id) {
          this.courseEdit()
        } else {
          this.courseNew()
        }
      },
      checkForm() {
        let testConfig = [
          {
            target: 'name',
            type: ['length'],
            toast: ['请输入会议名称']
          },
          {
            target: 'description',
            type: ['length'],
            toast: ['请输入会议描述']
          },
          {
            target: 'banner_images',
            type: ['length'],
            toast: ['请添加封面图']
          },
          {
            target: 'detail_images',
            type: ['length'],
            toast: ['请添加详情图']
          },
          {
            target: 'wechat',
            type: ['length'],
            toast: ['请输入关联微信号']
          },
        ]
        for (let i = 0; i < testConfig.length; i++) {
          for (let j = 0; j < testConfig[i].type.length; j++) {
            let item = testConfig[i]
            switch (item.type[j]) {
            case 'length':
              if (this.msg[item.target][j] instanceof String && !this.msg[item.target][j].trim().length) {
                this.$toast.show(item.toast[j])
                this.isSubmit = false
                return false
              } else if (this.msg[item.target][j] instanceof Array && !this.msg[item.target][j].length) {
                this.$toast.show(item.toast[j])
                this.isSubmit = false
                return false
              }
            }
          }
        }
        return true
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
</style>
