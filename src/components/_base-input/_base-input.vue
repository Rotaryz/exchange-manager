<template>

  <div class="base-input" :class="[{'base-input--after':clear || $slots.after,'is-disabled':disabled},size ? 'zb-input--' + size : '',raduis?'zb-input--raduis-'+raduis:'']">
    <slot name="after">
      <span v-if="clear && value !=='' " class="clear-wrap" @click="clearBtn">
        <i class="clear-icon"></i>
      </span>
    </slot>

    <textarea v-if="type==='textarea'"
              :value="value"
              :style="[{ width:width && width + 'px',height:height && height + 'px'},inputStyle]"
              :maxlength="maxlength"
              :placeholder="placeholder"
              class="zb-textarea input__inner"
              @input="inputEvent"
              @keydown="keydown"
    ></textarea>
    <input v-else
           :value="value"
           :style="[{ width:width && width + 'px',height:height && height + 'px'},inputStyle]"
           :placeholder="placeholder"
           :type="type"
           :maxlength="maxlength"
           class="zb-input input__inner"
           @input="inputEvent"
           @keydown="keydown"
    >
    <span v-if="showWordLimit" class="base-input__count">0/30</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_INPUT'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        default: '',
        type: [String, Boolean, Number]
      },
      showWordLimit: {
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
      inputStyle: {
        default: () => {},
        type: Object
      },
      raduis: {
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
      console.log(this)
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-input
    display inline-block
    position relative

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

    &.zb-input--raduis-4 .input__inner
      border-radius: 4px

    &.zb-input--raduis-2 .input__inner
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

  .zb-textarea
    padding 14px
    min-height: 93px
    resize none

  input::-webkit-input-placeholder
  textarea::-webkit-input-placeholder
    color: $color-text-sub

  input:disabled
  textarea:disabled
    background: #f9f9f9
    color: $color-text-assist
    cursor not-allowed


</style>
