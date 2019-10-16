<template>
  <div class="base-date" :style="dateStyle">
    <div class="block">
      <span v-if="showTextName" class="demonstration">{{textName}}</span>
      <date-picker
        :value="infoTime"
        style="height:32px; width: 280px"
        :type="dateType"
        :placeholder="datePlaceholder"
        :clearable="clearable"
        :valueFormat="valueFormat"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
        @change="change"
        @input="update"
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
        default: 'yyyy-MM-dd'
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
    methods: {
      update(val) {
        this.$emit('update:infoTime', val || [])
      },
      change(val) {
        this.$emit('changeDate', val || [])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .demonstration
    font-size: $font-size-12
    font-family: $font-family-regular
    margin-right: 10px
    color: $color-text-main

  .el-date-editor .el-range__icon
    line-height: 25px !important

  .el-date-editor .el-range__close-icon
    line-height: 25px !important

  .el-input__inner
    border: 0.5px solid #e9ecee

  .el-input__inner
    border-color: $color-line !important
</style>
