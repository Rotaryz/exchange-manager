<template>
  <button class="base-button"
          :class="['base-button--'+type ,'base-button--'+ size,{disable:disable,'is-plain':plain}]"
  >
    <slot></slot>
    <span v-if="addIcon" class="is-add"></span>
  </button>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_BUTTON'

  export default {
    name: COMPONENT_NAME,
    props: {
      addIcon: {
        type:[Boolean,String],
        default: false,
      },
      size: {
        type:String,
        default: '', // small middle big
        require: true
      },
      type: {
        type:String,
        default: 'default', // primary default
        require: true
      },
      plain: {
        type:[Boolean,String],
        default: '', // 镂空
        require: false
      },
      disable:{
        type:[Boolean,String],
        default: false,
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-button
    display: inline
    cursor: pointer
    box-sizing: border-box
    height: 32px
    line-height 32px
    font-size: $font-size-14
    white-space: nowrap
    text-align: center
    border-radius: 4px
    outline: none
    transition: .1s
    user-select: none
    padding: 0px 12px
    min-width:80px
    .is-add
      display:inline-block
      position: relative
      width: 8px
      height: 8px
      margin-left:3px
      &.is-add:before
      &.is-add:after
        content: ''
        position: absolute
        background: $color-main
        transition: all 0.3s
        top: 50%
        transform translateY(-50%)
      &.is-add:before
        right:0
        width: 8px
        height: 2px
      &.is-add:after
        right:3px
        width: 2px
        height: 8px
  &.base-button--small
      height: 28px
      line-height 28px
      min-width:50px
    &.base-button--middle
      height: 32px
      line-height 32px
      min-width:80px
    &.base-button--big
      height: 42px
      line-height 42px
      min-width:80px
    &.base-button--default
      border: 1px solid $color-btn-border
      background-color $color-white
      color: $color-text-main
      &:hover
        color: $color-text-sub
        border-color: $color-text-sub

    &.base-button--primary
      background: $color-main
      color: $color-white
    &.is-plain
      background:$color-white
      border: 1px solid $color-main
      color: $color-main
      &:hover
        color: $color-white
        background:$color-main
        border-color: $color-main
      &.disable
        cursor: not-allowed
        background:$color-disable
        border: 1px solid $color-border
        color:  $color-text-disable
    &:hover
      opacity: 0.8

    &.disable
      cursor: not-allowed
      background:$color-disable
      border: 1px solid $color-border
      color:  $color-text-disable
</style>
