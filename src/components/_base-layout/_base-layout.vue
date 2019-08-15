<template>
  <div class="base-layout" :class="layoutType" :style="{padding:padding}">
    <slot>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_LAYOUT'

  export default {
    name: COMPONENT_NAME,
    props: {
      layoutType: {
        type: String,
        default: 'flex-start-center'  // flex-start flex-between flex-between-center flex-around flex-around-center
      },
      padding: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-layout
    border: 0.5px solid $color-line
    background-color $color-white
    width: 100%
    padding: 24px
    border-radius: 4px

  .flex-start
  .flex-start-center
    display flex

  .flex-start-center
    align-items center

  .flex-between
  .flex-between-center
    display flex
    justify-content space-between

  .flex-between-center
    align-items center

  .flex-aroundn-center
    align-items center

  .flex-around
    display flex
    justify-content space-around
    align-items center

</style>
