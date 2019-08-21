<template>
  <div class="top-data-bar">
    <div v-for="(item, index) in topData" :key="index" class="data-item">
      <img v-if="item.img" :src="item.img" class="item-img">
      <div class="data-con">
        <div class="title">{{item.title}}</div>
        <div class="value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  const PAGE_NAME = 'TOP_DATA_BAR'

  export default {
    name: PAGE_NAME,
    props: {
      topData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .top-data-bar
    box-sizing: border-box
    width: 100%
    height: 120px
    padding: 0 30px
    margin-bottom: 20px
    background: #ffffff
    layout(row)
    align-items: center
    border: 0.5px solid $color-line
    border-radius: 4px
    .data-item
      layout(row)
      align-items: center
      margin-right: 30px
      .item-img
        width: 58px
        height: @width
        margin-right: 20px
      .data-con
        line-height: 1
        layout()
        align-items: center
        .title
          width: 100%
          margin-bottom: 10px
          font-family: $font-family-regular
          font-size: 14px
          color: $color-text-main
        .value
          width: 100%
          font-family: $font-family-din-bold
          font-size: 32px
          color: $color-text-main
  .a
    display: none
</style>
