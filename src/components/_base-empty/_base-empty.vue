<template>
  <div class="empty">
    <div class="container">
      <img v-if="image" :src="image" :style="{width:imgWidth + 'px',height:imgWidth + 'px', 'padding-top': paddingTop +'px'}" class="no-cont-icon">
      <div v-if="title" class="title">{{title}}</div>
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'EMPTY',
    props: {
      // 标题
      title: {
        type: String,
        default: '暂无数据'
      },
      imgWidth: {
        type: Number,
        default: null
      },
      image: {
        type: String,
        default: require('./icon-pull@2x.png')
      },
      paddingTop: {
        type: Number,
        default: 0
      },
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .empty
    width: 100%
    height: 100%
    text-align: center
    display: flex
    flex-direction column
    align-items center
    box-sizing: border-box
    justify-content center

    .container
      display: flex
      flex-direction column
      justify-content center
      align-items: center

    .no-cont-icon
      width: 168px
      height: 95px
      margin-bottom: 14px

    .title
      color: #4E5983
      font-size: $font-size-14

</style>
