<template>
  <div class="top-data-bar">
    <div class="data-item">
      <div class="img-con">

      </div>
    </div>
  </div>
</template>

<script>
  const PAGE_NAME = 'TOP_DATA_BAR'

  export default {
    name: PAGE_NAME,
    props: {
      cmsType: {
        type: String,
        default: 'banner'
      },
      bannerList: {
        type: Array,
        default: () => []
      },
      hotList: {
        type: Array,
        default: () => []
      },
      cmsList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .top-data-bar
    box-sizing: border-box
    width: 100%
    height: 120px
    padding: 0 30px
    margin-bottom: 20px
    background: #ffffff
    display: flex
    flex-direction: row
    align-items: center
    border: 0.5px solid $color-line
    border-radius: 4px
</style>
