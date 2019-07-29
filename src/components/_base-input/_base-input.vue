<template>
  <div class="base-input">
    <!-- 'zb-input--prefix': $slots.prefix,
              'zb-input--suffix': $slots.suffix|| clearable,-->
    <!-- eslint-disable  -->
    <input v-if="type==='input'"
           :value="value"
           :class="[ 'zb-input','input__inner',{'is-disabled': inputDisabled},inputSize ? 'zb-input--' + inputSize : '']"
           :style="inputStyle"
           :placeholder="placeholder"
           @focus="active = true"
           @blur="active = false"
           @input="inputEvent"
    >
    <textarea v-if="type==='textarea'"
              :value="value"
              :class="['zb-textarea','input__inner',{'is-disabled': inputDisabled},inputSize ? 'zb-input--' + inputSize : '']"
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
      type: {
        default: 'input',
        type: String
      },
      inputStyle: {
        default: '',
        type: [Object, String]
      },
      inputSize: {
        default: 'middle', // big middle small
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
      }
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
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

  .zb-input
    &.zb-input--middle
      height: 43px
      min-width: 200px

    &.zb-input--small
      height: 31px
      min-width: 120px

    &.zb-input--big
      height: 59px
      min-width: 360px

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
