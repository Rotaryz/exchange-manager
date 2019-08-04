<template>
  <div class="base-input" :class="[{'has-clear':clear},inputSize ? 'zb-input--' + inputSize : '']">
    <span v-if="clear && value !=='' " class="clear-wrap" @click="clearBtn">
      <i class="clear-icon"></i>
    </span>
    <!-- 'zb-input--prefix': $slots.prefix,
              'zb-input--suffix': $slots.suffix|| clearable,-->
    <!-- eslint-disable  -->
    <input v-if="type==='input'"
           :value="value"
           :class="['zb-input','input__inner',{'is-disabled': inputDisabled}]"
           :style="inputStyle"
           :placeholder="placeholder"
           :type="inputType"
           :maxlength="maxLength"
           @focus="active = true"
           @blur="active = false"
           @input="inputEvent"
    >
    <textarea v-if="type==='textarea'"
              :value="value"
              :class="['zb-textarea','input__inner',{'is-disabled': inputDisabled}]"
              :style="inputStyle"
              :placeholder="placeholder"
              @focus="active = true"
              @blur="active = false"
              @input="inputEvent"
    ></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_INPUT'

  export default {
    name: COMPONENT_NAME,
    props: {
      clear: {
        default: false,
        type: [Boolean, String]
      },
      inputType: {
        default: 'text',
        type: String
      },
      type: {
        default: 'input',
        type: String
      },
      inputStyle: {
        default: '',
        type: [Object, String]
      },
      inputSize: {
        default: 'middle', // big middle small mini
        type: String
      },
      inputDisabled: {
        default: false,
        type: Boolean
      },
      value: {
        default: '',
        type: [String, Boolean, Number]
      },
      placeholder: {
        default: '',
        type: String
      },
      maxLength: {
        default: null,
        type: Number
      },
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
      clearBtn() {
        this.$emit('input', '')
      },
      inputEvent(e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-input
    display inline-block
    &.zb-input--big
      .input__inner
        height: 60px
        width: 360px
    &.zb-input--middle
      .input__inner
        height: 44px
        width: 400px

      .clear-wrap
        padding-top: 10px
        padding-bottom: 10px

    &.zb-input--small
      .input__inner
        height: 40px
        width: 164px

      .clear-wrap
        padding-top: 12px
        padding-bottom: 12px

    &.zb-input--mini
      .input__inner
        height: 34px
        width: 96px

      .clear-wrap
        padding-top: 8px
        padding-bottom: 8px


      .clear-wrap
        padding-top: 23px
        padding-bottom: 23px

    .input__inner
      width: 400px
      border-radius 2px
      border: 0.5px solid $color-border
      color: $color-text-main
      font-size $font-size-14
      font-family $font-family-regular
      padding-left 14px
      box-sizing: border-box

      &:hover
        border: 0.5px solid $color-border-hover

      &:focus
        border: 0.5px solid $color-main

    .border-rasuis-4
      border-radius: 4px

    .border-rasuis-2
      border-radius: 2px

    &.has-clear
      position relative

      .input__inner
        padding-right: 30px

      .clear-wrap
        display inline-block
        position absolute
        top: 50%
        right: 0px
        padding-right: 10px
        padding-left: 7px
        transform translateY(-50%)

      .clear-icon
        width: 13px
        height: @width
        icon-image('icon-delet')

  .zb-textarea
    padding 14px
    min-height: 93px
    resize none

  input::-webkit-input-placeholder
    color: $color-text-sub

  input:disabled
    background: #f9f9f9
    color: $color-text-assist

  textarea::-webkit-input-placeholder
    color: $color-text-sub
</style>
