<template>
  <div class="btn-box">
    <button class="base-button"
            :class="['base-button--'+type ,'base-button--'+ size,{disable:disable,'is-plain':plain}]"
            :style="buttonStyle"
            @click="$emit('click',$event)"
    >
      <slot></slot>
      <span v-if="addIcon" class="add-icon"></span>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_BUTTON'

  export default {
    name: COMPONENT_NAME,
    props: {
      addIcon: {
        type: [Boolean, String],
        default: false
      },
      size: {
        type: String,
        default: 'middle' // small middle big
      },
      type: {
        type: String,
        default: 'default', // primary default
        require: true
      },
      plain: {
        type: [Boolean, String],
        default: '', // 镂空
        require: false
      },
      disable: {
        type: [Boolean, String],
        default: false
      },
      buttonStyle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .btn-box
    display: inline-block

  .base-button
    display: flex
    text-align: center
    align-items: center
    justify-content: center
    cursor: pointer
    box-sizing: border-box
    height: 32px
    font-size: $font-size-14
    white-space: nowrap
    border-radius: 4px
    outline: none
    transition: .1s
    user-select: none
    padding: 0px 12px
    min-width: 80px
    line-height: 1
    &:hover .add-icon
      bg-image('./icon-addb')

  &.base-button--small
    height: 28px
    min-width: 50px

  &.base-button--middle
    height: 32px
    min-width: 80px

  &.base-button--big
    height: 42px
    min-width: 80px

  &.base-button--default
    border: 1px solid $color-btn-border
    background-color: $color-white
    color: $color-text-main

    &:hover
      border-color: $color-border-hover

  &.base-button--primary
    background: $color-main
    color: $color-white
    &:hover
      opacity: 0.8
  &.is-plain
    background: $color-white
    border: 1px solid $color-main
    color: $color-main

    &:hover
      color: $color-white
      background: $color-main
      border-color: $color-main

    &.disable
      cursor: not-allowed
      background: $color-disable
      border: 1px solid $color-border
      color: $color-text-disable



  &.disable
    cursor: not-allowed
    background: $color-disable
    border: 1px solid $color-border
    color: $color-text-disable
</style>
