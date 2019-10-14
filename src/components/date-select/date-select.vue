<template>
  <div class="base-date" :style="dateStyle">
    <div class="block">
      <date-picker
        v-model="times"
        :style="inputStyle"
        :type="dateType"
        :placeholder="datePlaceholder"
        :clearable="clearable"
        :valueFormat="valueFormat"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
      >
      </date-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DatePicker} from 'element-ui'
  const COMPONENT_NAME = 'BASE_DATE'

  export default {
    name: COMPONENT_NAME,
    components: {
      DatePicker
    },
    props: {
      textName: {
        type: String,
        default: '时间'
      },
      showTextName: {
        type: Boolean,
        default: true
      },
      dateStyle: {
        type: [String, Object],
        default: ''
      },
      inputStyle: {
        type: [String, Object],
        default: 'height:44px; width: 400px'
      },
      datePlaceholder: {
        type: String,
        default: ''
      },
      dateType: {
        type: String, //
        default: 'daterange'
      },
      valueFormat: {
        type: String, //
        default: 'yyyy-MM-dd HH:mm:ss'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      time: {
        type: String, //
        default: ''
      },
      startPlaceholder: {
        type: String, //
        default: '开始时间'
      },
      endPlaceholder: {
        type: String, //
        default: '结束时间'
      },
      clearable: {
        type: Boolean,
        default: true
      },
      infoTime: {
        type: [Array, String],
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        times: this.infoTime
      }
    },
    watch: {
      infoTime(times) {
        this.times = times
      },
      times(news) {
        this.$emit('update:infoTime', news || '')
        this.$emit('changeDate', news || '')
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .el-date-editor .el-range__icon
    line-height: 25px !important

  .el-date-editor .el-range__close-icon
    line-height: 25px !important

  .el-input__inner
    border: 0.5px solid #e9ecee
    height: 44px
    color: #4e5983
    font-size: 14px
    font-family: 'PingFangSC-Regular'

  .el-input__inner
    border-color: $color-line !important
  .el-button
    display: inline-block
    line-height: 1
    white-space: nowrap
    cursor: pointer
    background: #fff
    border: 1px solid #dcdfe6
    color: #606266
    -webkit-appearance: none
    text-align: center
    box-sizing: border-box
    outline: none
    margin: 0
    transition: .1s
    font-weight: 500
    -moz-user-select: none
    -webkit-user-select: none
    -ms-user-select: none
    padding: 12px 20px
    font-size: 14px
    border-radius: 4px
  .el-button--text
    border-color: transparent
    color: #409eff
    background: transparent
    padding-left: 0
    padding-right: 0
  .el-button--mini
    padding: 7px 15px
    font-size: 12px
    border-radius: 3px
  .el-button.is-plain:hover
    color: #409EFF
    border: 1px solid #409EFF


</style>
