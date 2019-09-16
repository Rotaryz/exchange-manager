<template>
  <div class="base-checkbox-group" name="checkbox-group">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_CHECKBOX_GROUP'

  export default {
    name: COMPONENT_NAME,
    model: {
      prop: "value",
      event: "select"
    },
    props: {
      value: {
        type: Array,
        required: true,
        default: () => [1]
      }
    },
    provide(){
      return {
        selectList :this.value
      }
    },
    data() {
      return {
      }
    },
    watch: {
      value(newValue) {
        this.$emit("change", newValue)
      }
    },
    methods: {
      selectItem(item) {
        console.log('selectItem',[...this.value, item])
        this.$emit("select", [...this.value, item])
      },
      deleteItem(item) {
        console.log('deleteItem',this.value.filter(selectitem => selectitem !== item))
        this.$emit(
          "select",
          this.value.filter(selectitem => selectitem !== item)
        )
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-checkbox-group
    width: 100%
</style>
