<template>
  <div class="base-search" :style="boxStyle">
    <div class="box-tip">搜索</div>
    <base-input :value="value"
                radius="4"
                width="220"
                height="32"
                :inputStyle="{background: '#F4F8F9',border: '1px solid #F3F2F7'}"
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
        default: 224
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
        this.$emit('search', this.value)
      },
      _enter(e) {
        if (e.keyCode === 13) {
          this.$emit('search', e.target.value)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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

  .search-input
    color: $color-text-main
    font-family: $font-family-regular
    font-size: $font-size-12
    height: 100%
    width: 100%
    box-sizing: border-box
    border: 0.5px solid #F3F2F7
    border-radius: 4px
    padding-left: 10px
    transition: all 0.2s
    background: #F4F8F9
    &:hover
      border: 0.5px solid #ACACAC
    &::placeholder
      font-family: $font-family-regular
      color: $color-text-sub
    &:focus
      background: $color-white
      border: 0.5px solid $color-main !important

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
</style>
