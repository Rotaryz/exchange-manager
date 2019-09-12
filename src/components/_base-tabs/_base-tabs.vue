<template>
  <div :class="['tab-wrap',tabAlign]">
    <ul :class="['tab-list',tabAlign]">
      <li v-for="(flow,idx) in data" :key="flow.text" :ref="'activeTab'+getId(flow,idx)"
          :class="['tab-item', {'tab-item-active':value===getId(flow,idx)}]"
          :style="{color:defaultColor,padding:padding,margin:margin}"
          @click.capture="changeTab(getId(flow,idx),$event)"
      >
        <span v-if="isShowMark" class="idx-mark">{{idx +1}}</span>
        <span class="text">{{flow.text}}</span>
      </li>
      <div class="tab-active-line-wrap" :style="{'left': activeLine.left + 'px', width: activeLine.lineWidth + 'px', background: activeColor,'padding-left':gapWidth,'padding-right':gapWidth}">
        <div class="tab-active-line" :style="{width:activeLineWidth}"></div>
      </div>
    </ul>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'BASE_TAB_SELECT'
  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        // Tab选中值
        type: [Number, String],
        default: ''
      },
      valueKey: {
        // Tab选中值
        type: [Number, String],
        default: ''
      },
      data: {
        // tab数据
        type: Array,
        default: () => []
      },
      padding: {
        // 高亮线条样式padding
        type: String,
        default: ''
      },
      margin: {
        // 样式margin
        type: String,
        default: '0 20px'
      },
      tabAlign: {
        // 文字样式
        type: String,
        default: 'center'
      },
      activeColor: {
        // 高亮颜色
        type: String,
        default: ''
      },
      defaultColor: {
        // 默认颜色
        type: String,
        default: '#333333'
      },
      isShowMark: {
        // 是否后面有标记
        type: Boolean,
        default: false
      },
      activeLineWidth: {
        // 高亮寬度
        type: String,
        default: ''
      },
      gapWidth: {
        // 高亮与字体占宽左右的差距
        type: String,
        default: '10px'
      }
    },
    data() {
      return {
        activeLine: {
          left: '',
          lineWidth: 100
        }
      }
    },
    watch: {
      value(val) {
      }
    },
    mounted() {
      window.onresize = () => {
        return (() => {
          this.getWidthAndPositon(this.value)
        })()
      }
      if (this.data.length) {
        this.getWidthAndPositon(this.value)
      }
    },
    methods: {
      getId(item, idx) {
        // console.log(typeof (this.valueKey))
        return typeof this.valueKey === 'number' ? idx : item[this.valueKey]
      },
      getWidthAndPositon(id) {
        // console.log(this.$refs['activeTab' + id])
        let el = this.$refs['activeTab' + id] && this.$refs['activeTab' + id][0]
        if (!el) return
        this.activeLine.lineWidth = el.offsetWidth
        this.activeLine.left = el.offsetLeft
      },
      changeTab(val) {
        // console.log(val)
        this.getWidthAndPositon(val)
        this.$emit('update:value', val)
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  $tabs-default-color = #999
  .tab-wrap
    width: 100%
    border-bottom: 1px solid #E9ECEE
    display: flex
    justify-content: center
    background-color: $color-white
    &.center
      justify-content: center

    &.left
      justify-content: flex-start

    &.right
      justify-content: flex-end

  .tab-list
    display: flex
    align-items: center
    position: relative

    .tab-active-line-wrap
      transition: all .3s
      height: 2px
      width: 40px
      position: absolute
      left: 8px
      bottom: -2px
      z-index: 10

    .tab-active-line
      background: $color-main
      border-radius: 2px
      height: 2px

    .tab-item
      padding: 20px 0px 14px 0px
      text-align: center
      cursor: pointer
      color: $tabs-default-color

      .text
        display: inline-block
        font-size: $font-size-16
        font-family: $font-family-regular

      .idx-mark
        display: inline-block
        margin-right: 4px
        font-size: $font-size-12
        height: 16px
        width: 16px
        text-align: center
        border-radius: 50%
        color: #fff
        background: $tabs-default-color

    .tab-item-active
      .text
        color: $color-main

      .idx-mark
        background: $color-main


</style>
