<template>
  <div class="course-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'会议'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="会议名称" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.name" :limit="20" placeholder="输入会议名称"></base-input>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
      </base-form-item>

      <base-form-item label="会议时间"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
      >
        <date-select datePlaceholder="请选择时间" textName="" dateType="datetime" dateStyle="width:400px; height: 44px" :infoTime.sync="msg.meeting_time"></date-select>
        <!--<base-input v-model="msg.meeting_time" placeholder=""></base-input>-->
      </base-form-item>

      <base-form-item label="会议地点"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="82px"
                      labelAlign="right"
      >
        <base-input v-model="msg.description" placeholder=""></base-input>
      </base-form-item>

      <base-form-item label="票价" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.price" type="number" placeholder="输入票价"></base-input>
        <span class="after-word">元</span>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
      </base-form-item>
      <base-form-item label="总库存数" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.saleable" type="number" placeholder="输入总库存"></base-input>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
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

      <!--<base-form-item label="关联微信号" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.wechat" :limit="20"></base-input>
      </base-form-item>-->

      <title-line title="基本信息" class="top-title"></title-line>
      <div class="container">
        <base-form-item label="微信号" verticalAlign="top" labelMarginRight="40" labelWidth="78px" labelAlign="right"
                        labelHeight="44px"
        >
          <div class="wechat-content">
            <div class="wechat-list">
              <div class="wechat-title">
                <span class="left-item"><span class="tag">*</span>头像</span>
                <span class="right-item"><span class="tag">*</span>微信号码</span>
              </div>
              <div v-for="(item, index) in msg.meeting_wechats" :key="index" class="wechat">
                <span class="left-item">
                  <upload :data.sync="item.image_url"
                          addStyle="width: 36px; height: 36px;"
                          imgStyle="width: 36px; height: 36px"
                          :multiple="false"
                          inline
                          tip=""
                          @delete="deleteWechat($event, index)"
                          @successImage="addWechatImage($event, index)"
                  >
                    <div slot="icon" class="upload-add-icon"></div>
                  </upload>
                </span>
                <p class="right-item">
                  <base-input
                    v-model="item.wechat"
                    type="text"
                    placeholder=""
                    width="300"
                    height="36"
                    inputStyle="border-radius: 0"
                  ></base-input>
                  <span v-if="index > 0" class="delete" @click="delWechatItem(index)"></span>
                </p>
              </div>
            </div>
            <base-button type="primary" plain @click="addWechatItem"><span class="add-icon"></span>添加微信</base-button>
          </div>
        </base-form-item>
      </div>
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
  import DateSelect from '@components/date-select/date-select.vue'
  import API from '@api'

  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/


  const PAGE_NAME = 'COURSE_EDIT'
  const TITLE = '新建会议'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TitleLine,
      Upload,
      DateSelect
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
          meeting_time: '',
          price: '',
          saleable: '',
          banner_images: [],
          banner_videos: [],
          detail_images: [],
          meeting_wechats: [{image_url: ''}]
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
      addWechatImage(data, index) {
        this.$set(
          this.msg.meeting_wechats,
          index,
          {
            id: 0,
            image_url: data.data.url,
            image_id: data.data.id,
            wechat: this.msg.meeting_wechats[index].wechat || ''
          }
        )
      },
      deleteWechat(num, index) {
        this.$set(this.msg.meeting_wechats[index], 'image_id', '')
      },
      addWechatItem() {
        if (this.msg.meeting_wechats.length > 2) return
        let arr = JSON.parse(JSON.stringify(this.msg.meeting_wechats))
        arr.push({image_url: ''})
        this.$set(this.msg, 'meeting_wechats', arr)
      },
      delWechatItem(index) {
        let arr = JSON.parse(JSON.stringify(this.msg.meeting_wechats))
        arr.splice(index, 1)
        this.$set(this.msg, 'meeting_wechats', arr)
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
        for (let i in this.msg.meeting_wechats) {
          if (!this.msg.meeting_wechats[i].image_id) {
            this.$toast.show('请添加微信头像')
            return
          } else if (!this.msg.meeting_wechats[i].wechat) {
            this.$toast.show('请填写微信号')
            return
          }
        }

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
          // {
          //   target: 'description',
          //   type: ['length'],
          //   toast: ['请输入会议描述']
          // },
          {
            target: 'price',
            type: ['length', 'price'],
            toast: ['请输入票价', '请输入大于0且最多两位小数的票价']
          },
          {
            target: 'saleable',
            type: ['length', 'num'],
            toast: ['请输入总库存数', '请输入正整数的库存数']
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
          }
        ]
        for (let i = 0; i < testConfig.length; i++) {
          for (let j = 0; j < testConfig[i].type.length; j++) {
            let item = testConfig[i]
            switch (item.type[j]) {
            case 'length':
              if ((this.msg[item.target].constructor === String) && !this.msg[item.target].trim().length) {
                this.$toast.show(item.toast[j])
                this.isSubmit = false
                return false
              } else if ((this.msg[item.target].constructor === Array) && !this.msg[item.target].length) {
                this.$toast.show(item.toast[j])
                this.isSubmit = false
                return false
              }
              break
            case 'price':
              if (!MONEYREG.test(this.msg[item.target])) {
                this.$toast.show(item.toast[j], 2000)
                return false
              }
              break
            case 'num':
              if (!COUNTREG.test(this.msg[item.target])) {
                this.$toast.show(item.toast[j], 2000)
                return false
              }
              break
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
    .after-word
      margin-left: 10px


    .container
      margin-bottom: 40px
    .wechat-list
      border: 1px solid $color-line
      background: #F4F8F9
      color: #000035
      font-size: $font-size-14
      font-family: $font-family-regular
      margin-bottom: 20px
      .wechat-title
        border-bottom: 1px solid $color-line
        padding: 0 20px
        display: flex
        align-items: center
        height: 44px
        width: 580px
        .tag
          content: "*"
          color: #FF6F79

      .wechat
        display: flex
        align-items: center
        padding: 0 20px
        height: 60px
        width: 580px
        border-bottom: 1px solid $color-line
        &:last-child
          border-bottom: 0
        .delete
          width: 14px
          height: 14px
          display: inline-block
          margin-left: 10px
          background: url('./icon-delet_hover@2x.png')
          background-size: 100% 100%

      .left-item
        width: 120px




    .add-icon
      margin-left: 0
      margin-right: 4px
</style>
