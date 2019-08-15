<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
        <div v-for="(cms, cmsIdx) in cmsList" :key="cmsIdx">
          <div v-if="cms.code === 'banner'" :class="{'touch': cmsType === 'banner'}" class="carousel hand" @click="changeType('banner')">
            <carousel height="127px" arrow="never" :interval="4000" indicatorPosition="none">
              <carousel-item v-for="(item, index) in bannerList" :key="index">
                <img :src="item.detail.image_url" class="carousel-image">
              </carousel-item>
            </carousel>
          </div>
          <!--商品分类-->
          <ul v-if="cms.code === 'goods_category' && cms.detail && cms.detail.length" class="goods-classify-wrapper">
            <template v-for="(item, index) in cms.detail">
              <li v-if="index < 10"
                  :key="item.id"
                  class="classify-item"
                  :class="{'next-row': index > 4}"
              >
                <img :src="item.image_url" alt="">
                <p>{{item.name}}</p>
              </li>
            </template>
          </ul>
          <!--热门-->
          <div v-if="cms.code === 'hot_goods'" class="hot-commodity hand" :class="{'touch': cmsType === 'hot'}" @click="changeType('hot')">
            <div class="hot-title">热门商品</div>
            <div class="scroll-wrapper">
              <div v-for="(item, index) in hotList" :key="index" class="hot-item">
                <img :src="item.detail.image_url" class="hot-good-img">
                <p class="hot-good-name">{{item.detail.title}}</p>
              </div>
            </div>
          </div>
          <!-- 推荐商品列表-->
          <div v-if="cms.code === 'recommend' && cms.children && cms.children.length" class="recommend">
            <div class="recommend-name">为你推荐</div>
            <div class="recommend-goods">
              <div v-for="(item, index) in cms.children" :key="index" class="goods-item">
                <img :src="item.goods_cover_image" class="goods-img">
                <p class="goods-name">{{item.name}}</p>
                <div class="goods-mag">
                  <div class="goods-tariff">
                    <div class="goods-price"><span class="goods-unit">¥</span>{{item.discount_price}}</div>
                    <img src="./pic-member@2x.png" alt="" class="goods-member">
                  </div>
                  <div class="original-price">¥${{item.price}}</div>
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

  export default {
    name: PAGE_NAME,
    components: {
      Carousel,
      CarouselItem
    },
    props: {
      cmsType: {
        type: String,
        default: 'banner'
      },
      bannerList: {
        type: Array,
        default: () => []
      },
      hotList: {
        type: Array,
        default: () => []
      },
      cmsList: {
        type: Array,
        default: () => []
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
    margin: 3.8% 76px 0 91px
    box-sizing: border-box
    display: flex
    justify-content: center
    .phone
      icon-image('pic-tel')
      width: 352.2px
      height: 752.93px
      position: relative
      .content-box
        padding: 0 2px
        box-sizing: border-box
        top: 111px
        left: 23px
        position: absolute
        width: 307px
        height: 525px
        overflow-x: hidden
        background: #f5f5f9
        &::-webkit-scrollbar
          width: 0

  .carousel
    border: 2px dashed #D9D9D9
    background: $color-background
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

  .hot-commodity
    height: 187px
    border: 2px dashed #D9D9D9
    margin-top: 10px
    padding: 0 0 20px 5px
    box-sizing: border-box
    background: $color-white
    margin-bottom: 20px
    .hot-title
      text-indent: 5px
      padding: 18px 0 15px
      color: #3F454B
      font-family: $font-family-medium
      font-size: $font-size-17
    .scroll-wrapper
      overflow-x: auto
      display: flex
      hide-scrollbar()
      .hot-item
        margin-right: 5px
        width: 28%
        .hot-good-img
          background: $color-background
          width: 83px
          height: @width
          min-height: @width
          min-width: @width
          border-radius: 3px
          display: block
          object-fit: cover
        .hot-good-name
          text-align: center
          font-size: $font-size-14
          color: #3F454B
          font-family: $font-family-medium
          margin-top: 16px
          no-wrap()

  // 商品分类
  .goods-classify-wrapper
    background: $color-white
    padding: 17.5px 9.4px 17.5px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    .classify-item
      width: 20%
      display: flex
      flex-direction column
      align-items: center
      overflow: hidden
      &.next-row
        padding-top: 9.6px
      img
        border-radius: 50%
        display inline-block
        width: 39.2px
        background: #ccc
        height: @width
        text-align: center
      p
        width: 100%
        box-sizing: border-box
        padding: 0 1px
        padding-top: 7.9px
        font-family: $font-family-regular
        font-size: 9.41px;
        color: #333333;
        text-align: center;
        line-height: 1
        no-wrap()

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
