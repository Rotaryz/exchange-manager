<template>
  <div class="navigation-menu">
    <nav class="nav-right">

    </nav>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'NAVIGATION_MENU'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .navigation-menu
    width: 200px
    height: 100%
    display: flex

  .nav-right
    width: 90px
    background: #182840
    box-shadow: 3px 0 4px 0 rgba(0, 8, 39, 0.15)
</style>
