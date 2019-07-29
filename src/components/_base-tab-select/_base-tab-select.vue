<template>
  <div v-show="tabStatus.length" :lass="{'router-nest': isNesting}">
    <div class="status-tab">
      <div v-for="(item, index) in tabStatus" :key="index" :style="{'margin-right': marginRight + 'px'}" :class="{'status-item-active': tabIndex === index}" class="status-item hand">
        <div class="status-txt" @click="_setTab(index, item)">{{item.text}}</div>
      </div>
      <span class="line" :style="{'left': left + 'px', width: lineWidth + 'px'}"></span>
    </div>
    <div class="status-top"></div>
    <div v-if="isNesting" class="router-child">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'BASE_TAB_SELECT'

  export default {
    name: COMPONENT_NAME,
    props: {
      tabStatus: {
        // Tab数据
        type: Array,
        default: () => []
      },
      infoTabIndex: {
        // 当前选择
        type: Number,
        default: 0
      },
      marginRight: {
        // tab距离
        type: Number,
        default: 40
      },
      lineWidth: {
        // 下划线宽度
        type: Number,
        default: 40
      },
      isNesting: {
        // 下划线宽度
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tabIndex: this.infoTabIndex,
        left: 22,
        tabArr: null,
        width: 0
      }
    },
    watch: {
      infoTabIndex(newVal) {
        this.tabIndex = newVal
        this._setLeft()
      }
    },
    mounted() {
      window.onResize = () => {
        this.width = `${document.querySelector('.container').offsetWidth}px`
      }
      this.width = `${document.querySelector('.container').offsetWidth}px`
      this.$nextTick(() => {
        this.tabArr = document.querySelectorAll('.status-item')
        this._setLeft()
      })
    },
    methods: {
      _setLeft() {
        let left = 0
        this.tabArr.forEach((item, idx) => {
          if (this.tabIndex > idx) {
            left += item.offsetWidth + this.marginRight
          } else if (this.tabIndex === idx) {
            left += (item.offsetWidth - this.lineWidth) / 2 + 26
          }
        })
        this.left = left
      },
      _setTab(index, item) {
        this.tabIndex = index
        this._setLeft()
        this.$emit('getStatusTab', item, index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .big
    height: 2000px

  .router-nest
    flex: 1
    display: flex
    flex-direction: column
    overflow: hidden
    .router-child
      flex: 1
      &::-webkit-scrollbar
        width: 5px
        height: 8px
        transition: all 0.2s
      &::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, .06)
        border-radius: 10px
      &::-webkit-scrollbar-thumb:hover
        background-color: rgba(0, 0, 0, .15)
      &::-webkit-scrollbar-track
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
        border-radius: 10px
      &:hover
        &::-webkit-scrollbar
          transition: all 0.2s
          width: 5px
          height: 5px

  .status-top
    height: 50px
    width: 100%

  .status-tab
    border-bottom-1px($color-line)
    position: fixed
    top: 50px
    left: 200px
    z-index: 700
    width: 100%
    user-select: none
    background: $color-white
    display: flex
    font-size: $font-size-16
    line-height: 16px
    font-family: $font-family-regular
    color: $color-text-main
    padding: 0 26px
    box-sizing: border-box
    .status-item
      margin-right: 40px
      height: 49px
      box-sizing: border-box
      transition: all 0.3s
      .status-txt
        font-size: $font-size-16
        padding: 14px 0
        box-sizing: border-box
    .status-item-active
      color: $color-main
      font-family: $font-family-medium
    .line
      transition: all .3s
      background: $color-main
      height: 2px
      width: 40px
      position: absolute
      left: 8px
      bottom: 0
      border-radius: 2px
      z-index: 10
</style>
