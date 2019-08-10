<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">
        <div :class="{'touch': cmsType === 'banner'}" class="carousel" @click="changeType('banner')">
          <el-carousel height="127px" arrow="never" :interval="4000">
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="" class="carousel-image">
            </el-carousel-item>
          </el-carousel>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  const PAGE_NAME = 'mobile-content'

  export default {
    name: PAGE_NAME,
    props: {
      cmsType: {
        type: String,
        default: 'banner'
      }
    },
    data() {
      return {}
    },
    methods:{
      changeType(type){
        this.$emit('update:cmsType', type)
        this.$emit('changeType', type)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
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
</style>
