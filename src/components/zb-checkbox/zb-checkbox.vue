<template>
  <div class="zb-checkbox hand"
       :class="[type]"
       @click="$emit('click',$event)"
  >
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'ZB_CHECKBOX'

  export default {
    name: COMPONENT_NAME,
    props: {
      type: {
        type: String,
        default: 'default' // checked已选择 disable禁止 indeterminate 半选择状态
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .zb-checkbox
    // 选择框样式
    display: inline-block
    position: relative
    border-radius: 2px
    width: 18px
    height: 18px
    border: 1px solid #dcdfe6
    background-color: #fff
    &.default
      border: 1px solid #dcdfe6
      background-color: #fff
    &.checked
      icon-image('icon-pick')
    &.disable
      icon-image('icon-nopick')
    &.indeterminate
      icon-image('icon-bkpick')
</style>
