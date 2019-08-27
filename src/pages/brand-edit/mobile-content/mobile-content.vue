<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
        <!--<img :src="brandMsg.banner_image_url" alt="" class="banner">-->
        <img src="https://exchange-platform-img.jkweixin.com/dev/2019/08/27/1566899184301-323167.png" alt="" class="banner">
        <div class="brand-detail">
          <div class="base-msg">
            <!--<img :src="logo_image_url" alt="" class="logo">-->
            <img src="https://exchange-platform-img.jkweixin.com/dev/2019/08/27/1566899184301-323167.png" alt="" class="logo">
            <div class="brand-names">
              <p class="brand-name">品牌</p>
              <p class="brand-sub-name">副标题</p>
            </div>
          </div>

          <div class="brand-describe">
            耳机水电费就开始大姐夫看来得及发了看时间了水电费啦介绍的了分开接受了看得见发禄口街道弗兰克斯的
          </div>
          <div class="has-more">
            <p class="text">更多品牌信息</p>
          </div>
        </div>

        <div class="goods-list">
          <div class="goods-item">
            <img src="https://exchange-platform-img.jkweixin.com/dev/2019/08/27/1566899184301-323167.png" alt="" class="goods-image">
            <div class="goods-msg">
              <p class="goods-name">产品名称</p>
              <div class="price-box">
                <p class="left-price">
                  <span class="text-image">
                    <img src="./icon-quan@2x.png" alt="" class="icon">
                    <span class="price">300</span>
                  </span>
                  <span class="text-image">
                    <img src="./icon-he@2x.png" alt="" class="icon">
                    <span class="price">200</span>
                  </span>
                </p>
                <div class="right-price">
                  <del class="del-price">¥480.00</del>
                </div>
              </div>
            </div>
          </div>
          <div class="goods-item">
            <img src="https://exchange-platform-img.jkweixin.com/dev/2019/08/27/1566899184301-323167.png" alt="" class="goods-image">
            <div class="goods-msg">
              <p class="goods-name">产品名称</p>
              <div class="price-box">
                <p class="left-price">
                  <span class="text-image">
                    <img src="./icon-quan@2x.png" alt="" class="icon">
                    <span class="price">300</span>
                  </span>
                  <span class="text-image">
                    <img src="./icon-he@2x.png" alt="" class="icon">
                    <span class="price">200</span>
                  </span>
                </p>
                <div class="right-price">
                  <del class="del-price">¥480.00</del>
                </div>
              </div>
            </div>
          </div>
          <div class="goods-item">
            <img src="https://exchange-platform-img.jkweixin.com/dev/2019/08/27/1566899184301-323167.png" alt="" class="goods-image">
            <div class="goods-msg">
              <p class="goods-name">产品名称</p>
              <div class="price-box">
                <p class="left-price">
                  <span class="text-image">
                    <img src="./icon-quan@2x.png" alt="" class="icon">
                    <span class="price">300</span>
                  </span>
                  <span class="text-image">
                    <img src="./icon-he@2x.png" alt="" class="icon">
                    <span class="price">200</span>
                  </span>
                </p>
                <div class="right-price">
                  <del class="del-price">¥480.00</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const PAGE_NAME = 'mobile-content'

  export default {
    name: PAGE_NAME,
    components: {
    },
    props: {
      brandMsg: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      changeType(type) {
        this.$emit('update:cmsType', type)
        this.$emit('changeType', type)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  img
    object-fit: cover

  // 结构布局
  .mobile-content
    float: left
    margin: 32px 76px 0 91px
    box-sizing: border-box
    display: flex
    justify-content: center
    .phone
      icon-image('pic-tel')
      width: 300px
      height: 641.33px
      position: relative
      .content-box
        box-sizing: border-box
        top: 95px
        left: 19px
        position: absolute
        width: 262px
        height: 448.04px
        overflow-x: hidden
        background: #f5f5f9
        &::-webkit-scrollbar
          width: 0



  .banner
    height: 97.8px
    width: 100%
    object-fit: cover
  .brand-detail
    border-top-left-radius: 2px
    border-top-right-radius: 2px
    padding: 0 11.3px 14px
    background: $color-white
    font-family: $font-family-regular
    .logo
      width: 41.9px
      height: 41.9px
      border-radius: 1.4px
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0,.1)
      background: #FFF
      margin-top: -7px
    .base-msg
      display: flex
      align-items: center
    .brand-names
      display: inline-block
      padding-left: 7px
    .brand-name
      font-size: 11.18px
      color: #3f454b
      font-family: $font-family-medium
    .brand-sub-name
      font-size: 8.38px
      color: #818d99
      opacity: 0.8
      margin-top: 3.7px
    .brand-describe
      margin-top: 10.5px
      line-height: 1.2
      font-size: 9.78px
      color: #3f454b
      height: 28px
      overflow: hidden
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    .has-more
      border-top: 1px solid #DFEEF5
      margin-top: 10px
      position: relative
      .text
        width: 94px
        margin: 0 auto
        background: $color-white
        font-size: 8.38px
        text-align: center
        color: #818D99
        position: absolute
        all-center()
        &:after
          content: ""
          width: 9px
          height: 8.1px
          background: url("./icon-arrow_open@2x.png")
          background-size: 100% 100%
          display: inline-block
          margin-left: 1.4px


  .goods-list
    padding: 0 6px 6px
    background: $color-background
    .goods-item
      width: 121.6px
      height: 197px
      background: $color-white
      display: inline-block
      margin-right: 6px
      margin-top: 7px
      &:nth-child(2n)
        margin-right: 0
    .goods-image
      width: 121.6px
      height: 121.6px
    .goods-msg
      padding: 0 7px
    .goods-name
      font-size: 9.78px
      color: #3F454B
      margin-top: 4px
      line-height: 1.2
      overflow: hidden
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    .price-box
      display: flex
      padding-top: 4px
      justify-content: space-between
      .text-image
        display: flex
        align-items: center
        margin-top: 3.5px
      .icon
        width: 17.5px
        height: 9.8px
        margin-right: 3.4px
      .price
        font-size: 11.18px
        color: #D83F35
        font-family: $font-family-din-bold
      .right-price
        display: flex
        flex-direction: column
        justify-content: flex-end
      .del-price
        font-size: 7.69px
        color: #606972
  .bottom
    padding-bottom: 2px

</style>
