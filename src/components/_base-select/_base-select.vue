<template>
  <div class="base-select"
       :class="[{'active': visible}, {'disabled':disabled},'base-select--'+size,radius ? 'border-radius--'+ radius:'']"
       :style="[{ 'min-width':width+'px',height:height+'px'}]"
       @click.stop="selectType"
  >
    <div class="inner-value">
      {{valueLabel ? valueLabel : defaultLabel?defaultLabel :placeholder}}
    </div>
    <base-input :value="valueLabel"
                :placeholder="placeholder"
                :disabled="disabled"
                handIcon="pointer"
                type="text"
                autocomplete="off"
                readonly="readonly"
                class="inner-input"
                @click.stop="selectType"
    >
      <template slot="after"><span v-if="!disabled" class="arrow-icon" :class="{'active': visible}"></span></template>
    </base-input>
    <transition name="fade">
      <ul v-show="visible" class="select-child" :style="{top: top}" @mouseleave="leaveHide()" @mouseenter="endShow">
        <li v-for="(child, chIdx) in data"
            :key="chIdx"
            :class="['select-child-item',{active:(valueKey ? child[valueKey] :child)===value}]"
            :style="itemStyle"
            @click.stop="setValue(child, chIdx)"
        >
          {{child[labelKey]}}
        </li>
        <li v-if="!data.length" class="select-child-item">{{noContentText}}</li>
      </ul>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      width: {
        default: '200',
        type: [String, Number]
      },
      height: {
        default: '32',
        type: [String, Number]
      },
      radius: {// 2 4
        default: null,
        type: String
      },
      size: {
        default: 'middle', // middle small big
        type: String
      },
      // 选中的值
      value: {
        type: [String, Object, Boolean, Number],
        default: ''
      },
      defaultLabel: {
        type: String,
        default: ''
      },
      // 占位符
      placeholder: {
        type: String,
        default: ''
      },
      // 显示的label键值
      labelKey: {
        type: String,
        default: 'label'
      },
      // 需要的value键值
      valueKey: {
        type: String,
        default: 'id'
      },
      // 列表数据
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 没有选择列表显示的文字
      noContentText: {
        type: String,
        default: '暂无数据'
      },
      // 禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 每一行
      itemStyle: {
        default: '',
        type: [String, Object],
      },
      inputStyle: {
        default: '',
        type: [String, Object],
      },
      top: {
        default: '',
        type: String,
      }
    },
    data() {
      return {
        visible: false,
        setTime: '',
      }
    },
    computed: {
      valueLabel() {
        let res = this.data.find(item => {
          let re = this.valueKey ? item[this.valueKey] === this.value : item === this.value
          return re
        })
        return res ? res[this.labelKey] : this.defaultLabel ? this.defaultLabel : ''
      }
    },
    mounted() {
      window.onclick = () => {
        this.visible = false
      }
    },
    methods: {
      clickHide() {
        this.visible = false
        this.$emit('change-visible', false)
      },
      endShow() {
        clearTimeout(this.setTime)
      },
      leaveHide() {
        this.setTime = setTimeout(() => {
          this.clickHide()
        }, 1500)
      },
      selectType() {
        if (this.disabled) {
          return
        }
        this.visible = !this.visible
        this.$emit('change-visible', true)
      },
      setValue(value, index) {
        this.visible = false
        let res = this.valueKey ? value[this.valueKey] : value
        this.$emit('update:value', res)
        this.$emit('input', res)
        this.$emit('change', res)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-select
    position relative
    background-color $color-white
    color: $color-text-main
    font-size $font-size-14
    border-radius: 2px
    white-space: nowrap
    box-sizing: border-box
    transition: all 0.2s
    text-indent: 10px
    padidng-riggh 15px
    width: 200px
    /*min-height:32px*/
    .inner-value
      padding-left: 14px
      padding-right: 30px
      visibility hidden
      cursor pointer
    .select-child
      top: 44px

    .border-radius--4
      border-radius: 4px

    .border-radius--2
      border-radius: 2px

    &.base-select--middle
      height: 44px
      line-height: 44px
      width: 200px

      .select-child
        top: 44px

    &.base-select--small
      height: 32px
      line-height: 32px
      width: 120px

      .select-child
        top: 32px

    &.base-select--mini
      height: 28px
      line-height: 28px
      width: 218px

      .select-child
        top: 28px

    &.base-select--big
      height: 60px
      line-height: 60px
      width: 60px

      .select-child
        top: 60px

    &:hover
      border-color: $color-border-hover

    &.active
      border-color: $color-main
      color: $color-text-main

    &.disabled
      border-color: $color-disable
      cursor not-allowed

    .inner-input
      width: 100%
      height: 100%
      min-height: 32px
      position absolute
      top: 0
      right: 0
      bottom 0
      left: 0
      z-index: 20
      cursor pointer
      display: flex

    .arrow-icon
      position: absolute
      width: 0
      height: 0
      border-top: 5px solid $color-text-assist
      border-left: 4px solid transparent
      border-right: 4px solid transparent
      right: 10px
      top: 50%
      transform-origin: 50% 0
      transform translateY(-50%)
      transition: transform 0.3s

      &.active
        transform-origin: 50% 0
        transform: rotate(180deg) translateY(-50%)
        transition: transform 0.3s

    .select-child
      left: 0
      background: $color-white
      z-index: 300
      position: absolute
      border-radius: 3px
      box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.20)
      margin-top: 10px
      max-height: 350px
      overflow-y: auto
      min-width: 100%

      &::-webkit-scrollbar
        width: 8px
        height: 10px

      &::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, .15)
        border-radius: 10px

      &::-webkit-scrollbar-thumb:hover
        background-color: rgba(0, 0, 0, .3)

      &::-webkit-scrollbar-track
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .15)
        border-radius: 10px

      &.fade-enter, &.fade-leave-to
        opacity: 0

      &.fade-enter-to, &.fade-leave-to
        transition: opacity .3s ease-in-out

      .select-child-item
        white-space: nowrap
        color: $color-text-main
        padding: 0 11px
        text-align: left
        height: 40px
        line-height: 40px
        font-size: 14px
        font-family: $font-family-regular
        border-bottom: 0.5px solid $color-line
        box-sizing: border-box

        &:hover
        &.active
          color: $color-main

  .placeholder-text
    user-select: none
    color: $color-text-sub
</style>
