<template>
  <div>
    404
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  const PAGE_NAME = 'NOT_FOUND'

  export default {
    name: PAGE_NAME,
    page: {
      title: '404',
      meta: [{name: 'description', content: '404'}]
    },
    props: {
      resource: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        abs: 'asd'
      }
    },
    created() {
      API.Global.getToken().then(res => {

      }).catch(e => {
        console.log(e, 'catch')
      })
      API.Global.getToken({
        doctor: (res) => {
          console.log(this.abs)
          console.log(res, 'doctor')
        }
      }).then(res => {

      }).catch(e => {
        console.log(e, 'token doctor')
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
</style>
