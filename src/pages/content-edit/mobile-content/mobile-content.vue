<template>
  <div class="mobile-content">
    <div class="phone">
      <div class="content-box">

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



  // 选中
  .touch
    overflow: hidden
    position: relative
    border: 2px solid #4C84FF !important




</style>
