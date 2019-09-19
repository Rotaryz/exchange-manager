<template>
  <div class="checkbox hand"
       :class="[type,{checked:isChecked,'has-margin-right':isGroup}]"
       :style="{'margin-right':marginRight ? marginRight : isGroup ? 60 : '' + 'px'}"
       @click="handleClick"
  >
    <div v-if="label" class="label">{{label}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'ZB_CHECKBOX'

  export default {
    name: COMPONENT_NAME,
    props: {
      label: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default' // checked已选择 disable禁止 indeterminate 半选择状态
      },
      value: {
        type: [String, Number],
        default: ''
      },
      marginRight: {
        type: [String, Number],
        default: () => ''
      }
    },
    computed: {
      isGroup() {
        return this.$parent.$options._componentTag === "base-checkbox-group"
      },
      isChecked() {
        if (!this.isGroup) return this.type === 'checked'
        const {
          value,
          label,
          selectList
        } = this
        return selectList.some(item => item === (value || label))
      },
      selectList() {
        return this.isGroup ? this.$parent.value : null
      }
    },
    methods: {
      handleClick(e) {
        if (this.type === 'disable') return
        this.$emit("select", this.value || this.label)
        if (this.isGroup) {
          this.isChecked
            ? this.$parent.deleteItem(this.value || this.label)
            : this.$parent.selectItem(this.value || this.label)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .checkbox
    display: flex
    align-items: center
    // 选择框样式
    font-size: $font-size-14

    &.has-margin-right
      margin-right: 60px

    .label
      height: 18px
      line-height: 18px
      margin-left 10px

    &:before
      display: inline-block
      content: ''
      width: 18px
      height: 18px
      border-radius: 2px
      line-height 18px

    &.default:before
      width: 16px
      height: 16px
      border: 1px solid #dcdfe6
      background-color: #fff

    &.checked:before
      width: 18px
      height: 18px
      border: none
      icon-image('icon-pick')

    &.disable:before
      width: 18px
      height: 18px
      border: none
      icon-image('icon-nopick')

    &.indeterminate:before
      width: 18px
      height: 18px
      border: none
      icon-image('icon-bkpick')
</style>
