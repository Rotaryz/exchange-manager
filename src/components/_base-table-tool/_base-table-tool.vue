<template>
  <div class="base-table-tool" :class="{'base-table-tool-border': isBorder}">
    <div class="title-wrap">
      <img v-if="iconUrl" :src="iconUrl" class="title-icon">
      <p v-if="title" class="title-name">{{title}}</p>
      <slot name="left"></slot>
    </div>
    <div v-if="$slots.center" class="center-left">
      <slot name="center"></slot>
    </div>
    <div class="function-btn">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_TABLE_TOOL'

  export default {
    name: COMPONENT_NAME,
    props: {
      iconUrl: {
        default: '',
        type: String
      },
      title: {
        default: '列表',
        type: String
      },
      isBorder: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-table-tool-border
    border: 0.5px solid $color-line
    border-bottom: transparent

  .base-table-tool
    width: 100%
    background: $color-white
    height: 72px
    display: flex
    align-items: center
    justify-content: space-between
    box-sizing: border-box
    padding: 0 20px
    flex-shrink 0
    border-top-right-radius: 4px
    border-top-left-radius: 4px
    .title-wrap
      display: flex
      align-items: center
      .title-icon
        width: 14px
        height: 14px
        margin-right: 6px
      .title-name
        line-height: 1
        white-space: nowrap
        font-size: $font-size-16
        font-family: $font-family-regular
        color: $color-text-main

    .function-btn
      display: flex
</style>
