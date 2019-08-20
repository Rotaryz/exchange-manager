<template>
  <div class="base-search" :style="boxStyle">
    <div v-if="isShowTip" class="box-tip">搜索</div>
    <slot></slot>
    <base-input :value="value"
                radius="4"
                :width="width"
                :height="height"
                :placeholder="placeholder"
                @input="setValue"
                @keydown="_enter"
    ></base-input>
    <div class="search-icon-box hand" @click="_search">搜索</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_SEARCH'

  export default {
    name: COMPONENT_NAME,
    props: {
      paramsKey: {
        type: String,
        default: '',
      },
      buttonSize: {
        type: String,
        default: '', // small middle big
      },
      placeholder: {
        // 默认文字
        type: String,
        default: ''
      },
      defaultValue: {
        // 输入框值
        type: [String, Number],
        default: ''
      },
      width: {
        // 输入框宽度
        type: Number,
        default: 220
      },
      height: {
        // 输入框宽度
        type: Number,
        default: 32
      },
      boxStyle: {
        // 组件自定义样式
        type: String,
        default: ''
      },
      boxTip: {
        // 组件自定义样式
        type: String,
        default: '搜索'
      },
      value: {
        type: String,
        default: null
      },
      isShowTip: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        newText: ''
      }
    },
    methods: {
      setValue(val) {
        this.$emit('input', val)
      },
      _search() {
        let e = document.querySelector('.search')
        this.$emit('search', e.value)
      },
      _enter(e) {
        if (e.keyCode === 13) {
          this.$emit('search', e.target.value)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-search
    margin-left: 30px

  .base-search-box
    display: inline-block

  .base-search
    display: flex
    height: 32px
    align-items: center
    overflow: hidden
    position relative
    &.small
      height: 28px
    .box-tip
      font-size: $font-size-12
      color: $color-text-main
      margin-right: 10px

  .search-icon-box
    width: 60px
    margin-left: 10px
    overflow: hidden
    height: 32px
    border-radius: 4px
    background: $color-main
    text-align: center
    line-height: 32px
    font-size: $font-size-12
    color: $color-white
    transition: 0.3s all
    &:hover
      opacity: 0.8

  .base-search
    .input__inner
      background: #F4F8F9
      width: 100%
      height: 100%
      border-radius 2px
      border: 0.5px solid $color-line
      color: $color-text-main
      font-size $font-size-14
      font-family $font-family-regular
      padding-right 14px
      transition: all 0.2s
      padding-left 14px
      box-sizing: border-box
      &:hover
        border: 0.5px solid #ACACAC
      &::placeholder
        font-family: $font-family-regular
        color: $color-text-sub
      &:focus
        background: $color-white
        border: 0.5px solid $color-main !important
</style>
