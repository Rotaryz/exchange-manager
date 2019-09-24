<template>
  <div class="course-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'课程'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="课程名称" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="msg.name"></base-input>
        <!--<base-input v-model="msg.name" :maxlength="20" :limit="20"></base-input>-->
      </base-form-item>
      <base-form-item label="课程描述"
                      :required="false"
                      labelMarginRight="40"
                      labelWidth="78px"
                      labelAlign="right"
                      verticalAlign="top"
      >
        <base-input v-model="msg.describe" limit="50" type="textarea" placeholder="输入商品描述"></base-input>
      </base-form-item>

      <!--上传封面图-->
      <base-form-item label="封面图"
                      labelMarginRight="40"
                      labelWidth="78px"
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
                      labelWidth="78px"
                      labelAlign="right"
                      verticalAlign="top"
                      labelHeight="40px"
      >
        <upload :data.sync="msg.video"
                type="video"
                :addStyle="`margin:0 0 14px 0`"
                multiple
                firstTag="视频"
                tip="建议上传"
                :limit="2"
                @successImage="addVideo"
        ></upload>
      </base-form-item>

      <!--上传详情图-->
      <base-form-item label="商品详情图"
                      labelMarginRight="40"
                      labelWidth="78px"
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

      <base-form-item label="关联微信号" labelMarginRight="40" labelWidth="78px" labelAlign="right">
        <base-input v-model="msg.wechat"></base-input>
      </base-form-item>
    </div>
    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="submitBtn">保存</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import TitleLine from "../../components/title-line/title-line"
  import Upload from '../../components/zb-upload/zb-upload.vue'
  // import {objDeepCopy} from '@utils/common'

  // import API from '@api'
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
      next()
      // if (to.query.id) {
      //   API.Goods.getGoodsDetail({
      //     data: {id: to.query.id},
      //   }).then(res => {
      //     next(vw => {
      //       vw.setData(res)
      //     })
      //   })
      // } else {
      //   next()
      // }
    },
    data() {
      return {
        msg: {
          name: '',
          describe: '',
          wechat: '',
          banner_images: [],
          video: [],
          detail_images: []
        },
        id: false
      }
    },
    methods: {
      addBanner(data) {
        this.msg.banner_images = data.map(item => {
          return {
            id: item.data.id,
            image_url: item.data.url
          }
        })
        console.log(data)
      },
      addVideo(data) {
        this.msg.video = data.map(item => {
          return {
            id: item.data.id,
            image_url: item.data.url
          }
        })
        console.log(data)
      },
      addDetail(data) {
        this.msg.detail_images = data.map(item => {
          return {
            id: item.data.id,
            image_url: item.data.url
          }
        })
        console.log(data)
      },
      cancelBtn() {
        this.$router.back()
      },
      submitBtn() {

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
