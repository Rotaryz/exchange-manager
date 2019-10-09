<template>
  <div class="course-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'分销员'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="分销员名称" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.name" :limit="20" placeholder="请输入分销员名称"></base-input>
      </base-form-item>
      <base-form-item label="帐号" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="msg.mobile" placeholder="请输入手机号" type="number"></base-input>
        <span class="after-word">使用该帐号可登陆客户端</span>
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
      TitleLine
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.id) {
        API.Salesman.salesmanDetail({
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
          mobile: '',
          role_type: 1
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
          this.msg.wechat_list,
          index,
          {
            id: 0,
            image_url: data.data.url,
            image_id: data.data.id,
          }
        )
      },
      addWechatItem() {
        if (this.msg.wechat_list.length > 2) return
        let arr = JSON.parse(JSON.stringify(this.msg.wechat_list))
        arr.push({image_url: ''})
        this.$set(this.msg, 'wechat_list', arr)
      },
      cancelBtn() {
        this.$router.back()
      },
      courseNew() {
        API.Salesman.salesmanNew({
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
        API.Salesman.salesmanEdit({
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
            toast: ['请输入分销员名称']
          },
          {
            target: 'mobile',
            type: ['length'],
            toast: ['请输入手机号']
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
      font-size: $font-size-14
      color: #C0C4D1

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
