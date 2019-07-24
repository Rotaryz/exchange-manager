<template>
  <div class="index">
    <navigation-menu></navigation-menu>
    <div class="main-container">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './helpers'
  // import API from '@api'
  import NavigationMenu from './navigation-menu/navigation-menu'

  const PAGE_NAME = 'INDEX'
  const TITLE = '首页'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      NavigationMenu
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .index
    width: 100vw
    height: 100vh
    background: $color-background
    overflow: hidden
    display: flex

  .main-container
    flex: 1
    width: 0
</style>
