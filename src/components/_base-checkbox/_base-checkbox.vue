<template>
  <div class="checkbox hand"
       :class="[type]"
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
      }
    },

    inject: ['selectList'],
    data() {
      return {
        selects:this.selectList
      }
    },
    computed: {
      isChecked() {
        console.log(this.selects,9999)
        if (!this.selectList) return this.type === 'checked'
        const {
          value,
          label,
          selectList
        } = this
        return selectList.some(item => item === (value || label))
      }
    },
    methods: {
      handleClick(e) {
        this.$emit("select", this.value || this.label)
        if (this.selectList) {
          this.isChecked
            ? this.$parent.deleteItem(this.value || this.label)
            : this.$parent.selectItem(this.value || this.label)
        } else {
          this.$emit("select", this.value || this.label)
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

    .label
      height: 18px
      line-height: 18px
      margin-left 10px

    &:before
      display: inline-block
      content: ''
      width: 18px
      height: 18px
      border: 1px solid #dcdfe6
      background-color: #fff
      border-radius: 2px
      line-height 18px

    &.default:before
      border: 1px solid #dcdfe6
      background-color: #fff

    &.checked:before
      border: none
      icon-image('icon-pick')

    &.disable:before
      border: none
      icon-image('icon-nopick')

    &.indeterminate:before
      border: none
      icon-image('icon-bkpick')
</style>
