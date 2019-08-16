<template>

  <div class="base-input" :class="[{'base-input--after':clear || $slots.after,'is-disabled':disabled},size ? 'zb-input--' + size : '',radius?'zb-input--radius-'+radius:'']"
       :style="{width:width && width + 'px',height:height && height + 'px' || type==='textarea' && 94 + 'px'}"
  >
    <slot name="after">
      <span v-if="clear && value !=='' " class="clear-wrap" @click="clearBtn">
        <i class="clear-icon"></i>
      </span>
    </slot>
    <textarea v-if="type==='textarea'"
              :value="value"
              :style="inputStyle"
              :maxlength="maxlength || limit"
              :placeholder="placeholder"
              :readonly="readonly || disabled"
              :disabled="disabled"
              class="zb-textarea input__inner"
              @input="inputEvent"
              @keydown="keydown"
    ></textarea>
    <input v-else
           :class="inputName"
           :value="value"
           :style="[inputStyle,{'cursor':handIcon}]"
           :placeholder="placeholder"
           :type="type"
           :readonly="readonly || disabled"
           :maxlength="maxlength || limit"
           :disabled="disabled"
           class="zb-input input__inner"
           @input="inputEvent"
           @keydown="keydown"
    >
    <span v-if="limit" class="base-input__count">{{value.length}}/{{limit}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_INPUT'

  export default {
    name: COMPONENT_NAME,
    props: {
      hand: {
        default: false,
        type: Boolean
      },
      value: {
        default: '',
        type: [String, Boolean, Number]
      },
      limit: {
        type: [Number, String],
        default: null
      },
      clear: {
        default: false,
        type: [Boolean, String]
      },
      type: {
        default: 'text',
        type: String
      },
      disabled: {
        default: false,
        type: Boolean
      },
      placeholder: {
        default: '',
        type: String
      },
      maxlength: {
        default: null,
        type: Number
      },
      readonly: {
        default: false,
        type: [String, Boolean]
      },
      inputStyle: {
        default: () => {
        },
        type: [Object, String]
      },
      radius: {
        type: [Number, String],
        default: null
      },
      size: {
        default: 'middle', // big middle small mini
        type: String
      },
      width: {
        default: '',
        type: [String, Number]
      },
      height: {
        default: '',
        type: [String, Number]
      },
      handIcon: {
        default: '',
        type: String
      },
      inputName: {
        default: '',
        type: String
      }
    },
    data() {
      return {}
    },
    computed: {
      style() {
        return {
          width: this.width && this.width + 'px',
          height: this.height && this.height + 'px',
        }
      }
    },
    mounted() {
    },
    methods: {
      clearBtn() {
        this.$emit('input', '')
      },
      inputEvent(e) {
        this.$emit('input', e.target.value)
      },
      keydown(e) {
        this.$emit('keydown', e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-input
    display inline-block
    position relative

    &.zb-input--big
      height: 60px
      width: 360px

    &.zb-input--middle
      height: 44px
      width: 400px

    .clear-wrap
      padding-top: 10px
      padding-bottom: 10px

    &.zb-input--small
      height: 40px
      width: 164px

    .clear-wrap
      padding-top: 12px
      padding-bottom: 12px

    &.zb-input--mini
      height: 34px
      width: 96px

      .clear-wrap
        padding-top: 8px
        padding-bottom: 8px

      .clear-wrap
        padding-top: 23px
        padding-bottom: 23px

    .input__inner
      width: 100%
      height: 100%
      border-radius 4px
      border: 0.5px solid $color-line
      color: $color-text-main
      font-size $font-size-14
      font-family $font-family-regular
      padding-right 14px
      padding-left 14px
      box-sizing: border-box
      &:hover
        border: 0.5px solid $color-border-hover
      &:focus
        border: 0.5px solid $color-main

    &.zb-input--radius-4 .input__inner
      border-radius: 4px

    &.zb-input--radius-2 .input__inner
      border-radius: 2px

    &.base-input--after
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

    &.is-disabled .input__inner
      background: #f9f9f9
      color: $color-text-assist
      cursor not-allowed

    .base-input__count
      font-size $font-size-12
      color: #C9CCDA
      letter-spacing 0.5px
      position absolute
      bottom 10px
      right 10px

  .zb-textarea
    padding 14px
    resize none

  input::-webkit-input-placeholder
  textarea::-webkit-input-placeholder
    font-family: $font-family-regular
    color: $color-text-sub

  input:disabled
  textarea:disabled
    background: #f9f9f9
    font-family: $font-family-regular
    color: $color-text-assist
    cursor not-allowed


</style>
