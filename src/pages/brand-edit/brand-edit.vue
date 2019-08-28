<template>
  <div class="goods-brand-edit child-router">
    <div class="edit-page-title">
      <img src="./icon-new_commodity@2x.png" class="edit-title-icon">
      <p class="edit-title-name">创作品牌</p>
    </div>
    <div class="wrap-container">
      <mobile-content :brandMsg="msg"></mobile-content>
      <div class="edit-right-box">
        <!--品牌首图 -->
        <base-form-item label="品牌首图"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <image-upload :data.sync="msg.banner_image_url"
                        :addStyle="`margin-right: 20px`"
                        @successImage="addBannerImages"
                        @delete="delBannerImage"
                        @failFile="failFile"
          ></image-upload>
          <p class="tip-text">请添加不大于10M的清晰图片</p>
        </base-form-item>

        <!--品牌Logo -->
        <base-form-item label="品牌Logo"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <image-upload :data.sync="msg.logo_image_url"
                        :addStyle="`margin-right: 20px`"
                        @successImage="addLogoImages"
                        @delete="delLogoImage"
                        @failFile="failFile"
          ></image-upload>
          <p class="tip-text">请添加不大于10M的清晰图片</p>
        </base-form-item>

        <!--所属行业 -->
        <base-form-item label="所属行业"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-drop-down :width="400" :height="44" :select="tradeList" @setValue="_selectTrade"></base-drop-down>
          <p class="add-trade hand" @click="_showAddTrade">添加行业</p>
        </base-form-item>

        <!--品牌名称 -->
        <base-form-item label="品牌名称"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-input v-model="msg.name" size="middle"></base-input>
        </base-form-item>

        <!--品牌副标题 -->
        <base-form-item label="品牌副标题"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-input v-model="msg.sub_name" size="middle" :maxlength="25"></base-input>
        </base-form-item>

        <!--品牌介绍 -->
        <base-form-item label="品牌介绍"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-input v-model="msg.describe" size="middle" type="textarea" width="400" height="94"></base-input>
        </base-form-item>
      </div>
    </div>


    <base-modal :visible.sync="tradeVisible" title="添加行业" :submitBefore="justifyAddTrade" @submit="_addTrade">
      <base-input v-model="trade" placeholder="长度不能超过4个字" limit="4" width="100%" height="100%"></base-input>
    </base-modal>

    <base-footer :isSeize="false">
      <base-button plain @click="back">返回</base-button>
      <base-button type="primary" @click="submitBtn">确定</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import MobileContent from './mobile-content/mobile-content'
  import ImageUpload from '../../components/zb-upload/zb-upload.vue'
  import API from '@api'

  const PAGE_NAME = 'GOODS_BRAND_EDIT'
  const TITLE = '新建品牌'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      MobileContent,
      ImageUpload
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    data() {
      return {
        msg: {
          banner_image_url: '',
          logo_image_url: ''
        },
        tradeVisible: false,
        trade: '',
        tradeList: {
          check: false,
          show: false,
          content: '全部',
          type: 'default',
          data: [{name: '服装', id: '1'}, {name: '鞋子', id: '2'}] // 格式：{name: '55'}
        }
      }
    },
    computed: {
      testBanner() {
        return this.msg.banner_image_url
      },
      testLogo() {
        return this.msg.logo_image_url
      },
      testTrade() {
        return this.msg.industry_id
      },
      testName() {
        return this.msg.name
      },
      testSubName() {
        return this.msg.sub_name
      },
      testDescribe() {
        return this.msg.describe
      }
    },
    created() {
      this.getTradeList()
    },
    methods: {
      getTradeList() {
        API.Brand.getTradeList()
          .then(res => {
            this.tradeList.data = res.data
          })
      },
      addBannerImages(image) {
        this.msg.banner_image_id = image.data.id
        this.msg.banner_image_url = image.data.url
      },
      addLogoImages(logo) {
        this.msg.logo_image_id = logo.data.id
        this.msg.logo_image_url = logo.data.url
      },
      failFile(msg) {
        this.$toast.show(msg)
      },
      delBannerImage(index) {
        this.msg.banner_image_id = ''
        this.msg.banner_image_url = ''
      },
      delLogoImage(index) {
        this.msg.logo_image_id = ''
        this.msg.logo_image_url = ''
      },
      _selectTrade(item) {
        this.msg.industry_name = item.name
        this.msg.industry_id = item.id
      },
      _showAddTrade() {
        this.tradeVisible = true
      },
      justifyAddTrade(done) {
        if (!this.trade) {
          this.$toast.show('请填写行业')
        } else {
          done()
        }
      },
      _addTrade() {
        this.msg.trade = this.trade
        setTimeout(() => {
          this.trade = ''
        }, 300)
      },
      back() {
        this.$router.back()
      },
      submitBtn() {
        let checkForm = this.checkForm()
        if (!checkForm) return
        API.Brand.newBrand({data: this.msg})
          .then(res => {
            this.$toast.show('创建成功')
            setTimeout(() => {
              this.$router.back()
            }, 300)
          })
      },
      checkForm() {
        let arr = [
          {value: this.testBanner, txt: '请添加品牌首图'},
          {value: this.testLogo, txt: '请添加品牌Logo'},
          {value: this.testTrade, txt: '请选择所属行业'},
          {value: this.testName, txt: '请输入品牌名称'},
          {value: this.testSubName, txt: '请输入品牌副标题'},
          {value: this.testDescribe, txt: '请输入品牌介绍'},
        ]
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .goods-brand-edit
    overflow: hidden
    border: 0.5px solid $color-line
    border-radius: 4px
    background: $color-white
    width: 100%
    max-height: 100%
    box-sizing: border-box

    .edit-page-title
      height: 48px
      display: flex
      align-items: center
      padding-left: 20px
      .edit-title-icon
        width: 14px
        height: 14px
      .edit-title-name
        font-size: 16px
        color: $color-text-main
        font-family: $font-family-regular
        margin-left: 4px
    .wrap-container
      display: flex
      font-family: $font-family-regular
      padding-right: 20px
    .edit-right-box
      padding-top: 60px
      flex: 1
      .tip-text
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-text-sub
        margin-top: 38px
      .add-trade
        margin-left: 14px
        line-height: 44px
        width: 58px
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-main
        text-decoration: underline


</style>
