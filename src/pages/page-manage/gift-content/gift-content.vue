<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
        <!--<div class="menu">
          <span @click="changeType('banner')">banner</span>
          <span @click="changeType('navigation')">导航类目</span>
          <span @click="changeType('hot')">今日爆款</span>
          <span @click="changeType('recommend')">商品推荐</span>
        </div>-->
        <div v-for="(cms, cmsIdx) in cmsList" :key="cmsIdx">
          <div v-if="cms.code === 'banner'" class="banner-bg"></div>
          <div v-if="cms.code === 'banner'" class="banner hand" :class="{'touch': cmsType === 'banner'}" @click="changeType('banner')">
            <!--banner-->
            <div class="carousel">
              <carousel height="127px" arrow="never" :interval="4000" indicatorPosition="none">
                <carousel-item v-for="(item, index) in bannerList" :key="index">
                  <img :src="item.detail.image_url" class="carousel-image">
                </carousel-item>
              </carousel>
            </div>
          </div>
          <!--导航-->
          <div v-if="cms.code === 'navigation'" class="nav-box">
            <div class="nav hand" :class="{'touch': cmsType === 'navigation'}" @click="changeType('navigation')">
              <div v-for="(item, index) in navigationList" :key="index" class="nav-item">
                <img v-if="item.detail.image_url" :src="item.detail.image_url" alt="" class="nav-image">
                <div v-else class="nav-image"></div>
                <span class="nav-name">{{item.detail.title.slice(0, 4)}}</span>
              </div>
            </div>
          </div>
          <!--今日爆款-->
          <div v-if="cms.code === 'hot_goods'" class="hot-commodity hand" :class="{'touch': cmsType === 'hot'}" @click="changeType('hot')">
            <!--<img src="./pic-dhzq_banner@2x.png" alt="" class="hot-bg">-->
            <img :src="$imageUrl + '/exchange/pic-hot_banner.png'" alt="" class="hot-bg">
            <div class="hot-title">
              今日爆款
              <span class="text">优选国内2%精品品牌</span>
            </div>
            <div class="scroll-wrapper">
              <div v-for="(item, index) in hotList" :key="index" class="hot-item">
                <img :src="item.detail.image_url" class="hot-good-img">
                <p class="hot-good-name">{{item.detail.title}}</p>
                <p class="hot-price">¥{{item.detail.sale_price || 0}}</p>
              </div>
            </div>
          </div>
          <!-- 推荐商品列表-->
          <div v-if="cms.code === 'recommend'" class="hot-commodity hand" :class="{'touch': cmsType === 'recommend'}" @click="changeType('recommend')">
            <!--<img src="./pic-dhzq_banner2@2x.png" alt="" class="hot-bg">-->
            <img :src="$imageUrl + '/exchange/pic-re_banner.png'" alt="" class="hot-bg">
            <div class="hot-title">
              精选推荐
              <span class="text">优选国内2%优品</span>
            </div>
            <div class="scroll-wrapper">
              <div v-for="(item, index) in recommendList" :key="index" class="hot-item">
                <img :src="item.detail.image_url" class="hot-good-img">
                <p class="hot-good-name">{{item.detail.title}}</p>
                <p class="hot-price">¥{{item.detail.sale_price || 0}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Carousel, CarouselItem} from 'element-ui'
  const PAGE_NAME = 'mobile-content'

  export default {
    name: PAGE_NAME,
    components: {
      Carousel,
      CarouselItem
    },
    props: {
      cmsList: {
        type: Array,
        default: () => {}
      },
      cmsType: {
        type: String,
        default: 'navigation'
      },
      bannerList: {
        type: Array,
        default: () => []
      },
      navigationList: {
        type: Array,
        default: () => []
      },
      hotList: {
        type: Array,
        default: () => []
      },
      recommendList: {
        type: Array,
        default: () => []
      },
      industryRecommendList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        $imageUrl: ''
      }
    },
    created() {
      this.$imageUrl = process.env.VUE_APP_IMAGE
      // console.log(this.hotList, this.recommendList, this.industryRecommendList)
    },
    methods: {
      changeType(type) {
        this.$emit('update:cmsType', type)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  img
    object-fit: cover
  .menu
    position: absolute
    left: 0
    top: 0
    z-index: 2
    color: #333
    background: #FFF
  // 结构布局
  .mobile-content
    float: left
    margin: 3.8% 76px 0 91px
    box-sizing: border-box
    display: flex
    justify-content: center
    .phone
      icon-image('pic-tel')
      width: 300px
      height: 641px
      position: relative
      .content-box
        box-sizing: border-box
        top: 95px
        left: 19px
        position: absolute
        width: 262px
        height: 446px
        overflow-x: hidden
        background: #FFF
        &::-webkit-scrollbar
          width: 0
  .banner
    margin-top: 10px
    position: relative
    border: 2px dashed #D9D9D9
  .banner-bg
    width: 100%
    height: 84px
    background: url("pic-bg_gift@2x.png")
    background-size: 100% 100%
    position: absolute
    left: 0
    top: 0
  .carousel
    width: 241px
    height: 118.8px
    border-radius: 6px
    margin: 0 auto
    background: $color-background
    overflow: hidden
    .carousel-image
      width: 100%
      height: 100%
      overflow: hidden
      object-fit: cover

  // 选中
  .touch
    overflow: hidden
    position: relative
    border: 2px solid #4C84FF !important
  .nav-box
    background: $color-white

  .nav
    width: 100%
    height: 62px
    display: flex
    padding: 2px 7px
    margin: 6.5px 0 10px 0
    border: 2px dashed #D9D9D9
    .nav-item
      height: 56px
      width: 50px
      margin-right: 0
      text-align: center
      &:last-child
        margin-right: 0
    .nav-image
      display: block
      width: 34.9px
      height: 34.9px
      border-radius: 50%
      object-fit: cover
      margin: 0 auto
      margin-bottom: 4px

    .nav-name
      font-size: 8.38px
      color: #1D2023
      font-family: $font-family-regular
      transform: scale(0.8)
      display: block
      width: 50px
  .hot-commodity
    height: 210px
    border: 2px dashed #D9D9D9
    padding-bottom: 20px
    box-sizing: border-box
    background: $color-white
    margin-bottom: 5px
    overflow: hidden
    .hot-bg
      width: 100%
      height: 108px
      object-fit: cover
    .hot-title
      margin-top: -80px
      padding: 0 0 9.8px 10px
      color: #FFF
      font-family: $font-family-medium
      font-size: 13.97px
      .text
        display: block
        font-size: 8.38px
        font-family: $font-family-regular
        opacity: 0.8
        margin-top: 5px
    .scroll-wrapper
      overflow-x: auto
      display: flex
      hide-scrollbar()
      border-radius: 1.4px
      margin-left: 10px
      box-shadow: 0 2px 4px 1px rgba(0,0,0,0.1)
      background: #FFF
      margin-top: 20px
      position: relative
      .hot-item
        width: 67px
        border-right: 1px solid $color-line
        .hot-good-img
          background: $color-white
          width: 66px
          height: @width
          min-height: @width
          min-width: @width
          border-radius: 2px
          display: block
          object-fit: cover
          border-bottom: 1px solid $color-line
        .hot-good-name
          font-size: 8.38px
          color: #3F454B
          font-family: $font-family-regular
          margin-top: 2.5px
          line-height: 1.2
          padding: 0 3px
          height: 28px
          display: -webkit-box
          overflow: hidden
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .hot-price
          color: #D83F35
          font-family: $font-family-medium
          font-size: 8.38px
          padding: 4px 3px
  .recommend
    padding: 0 8px
    box-sizing: border-box
    .recommend-name
      margin-bottom: 13px
      font-family: $font-family-medium
      color: $color-text-main
      font-size: $font-size-17
    .recommend-goods
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      .goods-item
        overflow: hidden
        position: relative
        border-radius: 4px
        padding-bottom: 10px
        width: 140px
        box-sizing: border-box
        margin-bottom: 7px
        background: $color-white
        .goods-img
          height: 140px
          width: 100%
          object-fit: cover
          background: $image-color
        .goods-name
          line-height: 20px
          margin-bottom: 12px
          padding: 0 10px
          margin-top: 7px
          font-size: $font-size-14
          color: $color-text-main
          font-family: $font-family-medium
          no-wrap-plus()
          word-break: break-all

        .goods-tariff
          display: flex
          padding: 0 10px
          align-items: flex-end
          line-height: 1
          .goods-price
            font-size: $font-size-20
            color: $color-text-main
            font-family: $font-family-bold
            .goods-unit
              font-size: $font-size-12
          .goods-member
            transform: translateY(-1px)
            margin-left: 1.4px
            height: 12px
            width: 33.5px

        .original-price
          padding: 0 10px
          text-decoration: line-through
          color: rgba(96, 105, 114, .6)
          font-size: $font-size-11
          margin-top: 7px
        .cart-icon
          extend-click(-10px)
          width: 25px
          height: 25px
          position: absolute
          right: 11px
          bottom: 11px
</style>
