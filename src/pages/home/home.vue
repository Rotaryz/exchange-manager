<template>
  <div class="home" @touchmove.prevent>
    <base-router-view @refresh="refresh"></base-router-view>
    <div>{{showTxt}}</div>
    <router-link tag="div" to="/home/test-page">test-page</router-link>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from '@components/tab/tab'

  const PAGE_NAME = 'HOME'

  export default {
    name: PAGE_NAME,
    page: {
      title: 'Home',
      meta: [{name: 'description', content: 'description'}]
    },
    components: {
      Tab
    },
    data() {
      return {
        showTxt: ''
      }
    },
    created() {
      console.log(89988)
      this.showTxt = '123'
    },
    methods: {
      refresh() {
        this.showTxt = 'refresh'
        console.log('-------------refresh----------')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
</style>
