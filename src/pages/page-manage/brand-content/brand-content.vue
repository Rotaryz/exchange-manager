<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
        <!--<span @click="changeType('banner')">文章</span>
        <span @click="changeType('brand')">品牌</span>-->
        <div v-for="(cms, cmsIdx) in cmsList" :key="cmsIdx">
          <div v-if="cms.code === 'banner'" class="banner-bg"></div>
          <!--banner-->
          <div v-if="cms.code === 'banner'" :class="{'touch': cmsType === 'banner'}" class="banner" @click="changeType('banner')">
            <div class="carousel hand">
              <carousel height="127px" arrow="never" :interval="4000" class="carousel-box" indicatorPosition="none">
                <carousel-item v-for="(item, index) in bannerList" :key="index">
                  <img :src="item.detail.image_url" class="carousel-image">
                </carousel-item>
              </carousel>
            </div>
          </div>
          <div v-if="cms.code === 'banner'" class="brand-sign">
            <p v-for="(item, index) in sign" :key="index" class="sign">
              <span class="icon"></span>
              <span class="text">{{item}}</span>
            </p>
          </div>
          <!--品牌列表-->
          <div v-if="cms.code === 'brand_list'" class="brand-commodity hand" :class="{'touch': cmsType === 'brand'}" @click="changeType('brand')">
            <div v-for="(brand, ind) in cms.children" :key="ind" class="brand-item">
              <img :src="brand.detail.image_url" alt="" class="brand-image">
              <div class="brand-title">
                <img :src="brand.detail.brand && brand.detail.brand.logo_image_url" alt="" class="brand-logo">
                <div class="title">
                  <p class="name">{{brand.detail.brand && brand.detail.brand.name}}</p>
                  <p class="sub-name">{{brand.detail.brand && brand.detail.brand.sub_name}}</p>
                </div>
              </div>
              <div class="scroll-wrapper">
                <div v-for="(item, index) in brand.detail.goodsList" :key="index" class="goods-item">
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
  </div>
</template>

<script>
  import {Carousel, CarouselItem} from 'element-ui'

  const PAGE_NAME = 'mobile-content'
  const SIGN = ['正品溯源', '品质好货大折扣', '会员专享']
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
        default: 'banner'
      },
      bannerList: {
        type: Array,
        default: () => []
      },
      brandList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        sign: SIGN
      }
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
        background: #f5f5f9
        &::-webkit-scrollbar
          width: 0

  .banner-bg
    width: 100%
    height: 84px
    background: url("pic-bg_brand@2x.png")
    background-size: 100% 100%
    position: absolute
    left: 0
    top: 0
  .banner
    border: 2px dashed #D9D9D9
    overflow: hidden
  .carousel
    width: 228.8px
    height: 135px
    border-radius: 6px
    margin: 10px auto 0
    .carousel-image
      width: 100%
      height: 100%
      overflow: hidden
      object-fit: cover
    .carousel-box
      overflow-x: inherit
      .el-carousel__item
        margin: 0 5px

  // 选中
  .touch
    position: relative
    border: 2px solid #4C84FF !important

  .brand-sign
    height: 15px
    display: flex
    align-items: center
    padding: 0 8px
    margin-top: 10px
    .sign
      display: flex
      align-items: center
      margin-right: 10px
    .icon
      width: 10px
      height: 10px
      margin-right: 2px
      icon-image('icon-right_ensure')
    .text
      font-size: 8.38px
      font-family: $font-family-regular
      color: #818D99

  .brand-commodity
    border: 2px dashed #D9D9D9
    margin-top: 10px
    box-sizing: border-box
    background: $color-white
    margin-bottom: 20px
    min-height: 99px
    overflow: hidden
    .brand-title
      display: flex
      align-items: center
      margin-top: -40px
      margin-left: 10px
      margin-bottom: 20px
    .brand-logo
      width: 27.9px
      height: 27.9px
      border-radius: 2.1px
      margin-right: 6.3px
    .title
      height: 27.9px
      color: #FFF
      .name
        font-size: 9.78px
        font-family: $font-family-medium
      .sub-name
        font-family: $font-family-regular
        font-size: 8.38px
        width: 158px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        margin-top: 2px

    .brand-item
      border-radius: 2px
      box-shadow: 0 1px 4px 1px rgba(0,0,0,0.08)
      margin-bottom: 10px
    .brand-image
      height: 88px
      width: 100%
      object-fit: cover
    .scroll-wrapper
      overflow-x: auto
      display: flex
      hide-scrollbar()
      .goods-item
        width: 67px
        border-right: 1px solid $color-line
        padding-bottom: 6px
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
          margin-top: 4.9px
          color: #D83F35
          font-family: $font-family-medium
          font-size: 8.38px
          padding: 0 3px


</style>
