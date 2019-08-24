<template>
  <div class="goods-brand-edit child-router">
    <mobile-content></mobile-content>
    <base-footer :isSeize="false">
      <base-button plain @click="back">返回</base-button>
      <base-button type="primary" @click="submitBtn">确定</base-button>
    </base-footer>
    <div class="edit-modular">
      <div class="box">
        <div class="small">
          <div class="banner">
            <div class="content-header">
              <div class="content-title">轮播图设置</div>
              <div class="content-sub">(最多添加5个广告，鼠标拖拽调整广告顺序)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MobileContent from './mobile-content/mobile-content'

  const PAGE_NAME = 'GOODS_BRAND_EDIT'
  const TITLE = '新建品牌'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      MobileContent
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    data() {
      return {

      }
    },
    methods: {
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

    .edit-modular
      height: 100%
      max-height: 100%
      box-sizing: border-box
      overflow-y: hidden
      position: relative
      .box
        top: 0
        left: 0
        bottom: 0px
        width: 100%
        overflow-x: hidden
        position: absolute
        padding: 81px 20px 60px 0
        box-sizing: border-box
        &::-webkit-scrollbar
          width: 4px
          height: 4px
          opacity: 0
          transition: all 0.2s
        &::-webkit-scrollbar-thumb
          background-color: rgba(0, 0, 0, .05)
          border-radius: 10px
        &::-webkit-scrollbar-thumb:hover
          background-color: rgba(0, 0, 0, .1)
        &::-webkit-scrollbar-track
          box-shadow: inset 0 0 6px rgba(0, 0, 0, .05)
          border-radius: 10px
      .content-header
        border-bottom-1px($color-line)
        display: flex
        align-items: center
        position: relative
        box-sizing: border-box
        padding-bottom: 16px
        line-height: 1
        .excel
          margin-left: 20px
          &:hover
            color: $color-white
        &:before
          content: ''
          position: absolute
          width: 3px
          height: 16px
          background: $color-main
          border-radius: 2px
          top: 0
          left: 0
        .content-title
          text-indent: 13.5px
          color: $color-text-main
          font-family: $font-family-regular
          font-size: $font-size-16
        .content-sub
          margin-left: 10px
          color: #868DAA
          font-family: $font-family-regular
          font-size: $font-size-12


</style>
