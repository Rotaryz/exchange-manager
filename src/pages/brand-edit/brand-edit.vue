<template>
  <div class="goods-brand-edit child-router">
    <div class="edit-page-title">
      <img src="./icon-new_commodity@2x.png" class="edit-title-icon">
      <p class="edit-title-name">创作品牌</p>
    </div>
    <div class="wrap-container">
      <mobile-content></mobile-content>
      <div class="edit-right-box">
        <!--品牌首图 -->
        <base-form-item label="品牌首图"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <image-upload :data.sync="msg.brand_banner_images"
                        :addStyle="`margin:0 0 14px 0`"
                        multiple
                        @successImage="getBrandBannerImages"
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
          <image-upload :data.sync="msg.brand_banner_images"
                        :addStyle="`margin:0 0 14px 0`"
                        multiple
                        @successImage="getBrandBannerImages"
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
          <base-input v-model="msg.brand_name" size="middle"></base-input>
        </base-form-item>

        <!--品牌名称 -->
        <base-form-item label="品牌副标题"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-input v-model="msg.brand_subhead" size="middle" :maxlength="25"></base-input>
        </base-form-item>

        <!--品牌介绍 -->
        <base-form-item label="品牌介绍"
                        labelMarginRight="40"
                        labelWidth="68px"
                        labelAlign="right"
                        verticalAlign="top"
                        labelHeight="40px"
        >
          <base-input v-model="msg.introduce" size="middle" type="textarea" width="400" height="94"></base-input>
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
          brand_banner_images: []
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
    methods: {
      getBrandBannerImages(arr) {
        arr.forEach(item => {
          item = item.data
          this.msg.brand_banner_images.push({
            id: 0,
            image_url: item.url,
            image_id: item.id,
          })
        })
      },
      _selectTrade(item) {
        console.log(item)
        this.msg.trade = item.name
      },
      _showAddTrade() {
        this.tradeVisible = true
      },
      justifyAddTrade(done) {
        if (!this.trade) {
          this.$toast.show('请填写分类')
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

      },
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
        margin-left: 14px
        margin-top: 38px
      .add-trade
        margin-left: 14px
        line-height: 44px
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-main
        text-decoration: underline


</style>
