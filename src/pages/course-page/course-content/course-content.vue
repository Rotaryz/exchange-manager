<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
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
    },
    data() {
      return {
        $imageUrl: ''
      }
    },
    created() {
      this.$imageUrl = process.env.VUE_APP_IMAGE
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
</style>
