<template>
  <div class="test-page">
    test-page
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  const PAGE_NAME = 'TEST_PAGE'

  export default {
    name: PAGE_NAME,
    data() {
      return {}
    },
    beforeRouteEnter(to, from, next) {
      API.Global.jssdkConfig().then(res => {
        console.log(res)
        next(vm => {
          vm.test(res, 'ok')
        })
      }).catch(err => {
        console.log(err)
        next(vm => {
          vm.test(err, 'error')
        })
      })
    },
    methods: {
      test(res, txt) {
        console.log('--------beforeRouteEnter vm-------')
        console.log(res, txt)
        this.$emit('refresh')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .test-page
    fill-box()
    background: #fff
</style>
