<template>
  <div class="title-line">
    <div class="title">{{title}}</div>
    <div class="line">
      <div class="short-line"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'DEFAULT_MODAL'

  export default {
    name: COMPONENT_NAME,
    props: {
      lineColor: {
        type: String,
        default: ''
      },
      lineWidth: {
        type: String,
        default: ''
      },
      title:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $menu-width = 200px
  @import "~@design"
  .title-line
    background-color $color-white
    padding: 0px 20px
  .line
    height:16px
    border-bottom-1px($color-border)
    .short-line
      position:absolute
      left:0
      bottom:0
      border-bottom 2px solid $color-main
      border-radius 1px
      width:34px

</style>
